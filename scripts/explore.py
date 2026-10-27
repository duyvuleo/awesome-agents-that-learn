"""Search the local annotated catalog without dependencies or model calls."""
import argparse
import json
from catalog import load, sort_key


def select(records, query="", topic=None, target=None, scope=None, kind=None):
    words = query.casefold().split()
    return sorted([r for r in records if all(w in json.dumps(r, ensure_ascii=False).casefold() for w in words) and (not topic or topic in r["topics"]) and (not target or target in r["update_targets"]) and (not scope or scope == r["scope"]) and (not kind or kind == r["kind"])], key=sort_key, reverse=True)


def main():
    meta = load("collection.json")
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("query", nargs="?", default="")
    parser.add_argument("--topic", choices=meta["topics"])
    parser.add_argument("--target", choices=meta["update_targets"])
    parser.add_argument("--scope", choices=["core", "adjacent"])
    parser.add_argument("--kind", choices=["paper", "survey", "benchmark"])
    parser.add_argument("--format", choices=["text", "json"], default="text")
    args = parser.parse_args()
    results = select(load(), args.query, args.topic, args.target, args.scope, args.kind)
    if args.format == "json":
        print(json.dumps(results, indent=2, ensure_ascii=False))
    else:
        for r in results:
            print(f"{r['date']} | {r['id']} | {r['title']}\n  {r['url']}\n  {r['mechanism']}\n  Boundary: {r['limitations']}\n")
        print(f"{len(results)} matching works.")


if __name__ == "__main__":
    main()
