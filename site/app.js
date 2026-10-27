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
  const systems = Array.isArray(catalog.systems) ? catalog.systems : [];
  // Normalize only the display view. Exports retain the unmodified canonical records.
  const resources = [...papers, ...systems.map((system) => ({
    ...system, title: system.name, kind: 'system', status: 'project', date: '', year: null,
    code_url: system.url, code_note: system.availability_note, venue: '', review_depth: 'project'
  }))];
  const rawById = new Map([...papers, ...systems].map((resource) => [resource.id, resource]));
  const routes = Array.isArray(catalog.routes) ? catalog.routes : [];
  const byId = new Map(resources.map((resource) => [resource.id, resource]));
  const topics = meta.topics || {};
  const targets = meta.update_targets || {};
  const fields = ['search', 'topic', 'target', 'kind', 'scope', 'depth', 'year', 'route', 'sort'];
  const queryKeys = { search: 'q', topic: 'topic', target: 'target', kind: 'kind', scope: 'scope', depth: 'depth', year: 'year', route: 'route', sort: 'sort' };
  const kindLabels = { paper: 'Paper', survey: 'Survey', benchmark: 'Benchmark', system: 'System', project: 'Project' };
  const depthLabels = { 'full-text': 'Selected full text inspected', abstract: 'Abstract inspected', project: 'Project documentation inspected' };
  const persistenceLabels = { 'across-tasks': 'Across tasks', 'within-task': 'Within a task', both: 'Within and across tasks', 'not-applicable': 'Not applicable' };
  let filtered = [];
  let resourceView = 'table';
  const expandedResources = new Set();
  let announcementTimer;
  const label = (map, key) => typeof map[key] === 'string' ? map[key] : (map[key]?.label || map[key]?.title || key.replaceAll('-', ' '));
  const unique = (values) => [...new Set(values)].filter(Boolean);
  const allTopics = unique(resources.flatMap((p) => p.topics || [])).sort((a, b) => label(topics, a).localeCompare(label(topics, b)));
  const allTargets = unique(resources.flatMap((p) => p.update_targets || [])).sort((a, b) => label(targets, a).localeCompare(label(targets, b)));
  const topicCounts = Object.fromEntries(allTopics.map((id) => [id, resources.filter((p) => (p.topics || []).includes(id)).length]));
  const corpusLabel = `${papers.length} research works + ${systems.length} systems`;
  const resourceCounts = (items) => ({ literature: items.filter((p) => p.kind !== 'system').length, systems: items.filter((p) => p.kind === 'system').length, total: items.length });
  const textValue = (value) => Array.isArray(value) ? value.join('; ') : value && typeof value === 'object' ? JSON.stringify(value) : value;
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
  unique(resources.map((p) => p.kind)).sort().forEach((kind) => option('kind', kind, kind === 'system' ? 'Systems' : kindLabels[kind] || kind));
  unique(papers.map((p) => p.year)).sort((a, b) => b - a).forEach((year) => option('year', String(year), String(year)));
  routes.forEach((route) => option('route', route.id, route.title));
  $('total-count').textContent = papers.length;
  $('system-count').textContent = systems.length;
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
    b.setAttribute('aria-label', `${label(topics, id)}: ${topicCounts[id]} of ${resources.length} resources in the full collection (${corpusLabel}). Toggle topic filter.`);
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
    resourceView = params.get('view') === 'cards' ? 'cards' : 'table';
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
    if (resourceView === 'cards') url.searchParams.set('view', 'cards');
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
    if (resourceView === 'table') setRowDetails(id, true);
    const article = $(`paper-${id}`);
    if (!article) return;
    article.querySelector('details').open = true;
    article.tabIndex = -1;
    article.focus({ preventScroll: true });
    article.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  }
  function openRelatedPaper(id) {
    if (!byId.has(id)) return;
    if (!filtered.some((p) => p.id === id)) clear();
    focusPaper(id);
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
    $('graph-inspector').replaceChildren(node('p', 'inspector-kicker', 'EXPLORE A CONNECTION'), node('h4', '', 'Discover a paper or system.'), node('p', '', 'Hover or focus a node to inspect it. Select a topic to narrow the map; select a resource to open its evidence notes below.'));
  }
  function inspectNode(type, item, visibleCount) {
    const inspector = $('graph-inspector'); inspector.replaceChildren();
    if (type === 'topic') {
      inspector.append(node('p', 'inspector-kicker', 'CATALOG TOPIC'), node('h4', '', label(topics, item)), node('p', '', `${visibleCount} matching resources in this graph; ${topicCounts[item]} of ${resources.length} resources in the full collection (${corpusLabel}). Select to toggle this topic filter.`));
    } else {
      const context = item.kind === 'system' ? 'System · documentation inspected · not executed' : `${kindLabels[item.kind] || item.kind} · ${item.year} · ${item.scope}`;
      inspector.append(node('p', 'inspector-kicker', context), node('h4', '', item.title), node('p', '', item.mechanism));
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
    const counts = resourceCounts(filtered);
    $('graph-count').textContent = `${counts.literature} research works + ${counts.systems} systems · ${represented.length} topics · ${membershipCount} membership links`;
    $('graph-list-count').textContent = `(${filtered.length} resources)`;
    $('graph-empty').hidden = filtered.length > 0;
    $('research-graph').setAttribute('aria-label', `Interactive topic membership graph: ${counts.literature} research works, ${counts.systems} systems, ${represented.length} topics, ${membershipCount} links`);
    const select = $('graph-work-select'); const previous = select.value;
    select.replaceChildren(node('option', '', 'Choose a resource')); select.firstChild.value = '';
    [...filtered].sort((a, b) => a.title.localeCompare(b.title)).forEach((p) => { const o = node('option', '', `${p.title} (${p.kind === 'system' ? 'system' : p.year})`); o.value = p.id; select.append(o); });
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
      const fullLabel = type === 'topic' ? `${label(topics, item)}: ${count} matching resources. Toggle topic filter.` : `${item.title}, ${item.kind === 'system' ? 'system; not executed' : item.year}. Open evidence notes.`;
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
      const pos = workPositions.get(p.id); const isSystem = p.kind === 'system';
      const g = svgNode('g', { class: `graph-node ${isSystem ? 'graph-system-node' : 'graph-work-node'}`, 'data-resource-node': p.id });
      if (!isSystem) g.setAttribute('data-paper-node', p.id);
      g.append(svgNode('circle', { cx: pos.x, cy: pos.y, r: narrow ? 17 : 12, class: 'hit-area' }));
      const size = narrow ? 12 : 10;
      g.append(isSystem ? svgNode('rect', { x: pos.x - size / 2, y: pos.y - size / 2, width: size, height: size, rx: 1.5, class: 'graph-system-dot' }) : svgNode('circle', { cx: pos.x, cy: pos.y, r: narrow ? 6.5 : 5.4, class: 'graph-work-dot' }));
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
      g.append(title, svgNode('text', { x: lx, y: ly + countOffset, class: 'graph-topic-count', 'text-anchor': anchor }, String(count)));
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
    const isSystem = p.kind === 'system';
    const article = node('article', `paper-card${isSystem ? ' system-card' : ''}`); article.id = `paper-${p.id}`;
    const top = node('div', 'paper-topline');
    if (p.year) top.append(node('span', 'paper-year', p.year));
    top.append(node('span', 'paper-kind', kindLabels[p.kind] || p.kind), node('span', `paper-scope ${p.scope === 'adjacent' ? 'adjacent' : ''}`, p.scope === 'adjacent' ? 'Adjacent' : 'Core'));
    const title = node('h3'); title.append(link(p.title, p.url)); article.append(top, title, node('p', 'paper-summary', p.mechanism));
    if (isSystem && p.category) article.append(node('p', 'system-category', label(meta.system_categories || {}, p.category)));
    const tags = node('div', 'paper-tags');
    (p.topics || []).forEach((id) => { const b = node('button', 'paper-tag', label(topics, id)); b.type = 'button'; b.setAttribute('aria-label', `Filter by ${label(topics, id)}`); b.addEventListener('click', () => { $('topic').value = id; render(); $('topic').focus(); }); tags.append(b); });
    article.append(tags);
    const metadata = node('div', 'paper-meta');
    const status = isSystem ? 'Not executed' : p.status === 'peer-reviewed' ? 'Peer reviewed' : p.status === 'technical-report' ? 'Technical report' : 'Preprint';
    metadata.append(node('span', '', status), node('span', 'depth', depthLabels[p.review_depth] || 'Inspection depth not recorded')); article.append(metadata);
    const details = node('details', 'paper-details'); details.append(node('summary', '', isSystem ? 'Capabilities, requirements & evidence' : 'Learning mechanism, evaluation & sources'));
    if (isSystem) {
      const capabilities = node('div', 'evidence-block'); capabilities.append(node('h4', '', 'Documented capabilities'));
      const list = node('ul', 'system-capabilities');
      (Array.isArray(p.capabilities) ? p.capabilities : [p.capabilities]).filter(Boolean).forEach((value) => list.append(node('li', '', textValue(value))));
      if (list.childElementCount) capabilities.append(list); else capabilities.append(node('p', '', 'Not recorded.'));
      details.append(capabilities, evidence('Requirements', textValue(p.requirements)));
      const license = node('div', 'evidence-block'); license.append(node('h4', '', 'Repository license'));
      const licenseText = textValue(p.license) || 'Not verified.';
      license.append(p.license_url && safeUrl(p.license_url) ? link(licenseText, p.license_url, 'artifact-link') : node('p', '', licenseText)); details.append(license);
      const related = node('div', 'evidence-block'); related.append(node('h4', '', 'Related research'));
      if (p.relationship_note) related.append(node('p', '', p.relationship_note));
      const relatedList = node('ul', 'source-list');
      (p.related_papers || []).forEach((id) => {
        const paper = byId.get(id); if (!paper || paper.kind === 'system') return;
        const li = node('li'); const button = node('button', 'related-paper-link', paper.title); button.type = 'button';
        button.addEventListener('click', () => openRelatedPaper(id)); li.append(button); relatedList.append(li);
      });
      if (relatedList.childElementCount) related.append(relatedList);
      related.append(node('p', 'relationship-boundary', 'A linked paper and this software record may describe the same research lineage. Source inspection does not establish independent reproduction or version equivalence.'));
      details.append(related);
    }
    details.append(evidence('What changes', (p.update_targets || []).map((id) => label(targets, id)).join(', ') || 'Not applicable'));
    details.append(evidence('Persistence', persistenceLabels[p.persistence] || p.persistence));
    details.append(evidence('Learning signal', p.learning_signal));
    details.append(evidence('Evaluation', p.evaluation));
    details.append(evidence('Evidence boundary', p.limitations, 'boundary'));
    if (!isSystem) {
      const relatedSystems = systems.filter((system) => (system.related_papers || []).includes(p.id));
      if (relatedSystems.length) {
        const related = node('div', 'evidence-block'); related.append(node('h4', '', 'Related systems'));
        const list = node('ul', 'source-list');
        relatedSystems.forEach((system) => {
          const li = node('li'); const button = node('button', 'related-paper-link', system.name); button.type = 'button';
          button.addEventListener('click', () => openRelatedPaper(system.id)); li.append(button); list.append(li);
        });
        related.append(list, node('p', 'relationship-boundary', 'These are separate software records from the same research lineage, not independent replications. See each record for version and execution limits.'));
        details.append(related);
      }
    }
    if (p.venue) details.append(evidence('Publication / venue note', p.venue));
    const artifacts = node('div', 'evidence-block'); artifacts.append(node('h4', '', 'Official artifacts'));
    if (p.code_url && safeUrl(p.code_url)) artifacts.append(link('Visit the official repository ↗', p.code_url, 'artifact-link'));
    artifacts.append(node('p', '', p.code_note || 'Artifact availability was not verified.')); details.append(artifacts);
    if (isSystem && p.docs_url && safeUrl(p.docs_url)) artifacts.append(link('Read official documentation ↗', p.docs_url, 'artifact-link system-docs-link'));
    const sources = node('div', 'evidence-block'); sources.append(node('h4', '', 'Sources inspected'));
    const ul = node('ul', 'source-list'); unique(p.sources || [p.url]).forEach((source, i) => { if (!safeUrl(source)) return; const li = node('li'); li.append(link(sourceLabel(source, i), source)); ul.append(li); }); sources.append(ul); details.append(sources);
    details.append(node('p', 'source-footnote', isSystem ? `Project sources checked: ${p.checked || 'not recorded'}. Software was not executed. No release date is asserted.` : `Source date: ${p.date || p.year}. Sources checked: ${p.checked || 'not recorded'}.`));
    details.addEventListener('toggle', () => {
      if (details.open) expandedResources.add(p.id); else expandedResources.delete(p.id);
    });
    article.append(details); return article;
  }
  function mechanismPreview(text, limit = 175) {
    const value = String(text || '');
    if (value.length <= limit) return value;
    const cut = value.lastIndexOf(' ', limit);
    return `${value.slice(0, cut > 0 ? cut : limit)}…`;
  }
  function setRowDetails(id, open) {
    const row = $(`details-row-${id}`); const button = $(`details-toggle-${id}`);
    if (!row || !button) return;
    if (open) expandedResources.add(id); else expandedResources.delete(id);
    row.hidden = !open; button.setAttribute('aria-expanded', String(open)); button.textContent = open ? 'Hide details' : 'Details';
    button.setAttribute('aria-label', `${open ? 'Hide details' : 'Details'} for ${byId.get(id)?.title || id}`);
    if (open && !row.firstElementChild.childElementCount) {
      const p = byId.get(id); if (!p) return;
      const article = card(p); article.querySelector('details').open = true;
      const close = node('button', 'row-close-details', 'Close details ↑'); close.type = 'button';
      close.addEventListener('click', () => { setRowDetails(id, false); button.focus(); });
      article.prepend(close); row.firstElementChild.append(article);
    }
    if (open) row.closest('.catalog-table-scroll').scrollLeft = 0;
  }
  function tableRows(p) {
    const isSystem = p.kind === 'system';
    const row = node('tr', `resource-row${isSystem ? ' system-row' : ''}`); row.dataset.resourceId = p.id;
    const name = node('th', 'resource-name'); name.scope = 'row';
    name.append(link(p.title, p.url, 'resource-title'));
    name.append(node('span', 'resource-row-meta', `${kindLabels[p.kind] || p.kind}${isSystem ? ` · ${label(meta.system_categories || {}, p.category)}` : ` · ${p.date || p.year}`}`));
    name.append(node('span', `row-scope ${p.scope === 'adjacent' ? 'adjacent' : ''}`, p.scope === 'adjacent' ? 'Adjacent' : 'Core'));
    const mechanism = node('td', 'resource-mechanism', mechanismPreview(p.mechanism));
    const changes = node('td', 'resource-targets');
    (p.update_targets || []).forEach((target) => changes.append(node('span', 'row-target', label(targets, target))));
    const evidenceCell = node('td', 'resource-evidence');
    const status = isSystem ? 'Project · not executed' : p.status === 'peer-reviewed' ? 'Peer reviewed' : p.status === 'technical-report' ? 'Technical report' : 'Preprint';
    evidenceCell.append(node('strong', '', status), node('span', '', depthLabels[p.review_depth] || 'Inspection not recorded'));
    const actions = node('td', 'resource-actions');
    actions.append(link(isSystem ? 'Repository ↗' : 'Paper ↗', p.url, 'row-source-link'));
    if (!isSystem && p.code_url && p.code_url !== p.url && safeUrl(p.code_url)) actions.append(link('Code ↗', p.code_url, 'row-source-link'));
    const detailsButton = node('button', 'row-details-button', 'Details'); detailsButton.type = 'button'; detailsButton.id = `details-toggle-${p.id}`;
    detailsButton.setAttribute('aria-expanded', 'false'); detailsButton.setAttribute('aria-controls', `details-row-${p.id}`); detailsButton.setAttribute('aria-label', `Details for ${p.title}`);
    detailsButton.addEventListener('click', () => {
      const shouldOpen = detailsButton.getAttribute('aria-expanded') !== 'true';
      setRowDetails(p.id, shouldOpen);
      if (shouldOpen) focusPaper(p.id);
    });
    actions.append(detailsButton); row.append(name, mechanism, changes, evidenceCell, actions);
    const detailRow = node('tr', 'resource-detail-row'); detailRow.id = `details-row-${p.id}`; detailRow.hidden = true;
    const cell = node('td'); cell.colSpan = 5; detailRow.append(cell);
    return [row, detailRow];
  }
  function renderResourceList() {
    const container = $('papers'); container.replaceChildren();
    $('view-table').setAttribute('aria-pressed', String(resourceView === 'table'));
    $('view-cards').setAttribute('aria-pressed', String(resourceView === 'cards'));
    $('view-help').textContent = resourceView === 'table' ? 'Compare entries in the table. Open Details for the complete annotation; scroll the table sideways on small screens.' : 'Browse annotated cards. Expand an entry for its evaluation, boundaries, and sources.';
    if (resourceView === 'cards') {
      container.className = 'paper-grid';
      const fragment = document.createDocumentFragment();
      filtered.forEach((p) => { const article = card(p); if (expandedResources.has(p.id)) article.querySelector('details').open = true; fragment.append(article); });
      container.append(fragment); return;
    }
    container.className = 'resource-results';
    if (!filtered.length) return;
    const scroll = node('div', 'catalog-table-scroll'); scroll.tabIndex = 0; scroll.setAttribute('role', 'region'); scroll.setAttribute('aria-label', 'Filtered resource catalog; scroll horizontally if needed');
    const table = node('table', 'catalog-table');
    const counts = resourceCounts(filtered);
    table.append(node('caption', '', `${counts.literature} research works and ${counts.systems} systems. Mechanisms are shortened here; Details retains each complete annotation.`));
    const head = node('thead'); const headings = node('tr');
    ['Resource', 'Learning mechanism', 'What changes', 'Evidence', 'Links / details'].forEach((title) => { const th = node('th', '', title); th.scope = 'col'; headings.append(th); });
    head.append(headings); table.append(head);
    const body = node('tbody'); filtered.forEach((p) => body.append(...tableRows(p))); table.append(body); scroll.append(table); container.append(scroll);
    filtered.filter((p) => expandedResources.has(p.id)).forEach((p) => setRowDetails(p.id, true));
  }
  function render() {
    const s = state();
    const terms = s.search.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
    const selectedRoute = routes.find((r) => r.id === s.route);
    const routeIds = selectedRoute ? new Set((selectedRoute.steps || []).map((step) => step.paper)) : null;
    filtered = resources.filter((p) => {
      const searchable = [p.title, p.id, p.mechanism, p.evaluation, p.limitations, p.learning_signal, p.venue, p.category, textValue(p.capabilities), textValue(p.requirements), textValue(p.license), p.relationship_note, ...(p.topics || []).map((id) => label(topics, id)), ...(p.update_targets || []).map((id) => label(targets, id))].join(' ').toLocaleLowerCase();
      return terms.every((term) => searchable.includes(term)) && (!s.topic || (p.topics || []).includes(s.topic)) && (!s.target || (p.update_targets || []).includes(s.target)) && (!s.kind || p.kind === s.kind) && (!s.scope || p.scope === s.scope) && (!s.depth || p.review_depth === s.depth) && (!s.year || String(p.year) === s.year) && (!routeIds || routeIds.has(p.id));
    });
    filtered.sort((a, b) => {
      if (s.sort === 'title') return a.title.localeCompare(b.title);
      if ((a.kind === 'system') !== (b.kind === 'system')) return a.kind === 'system' ? 1 : -1;
      if (a.kind === 'system' && b.kind === 'system') return a.title.localeCompare(b.title);
      const dates = String(a.date || a.year).localeCompare(String(b.date || b.year));
      return (s.sort === 'oldest' ? dates : -dates) || a.title.localeCompare(b.title);
    });
    renderResourceList();
    const counts = resourceCounts(filtered);
    $('result-count').textContent = `${filtered.length} of ${resources.length} resources · ${counts.literature} research works + ${counts.systems} systems${selectedRoute ? ' · reading route' : ''}`;
    $('empty-state').hidden = filtered.length !== 0;
    $('export').disabled = filtered.length === 0;
    const active = fields.filter((id) => id !== 'sort' && s[id]);
    $('clear-filters').disabled = active.length === 0 && s.sort === 'newest';
    const advanced = ['kind', 'scope', 'depth', 'year', 'route'].filter((id) => s[id]);
    $('advanced-count').textContent = advanced.length ? `(${advanced.length} active)` : '';
    document.querySelectorAll('.theme-pill').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.topic === s.topic)));
    document.querySelectorAll('.cloud-word').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.topic === s.topic)));
    $('cloud-selection').textContent = s.topic ? `Selected: ${label(topics, s.topic)}. Cloud counts remain based on the full collection (${corpusLabel}); the graph shows this filtered view.` : `Full collection: ${corpusLabel} across ${allTopics.length} overlapping topics. Filters apply to the graph and resource list.`;
    renderGraph(s.topic);
    renderRoute(s.route); writeUrl();
  }
  function clear() { fields.forEach((id) => { $(id).value = id === 'sort' ? 'newest' : ''; }); render(); }
  fields.forEach((id) => $(id).addEventListener(id === 'search' ? 'input' : 'change', render));
  ['table', 'cards'].forEach((view) => $(`view-${view}`).addEventListener('click', () => {
    resourceView = view; renderResourceList(); writeUrl();
  }));
  $('clear-filters').addEventListener('click', clear);
  $('systems-nav').addEventListener('click', (e) => {
    e.preventDefault(); fields.forEach((id) => { $(id).value = id === 'sort' ? 'newest' : ''; });
    $('kind').value = 'system'; $('advanced-filters').open = true; render();
    $('catalog').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    $('kind').focus({ preventScroll: true });
  });
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
    const data = { collection: meta.title || 'Awesome Agents That Learn', source: repo, exported_at: new Date().toISOString(), filters: state(), count: filtered.length, counts: resourceCounts(filtered), papers: filtered.filter((p) => p.kind !== 'system').map((p) => rawById.get(p.id)), systems: filtered.filter((p) => p.kind === 'system').map((p) => rawById.get(p.id)) };
    const blobUrl = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2) + '\n'], { type: 'application/json' }));
    const a = node('a'); a.href = blobUrl; a.download = 'agents-that-learn-selection.json'; document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(blobUrl), 1000); announce(`Exported ${data.counts.literature} research works and ${data.counts.systems} systems with their original metadata.`);
  });
  window.addEventListener('popstate', () => { readUrl(); render(); });
  readUrl(); render();
})();
