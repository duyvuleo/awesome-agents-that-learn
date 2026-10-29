"""Check public source reachability and arXiv primary-title identity.

Network errors and access restrictions are inconclusive, not dead-link claims.
Does not download artifacts, execute code, or send credentials.
"""
from __future__ import annotations

import argparse
import concurrent.futures
import datetime as dt
import difflib
import html.parser
import json
import re
import unicodedata
import urllib.error
import urllib.request
from urllib.parse import parse_qs, urlsplit
from catalog import ROOT, load


class Metadata(html.parser.HTMLParser):
    def __init__(self):
        super().__init__()
        self.title = None

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "meta" and attrs.get("name", "").lower() == "citation_title":
            self.title = attrs.get("content", "")


def normalized(title):
    return re.sub(r"[^a-z0-9]", "", unicodedata.normalize("NFKD", title).encode("ascii", "ignore").decode().casefold())


def is_access_gate(url):
    """Known login/challenge redirects are not accessible source content."""
    parsed = urlsplit(url)
    cookie_error = "cookies_not_supported" in parse_qs(parsed.query).get("error", [])
    return cookie_error or any(segment in {"challenge", "login", "signin", "authorize", "captcha"} for segment in parsed.path.lower().split("/"))


def check(url, expected=None):
    result = {"url": url}
    try:
        request = urllib.request.Request(url, headers={"User-Agent": "AwesomeAgentsThatLearn/1.0 (public bibliography link check)"})
        with urllib.request.urlopen(request, timeout=25) as response:
            result.update(http_status=response.status, final_url=response.url, status="reachable")
            if is_access_gate(response.url):
                result.update(status="restricted-or-transient", note="Redirected to an access gate; source content was not verified.")
                return result
            if expected and "arxiv.org/abs/" in url:
                parser = Metadata()
                parser.feed(response.read(1500000).decode("utf-8", "replace"))
                result["expected_title"] = expected
                result["observed_title"] = parser.title
                if parser.title:
                    similarity = difflib.SequenceMatcher(None, normalized(expected), normalized(parser.title)).ratio()
                    result["title_similarity"] = round(similarity, 4)
                    result["title_check"] = "match" if similarity >= 0.94 else "review"
                else:
                    result["title_check"] = "unavailable"
    except urllib.error.HTTPError as exc:
        result.update(http_status=exc.code, status="not-found" if exc.code in {404, 410} else "restricted-or-transient")
    except Exception as exc:
        result.update(status="inconclusive", error=type(exc).__name__)
    return result


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=__import__("pathlib").Path, default=ROOT / "docs" / "link-report.json")
    parser.add_argument("--workers", type=int, default=4)
    parser.add_argument("--primary-only", action="store_true")
    args = parser.parse_args()
    records = load() + load("systems.json")
    urls = {r["url"] for r in records}
    if not args.primary_only:
        urls.update(url for r in records for url in r["sources"])
    expected = {r["url"]: r["title"] for r in records if "title" in r}
    results = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=max(1, min(args.workers, 8))) as pool:
        jobs = {pool.submit(check, url, expected.get(url)): url for url in sorted(urls)}
        for future in concurrent.futures.as_completed(jobs):
            result = future.result()
            results.append(result)
            if result["status"] != "reachable" or result.get("title_check") in {"review", "unavailable"}:
                print(result["status"], result.get("title_check", ""), result["url"], flush=True)
    report = {"checked_at_utc": dt.datetime.now(dt.timezone.utc).isoformat(), "scope": "primary-only" if args.primary_only else "all-catalog-sources", "limitations": "HTTP success and title matching do not validate scientific claims, code completeness, licensing, or reproducibility. Restricted/transient and inconclusive responses require manual review.", "results": sorted(results, key=lambda x: x["url"])}
    args.output.write_text(json.dumps(report, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    bad = sum(r["status"] == "not-found" or r.get("title_check") == "review" for r in results)
    print(f"Checked {len(results)} URLs; {bad} not-found responses or title-review flags. Report: {args.output}")
    raise SystemExit(1 if bad else 0)


if __name__ == "__main__":
    main()
