'use strict';

// Shared, DOM-independent theme matching and share-link semantics.
((root) => {
  const read = (params, allowed) => ({
    topics: [...new Set(params.getAll('topic').flatMap((value) => value.split(',')).map((id) => id.trim()))]
      .filter((id) => allowed.includes(id)).sort(),
    mode: params.get('topic_match') === 'all' ? 'all' : 'any'
  });
  const write = (params, topics, mode) => {
    params.delete('topic'); params.delete('topic_match');
    [...new Set(topics)].sort().forEach((id) => params.append('topic', id));
    if (mode === 'all') params.set('topic_match', 'all');
  };
  const matches = (topics, selected, mode) => !selected.length ||
    (mode === 'all' ? selected.every((id) => (topics || []).includes(id)) : selected.some((id) => (topics || []).includes(id)));
  const api = { read, write, matches };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.ThemeFilters = api;
})(typeof window === 'undefined' ? globalThis : window);
