"""Search the local annotated catalog without dependencies or model calls."""
import argparse
import json
from catalog import load, sort_key


def select(records, query="", topic=None, target=None, scope=None, kind=None):
    words = query.casefold().split()
    selected = [r for r in records if all(w in json.dumps(r, ensure_ascii=False).casefold() for w in words) and (not topic or topic in r["topics"]) and (not target or target in r["update_targets"]) and (not scope or scope == r["scope"]) and (not kind or kind == r.get("kind", "system"))]
    papers = sorted([r for r in selected if "kind" in r], key=sort_key, reverse=True)
    systems = sorted([r for r in selected if "kind" not in r], key=lambda r: r["name"].casefold())
    return papers + systems


def main():
    meta = load("collection.json")
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("query", nargs="?", default="")
    parser.add_argument("--topic", choices=meta["topics"])
    parser.add_argument("--target", choices=meta["update_targets"])
    parser.add_argument("--scope", choices=["core", "adjacent"])
    parser.add_argument("--kind", choices=["paper", "survey", "benchmark", "system"])
    parser.add_argument("--format", choices=["text", "json"], default="text")
    args = parser.parse_args()
    results = select(load() + load("systems.json"), args.query, args.topic, args.target, args.scope, args.kind)
    if args.format == "json":
        print(json.dumps(results, indent=2, ensure_ascii=False))
    else:
        for r in results:
            date = r.get("date") or f"System inspected {r['checked']}"
            print(f"{date} | {r['id']} | {r.get('title') or r['name']}\n  {r['url']}\n  {r['mechanism']}\n  Boundary: {r['limitations']}\n")
        print(f"{len(results)} matching resources.")


if __name__ == "__main__":
    main()
