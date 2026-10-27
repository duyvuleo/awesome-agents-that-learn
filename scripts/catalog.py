"""Shared catalog loading, identity, and validation; Python standard library only."""
from __future__ import annotations

import datetime as dt
import json
import re
from pathlib import Path
from urllib.parse import urlsplit, unquote, parse_qs

ROOT = Path(__file__).resolve().parents[1]


def load(name="papers.json"):
    return json.loads((ROOT / "data" / name).read_text(encoding="utf-8"))


def identity(url):
    parts = urlsplit(url)
    host = parts.netloc.lower()
    path = unquote(parts.path).rstrip("/")
    if host in {"arxiv.org", "export.arxiv.org"}:
        match = re.search(r"/(?:abs|pdf|html)/(\d{4}\.\d{4,5})(?:v\d+)?(?:\.pdf)?$", path)
        if match:
            return "arxiv:" + match[1]
    if host == "doi.org":
        return "doi:" + path.lower().lstrip("/")
    if host == "openreview.net" and parse_qs(parts.query).get("id"):
        return "openreview:" + parse_qs(parts.query)["id"][0]
    if host == "github.com":
        return host + path.removesuffix(".git").lower()
    return host + path


def sort_key(record):
    return (record["year"], len(record["date"]) == 10, record["date"], record["id"])


def validate_records(records, meta):
    errors, ids, primary_ids = [], set(), set()
    required = {"id", "title", "date", "year", "kind", "status", "venue", "url", "sources", "code_url", "code_note", "topics", "scope", "update_targets", "persistence", "learning_signal", "mechanism", "evaluation", "limitations", "review_depth", "checked"}
    enums = {
        "kind": {"paper", "survey", "benchmark"},
        "status": {"preprint", "peer-reviewed", "technical-report"},
        "scope": {"core", "adjacent"},
        "persistence": {"across-tasks", "within-task", "both", "not-applicable"},
        "review_depth": {"abstract", "full-text", "project"},
    }
    for i, r in enumerate(records):
        label = r.get("id", f"record {i}")
        missing = required - r.keys()
        if missing:
            errors.append(f"{label}: missing {sorted(missing)}")
            continue
        if not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", label):
            errors.append(f"{label}: invalid id")
        if label in ids:
            errors.append(f"{label}: duplicate id")
        ids.add(label)
        key = identity(r["url"])
        if key in primary_ids:
            errors.append(f"{label}: duplicate primary work {key}")
        primary_ids.add(key)
        for field, values in enums.items():
            if r[field] not in values:
                errors.append(f"{label}: invalid {field}: {r[field]}")
        for field in ["title", "code_note", "learning_signal", "mechanism", "evaluation", "limitations"]:
            if not isinstance(r[field], str) or not r[field].strip():
                errors.append(f"{label}: empty {field}")
        for field, allowed in [("topics", meta["topics"]), ("update_targets", meta["update_targets"])]:
            if not isinstance(r[field], list) or not r[field] or len(set(r[field])) != len(r[field]) or set(r[field]) - set(allowed):
                errors.append(f"{label}: invalid {field}")
        if not isinstance(r["sources"], list) or not r["sources"] or r["url"] not in r["sources"]:
            errors.append(f"{label}: primary URL must be in sources")
        urls = [r["url"], *r["sources"]] + ([r["code_url"]] if r["code_url"] else [])
        for url in urls:
            parsed = urlsplit(url)
            if parsed.scheme != "https" or not parsed.hostname or parsed.username or parsed.password:
                errors.append(f"{label}: invalid public HTTPS URL")
        if r["code_url"] and r["code_url"] not in r["sources"]:
            errors.append(f"{label}: code URL must have been inspected and listed in sources")
        if r["status"] == "peer-reviewed" and not r["venue"]:
            errors.append(f"{label}: peer review needs venue")
        try:
            if not re.fullmatch(r"\d{4}(?:-\d{2}-\d{2})?", r["date"]):
                raise ValueError("unsupported precision")
            dated = dt.date.fromisoformat(r["date"] if len(r["date"]) == 10 else r["date"] + "-01-01")
            checked = dt.date.fromisoformat(r["checked"])
            if dated.year != r["year"] or dated > checked or checked > dt.date.fromisoformat(meta["updated"]):
                raise ValueError("inconsistent date")
        except (TypeError, ValueError) as exc:
            errors.append(f"{label}: {exc}")
    return errors
