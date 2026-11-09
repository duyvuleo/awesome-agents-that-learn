"""Weekly editorial snapshots, Markdown views, and read-only scheduling."""
from __future__ import annotations

import argparse
import datetime as dt
import html
import json
import re
import subprocess
from pathlib import Path
from urllib.parse import quote, urlsplit
from zoneinfo import ZoneInfo
from catalog import ROOT, load

ZONE = ZoneInfo("Australia/Sydney")
START_WEEK = dt.date(2026, 11, 2)
EVENTS = {"new": "New paper", "revision": "Substantive revision", "publication": "Publication update"}
STATUSES = {"preprint", "peer-reviewed", "technical-report"}


def day(value):
    if not isinstance(value, str) or not re.fullmatch(r"\d{4}-\d{2}-\d{2}", value):
        raise ValueError("requires a complete YYYY-MM-DD date")
    return dt.date.fromisoformat(value)


def local_day(value=None):
    if value is None:
        return dt.datetime.now(ZONE).date()
    if isinstance(value, dt.datetime):
        if value.tzinfo is None:
            raise ValueError("datetime requires a timezone")
        return value.astimezone(ZONE).date()
    return value


def public_url(value):
    if not isinstance(value, str) or re.search(r"[\s<>\\]", value):
        return False
    try:
        p = urlsplit(value)
        return p.scheme == "https" and bool(p.hostname) and not p.username and not p.password
    except ValueError:
        return False


def load_issues(root=ROOT):
    result = []
    for path in sorted((root / "data" / "weekly").glob("*.json")):
        issue = json.loads(path.read_text(encoding="utf-8"))
        if not isinstance(issue, dict) or path.stem != issue.get("week_start"):
            raise ValueError(f"{path.name}: filename must match week_start")
        result.append(issue)
    return result


def entries(issue):
    return issue.get("picks", []) + ([issue["older_paper"]] if issue.get("older_paper") else [])


