# Exploring papers and systems

[Overview](../README.md) · [Open the explorer](https://duyvuleo.github.io/awesome-agents-that-learn/) · [Systems](systems.md)

The explorer provides reading routes, a topic word cloud, a relationship graph, and an annotated resource listing. They share the canonical paper and software catalogs; the visuals add no inferred citations or scientific claims.

## Tables, cards, and systems

The default table makes titles, mechanisms, update targets, evidence labels, and source links easy to compare. Expand a row for the full annotation. The Cards option presents the same filtered records in a more spacious layout; selecting a graph node opens the corresponding evidence without changing the selected view. The view choice is included in shared URLs.

Use **Systems** in the navigation or the resource-type filter to inspect software. System details include documented capabilities, requirements, availability, license pointers, evaluation limits, and related papers. Related-resource links work in both directions and clear incompatible filters when necessary to reveal the target.

The collection has 83 research works and 23 systems, for 106 catalog resources. A paper and its implementation can describe the same research program. These are separate resource counts, not 106 independent scientific findings. Systems have inspection dates but no invented release dates; year filters apply to dated research records.

## Word cloud

Words represent curated research themes. Sizes and displayed counts use the full 106-resource collection even when filters are active. Larger words indicate more resources assigned to that theme. These are topic memberships, not raw word frequencies, scientific-importance scores, or independent-research counts. Membership counts overlap.

Select a theme to filter the graph and listing; select it again to clear it. Other filters include search, update target, resource type, scope, inspection depth, recorded year, and reading route. Reading routes remain sequences of research works.

## Relationship graph

The graph follows all active filters and connects each matching resource to all its assigned themes. Circular work nodes represent research publications; square system nodes represent software; topic nodes form the surrounding hubs. Selecting a theme does not erase the other themes belonging to the matched resources.

A line records a curated topic assignment, not a citation, implementation dependency, causal relationship, or proof of methodological equivalence. Positions and distances are only a navigation layout, not similarity scores. Topic-node sizes reflect matching resource counts.

Select a topic to focus the collection or a resource to open its full evidence. Hover/focus previews retain the evaluation boundary. Zoom/reset controls and desktop background dragging help inspect the graph. On small screens, use the graph's text-list alternative for precise selection; keyboard controls are also available.

Expected count examples for this edition:

| View | Research works | Systems | Represented themes | Membership links |
| --- | --- | --- | --- | --- |
| Full collection |83|23|15|308|
| Systems only |0|23|12|73|
| Systems + memory |0|9|8|28|
| Benchmark papers + memory |6|0|6|21|

These counts are for navigation and reproducibility of the catalog view, not capability measurements.

## Evidence and export

The address encodes filters, reading route, and table/cards view. “Copy view link” shares that selection. Browser JSON export keeps separate `papers` and `systems` arrays, counts, and the full canonical evidence fields. The CLI's JSON mode returns a flat array of raw matched records. Display adapters never turn system inspection dates into publication years.

`abstract` means primary-abstract/metadata inspection; `full-text` means selected relevant sections were inspected; system `project` labels mean official documentation/source inspection. None means research code was executed or a result independently reproduced. See the [paper review log](review-log.md), [systems review](systems-review.md), and [coverage notes](search-log.md).

Opening `site/index.html` locally works without a server. Local file URLs cannot be shared as public links. README badges are generated from catalog counts; the GitHub validation badge checks repository consistency, not scientific correctness.
