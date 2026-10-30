# Public source checks

[Overview](../README.md) · [Machine-readable report](link-report.json)

The report records public HTTP requests and, for canonical arXiv abstract URLs, comparison of the page's citation title with the catalog title. It includes final redirect URLs and access failures. The scientific annotations were reviewed separately; HTTP success is not a scientific verification or a runnable-code check.

Latest paper-and-systems pass (2026-10-31): **419 source URLs checked; 411 reachable and 8 restricted responses**. No 404/410 response or arXiv title-review flag was found. The report includes the systems' official documentation/license sources and an exact UTC timestamp. HTTP success describes transport access; known challenge/login redirects are classified as restricted.

Restricted sources include OpenReview PDFs for Voyager, Large Language Models as Tool Makers, and STOP, plus five Nature URL variants that redirected to cookie-error pages despite HTTP 200. The checker now recognizes those query-based access gates automatically; this includes an already-listed cookie-error URL. Their status remains access-restricted/inconclusive rather than “dead.” Publication evidence includes indexed primary PDF content and author records as described in [review notes](review-log.md). No access restriction was bypassed.

Run a new check with:

```bash
python3 scripts/check_links.py --output docs/link-report.json
```

`reachable` means an HTTP request succeeded at the stated time. `restricted-or-transient` and `inconclusive` require follow-up. `not-found` flags an HTTP 404/410 response for review, not proof of permanent disappearance. A title `match` uses normalized similarity to tolerate typography; curator review still checks identity, versions, and publication title variants.