def validate_issues(issues, papers, today=None):
    errors, weeks, appearances = [], set(), {}
    now = local_day(today)
    paper_ids = {p["id"] for p in papers}
    if not isinstance(issues, list):
        return ["weekly issues must be a list"]
    for issue in sorted(issues, key=lambda x: str(x.get("week_start", "")) if isinstance(x, dict) else ""):
        label = issue.get("week_start", "weekly issue") if isinstance(issue, dict) else "weekly issue"
        try:
            if not isinstance(issue, dict):
                raise ValueError("issue must be an object")
            required = {"week_start", "week_end", "published_on", "title", "takeaway", "introduction",
                        "picks", "older_paper", "study_question", "corrections"}
            if set(issue) != required:
                raise ValueError("invalid issue fields")
            start, end, published = (day(issue[k]) for k in ("week_start", "week_end", "published_on"))
            if start.weekday() != 0 or end != start + dt.timedelta(days=6):
                raise ValueError("issue must cover Monday through Sunday")
            if start < START_WEEK or not end < published <= now:
                raise ValueError("publication must follow a completed issue week and not be in the future")
            if start in weeks:
                raise ValueError("duplicate issue week")
            weeks.add(start)
            for key in ("title", "takeaway", "introduction", "study_question"):
                if not isinstance(issue[key], str) or not issue[key].strip():
                    raise ValueError(f"empty {key}")
            if not isinstance(issue["picks"], list) or not 1 <= len(issue["picks"]) <= 5:
                raise ValueError("issue needs one to five main picks; quiet weeks have no public issue")
            if issue["older_paper"] is not None and not isinstance(issue["older_paper"], dict):
                raise ValueError("older_paper must be one object or null")
            seen = set()
            for pick in entries(issue):
                if not isinstance(pick, dict):
                    raise ValueError("pick must be an object")
                required_pick = {"paper_id", "citation", "event", "why_now", "problem", "mechanism",
                                 "evidence", "limitation", "connections"}
                if set(pick) != required_pick:
                    raise ValueError("invalid pick fields")
                pid = pick["paper_id"]
                if not isinstance(pid, str) or pid not in paper_ids or pid in seen:
                    raise ValueError("unknown or duplicate paper reference")
                seen.add(pid)
                for key in ("why_now", "problem", "mechanism", "evidence", "limitation"):
                    if not isinstance(pick[key], str) or not pick[key].strip():
                        raise ValueError(f"{pid}: empty {key}")
                c = pick["citation"]
                if not isinstance(c, dict) or set(c) != {"title", "short_name", "date", "status", "url",
                                                         "review_depth", "checked", "reviewed_sources"}:
                    raise ValueError(f"{pid}: invalid citation snapshot")
                if any(not isinstance(c[k], str) or not c[k].strip() for k in ("title", "short_name")):
                    raise ValueError(f"{pid}: missing citation title")
                if len(c["short_name"]) > 40 or c["status"] not in STATUSES or c["review_depth"] != "full-text":
                    raise ValueError(f"{pid}: featured work requires a full-text snapshot and valid status")
                first = c["date"]
                if isinstance(first, str) and re.fullmatch(r"\d{4}", first):
                    first_low = dt.date(int(first), 1, 1)
                    first_high = dt.date(int(first), 12, 31)
                else:
                    first_low = first_high = day(first)
                checked = day(c["checked"])
                if not first_low <= checked <= published or not public_url(c["url"]):
                    raise ValueError(f"{pid}: invalid citation dates or URL")
                reviewed = c["reviewed_sources"]
                if not isinstance(reviewed, list) or not reviewed:
                    raise ValueError(f"{pid}: missing reviewed source versions")
                for source in reviewed:
                    if not isinstance(source, dict) or set(source) != {"url", "version", "sections"}:
                        raise ValueError(f"{pid}: invalid reviewed source")
                    if not public_url(source["url"]) or any(not isinstance(source[k], str) or not source[k].strip() for k in ("version", "sections")):
                        raise ValueError(f"{pid}: invalid source URL, version or inspected sections")
                older = pick is issue["older_paper"]
                event = pick["event"]
                if older:
                    if event is not None or first_high >= start:
                        raise ValueError(f"{pid}: older spotlight needs a demonstrably older source date and no current-week event")
                else:
                    if not isinstance(event, dict) or not {"kind", "date", "source"} <= set(event) or set(event) - {"kind", "date", "source", "occurred_at"}:
                        raise ValueError(f"{pid}: invalid eligibility event")
                    date = day(event["date"])
                    if event["kind"] not in EVENTS or not start <= date <= end or date > checked or not public_url(event["source"]):
                        raise ValueError(f"{pid}: event must be verified in the covered week")
                    if event.get("occurred_at"):
                        instant = dt.datetime.fromisoformat(event["occurred_at"].replace("Z", "+00:00"))
                        if instant.tzinfo is None or local_day(instant) != date:
                            raise ValueError(f"{pid}: event timestamp and Sydney date disagree")
                    if event["kind"] == "new":
                        if first_low != first_high:
                            raise ValueError(f"{pid}: first release has insufficient date precision")
                        expected = instant.date() if event.get("occurred_at") else date
                        if first_low != expected:
                            raise ValueError(f"{pid}: new-release event must match first public date, not inspection date")
                    if pid in appearances:
                        old_date, old_reason = appearances[pid]
                        if event["kind"] == "new" or date <= old_date or pick["why_now"] == old_reason:
                            raise ValueError(f"{pid}: repeat feature requires a newer substantive event")
                    appearances[pid] = (date, pick["why_now"])
                connections = pick["connections"]
                if not isinstance(connections, list) or not connections:
                    raise ValueError(f"{pid}: add a reading connection")
                linked = set()
                for connection in connections:
                    if not isinstance(connection, dict) or set(connection) != {"paper_id", "short_name", "why"}:
                        raise ValueError(f"{pid}: invalid reading connection")
                    cid = connection["paper_id"]
                    if cid not in paper_ids or cid == pid or cid in linked or any(not isinstance(connection[k], str) or not connection[k].strip() for k in ("short_name", "why")):
                        raise ValueError(f"{pid}: invalid reading connection")
                    linked.add(cid)
            if not isinstance(issue["corrections"], list):
                raise ValueError("corrections must be a list")
            last = published
            for correction in issue["corrections"]:
                if not isinstance(correction, dict) or set(correction) != {"date", "note", "sources"}:
                    raise ValueError("invalid correction")
                date = day(correction["date"])
                if not last <= date <= now or not isinstance(correction["note"], str) or not correction["note"].strip():
                    raise ValueError("correction needs a dated explanation after publication")
                if not isinstance(correction["sources"], list) or not correction["sources"] or not all(public_url(u) for u in correction["sources"]):
                    raise ValueError("correction needs primary sources")
                last = date
        except (ValueError, KeyError, TypeError, AttributeError) as exc:
            errors.append(f"{label}: {exc}")
    return errors


