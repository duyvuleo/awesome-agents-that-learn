<picture>
  <img src="assets/banner.svg" alt="Agents that learn: experience, update, evaluate, retain" width="1280" height="360">
</picture>

# Awesome Agents That Learn

{{BADGES}}

**A research guide to self-learning, self-improving, and self-evolving AI agents.**

How do agents turn experience into something useful on the next task? This collection follows the research from reflection and reusable memories to learned skills, agent redesign, self-play, and model updates. Each work explains **what changes, what drives the change, and what evidence supports improvement**.

[Explore the collection](https://duyvuleo.github.io/awesome-agents-that-learn/) · [Start reading](docs/reading-routes.md) · [Browse papers](docs/papers.md) · [Compare systems](docs/systems.md) · [Compare benchmarks](docs/benchmarks.md)

{{STATS}}

Source review: **{{UPDATED}}**. {{DEPTH}} No linked research code was executed and no published result was independently reproduced for this release.

## Start here

1. Read the [short primer](docs/primer.md) to separate within-task correction from persistent learning.
2. Choose a [reading route](docs/reading-routes.md) and compare mechanisms, rather than reading by date alone.
3. Use the [evaluation guide](docs/evaluation-guide.md) to ask whether gains survive new tasks, a fair baseline, and a fixed budget.
4. Keep your own notes with the [study template](docs/study-template.md).
5. Compare [systems and frameworks](docs/systems.md) by capabilities, requirements, license, and paper relationship before choosing an implementation to study.

## Choose a reading route

| Your question | Route |
| --- | --- |
| What makes an agent a learner? | [Foundations and boundaries](docs/reading-routes.md#foundations) |
| How does experience become reusable knowledge or a skill? | [Memory and skills](docs/reading-routes.md#memory-skills) |
| Can an agent’s prompts and workflow improve? | [Agent design and optimization](docs/reading-routes.md#agent-design) |
| Where do self-generated training signals come from? | [Learning in model weights](docs/reading-routes.md#model-learning) |
| Can agents generate their own curriculum? | [Self-play and curricula](docs/reading-routes.md#self-play) |
| What does it mean to improve the improver? | [Recursive improvement](docs/reading-routes.md#recursive-improvement) |
| How can we tell whether learning actually helped? | [Evaluation and failure modes](docs/reading-routes.md#evaluation) |
| Does learning persist without forgetting or drift? | [Continual learning](docs/reading-routes.md#continual-learning) |
| What software can I inspect or build on? | [Systems and frameworks](docs/systems.md), with availability and version notes |

## A few entry points

These are complementary starting points, not a leaderboard. Their tasks, feedback, and budgets differ.

{{FEATURED}}

## Browse the research

- [All annotated works](docs/papers.md), [by topic](docs/topics.md), or [by year](docs/by-year.md).
- [Benchmark comparison](docs/benchmarks.md) and [official code/data links](docs/code.md).
- [Systems and frameworks](docs/systems.md): research implementations, optimization frameworks, memory libraries, training frameworks, and agent applications.
- [Search method, coverage, and unresolved leads](docs/search-log.md).
- [Paper-review notes](docs/review-log.md), [systems-review notes](docs/systems-review.md), and [link-check results](docs/link-checks.md).
- [Related collections](docs/related-collections.md).

The [interactive explorer](https://duyvuleo.github.io/awesome-agents-that-learn/) includes a clickable research-theme word cloud, an interactive resource–topic graph, search, reading routes, evidence filters, and JSON export. Use the Systems navigation or resource-type filter to browse software. Visual links represent topic memberships, not citations or measured similarity; paper and software nodes can belong to the same research program. See the [explorer guide](docs/explorer.md) for interaction and count semantics. Its entries come from the same catalogs as these Markdown pages. You can also open `site/index.html` locally; it needs no account, API key, or server.

## Scope and evidence

The focus is modern language-model-based agents that retain or change a reusable part of their behavior, plus evaluation of that process. We include both externally optimized agent systems and agents that direct their own updates; the annotations explain who or what performs the optimization.

**Core** works directly study persistent agent learning, reusable agent optimization, or its evaluation. **Adjacent** works supply necessary foundations, comparisons, or failure analyses: ordinary tool use, within-task correction, factual memory, and model-only training do not automatically establish a self-evolving agent.

`preprint`, `peer-reviewed`, and `technical-report` describe the inspected publication record, not its scientific quality. Venue notes retain author-reported publication claims when a venue record could not be inspected. `abstract` and `full-text` describe review depth; full-text means selected relevant sections, not exhaustive review. Missing code links mean availability was not verified in this pass. Curator interpretations are marked separately from reported findings.

This is a maintained learning collection with documented coverage limits. It is not an exhaustive survey or a ranking of systems.

Systems are counted separately from research works. Their annotations describe inspected official sources, with requirements, license pointers, paper relationships, and version boundaries. Source availability does not establish successful installation, deployment readiness, or reproduction of a paper's scores. No release dates are inferred from inspection dates.

## Use and contribute

Search offline with Python 3.10 or newer; no third-party packages are required:

```bash
python3 scripts/explore.py "memory" --scope core
python3 scripts/explore.py --kind benchmark --format json
python3 scripts/explore.py --target agent-code
python3 scripts/explore.py --kind system --format json
```

Suggest a paper or system, correct an annotation, or contribute a reading note through an issue or pull request. Read [CONTRIBUTING.md](CONTRIBUTING.md) for source requirements and [maintenance](docs/maintenance.md) for validation commands. Canonical records live in [data/papers.json](data/papers.json) and [data/systems.json](data/systems.json); generated pages should not be edited directly.

This collection is AI-assisted and maintainer-owned. Automated validation checks structure and consistency; it does not establish scientific truth. No recurring autonomous update job is configured.

Badge counts come from the canonical catalogs. Benchmark papers are a subset of research works, and systems can implement those same works; these counts are not additive independent research results. The Awesome badge identifies the collection format, not acceptance into a central index. The validation badge reports repository checks, not scientific reproduction.

## Companion collections

- [Awesome Reliable Text-to-SQL](https://github.com/duyvuleo/awesome-reliable-text-to-sql)
- [Awesome AI Co-Scientist](https://github.com/duyvuleo/awesome-ai-co-scientist)

## License

Original annotations, catalog data, and maintenance code are dedicated under [CC0 1.0](LICENSE). Linked papers, software, and datasets retain their own terms. This repository does not redistribute papers or research datasets. Cite the original papers for scientific claims; use [CITATION.cff](CITATION.cff) and a commit when referencing the collection.
