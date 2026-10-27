'use strict';

(() => {
  const $ = (id) => document.getElementById(id);
  const catalog = window.CATALOG;
  if (!catalog || !Array.isArray(catalog.papers)) {
    $('result-count').textContent = 'The catalog data could not be loaded.';
    $('action-status').textContent = 'Open this page alongside its generated catalog.js, or browse the GitHub repository.';
    return;
  }
  const meta = catalog.meta || {};
  const papers = catalog.papers;
  const routes = Array.isArray(catalog.routes) ? catalog.routes : [];
  const byId = new Map(papers.map((p) => [p.id, p]));
  const topics = meta.topics || {};
  const targets = meta.update_targets || {};
  const fields = ['search', 'topic', 'target', 'kind', 'scope', 'depth', 'year', 'route', 'sort'];
  const queryKeys = { search: 'q', topic: 'topic', target: 'target', kind: 'kind', scope: 'scope', depth: 'depth', year: 'year', route: 'route', sort: 'sort' };
  const kindLabels = { paper: 'Paper', survey: 'Survey', benchmark: 'Benchmark', project: 'Project' };
  const depthLabels = { 'full-text': 'Selected full text inspected', abstract: 'Abstract inspected', project: 'Project documentation inspected' };
  const persistenceLabels = { 'across-tasks': 'Across tasks', 'within-task': 'Within a task', both: 'Within and across tasks', 'not-applicable': 'Not applicable' };
  let filtered = [];
  let announcementTimer;
  const label = (map, key) => typeof map[key] === 'string' ? map[key] : (map[key]?.label || map[key]?.title || key.replaceAll('-', ' '));
  const unique = (values) => [...new Set(values)].filter(Boolean);
  const allTopics = unique(papers.flatMap((p) => p.topics || [])).sort((a, b) => label(topics, a).localeCompare(label(topics, b)));
  const allTargets = unique(papers.flatMap((p) => p.update_targets || [])).sort((a, b) => label(targets, a).localeCompare(label(targets, b)));
  const node = (tag, className, text) => {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text !== undefined && text !== null) el.textContent = text;
    return el;
  };
  const safeUrl = (value) => {
    try { const u = new URL(value); return ['https:', 'http:'].includes(u.protocol) ? u.href : null; }
    catch { return null; }
  };
  const link = (text, href, className) => {
    const a = node('a', className, text);
    const valid = safeUrl(href);
    if (valid) { a.href = valid; a.target = '_blank'; a.rel = 'noopener noreferrer'; }
    return a;
  };
  const option = (selectId, value, text) => {
    const el = node('option', '', text); el.value = value; $(selectId).append(el);
  };
  allTopics.forEach((id) => option('topic', id, label(topics, id)));
  allTargets.forEach((id) => option('target', id, label(targets, id)));
  unique(papers.map((p) => p.kind)).sort().forEach((kind) => option('kind', kind, kindLabels[kind] || kind));
  unique(papers.map((p) => p.year)).sort((a, b) => b - a).forEach((year) => option('year', String(year), String(year)));
  routes.forEach((route) => option('route', route.id, route.title));
  $('total-count').textContent = papers.length;
  $('topic-count').textContent = allTopics.length;
  $('route-count').textContent = routes.length;
  if (meta.updated) $('last-checked').textContent = `Collection updated ${meta.updated}.`;
  const repo = safeUrl(meta.repository) || 'https://github.com/duyvuleo/awesome-agents-that-learn';
  document.querySelectorAll('.repo-link').forEach((el) => { el.href = repo; });
  $('guide-link').href = `${repo.replace(/\/$/, '')}#readme`;
  $('contribute-link').href = `${repo.replace(/\/$/, '')}/blob/main/CONTRIBUTING.md`;
  $('license-link').href = `${repo.replace(/\/$/, '')}/blob/main/LICENSE`;

  const setTheme = (id) => { $('topic').value = $('topic').value === id ? '' : id; render(); };
  allTopics.forEach((id) => {
    const b = node('button', 'theme-pill', label(topics, id));
    b.type = 'button'; b.dataset.topic = id; b.setAttribute('aria-pressed', 'false');
    b.addEventListener('click', () => setTheme(id));
    $('theme-pills').append(b);
  });
  routes.forEach((route, index) => {
    const b = node('button', 'route-button'); b.type = 'button'; b.dataset.route = route.id;
    b.setAttribute('aria-pressed', 'false'); b.setAttribute('aria-controls', 'route-detail');
    b.append(node('span', 'route-number', `ROUTE ${String(index + 1).padStart(2, '0')}`), node('span', 'route-title', route.title), node('small', '', `${(route.steps || []).length} selected readings`));
    const arrow = node('span', 'route-arrow', '↗'); arrow.setAttribute('aria-hidden', 'true'); b.append(arrow);
    b.addEventListener('click', () => { $('route').value = $('route').value === route.id ? '' : route.id; render(); });
    $('route-options').append(b);
  });

  function state() { return Object.fromEntries(fields.map((id) => [id, $(id).value])); }
  function readUrl() {
    const params = new URLSearchParams(location.search);
    fields.forEach((id) => {
      const value = params.get(queryKeys[id]) || (id === 'sort' ? 'newest' : '');
      if (id === 'search' || [...$(id).options].some((o) => o.value === value)) $(id).value = value;
      else $(id).value = id === 'sort' ? 'newest' : '';
    });
    if (['kind', 'scope', 'depth', 'year', 'route'].some((id) => $(id).value)) $('advanced-filters').open = true;
  }
  function viewUrl() {
    const url = new URL(location.href); url.search = '';
    fields.forEach((id) => {
      const value = $(id).value;
      if (value && !(id === 'sort' && value === 'newest')) url.searchParams.set(queryKeys[id], value);
    });
    return url;
  }
  function writeUrl() {
    try { history.replaceState(null, '', viewUrl()); } catch { /* Some file:// browsers disallow history updates. */ }
  }
  function announce(text) {
    clearTimeout(announcementTimer); $('action-status').textContent = text;
    announcementTimer = setTimeout(() => { $('action-status').textContent = ''; }, 7000);
  }
  function renderRoute(routeId) {
    const route = routes.find((r) => r.id === routeId);
    document.querySelectorAll('.route-button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.route === routeId)));
    $('route-detail').replaceChildren(); $('route-detail').hidden = !route;
    if (!route) return;
    $('route-detail').append(node('h3', '', route.question || route.title));
    $('route-detail').append(node('p', '', 'Read in this order. The catalog below is filtered to this route; other active filters still apply.'));
    const ol = node('ol', 'route-steps');
    (route.steps || []).forEach((step) => {
      const paper = byId.get(step.paper); if (!paper) return;
      const li = node('li'); li.append(link(paper.title, paper.url));
      if (step.why) li.append(node('p', '', step.why)); ol.append(li);
    });
    $('route-detail').append(ol);
    if (route.exercise) { const exercise = node('p', 'route-exercise'); exercise.append(node('strong', '', 'Try this: '), document.createTextNode(route.exercise)); $('route-detail').append(exercise); }
  }
  function evidence(title, value, className = '') {
    const block = node('div', `evidence-block ${className}`.trim());
    block.append(node('h4', '', title), node('p', '', value || 'Not recorded.')); return block;
  }
  function sourceLabel(source, i) {
    try {
      const u = new URL(source);
      if (u.hostname === 'arxiv.org') return u.pathname.startsWith('/html') ? `Paper text · ${u.pathname.split('/').pop()}` : `arXiv · ${u.pathname.split('/').pop()}`;
      if (u.hostname === 'github.com') return `Repository · ${u.pathname.slice(1)}`;
      if (u.hostname.includes('aclanthology')) return 'ACL Anthology publication record';
      if (u.hostname.includes('neurips')) return 'NeurIPS publication record';
      if (u.hostname.includes('mlr.press')) return 'PMLR publication record';
      if (u.hostname.includes('openreview')) return 'OpenReview paper / publication record';
      return `Primary source · ${u.hostname}`;
    } catch { return `Source ${i + 1}`; }
  }
  function card(p) {
    const article = node('article', 'paper-card'); article.id = `paper-${p.id}`;
    const top = node('div', 'paper-topline');
    top.append(node('span', 'paper-year', p.year), node('span', 'paper-kind', kindLabels[p.kind] || p.kind), node('span', `paper-scope ${p.scope === 'adjacent' ? 'adjacent' : ''}`, p.scope === 'adjacent' ? 'Adjacent' : 'Core'));
    const title = node('h3'); title.append(link(p.title, p.url)); article.append(top, title, node('p', 'paper-summary', p.mechanism));
    const tags = node('div', 'paper-tags');
    (p.topics || []).forEach((id) => { const b = node('button', 'paper-tag', label(topics, id)); b.type = 'button'; b.setAttribute('aria-label', `Filter by ${label(topics, id)}`); b.addEventListener('click', () => { $('topic').value = id; render(); $('topic').focus(); }); tags.append(b); });
    article.append(tags);
    const metadata = node('div', 'paper-meta');
    const status = p.status === 'peer-reviewed' ? 'Peer reviewed' : p.status === 'technical-report' ? 'Technical report' : 'Preprint';
    metadata.append(node('span', '', status), node('span', 'depth', depthLabels[p.review_depth] || 'Inspection depth not recorded')); article.append(metadata);
    const details = node('details', 'paper-details'); details.append(node('summary', '', 'Learning mechanism, evaluation & sources'));
    details.append(evidence('What changes', (p.update_targets || []).map((id) => label(targets, id)).join(', ') || 'Not applicable'));
    details.append(evidence('Persistence', persistenceLabels[p.persistence] || p.persistence));
    details.append(evidence('Learning signal', p.learning_signal));
    details.append(evidence('Evaluation', p.evaluation));
    details.append(evidence('Evidence boundary', p.limitations, 'boundary'));
    if (p.venue) details.append(evidence('Publication / venue note', p.venue));
    const artifacts = node('div', 'evidence-block'); artifacts.append(node('h4', '', 'Official artifacts'));
    if (p.code_url && safeUrl(p.code_url)) artifacts.append(link('Visit the official repository ↗', p.code_url, 'artifact-link'));
    artifacts.append(node('p', '', p.code_note || 'Artifact availability was not verified.')); details.append(artifacts);
    const sources = node('div', 'evidence-block'); sources.append(node('h4', '', 'Sources inspected'));
    const ul = node('ul', 'source-list'); unique(p.sources || [p.url]).forEach((source, i) => { if (!safeUrl(source)) return; const li = node('li'); li.append(link(sourceLabel(source, i), source)); ul.append(li); }); sources.append(ul); details.append(sources);
    details.append(node('p', 'source-footnote', `Source date: ${p.date || p.year}. Sources checked: ${p.checked || 'not recorded'}.`));
    article.append(details); return article;
  }
  function render() {
    const s = state();
    const terms = s.search.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
    const selectedRoute = routes.find((r) => r.id === s.route);
    const routeIds = selectedRoute ? new Set((selectedRoute.steps || []).map((step) => step.paper)) : null;
    filtered = papers.filter((p) => {
      const searchable = [p.title, p.id, p.mechanism, p.evaluation, p.limitations, p.learning_signal, p.venue, ...(p.topics || []).map((id) => label(topics, id)), ...(p.update_targets || []).map((id) => label(targets, id))].join(' ').toLocaleLowerCase();
      return terms.every((term) => searchable.includes(term)) && (!s.topic || (p.topics || []).includes(s.topic)) && (!s.target || (p.update_targets || []).includes(s.target)) && (!s.kind || p.kind === s.kind) && (!s.scope || p.scope === s.scope) && (!s.depth || p.review_depth === s.depth) && (!s.year || String(p.year) === s.year) && (!routeIds || routeIds.has(p.id));
    });
    filtered.sort((a, b) => {
      if (s.sort === 'title') return a.title.localeCompare(b.title);
      const dates = String(a.date || a.year).localeCompare(String(b.date || b.year));
      return (s.sort === 'oldest' ? dates : -dates) || a.title.localeCompare(b.title);
    });
    const fragment = document.createDocumentFragment(); filtered.forEach((p) => fragment.append(card(p))); $('papers').replaceChildren(fragment);
    $('result-count').textContent = `${filtered.length} of ${papers.length} works${selectedRoute ? ' · selected reading route' : ''}`;
    $('empty-state').hidden = filtered.length !== 0;
    $('export').disabled = filtered.length === 0;
    const active = fields.filter((id) => id !== 'sort' && s[id]);
    $('clear-filters').disabled = active.length === 0 && s.sort === 'newest';
    const advanced = ['kind', 'scope', 'depth', 'year', 'route'].filter((id) => s[id]);
    $('advanced-count').textContent = advanced.length ? `(${advanced.length} active)` : '';
    document.querySelectorAll('.theme-pill').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.topic === s.topic)));
    renderRoute(s.route); writeUrl();
  }
  function clear() { fields.forEach((id) => { $(id).value = id === 'sort' ? 'newest' : ''; }); render(); }
  fields.forEach((id) => $(id).addEventListener(id === 'search' ? 'input' : 'change', render));
  $('clear-filters').addEventListener('click', clear);
  $('empty-clear').addEventListener('click', () => { clear(); $('search').focus(); });
  $('share').addEventListener('click', async () => {
    const url = viewUrl();
    if (url.protocol === 'file:') { announce('This is a local file view. Publish or open the hosted explorer to share a public link.'); return; }
    try { await navigator.clipboard.writeText(url.href); announce('View link copied, including all active filters.'); }
    catch { announce('Copy the address from your browser to share this filtered view.'); }
  });
  $('export').addEventListener('click', () => {
    const data = { collection: meta.title || 'Awesome Agents That Learn', source: repo, exported_at: new Date().toISOString(), filters: state(), count: filtered.length, papers: filtered };
    const blobUrl = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2) + '\n'], { type: 'application/json' }));
    const a = node('a'); a.href = blobUrl; a.download = 'agents-that-learn-selection.json'; document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(blobUrl), 1000); announce(`Exported ${filtered.length} works with their annotations and sources.`);
  });
  window.addEventListener('popstate', () => { readUrl(); render(); });
  readUrl(); render();
})();
