# Catalog data

[Overview](../README.md) · [Contributing](../CONTRIBUTING.md)

`papers.json` is the canonical array of unique research works. `collection.json` defines the controlled vocabulary and review date. `routes.json` contains ordered learning paths. The renderer generates Markdown indexes and the explorer's JavaScript/JSON payload; the copies in `site/` are generated views.

| Field | Meaning |
| --- | --- |
| `id`, `title` | Stable local identifier and primary-source title. Published title variants are explained in the review log. |
| `date`, `year` | First linked preprint submission when available; otherwise the publication date at its verified precision. A year alone is deliberate. Venue status may be later. |
| `kind` | `paper`, `survey`, or `benchmark`; categories are exclusive for counting. A method-and-benchmark paper is assigned its most useful primary role. |
| `status`, `venue` | Verified source status. `preprint` means the inspected record is a preprint and an independent venue check was not completed; it does not assert the work has never been published. Venue notes explicitly preserve uncertain author claims. |
| `url`, `sources` | Canonical primary URL and the public primary sources supporting the record. Some source access is restricted; inspection and failed-fetch details are retained in notes. |
| `code_url`, `code_note` | Official artifact URL or null, with the actual inspection boundary. A null is an unknown, not a claim of no release. No code was executed for the launch. |
| `topics` | Curated multi-label research themes. Topic counts overlap. |
| `scope` | `core` directly studies agent learning/optimization or its evaluation; `adjacent` supports interpretation without demonstrating the central capability. |
| `update_targets` | Components changed by a method or examined by a benchmark; `none` for analyses and methods with no retained update. |
| `persistence` | `within-task`, `across-tasks`, `both`, or `not-applicable`. For benchmarks this describes the evaluated protocol. For surveys/analyses it is usually not applicable. |
| `learning_signal` | Feedback, rewards, demonstrations, observations, or other information that drives the update; not a claim that all signals are independently correct. |
| `mechanism` | Original account of what the method does. |
| `evaluation` | What the source reports testing. All results remain author-reported unless explicitly stated otherwise. |
| `limitations` | Source-supported bounds and clearly labeled curator interpretations. |
| `review_depth` | `abstract` (including primary metadata), `full-text` (selected relevant sections), or `project` (official project documentation). None means reproduction. |
| `checked` | Source-review date, not execution date or certification. |

The `core`/`adjacent` and topic labels are curation judgments. They do not grade paper quality or impose a universal taxonomy. “Self-improving,” “self-evolving,” and “self-learning” overlap in the literature.

Each route contains `id`, `title`, `question`, an ordered `steps` array of paper IDs and reasons, and an optional-to-perform study `exercise`. Exercises are proposed learning activities, not executed results.

## Validation and reuse

The validator checks identifiers, date consistency, controlled vocabularies, HTTPS URLs, required evidence fields, route references, and local navigation. arXiv URL variants and OpenReview forum/PDF identifiers normalize to one identity; no cross-publisher equivalence is inferred without evidence. Public link checks separately inspect reachability and arXiv title similarity. Neither check proves the annotation is scientifically correct.

Dates sort newest first. Within a year, fully dated records precede year-only records; year-only entries are not assigned an invented month. Preserve source URLs, review depth, inspection dates, and limitations in exports. The CLI's JSON export and browser export retain complete records.

## Systems catalog (schema version 2)

`systems.json` is a separate array of software projects, not publications. The explorer payload keeps `papers` and `systems` in separate arrays. An implementation and its paper can represent the same research program; aggregate resource counts are not counts of independent findings.

| System field | Meaning |
| --- | --- |
| `id`, `name`, `category` | Globally unique `system-` ID, project name, and category from `collection.json`. |
| `url`, `docs_url` | Official repository and optional official documentation. |
| `related_papers`, `relationship_note` | Existing paper IDs and the actual relationship: implementation, successor, evaluated system, or methodological connection. An empty list does not mean there is no paper anywhere. |
| `capabilities`, `mechanism`, `learning_signal` | Concrete documented features and the mechanism that changes reusable state. External optimization and user-triggered workflows are stated explicitly. |
| `topics`, `update_targets`, `scope`, `persistence` | The same curated vocabulary used for research works, applied to documented software behavior. |
| `evaluation`, `limitations` | Project-reported evidence and its boundary, including differences between current source, managed services, and evaluated paper versions. |
| `availability_note`, `requirements` | Public source/package status, setup dependencies, environment/model/compute prerequisites, and inspection limits. |
| `license`, `license_url` | License observed in a primary source, or an explicit unknown. Licenses of linked models, datasets, dependencies, and services are separate. |
| `sources`, `checked`, `review_depth` | Public primary sources, inspection date, and `project` review depth. |
| `execution_status` | `not-run` for this documentation-only pass. A future execution claim needs a separately reviewed evidence schema/report. |

Systems have no inferred `date` or `year`: an inspection date, repository creation date, or related paper date is not a software release date. Year filters apply to dated research records. Source-inspection status is not a peer-review label. The CLI's JSON output returns the raw canonical records; the browser exports separate `papers` and `systems` arrays and keeps their evidence fields.

System IDs and repository identities must be unique within the software catalog, and related paper IDs must exist. Validators also check license/docs source membership, controlled vocabularies, and the explicit not-run boundary. Publication-paper deduplication remains separate from software identity.
