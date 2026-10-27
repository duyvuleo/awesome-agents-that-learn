"""Validate catalog, reading routes, and local Markdown navigation offline."""
from __future__ import annotations

import re
from urllib.parse import unquote, urlsplit
from catalog import ROOT, load, validate_records, validate_systems


def anchors(text):
    found = set(re.findall(r'<a id="([^"]+)"', text))
    for heading in re.findall(r"^#{1,6} (.+)$", text, re.M):
        heading = re.sub(r"\[([^]]+)\]\([^)]+\)", r"\1", heading)
        found.add(re.sub(r"[^\w\- ]", "", heading.lower()).replace(" ", "-"))
    return found


def validate_links(root=ROOT):
    errors = []
    paths = [root / "README.md", *sorted((root / "docs").glob("*.md")), root / "CONTRIBUTING.md", root / "data" / "README.md"]
    for source in paths:
        if not source.exists():
            errors.append(f"missing {source.relative_to(root)}")
            continue
        text = source.read_text(encoding="utf-8")
        for target in re.findall(r"(?<!!)\[[^\]]*\]\(([^\s)]+)\)", text):
            parts = urlsplit(target)
            if parts.scheme or parts.netloc:
                continue
            dest = (source.parent / unquote(parts.path)).resolve() if parts.path else source
            if not dest.is_relative_to(root.resolve()):
                errors.append(f"{source.name}: link escapes repository: {target}")
            elif not dest.exists():
                errors.append(f"{source.name}: missing {target}")
            elif parts.fragment and dest.suffix == ".md" and unquote(parts.fragment) not in anchors(dest.read_text(encoding="utf-8")):
                errors.append(f"{source.name}: missing anchor {target}")
    return errors


def main():
    records, meta, routes = load(), load("collection.json"), load("routes.json")
    systems = load("systems.json")
    errors = validate_records(records, meta) + validate_systems(systems, meta, records)
    ids = {r["id"] for r in records}
    route_ids = set()
    for route in routes:
        if route["id"] in route_ids:
            errors.append(f"duplicate route {route['id']}")
        route_ids.add(route["id"])
        if not route["steps"]:
            errors.append(f"empty route {route['id']}")
        for step in route["steps"]:
            if step["paper"] not in ids or not step["why"].strip():
                errors.append(f"{route['id']}: invalid step {step}")
    errors.extend(validate_links())
    if errors:
        raise SystemExit("\n".join(errors))
    print(f"Validated {len(records)} works, {len(systems)} systems, {len(routes)} routes, metadata, and local Markdown links.")


if __name__ == "__main__":
    main()
