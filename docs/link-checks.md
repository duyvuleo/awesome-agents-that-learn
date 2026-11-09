# Public source checks

[Overview](../README.md) · [Machine-readable report](link-report.json)

The report records public HTTP requests for catalog and weekly-edition sources and, for canonical arXiv abstract URLs, comparison of the page's citation title with the catalog title. It includes final redirect URLs and access failures. The scientific annotations were reviewed separately; HTTP success is not a scientific verification or a runnable-code check.

Latest paper-and-systems pass (2026-11-09): **708 source URLs checked; 662 reachable, 9 restricted/transient responses, and 37 inconclusive requests**. No 404/410 response or arXiv title-review flag was found. All pilot weekly-edition sources and all three sources added in the twenty-fourth detailed-review batch were reachable, and 179 canonical arXiv titles matched. The TMLR OpenReview record remains access-restricted; its title, authors and January 2026 publication were reconfirmed from the official TMLR index in the preceding review. The report includes the systems' official documentation/license sources and an exact UTC timestamp.

Restricted sources include OpenReview PDFs for Voyager, Large Language Models as Tool Makers, and STOP, the Self-Evolving Agents survey OpenReview record, plus five Nature URL variants that redirected to cookie-error pages despite HTTP 200. The checker now recognizes those query-based access gates automatically; this includes an already-listed cookie-error URL. Their status remains access-restricted/inconclusive rather than “dead.” Publication evidence includes indexed primary PDF content and author records as described in [review notes](review-log.md). No access restriction was bypassed.

All GitHub source URLs were reachable in this pass. Earlier same-day gateway failures were individually checked through the public GitHub API, covering 159 source URLs; the earlier observations remain in Git history. Those transient failures did not establish permanent source loss. HTTP/API availability does not establish paper-version equivalence or reproduction.

The 37 inconclusive requests concern unchanged COLM, ICLR and NeurIPS proceedings sources with historical publication evidence and unchanged access failures in the preceding pass. Each was matched to its existing catalog record; selected independent page reads returned either primary content or further timeouts. Their historical publication evidence is retained, and no inaccessible source was relabeled as dead.

Run a new check with:

```bash
python3 scripts/check_links.py --output docs/link-report.json
```

`reachable` means an HTTP request succeeded at the stated time. `restricted-or-transient` and `inconclusive` require follow-up. `not-found` flags an HTTP 404/410 response for review, not proof of permanent disappearance. A title `match` uses normalized similarity to tolerate typography; curator review still checks identity, versions, and publication title variants.
