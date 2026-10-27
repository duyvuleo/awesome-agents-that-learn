# Public source checks

[Overview](../README.md) · [Machine-readable report](link-report.json)

The report records public HTTP requests and, for canonical arXiv abstract URLs, comparison of the page's citation title with the catalog title. It includes final redirect URLs and access failures. The scientific annotations were reviewed separately; HTTP success is not a scientific verification or a runnable-code check.

Final pre-publication pass: **193 source URLs checked; 190 reachable and 3 restricted responses**. No 404/410 response or arXiv title-review flag was found. See the report for the exact UTC timestamp and final redirect URLs. HTTP success describes transport access; known challenge/login redirects are classified as restricted.

The restricted sources were OpenReview PDFs for Voyager, Large Language Models as Tool Makers, and STOP. Their status remains access-restricted/inconclusive rather than “dead.” Publication evidence includes indexed primary PDF content and author records as described in [review notes](review-log.md). No access restriction was bypassed.

Run a new check with:

```bash
python3 scripts/check_links.py --output docs/link-report.json
```

`reachable` means an HTTP request succeeded at the stated time. `restricted-or-transient` and `inconclusive` require follow-up. `not-found` flags an HTTP 404/410 response for review, not proof of permanent disappearance. A title `match` uses normalized similarity to tolerate typography; curator review still checks identity, versions, and publication title variants.
