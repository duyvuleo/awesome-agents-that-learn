# Exploring the research visually

[Overview](../README.md) · [Open the explorer](https://duyvuleo.github.io/awesome-agents-that-learn/)

The explorer provides reading routes, a topic word cloud, a visual relationship graph, and an annotated catalog. They all use the same canonical records; the visuals do not add inferred citations or scientific claims.

## Word cloud

The words represent the collection's curated research themes. Sizes and displayed counts use the full collection, even when other filters are active. Larger words indicate more catalog works assigned to that theme. These are topic-membership counts, not raw word frequencies from paper abstracts or measures of scientific importance. One work can belong to several themes, so counts are not additive.

Select a theme to filter the catalog; select the active theme again to clear it. The current view can also be narrowed by search, update target, resource type, scope, source-inspection depth, recorded year, and reading route.

## Visual graph

The graph follows all active catalog filters and connects the matching works to all of their assigned themes. Selecting one theme therefore does not erase the other themes attached to those works. Topic-node sizes reflect the number of matching works. A line records a catalog membership. Positions and distances are only a navigation layout, not a learned embedding or similarity score. It does not mean that one paper cites another, that the methods are equivalent, that one result causes another, or that either work's claims were independently reproduced.

Select a theme to focus the collection. Select a work to open its mechanism, evaluation boundary, and primary sources in the catalog. Use the graph's controls to inspect a crowded region and reset the view when needed. The ordinary catalog remains the text-based alternative for keyboard and screen-reader use.

## Evidence and sharing

Search and filters determine the graph and catalog results; the word cloud retains full-collection counts as a navigation overview. The catalog's result count is the count of unique works. The graph has separate work and topic nodes; distinguish node counts from paper counts. The launch has 83 works, 15 themes, and 235 membership links. Selecting memory plus benchmark yields six works, six represented themes, and 21 memberships; those six works are still the same six shown in the catalog. Topic labels and graph connections are curation judgments, not a literature-wide taxonomy.

The address encodes catalog filters and the selected reading route. “Copy view link” shares that selection. JSON export contains the full filtered records, including sources, review depth, source dates, and limitations. Opening `site/index.html` locally works without a server; local file links cannot be shared as public URLs.

`abstract` means primary abstract/metadata inspection. `full-text` means selected relevant sections were inspected. Neither label means the code was run or the published result was independently reproduced. The [review log](review-log.md) records the inspected sections, and the [search log](search-log.md) states coverage limits.
