'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { read, write, matches } = require('../site/theme-filters.js');
const allowed = ['memory', 'skills', 'prompts'];
const resources = [
  { id: 'memory-paper', topics: ['memory'] },
  { id: 'skill-paper', topics: ['skills'] },
  { id: 'combined-paper', topics: ['memory', 'skills'] },
  { id: 'memory-system', topics: ['memory', 'prompts'] },
  { id: 'untagged' }
];
const select = (selection) => resources.filter((r) => matches(r.topics, selection.topics, selection.mode)).map((r) => r.id);

test('legacy single-theme links retain their results', () => {
  assert.deepEqual(select(read(new URLSearchParams('topic=memory&view=cards'), allowed)), ['memory-paper', 'combined-paper', 'memory-system']);
});
test('URL input deduplicates themes, rejects unknown IDs, and defaults invalid modes', () => {
  assert.deepEqual(read(new URLSearchParams('topic=skills,memory&topic=skills&topic=missing&topic_match=invalid'), allowed), { topics: ['memory', 'skills'], mode: 'any' });
  assert.deepEqual(read(new URLSearchParams('topic=missing'), allowed), { topics: [], mode: 'any' });
});
test('Match any includes the union once, while Match all requires every theme', () => {
  assert.deepEqual(select({ topics: ['memory', 'skills'], mode: 'any' }), ['memory-paper', 'skill-paper', 'combined-paper', 'memory-system']);
  assert.deepEqual(select({ topics: ['memory', 'skills'], mode: 'all' }), ['combined-paper']);
  assert.deepEqual(select({ topics: ['skills', 'prompts'], mode: 'all' }), []);
});
test('no selected themes includes all resources in either mode', () => {
  for (const mode of ['any', 'all']) assert.equal(select({ topics: [], mode }).length, resources.length);
});
test('share URLs preserve filters and round-trip both matching modes', () => {
  for (const mode of ['any', 'all']) {
    const url = new URL('https://example.org/?q=agent&kind=system&view=cards&topic=prompts#catalog');
    write(url.searchParams, ['skills', 'memory', 'skills'], mode);
    assert.equal(url.searchParams.get('q'), 'agent');
    assert.equal(url.searchParams.get('kind'), 'system');
    assert.equal(url.searchParams.get('view'), 'cards');
    assert.equal(url.hash, '#catalog');
    assert.deepEqual(url.searchParams.getAll('topic'), ['memory', 'skills']);
    assert.deepEqual(read(url.searchParams, allowed), { topics: ['memory', 'skills'], mode });
    assert.deepEqual(select(read(url.searchParams, allowed)), select({ topics: ['memory', 'skills'], mode }));
  }
});
test('clearing themes removes stale URL selections without discarding other filters', () => {
  const params = new URLSearchParams('topic=memory&topic=skills&topic_match=all&kind=system');
  write(params, [], 'any');
  assert.equal(params.toString(), 'kind=system');
  write(params, ['memory'], 'all');
  assert.equal(read(params, allowed).mode, 'all');
});
