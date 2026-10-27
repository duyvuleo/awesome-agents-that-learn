# Maintaining the collection

[Overview](../README.md) · [Contributing](../CONTRIBUTING.md) · [Data reference](../data/README.md)

The launch is a reviewed snapshot. Maintenance happens on request or through reviewed pull requests; no scheduled autonomous literature or publication job is configured.

## A useful update pass

1. Search a bounded date window for each mechanism, then follow citations from recent primary surveys. Revisit older foundational work when new evidence changes its interpretation.
2. Triage leads against the scope. A generic agent framework or a new leaderboard score is not automatically a learning method.
3. Open the primary source, verify identity and version, then inspect the mechanism and evaluation before writing strong claims. Keep incomplete leads in the search log.
4. Check publication and artifact status separately. Update an existing record when its paper is published under a different title.
5. Edit the appropriate canonical catalog (`data/papers.json` or `data/systems.json`), regenerate views, and review the resulting diff. For software, re-check license sources, requirements, and the paper relationship; do not turn the inspection date into a release date. Preserve first-public dates, separate them from review dates, and document material corrections.
6. Run the offline checks below and source checks for new links. Inspect desktop/mobile rendering for UI changes. Publish only reviewed content to the authorized repository.

```bash
python3 scripts/render.py
python3 scripts/validate.py
python3 scripts/render.py --check
python3 -m unittest discover -s tests
python3 scripts/check_links.py --output docs/link-report.json
```

`check_links.py` makes public GET requests, records redirects and access failures, and compares arXiv primary titles. It sends no authentication and executes no remote code. Its report is diagnostic: inspect every `not-found`, title `review`, or `inconclusive` result. A blocked request is not evidence of a dead resource. For title changes, preserve the identity and explain the version difference.

## Local use

Open `site/index.html` directly in a browser. The generated `catalog.js` allows offline use without a server. To inspect over HTTP:

```bash
python3 -m http.server 8000 --directory site
```

Then open http://localhost:8000. Filters, reading routes, and the table/cards view are encoded in the URL; export retains the full selected annotations. No external fonts, analytics, model APIs, or application backend are needed.

## GitHub checks and Pages

The repository workflow runs the offline validator, generator consistency check, unit tests, and JavaScript syntax check. Successful pushes to `main` publish the static `site/` directory to GitHub Pages. Pull requests validate without deploying. Workflow actions are pinned to commits resolved during setup. Network source checks remain manual so transient publisher restrictions do not masquerade as catalog failures.

An automated check passing means the repository is internally consistent. Source review remains necessary, and published performance claims are not independently reproduced by this workflow.
