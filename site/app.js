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
  const topicCounts = Object.fromEntries(allTopics.map((id) => [id, papers.filter((p) => (p.topics || []).includes(id)).length]));
  const graphNames = { foundations: 'Foundations', surveys: 'Surveys', memory: 'Memory', skills: 'Skills', tools: 'Tools', prompts: 'Prompts', workflows: 'Workflows', architecture: 'Architecture', 'model-training': 'Model learning', 'self-play': 'Self-play', 'continual-learning': 'Continual learning', 'recursive-improvement': 'Recursive improvement', evaluation: 'Evaluation', safety: 'Safety', applications: 'Applications' };
  const graphView = { zoom: 1, x: 0, y: 0 };
  let graphLayout = { width: 1100, height: 720, cx: 550, cy: 360, narrow: false };
  let graphDrag = null;
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
  const countRange = Object.values(topicCounts);
  const minCount = Math.min(...countRange);
  const maxCount = Math.max(...countRange);
  // Alternate larger and smaller topics to keep the cloud balanced without collisions.
  const weightedTopics = [...allTopics].sort((a, b) => topicCounts[b] - topicCounts[a] || a.localeCompare(b));
  const cloudOrder = [];
  while (weightedTopics.length) {
    cloudOrder.push(weightedTopics.shift());
    if (weightedTopics.length) cloudOrder.push(weightedTopics.pop());
  }
  cloudOrder.forEach((id) => {
    const b = node('button', 'cloud-word'); b.type = 'button'; b.dataset.topic = id;
    const weight = (topicCounts[id] - minCount) / (maxCount - minCount || 1);
    b.style.setProperty('--cloud-size', String(1.1 + Math.sqrt(weight) * 1.25));
    b.append(node('span', '', label(topics, id)), node('sup', '', topicCounts[id]));
    b.setAttribute('aria-label', `${label(topics, id)}: ${topicCounts[id]} of ${papers.length} works in the full collection. Toggle topic filter.`);
    b.setAttribute('aria-pressed', 'false');
    b.addEventListener('click', () => setTheme(id)); $('word-cloud').append(b);
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
  function focusPaper(id) {
    const article = $(`paper-${id}`);
    if (!article) return;
    article.querySelector('details').open = true;
    article.tabIndex = -1;
    article.focus({ preventScroll: true });
    article.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  }
  function svgNode(tag, attrs, text) {
    const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    Object.entries(attrs || {}).forEach(([key, value]) => el.setAttribute(key, String(value)));
    if (text !== undefined) el.textContent = text;
    return el;
  }
  function graphTransform() {
    const { zoom, x, y } = graphView;
    $('graph-stage').setAttribute('transform', `translate(${graphLayout.cx * (1 - zoom) + x} ${graphLayout.cy * (1 - zoom) + y}) scale(${zoom})`);
    $('graph-zoom-label').textContent = `${Math.round(zoom * 100)}%`;
    $('graph-zoom-in').disabled = zoom >= 3;
    $('graph-zoom-out').disabled = zoom <= 0.6;
  }
  function graphReset() { graphView.zoom = 1; graphView.x = 0; graphView.y = 0; graphTransform(); }
  function graphZoom(factor) { graphView.zoom = Math.max(0.6, Math.min(3, Math.round(graphView.zoom * factor * 100) / 100)); graphTransform(); }
  function resetInspector() {
    $('graph-inspector').replaceChildren(node('p', 'inspector-kicker', 'EXPLORE A CONNECTION'), node('h4', '', 'Select a topic. Discover a paper.'), node('p', '', 'Hover or focus a node to inspect it. Select a topic to narrow the map; select a work to open its evidence notes below.'));
  }
  function inspectNode(type, item, visibleCount) {
    const inspector = $('graph-inspector'); inspector.replaceChildren();
    if (type === 'topic') {
      inspector.append(node('p', 'inspector-kicker', 'CATALOG TOPIC'), node('h4', '', label(topics, item)), node('p', '', `${visibleCount} matching works in this graph; ${topicCounts[item]} of ${papers.length} works in the full collection. Select to toggle this topic filter.`));
    } else {
      inspector.append(node('p', 'inspector-kicker', `${kindLabels[item.kind] || item.kind} · ${item.year} · ${item.scope}`), node('h4', '', item.title), node('p', '', item.mechanism));
      const boundary = node('p', 'inspector-boundary'); boundary.append(node('strong', '', 'Boundary: '), document.createTextNode(item.limitations || 'Not recorded.')); inspector.append(boundary);
    }
  }
  function renderGraph(selectedTopic) {
    const stage = $('graph-stage'); stage.replaceChildren(); resetInspector();
    const narrow = matchMedia('(max-width: 700px)').matches;
    graphLayout = narrow ? { width: 720, height: 980, cx: 360, cy: 490, narrow } : { width: 1100, height: 720, cx: 550, cy: 360, narrow };
    const { cx, cy } = graphLayout;
    $('research-graph').setAttribute('viewBox', `0 0 ${graphLayout.width} ${graphLayout.height}`);
    const represented = allTopics.filter((id) => filtered.some((p) => (p.topics || []).includes(id)));
    const membershipCount = filtered.reduce((count, p) => count + (p.topics || []).length, 0);
    $('graph-count').textContent = `${filtered.length} works · ${represented.length} topics · ${membershipCount} membership links`;
    $('graph-list-count').textContent = `(${filtered.length} works)`;
    $('graph-empty').hidden = filtered.length > 0;
    $('research-graph').setAttribute('aria-label', `Interactive topic membership graph: ${filtered.length} works, ${represented.length} topics, ${membershipCount} links`);
    const select = $('graph-work-select'); const previous = select.value;
    select.replaceChildren(node('option', '', 'Choose a work')); select.firstChild.value = '';
    [...filtered].sort((a, b) => a.title.localeCompare(b.title)).forEach((p) => { const o = node('option', '', `${p.title} (${p.year})`); o.value = p.id; select.append(o); });
    if (filtered.some((p) => p.id === previous)) select.value = previous;
    $('graph-open-work').disabled = !select.value;
    if (!filtered.length) { graphTransform(); return; }
    const topicPositions = new Map();
    represented.forEach((id, i) => {
      const angle = -Math.PI / 2 + (i / represented.length) * Math.PI * 2;
      topicPositions.set(id, { x: cx + Math.sin(angle) * (narrow ? 205 : 380), y: cy + Math.cos(angle) * (narrow ? 365 : 235), angle });
    });
    const ordered = [...filtered].sort((a, b) => allTopics.indexOf((a.topics || [])[0]) - allTopics.indexOf((b.topics || [])[0]) || a.title.localeCompare(b.title));
    const workPositions = new Map();
    ordered.forEach((p, i) => {
      const angle = -Math.PI / 2 + ((i + 0.5) / ordered.length) * Math.PI * 2;
      const stagger = ordered.length > 45 ? (i % 2 ? 20 : -20) : 0;
      workPositions.set(p.id, { x: cx + Math.sin(angle) * ((narrow ? 130 : 245) + stagger), y: cy + Math.cos(angle) * ((narrow ? 245 : 155) + stagger) });
    });
    const edges = svgNode('g', { 'aria-hidden': 'true', class: 'graph-edges' });
    const edgeRecords = [];
    ordered.forEach((p) => (p.topics || []).forEach((topic) => {
      const from = topicPositions.get(topic); const to = workPositions.get(p.id); if (!from) return;
      const line = svgNode('line', { x1: from.x, y1: from.y, x2: to.x, y2: to.y, class: `graph-membership${topic === selectedTopic ? ' selected-spoke' : ''}`, 'data-topic': topic, 'data-paper': p.id });
      edges.append(line); edgeRecords.push({ line, topic, paper: p.id });
    })); stage.append(edges);
    const nodeRecords = [];
    function highlight(type, key) {
      const connections = edgeRecords.filter((e) => type === 'topic' ? e.topic === key : e.paper === key);
      const connectedTopics = new Set(connections.map((e) => e.topic));
      const connectedPapers = new Set(connections.map((e) => e.paper));
      edgeRecords.forEach((e) => {
        const matched = type === 'topic' ? e.topic === key : e.paper === key;
        e.line.classList.toggle('is-emphasized', matched); e.line.classList.toggle('is-muted', !matched);
      });
      nodeRecords.forEach((n) => n.element.classList.toggle('is-muted', n.type === 'topic' ? !connectedTopics.has(n.id) : !connectedPapers.has(n.id)));
    }
    function clearHighlight() {
      edgeRecords.forEach((e) => e.line.classList.remove('is-emphasized', 'is-muted'));
      nodeRecords.forEach((n) => n.element.classList.remove('is-muted'));
    }
    function interactive(g, type, item, count) {
      const key = type === 'topic' ? item : item.id;
      g.setAttribute('tabindex', '0'); g.setAttribute('role', 'button');
      const fullLabel = type === 'topic' ? `${label(topics, item)}: ${count} matching works. Toggle topic filter.` : `${item.title}, ${item.year}. Open evidence notes.`;
      g.setAttribute('aria-label', fullLabel); g.append(svgNode('title', {}, fullLabel));
      const show = () => { highlight(type, key); inspectNode(type, item, count); };
      const activate = () => {
        if (type === 'topic') { setTheme(item); $('graph-stage').querySelector(`[data-topic-node="${item}"]`)?.focus({ preventScroll: true }); }
        else focusPaper(item.id);
      };
      g.addEventListener('mouseenter', show); g.addEventListener('focus', show);
      g.addEventListener('mouseleave', () => { if (!g.matches(':focus')) clearHighlight(); });
      g.addEventListener('blur', clearHighlight);
      g.addEventListener('click', activate);
      g.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); activate(); } });
      nodeRecords.push({ element: g, type, id: key }); return g;
    }
    const workLayer = svgNode('g', { class: 'graph-work-nodes' });
    ordered.forEach((p) => {
      const pos = workPositions.get(p.id); const g = svgNode('g', { class: 'graph-node graph-work-node', 'data-paper-node': p.id });
      g.append(svgNode('circle', { cx: pos.x, cy: pos.y, r: narrow ? 17 : 12, class: 'hit-area' }), svgNode('circle', { cx: pos.x, cy: pos.y, r: narrow ? 6.5 : 5.4, class: 'graph-work-dot' }));
      workLayer.append(interactive(g, 'paper', p, 0));
    }); stage.append(workLayer);
    const topicLayer = svgNode('g', { class: 'graph-topic-nodes' });
    represented.forEach((id) => {
      const pos = topicPositions.get(id); const count = filtered.filter((p) => (p.topics || []).includes(id)).length;
      const g = svgNode('g', { class: `graph-node graph-topic-node${id === selectedTopic ? ' is-selected' : ''}`, 'data-topic-node': id, 'aria-pressed': String(id === selectedTopic) });
      const sine = Math.sin(pos.angle); const cosine = Math.cos(pos.angle);
      const anchor = narrow || Math.abs(sine) < 0.25 ? 'middle' : sine > 0 ? 'start' : 'end';
      const lx = pos.x + sine * (narrow ? 20 : 26);
      // Stagger the bottom-center label so neighboring multiline labels remain distinct on phones.
      let ly = pos.y + (narrow ? (cosine < -0.35 ? -36 : 35) + (cosine > 0.96 ? 45 : 0) : cosine * 28);
      g.append(svgNode('circle', { cx: pos.x, cy: pos.y, r: 21, class: 'hit-area' }), svgNode('circle', { cx: pos.x, cy: pos.y, r: 9 + Math.sqrt(count), class: 'graph-topic-dot' }));
      const words = (graphNames[id] || label(topics, id)).split(' ');
      const countOffset = words.join(' ').length > 16 ? (narrow ? 43 : 29) : !narrow && cosine < -0.45 ? 7 : narrow ? 24 : 18;
      // Keep the whole label/count group inside the mobile canvas after filters change hub positions.
      if (narrow) ly = Math.min(ly, graphLayout.height - 18 - countOffset);
      const title = svgNode('text', { x: lx, y: ly - (!narrow && cosine < -0.45 ? 12 : 2), class: 'graph-topic-label', 'text-anchor': anchor });
      if (words.join(' ').length > 16) {
        const split = Math.ceil(words.length / 2);
        title.append(svgNode('tspan', { x: lx, dy: '-0.35em' }, words.slice(0, split).join(' ')), svgNode('tspan', { x: lx, dy: '1.15em' }, words.slice(split).join(' ')));
      } else title.textContent = words.join(' ');
      g.append(title, svgNode('text', { x: lx, y: ly + countOffset, class: 'graph-topic-count', 'text-anchor': anchor }, `${count} works`));
      topicLayer.append(interactive(g, 'topic', id, count));
    }); stage.append(topicLayer); graphTransform();
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
    document.querySelectorAll('.cloud-word').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.topic === s.topic)));
    $('cloud-selection').textContent = s.topic ? `Selected: ${label(topics, s.topic)}. Counts above remain based on all ${papers.length} works; the graph below shows the filtered view.` : `Full collection: ${papers.length} works across ${allTopics.length} overlapping topics. All other filters apply to the graph and reading list.`;
    renderGraph(s.topic);
    renderRoute(s.route); writeUrl();
  }
  function clear() { fields.forEach((id) => { $(id).value = id === 'sort' ? 'newest' : ''; }); render(); }
  fields.forEach((id) => $(id).addEventListener(id === 'search' ? 'input' : 'change', render));
  $('clear-filters').addEventListener('click', clear);
  $('empty-clear').addEventListener('click', () => { clear(); $('search').focus(); });
  $('graph-empty-clear').addEventListener('click', clear);
  $('graph-zoom-in').addEventListener('click', () => graphZoom(1.25));
  $('graph-zoom-out').addEventListener('click', () => graphZoom(0.8));
  $('graph-reset').addEventListener('click', graphReset);
  $('graph-work-select').addEventListener('change', () => { $('graph-open-work').disabled = !$('graph-work-select').value; });
  $('graph-open-work').addEventListener('click', () => focusPaper($('graph-work-select').value));
  $('research-graph').addEventListener('keydown', (e) => {
    if (e.target !== $('research-graph')) return;
    const deltas = { ArrowLeft: [35, 0], ArrowRight: [-35, 0], ArrowUp: [0, 35], ArrowDown: [0, -35] };
    if (deltas[e.key]) { e.preventDefault(); graphView.x += deltas[e.key][0]; graphView.y += deltas[e.key][1]; graphTransform(); }
    if (e.key === '+' || e.key === '=') { e.preventDefault(); graphZoom(1.25); }
    if (e.key === '-') { e.preventDefault(); graphZoom(0.8); }
    if (e.key === '0' || e.key === 'Home') { e.preventDefault(); graphReset(); }
  });
  $('research-graph').addEventListener('pointerdown', (e) => {
    if (e.button !== 0 || e.target.closest('.graph-node')) return;
    // Preserve ordinary vertical touch scrolling; panning is available with controls and keyboard.
    if (e.pointerType === 'touch') return;
    const rect = $('research-graph').getBoundingClientRect();
    graphDrag = { id: e.pointerId, x: e.clientX, y: e.clientY, startX: graphView.x, startY: graphView.y, scale: graphLayout.width / rect.width };
    $('research-graph').setPointerCapture(e.pointerId); $('research-graph').classList.add('is-panning');
  });
  $('research-graph').addEventListener('pointermove', (e) => {
    if (!graphDrag || e.pointerId !== graphDrag.id) return;
    graphView.x = graphDrag.startX + (e.clientX - graphDrag.x) * graphDrag.scale;
    graphView.y = graphDrag.startY + (e.clientY - graphDrag.y) * graphDrag.scale; graphTransform();
  });
  const finishPan = () => { graphDrag = null; $('research-graph').classList.remove('is-panning'); };
  $('research-graph').addEventListener('pointerup', finishPan);
  $('research-graph').addEventListener('pointercancel', finishPan);
  window.addEventListener('resize', () => {
    if (matchMedia('(max-width: 700px)').matches !== graphLayout.narrow) { graphView.x = 0; graphView.y = 0; graphView.zoom = 1; renderGraph($('topic').value); }
  });
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
