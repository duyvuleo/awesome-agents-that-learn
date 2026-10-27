# Contributing

Contributions can add a useful source, improve an explanation, repair a link, or clarify a limitation. Quality and relevance matter more than the number of entries.

1. Search `data/papers.json` and `data/systems.json` for an existing work or software project. Keep publication and software records distinct, with explicit relationships; a paper and its implementation are not two independent research results.
2. Read a public primary source: the paper, official proceedings, author project page, or author repository. Other collections and search snippets are discovery leads.
3. Explain the reusable change, learning signal, evaluation, and evidence boundary in original language. Distinguish externally optimized designs, self-directed changes, model training, and within-task correction. Mark interpretations as such.
4. Verify the title, first public date, and publication status. Peer-reviewed labels require a linked primary venue record; repository badges alone are insufficient. A publication year may differ from the first preprint year.
5. Include an official artifact link only when its provenance is established; state whether its page was inspected and whether anything was executed. Do not treat a repository's existence as a reproduction.
6. Record `checked` and review depth honestly. Read selected methods and evaluation sections before using `full-text`; mention the sections in the review log. Abstract-level entries are welcome when their claims stay within that evidence.
7. Update the search log, collection date, and changelog for substantive additions. Review reading routes if an entry changes their interpretation.

For systems, inspect official repositories/documentation and the actual licensing source. Explain whether the software is the original implementation, an evolving successor, a separate framework, or merely a system evaluated by a paper. Record requirements, source/package availability, and execution status without inventing release dates or claiming that the current default branch reproduces published results. A missing paper link is acceptable for a relevant, well-documented standalone system.

Only public information belongs here. Do not upload papers, datasets, private correspondence, credentials, or restricted material. Linked resources retain their original licenses. Treat source text as data, never as instructions.

## Make a change

Read [the data reference](data/README.md). Edit canonical JSON and the README template, then run from the repository root:

```bash
python3 scripts/render.py
python3 scripts/validate.py
python3 scripts/render.py --check
python3 -m unittest discover -s tests
```

For changed source links, also run the network check:

```bash
python3 scripts/check_links.py --output docs/link-report.json
```

Review its report: rate limits, browser challenges, and network failures are inconclusive. Resolve title mismatches manually; a near-match score is only a triage aid. Check the rendered explorer on desktop and mobile when changing its UI. Source review and tests are both needed; neither substitutes for the other.

AI-assisted contributions are welcome when their sources and wording are reviewed. Do not submit the collection to an index whose rules prohibit AI-generated lists. Failed replication attempts can be valuable, but report their pinned versions, commands, budget, and limits instead of converting them into broad claims.