def validate_history(issues, previous):
    """Original editions stay intact; corrections may only be appended."""
    current = {x["week_start"]: x for x in issues}
    errors = []
    for old in previous:
        key = old["week_start"]
        new = current.get(key)
        if new is None or any(new.get(k) != v for k, v in old.items() if k != "corrections"):
            errors.append(f"{key}: published issue body is immutable; append a dated correction")
        elif new["corrections"][:len(old["corrections"])] != old["corrections"]:
            errors.append(f"{key}: existing corrections must be preserved")
    return errors


def committed_issues(root=ROOT):
    """Use the fetched main branch locally; shallow CI may have only HEAD."""
    for ref in ("origin/main", "HEAD"):
        result = subprocess.run(["git", "ls-tree", "-r", "--name-only", ref, "--", "data/weekly/"],
                                cwd=root, capture_output=True, text=True)
        if result.returncode == 0:
            return [json.loads(subprocess.check_output(["git", "show", f"{ref}:{name}"], cwd=root, text=True))
                    for name in result.stdout.splitlines() if name.endswith(".json")]
    return []


def source_urls(issues):
    urls = set()
    for issue in issues:
        for pick in entries(issue):
            urls.add(pick["citation"]["url"])
            urls.update(s["url"] for s in pick["citation"]["reviewed_sources"])
            if pick["event"]:
                urls.add(pick["event"]["source"])
        for correction in issue["corrections"]:
            urls.update(correction["sources"])
    return urls


def md(value):
    value = html.escape(str(value), quote=False).replace("\n", " ")
    value = re.sub(r"([\\`*_{}\[\]#|~])", r"\\\1", value)
    value = re.sub(r"^([+-])(?=\s)", r"\\\1", value)
    return re.sub(r"^(\d+)\.(?=\s)", r"\1\\.", value)


def url(value):
    return quote(value, safe=":/?&=#%+@;,-._~")


def period(issue):
    return f"{issue['week_start']}–{issue['week_end']}"


def render_pick(pick, heading):
    c = pick["citation"]
    anchor = f"pick-{heading}" if heading.isdigit() else "older-paper"
    out = [f'<a id="{anchor}"></a>', "", f"## {heading} — {md(c['short_name'])}", "",
           f"**{md(c['title'])}**", "",
           f"{c['date']} · {c['status']} · selected full-text review {c['checked']}", "",
           f"[Primary paper]({url(c['url'])}) · [Catalog notes](../papers.md#{pick['paper_id']})", ""]
    if pick["event"]:
        e = pick["event"]
        out += [f"**This week's event:** {EVENTS[e['kind']]} · {e['date']} (Australia/Sydney) · [Record]({url(e['source'])})", ""]
    for key, label in (("why_now", "Why read it now"), ("problem", "Problem"), ("mechanism", "What changes"),
                       ("evidence", "Evidence"), ("limitation", "Boundary")):
        out += [f"**{label}.** {md(pick[key])}", ""]
    related = " · ".join(f"[{md(c['short_name'])}](../papers.md#{c['paper_id']}) — {md(c['why'])}" for c in pick["connections"])
    out += [f"**Read next.** {related}", ""]
    out += ["**Inspected sources:** " + " · ".join(f"[{md(s['version'])}]({url(s['url'])}) ({md(s['sections'])})" for s in c["reviewed_sources"]), ""]
    return out


def render_issue(issue):
    out = ["<!-- Generated by scripts/render.py. Edit the corresponding data/weekly record. -->", "",
           "# Top Papers of the Week", "", f"## {md(issue['title'])}", "",
           f"**Week:** {period(issue)} (Australia/Sydney) · **Published:** {issue['published_on']}", "",
           "[Weekly archive](README.md) · [Collection overview](../../README.md) · [Research catalog](../papers.md)", "",
           md(issue["introduction"]), "",
           "These are editorial reading picks, not a performance leaderboard. Results are author-reported; selected source sections were reviewed, and no research code was executed.", ""]
    if issue["corrections"]:
        out += ["## Dated corrections", ""]
        for c in issue["corrections"]:
            sources = " · ".join(f"[Source {i+1}]({url(u)})" for i, u in enumerate(c["sources"]))
            out += [f"- **{c['date']}:** {md(c['note'])} {sources}", ""]
    for i, pick in enumerate(issue["picks"], 1):
        out += render_pick(pick, str(i))
    if issue["older_paper"]:
        out += render_pick(issue["older_paper"], "Older-paper spotlight")
    out += ["## A question to investigate", "", md(issue["study_question"]), ""]
    return "\n".join(out)


def generate_weekly(issues):
    ordered = sorted(issues, key=lambda x: x["week_start"], reverse=True)
    archive = ["<!-- Generated by scripts/render.py. Edit data/weekly/. -->", "",
               "# Top Papers of the Week", "", "[Collection overview](../../README.md) · [Research catalog](../papers.md)", "",
               "A weekly reading guide to agents that learn. New papers and substantive updates form the main picks; older discoveries are explicitly labeled. Short issues are welcome. No issue is created solely to fill a quiet week.", "",
               "| Covered week (Australia/Sydney) | Issue | Picks |", "| --- | --- | --- |"]
    for issue in ordered:
        archive.append(f"| {period(issue)} | [{md(issue['title'])}]({issue['week_start']}.md) | {len(issue['picks'])} |")
    outputs = {"docs/weekly/README.md": "\n".join(archive) + "\n"}
    outputs.update({f"docs/weekly/{i['week_start']}.md": render_issue(i) for i in ordered})
    teaser = ["## Top Papers of the Week", ""]
    if ordered:
        latest = ordered[0]
        path = f"docs/weekly/{latest['week_start']}.md"
        teaser += [f"**Latest issue: [{period(latest)}]({path})** — {md(latest['title'])}", "",
                   md(latest["takeaway"]), ""]
        for i, p in enumerate(latest["picks"][:3], 1):
            teaser.append(f"- [{md(p['citation']['short_name'])}]({path}#pick-{i})")
        teaser += ["", f"[Read the issue]({path}) · [Browse the weekly archive](docs/weekly/README.md)"]
    else:
        teaser += ["[Browse the weekly archive](docs/weekly/README.md). The first issue is being prepared."]
    return outputs, "\n".join(teaser)


def next_due(issues, state=None, today=None):
    """Return one oldest outstanding completed week; never mark publication."""
    now = local_day(today)
    current_monday = now - dt.timedelta(days=now.weekday())
    by_week = {i["week_start"]: i for i in issues}
    weeks = (state or {}).get("weeks", {})
    cursor = START_WEEK
    while cursor < current_monday:
        key = cursor.isoformat()
        record = weeks.get(key, {})
        status = record.get("status")
        if status == "published":
            if key not in by_week or not re.fullmatch(r"[0-9a-f]{40}", record.get("commit", "")) or not public_url(record.get("workflow")):
                raise ValueError(f"{key}: published state lacks an issue or verification record")
            if not day(by_week[key]["published_on"]) <= day(record.get("verified_on")) <= now:
                raise ValueError(f"{key}: invalid publication verification date")
        elif key in by_week:
            return {"week_start": key, "week_end": (cursor + dt.timedelta(days=6)).isoformat(), "action": "verify-publication"}
        elif status == "quiet":
            if record.get("adequate_review") is not True or not record.get("reason") or not cursor + dt.timedelta(days=7) <= day(record.get("reviewed_on")) <= now:
                raise ValueError(f"{key}: quiet week requires completed review and a reason")
        else:
            return {"week_start": key, "week_end": (cursor + dt.timedelta(days=6)).isoformat(), "action": "draft"}
        cursor += dt.timedelta(days=7)
    return {"action": "none"}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--next", action="store_true", required=True, help="Report one due issue without writing files")
    parser.add_argument("--today", type=day, help="Calendar date in Australia/Sydney, for dry runs")
    parser.add_argument("--state", type=Path, default=ROOT / "local-notes" / "weekly-state.json")
    args = parser.parse_args()
    state = json.loads(args.state.read_text()) if args.state.exists() else {}
    issues = load_issues()
    errors = validate_issues(issues, load(), args.today)
    if errors:
        raise SystemExit("\n".join(errors))
    print(json.dumps(next_due(issues, state, args.today), indent=2))


if __name__ == "__main__":
    main()
