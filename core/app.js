const app = document.getElementById('app');
let eventsBound = false;

const state = {
  clientId: null,
  base: '',
  config: null,
  lang: 'en',
  dict: {},
  data: {},
  screen: 'home',
  installPrompt: null,
  supportedLanguages: []
};

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const allowedScreens = new Set(['home', 'start', 'household', 'kit', 'plan', 'quick', 'roles', 'hazards', 'resources', 'settings']);
const dataFiles = ['cards', 'sections', 'checklists', 'flows', 'roles', 'resources'];

const pick = value => {
  if (typeof value === 'object' && value) return value[state.lang] || value.en || Object.values(value)[0] || '';
  return value ?? '';
};
const t = key => state.dict[key] || key;
const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const escapeAttr = escapeHTML;
const safe = value => escapeHTML(pick(value));
const safeT = key => escapeHTML(t(key));
const textValue = value => String(pick(value) ?? '');
const storageKey = suffix => `${state.clientId}:${suffix}`;

function validClientId(id) {
  return /^[a-z0-9-]+$/.test(String(id || ''));
}

function safeScreen(value, fallback = 'home') {
  return allowedScreens.has(value) ? value : fallback;
}

function safeLocalAsset(path) {
  const value = String(path || '');
  if (!value || value.includes('..') || value.startsWith('/') || /^[a-z][a-z0-9+.-]*:/i.test(value)) return '';
  return state.base + value.split('/').map(encodeURIComponent).join('/').replaceAll('%2F', '/');
}

function safeHref(url, allowed = ['http:', 'https:', 'tel:', 'mailto:']) {
  const value = String(url || '').trim();
  if (!value) return '';
  try {
    const parsed = new URL(value, location.href);
    return allowed.includes(parsed.protocol) ? escapeAttr(value) : '';
  } catch (_) {
    return '';
  }
}

async function fetchJSON(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`Could not load ${url}`);
  return r.json();
}

function normalizeLanguages() {
  const configured = Array.isArray(state.config?.languages) && state.config.languages.length ? state.config.languages : ['en'];
  state.supportedLanguages = configured.map(lang => {
    if (typeof lang === 'string') return { code: lang, label: lang.toUpperCase(), nativeName: lang.toUpperCase(), dir: 'ltr' };
    return {
      code: lang.code,
      label: lang.label || lang.name || String(lang.code).toUpperCase(),
      nativeName: lang.nativeName || lang.label || lang.name || String(lang.code).toUpperCase(),
      dir: lang.dir || 'ltr'
    };
  }).filter(lang => lang.code && /^[a-z]{2,3}(-[A-Za-z0-9]+)?$/.test(lang.code));

  if (!state.supportedLanguages.length) state.supportedLanguages = [{ code: 'en', label: 'English', nativeName: 'English', dir: 'ltr' }];
}

const supportedLanguageCodes = () => state.supportedLanguages.map(lang => lang.code);
const validLanguage = code => supportedLanguageCodes().includes(code);
const languageLabel = code => state.supportedLanguages.find(lang => lang.code === code)?.nativeName || code.toUpperCase();

async function init() {
  try {
    const params = new URLSearchParams(location.search);
    const active = await fetchJSON('active-client.json');
    const requestedClient = params.get('client') || active.clientId;
    if (!validClientId(requestedClient)) throw new Error('Invalid client.');

    state.clientId = requestedClient;
    state.base = `clients/${state.clientId}/`;
    state.config = await fetchJSON(state.base + 'config.json');
    normalizeLanguages();

    const requestedLang = params.get('lang') || localStorage.getItem(storageKey('lang')) || state.config.defaultLanguage || 'en';
    state.lang = validLanguage(requestedLang) ? requestedLang : (validLanguage(state.config.defaultLanguage) ? state.config.defaultLanguage : state.supportedLanguages[0].code);

    await loadLanguage(state.lang);
    await loadThemeAndManifest();
    await loadData();
    restorePrefs();
    render();
    registerSW();
  } catch (e) {
    app.innerHTML = `<main class="panel" style="margin:2rem"><h1>Guide could not load</h1><p>${escapeHTML(e.message)}</p></main>`;
  }
}

async function loadLanguage(langCode = state.lang) {
  const fallbackCode = validLanguage(state.config.defaultLanguage) ? state.config.defaultLanguage : state.supportedLanguages[0].code;
  let fallbackDict = {};
  try { fallbackDict = await fetchJSON(`${state.base}languages/${fallbackCode}.json`); } catch (_) { fallbackDict = {}; }

  try {
    const selectedDict = await fetchJSON(`${state.base}languages/${langCode}.json`);
    state.lang = langCode;
    state.dict = { ...fallbackDict, ...selectedDict };
  } catch (_) {
    state.lang = fallbackCode;
    state.dict = fallbackDict;
    localStorage.setItem(storageKey('lang'), state.lang);
    toast(`Language file unavailable. Showing ${languageLabel(state.lang)}.`);
  }
  document.documentElement.lang = state.lang;
  document.documentElement.dir = state.supportedLanguages.find(lang => lang.code === state.lang)?.dir || 'ltr';
}

async function setLanguage(nextLang) {
  if (!validLanguage(nextLang) || nextLang === state.lang) return;
  localStorage.setItem(storageKey('lang'), nextLang);
  await loadLanguage(nextLang);
  render();
  toast(`${t('languageChanged') || t('language')}: ${languageLabel(state.lang)}`);
}

async function loadThemeAndManifest() {
  let link = document.getElementById('client-theme');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'stylesheet';
    link.id = 'client-theme';
    document.head.appendChild(link);
  }
  link.href = state.base + 'theme.css';

  let manifest = document.querySelector('link[rel="manifest"]');
  if (!manifest) {
    manifest = document.createElement('link');
    manifest.rel = 'manifest';
    document.head.appendChild(manifest);
  }
  manifest.href = state.base + 'manifest.json';

  document.title = pick(state.config.appName) || 'Emergency Guide';
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', state.config.brand?.primaryColor || '#e63946');
}

async function loadData() {
  await Promise.all(dataFiles.map(async name => {
    state.data[name] = await fetchJSON(`${state.base}data/${name}.json`);
  }));
}

function restorePrefs() {
  document.body.classList.toggle('dark', localStorage.getItem(storageKey('theme')) === 'dark');
  document.body.classList.toggle('large-text', localStorage.getItem(storageKey('textSize')) === 'large');
}

function render() {
  app.innerHTML = `${hero()}<main id="main" class="main" tabindex="-1">${screenHome()}${screenStart()}${screenHousehold()}${screenKit()}${screenPlan()}${screenQuick()}${screenRoles()}${screenHazards()}${screenResources()}${screenSettings()}</main>${bottomNav()}<div id="toast" class="toast hidden" role="status" aria-live="polite"></div>`;
  bind();
  showScreen(state.screen, false);
}

function iconHTML(icon, fallback = 'fa-solid fa-circle') {
  const cls = String(icon || fallback);
  return /^fa[-a-z0-9 ]+$/.test(cls) ? `<i class="${escapeAttr(cls)}" aria-hidden="true"></i>` : `<i class="${escapeAttr(fallback)}" aria-hidden="true"></i>`;
}

function languageSelectHTML() {
  return `<label class="language-control"><span class="sr-only">${safeT('language')}</span><i class="fa-solid fa-language" aria-hidden="true"></i><select id="language-select" data-action="language-select" aria-label="${safeT('language')}">${state.supportedLanguages.map(lang => `<option value="${escapeAttr(lang.code)}" ${lang.code === state.lang ? 'selected' : ''}>${escapeHTML(lang.nativeName || lang.label)}</option>`).join('')}</select></label>`;
}

function hero() {
  const logo = safeLocalAsset(state.config.brand?.logo);
  return `<header class="hero"><div class="topbar"><div class="brand"><img src="${escapeAttr(logo)}" alt=""><span>${safe(state.config.shortName)}</span></div><div class="toolbar">${languageSelectHTML()}<button class="btn ghost" data-action="text">${iconHTML('fa-solid fa-text-height')}<span>${document.body.classList.contains('large-text') ? safeT('normalText') : safeT('largeText')}</span></button><button class="btn ghost" data-action="theme">${iconHTML('fa-solid fa-circle-half-stroke')}<span>${safeT('theme')}</span></button><button class="btn primary install-hidden" data-action="install" id="install-button" disabled>${iconHTML('fa-solid fa-download')}<span>${safeT('install')}</span></button><button class="btn ghost" data-screen="settings">${iconHTML('fa-solid fa-gear')}<span>${safeT('settings')}</span></button></div></div><div class="hero-copy"><div class="eyebrow">${safeT('offlineReady')}</div><h1>${safe(state.config.appName)}</h1><p>${safeT('heroDescription')}</p><div class="hero-actions"><button class="btn primary" data-screen="start">${iconHTML('fa-solid fa-route')}<span>${safeT('start')}</span></button><button class="btn secondary" data-screen="kit">${iconHTML('fa-solid fa-list-check')}<span>${safeT('kit')}</span></button><button class="btn danger" data-screen="quick">${iconHTML('fa-solid fa-bolt')}<span>${safeT('quick')}</span></button></div></div></header>`;
}

function navIcon(screen) {
  const icons = {
    home: 'fa-solid fa-house',
    start: 'fa-solid fa-route',
    kit: 'fa-solid fa-list-check',
    plan: 'fa-solid fa-people-roof',
    quick: 'fa-solid fa-bolt',
    resources: 'fa-solid fa-phone-volume',
    settings: 'fa-solid fa-gear'
  };
  return iconHTML(icons[screen]);
}

function bottomNav() {
  return `<nav class="bottom-nav" aria-label="Primary"><button class="nav-btn" data-screen="home">${navIcon('home')}<span>${safeT('home')}</span></button><button class="nav-btn" data-screen="start">${navIcon('start')}<span>${safeT('start')}</span></button><button class="nav-btn" data-screen="kit">${navIcon('kit')}<span>${safeT('kit')}</span></button><button class="nav-btn" data-screen="plan">${navIcon('plan')}<span>${safeT('plan')}</span></button><button class="nav-btn" data-screen="quick">${navIcon('quick')}<span>${safeT('quick')}</span></button><button class="nav-btn" data-screen="resources">${navIcon('resources')}<span>${safeT('resources')}</span></button><button class="nav-btn" data-screen="settings">${navIcon('settings')}<span>${safeT('settings')}</span></button></nav>`;
}

function screenHome() {
  return `<section id="screen-home" class="screen"><div class="cards">${(state.data.cards || []).map(card => `<button class="card" data-screen="${escapeAttr(safeScreen(card.screen))}"><span class="section-icon" aria-hidden="true">${iconHTML(card.icon)}</span><h2>${safe(card.title)}</h2><p>${safe(card.description)}</p></button>`).join('')}</div></section>`;
}

function sectionScreen(id) {
  const section = state.data.sections[id] || { items: [] };
  return `<section id="screen-${escapeAttr(id)}" class="screen"><div class="panel"><div class="panel-header"><div><h2>${safe(section.title)}</h2><p class="muted">${safe(section.summary)}</p></div><button class="btn" data-screen="home">${iconHTML('fa-solid fa-house')}<span>${safeT('home')}</span></button></div></div><div class="grid-2">${(section.items || []).map(item => `<article class="section-card"><span class="section-icon" aria-hidden="true">${iconHTML(item.icon || item.fa || 'fa-solid fa-circle-info')}</span><h3>${safe(item.title)}</h3><p>${safe(item.body)}</p></article>`).join('')}</div></section>`;
}

const screenStart = () => sectionScreen('start');

function screenHousehold() {
  const section = state.data.sections.household || { items: [] };
  return `<section id="screen-household" class="screen"><div class="panel"><div class="panel-header"><div><h2>${safe(section.title)}</h2><p class="muted">${safe(section.summary)}</p></div><button class="btn" data-screen="home">${iconHTML('fa-solid fa-house')}<span>${safeT('home')}</span></button></div></div><div class="grid-2">${(section.items || []).map(item => `<article class="section-card"><span class="section-icon" aria-hidden="true">${iconHTML(item.icon || item.fa || 'fa-solid fa-circle-check')}</span><h3>${safe(item.title)}</h3><p>${safe(item.body)}</p></article>`).join('')}</div><div class="panel">${checklistHTML('household')}</div></section>`;
}

function checklistHTML(name) {
  const checklist = state.data.checklists[name] || { title: '', items: [] };
  const saved = JSON.parse(localStorage.getItem(storageKey('checks:' + name)) || '{}');
  const total = checklist.items.length;
  const done = checklist.items.filter(item => saved[item.id]).length;
  const pct = total ? Math.round(done / total * 100) : 0;
  return `<div class="panel-header"><div><h2>${safe(checklist.title)}</h2><p class="muted">${done}/${total} ${safeT('complete')}</p></div><button class="btn" data-reset-checks="${escapeAttr(name)}">${iconHTML('fa-solid fa-rotate-left')}<span>${safeT('clear')}</span></button></div><div class="progress-bar" aria-label="${escapeAttr(`${pct}% ${t('complete')}`)}"><span style="width:${pct}%"></span></div><div>${checklist.items.map(item => `<label class="check-item"><input type="checkbox" data-checklist="${escapeAttr(name)}" data-check="${escapeAttr(item.id)}" ${saved[item.id] ? 'checked' : ''}><span>${safe(item.label)}</span></label>`).join('')}</div>`;
}

function screenKit() {
  return `<section id="screen-kit" class="screen"><div class="panel">${checklistHTML('readyKit')}</div></section>`;
}

function planFields() {
  return [
    ['neighborhoodName', t('neighborhoodName'), 'text'],
    ['gatheringSite', t('gatheringSite'), 'text'],
    ['careSite', t('careSite'), 'text'],
    ['coordinator', t('coordinator'), 'text'],
    ['liaison', t('liaison'), 'text'],
    ['radioRelay', t('radioRelay'), 'text'],
    ['annualReviewDate', t('annualReviewDate'), 'date'],
    ['communicationMethods', t('communicationMethods'), 'textarea'],
    ['skillsEquipment', t('skillsEquipment'), 'textarea'],
    ['specialNeedsNotes', t('specialNeedsNotes'), 'textarea']
  ];
}

function getPlan() {
  return JSON.parse(localStorage.getItem(storageKey('plan')) || '{}');
}

function planSummary(plan = getPlan()) {
  const lines = planFields().map(([key, label]) => `${label}: ${plan[key] || ''}`);
  return `${t('planBuilder')}\n\n${lines.join('\n')}`;
}

function screenPlan() {
  const plan = getPlan();
  return `<section id="screen-plan" class="screen"><div class="panel"><div class="panel-header"><div><h2>${safeT('planBuilder')}</h2><p class="muted">${safeT('planDescription')}</p></div><button class="btn" data-screen="quick">${iconHTML('fa-solid fa-bolt')}<span>${safeT('quick')}</span></button></div><form id="plan-form" class="form-grid">${planFields().map(([key, label, type]) => `<label class="field"><span>${escapeHTML(label)}</span>${type === 'textarea' ? `<textarea name="${escapeAttr(key)}">${escapeHTML(plan[key] || '')}</textarea>` : `<input name="${escapeAttr(key)}" type="${escapeAttr(type)}" value="${escapeAttr(plan[key] || '')}">`}</label>`).join('')}<div class="form-actions"><button class="btn primary" type="submit">${iconHTML('fa-solid fa-floppy-disk')}<span>${safeT('save')}</span></button><button class="btn" type="button" data-action="print-plan">${iconHTML('fa-solid fa-print')}<span>${safeT('printPlan')}</span></button><button class="btn" type="button" data-action="copy-plan">${iconHTML('fa-solid fa-copy')}<span>${safeT('copySummary')}</span></button><button class="btn" type="button" data-action="export-plan">${iconHTML('fa-solid fa-file-export')}<span>${safeT('exportJson')}</span></button><button class="btn danger" type="button" data-action="clear-plan">${iconHTML('fa-solid fa-eraser')}<span>${safeT('clearPlan')}</span></button></div></form></div><div class="panel">${checklistHTML('planSteps')}</div></section>`;
}

function screenQuick() {
  const flow = state.data.flows.emergency || { steps: [] };
  return `<section id="screen-quick" class="screen emergency-screen"><div class="panel"><div class="panel-header"><div><h2>${safe(flow.title)}</h2><p class="muted">${safeT('quickDescription')}</p></div><a class="btn danger" href="tel:911">${iconHTML('fa-solid fa-phone')}<span>${safeT('call')} 911</span></a></div></div><div class="grid-2">${(flow.steps || []).map(step => `<article class="step-card quick-step"><div class="step-num">${escapeHTML(step.number)}</div><div><h3>${safe(step.title)}</h3><p>${safe(step.body)}</p></div></article>`).join('')}</div></section>`;
}

function screenRoles() {
  return `<section id="screen-roles" class="screen"><div class="panel"><h2>${safeT('roles')}</h2><p class="muted">${safeT('rolesDescription')}</p></div><div class="grid-2">${(state.data.roles.roles || []).map(role => `<article class="role-card"><span class="section-icon" aria-hidden="true">${iconHTML(role.icon || 'fa-solid fa-user-shield')}</span><h3>${safe(role.title)}</h3><p>${safe(role.body)}</p></article>`).join('')}</div></section>`;
}

function screenHazards() {
  const section = state.data.sections.hazards || { groups: [] };
  return `<section id="screen-hazards" class="screen"><div class="panel"><h2>${safe(section.title)}</h2><p class="muted">${safeT('hazardsDescription')}</p></div><div class="grid-2">${(section.groups || []).map(group => `<article class="section-card"><span class="section-icon" aria-hidden="true">${iconHTML(group.icon || 'fa-solid fa-triangle-exclamation')}</span><h3>${safe(group.title)}</h3><ul>${(group.items || []).map(item => `<li>${safe(item)}</li>`).join('')}</ul></article>`).join('')}</div></section>`;
}

function screenResources() {
  return `<section id="screen-resources" class="screen"><div class="panel"><h2>${safeT('resources')}</h2><label class="field"><span>${safeT('search')}</span><input class="search-input" id="resource-search" placeholder="${safeT('searchPlaceholder')}"></label></div><div id="resources-list" class="grid-2">${resourcesHTML(state.data.resources || [])}</div></section>`;
}

function resourcesHTML(list) {
  if (!list.length) return `<div class="panel empty-state"><p>${safeT('noResults')}</p></div>`;
  return list.map(resource => {
    const phoneHref = safeHref(resource.href || (resource.phone ? `tel:${String(resource.phone).replace(/[^0-9+]/g, '')}` : ''), ['tel:']);
    const webHref = safeHref(resource.website, ['http:', 'https:']);
    return `<article class="resource-card"><span class="section-icon" aria-hidden="true">${iconHTML(resource.icon || 'fa-solid fa-phone-volume')}</span><h3>${safe(resource.name)}</h3><p class="muted">${safe(resource.category)}</p><p>${safe(resource.description)}</p><div class="resource-actions">${resource.phone && phoneHref ? `<a class="btn primary" href="${phoneHref}">${iconHTML('fa-solid fa-phone')}<span>${safeT('call')} ${safe(resource.phone)}</span></a>` : ''}${resource.website && webHref ? `<a class="btn" target="_blank" rel="noopener" href="${webHref}">${iconHTML('fa-solid fa-arrow-up-right-from-square')}<span>${safeT('openWebsite')}</span></a>` : ''}</div></article>`;
  }).join('');
}

function screenSettings() {
  const pdf = safeLocalAsset('assets/pdfs/emergency-preparedness-neighborhood-guide.pdf');
  const review = state.config.contentReview || {};
  return `<section id="screen-settings" class="screen"><div class="panel"><h2>${safeT('settings')}</h2><p>${safeT('privacy')}</p><p class="muted">${safeT('installIos')}</p><div class="hero-actions"><a class="btn primary" href="${escapeAttr(pdf)}" download>${iconHTML('fa-solid fa-file-pdf')}<span>${safeT('downloadPdf')}</span></a><button class="btn danger" data-action="reset">${iconHTML('fa-solid fa-trash')}<span>${safeT('resetProgress')}</span></button></div></div><div class="panel source-panel"><h2>${safeT('source')}</h2><p><strong>${safeT('sourceTitle')}:</strong> ${safe(review.sourceTitle || state.config.description)}</p><p><strong>${safeT('lastReviewed')}:</strong> ${escapeHTML(review.lastReviewed || 'Not set')}</p><p><strong>${safeT('contentOwner')}:</strong> ${escapeHTML(review.owner || 'Not set')}</p><p class="muted">${safeT('sourceDisclaimer')}</p></div></section>`;
}

function showScreen(name = 'home', focus = true) {
  state.screen = safeScreen(name);
  $$('.screen').forEach(screen => screen.classList.toggle('active', screen.id === `screen-${state.screen}`));
  $$('.nav-btn').forEach(button => button.classList.toggle('active', button.dataset.screen === state.screen));
  if (focus) $('#main')?.focus();
}

function savePlanForm(form) {
  const obj = Object.fromEntries(new FormData(form).entries());
  localStorage.setItem(storageKey('plan'), JSON.stringify(obj));
  return obj;
}

function downloadJSON(filename, data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function bind() {
  if (eventsBound) return;
  eventsBound = true;

  app.addEventListener('click', async event => {
    const screen = event.target.closest('[data-screen]')?.dataset.screen;
    if (screen) showScreen(screen);

    const action = event.target.closest('[data-action]')?.dataset.action;
    if (!action) return;

    if (action === 'theme') {
      document.body.classList.toggle('dark');
      localStorage.setItem(storageKey('theme'), document.body.classList.contains('dark') ? 'dark' : 'light');
    }

    if (action === 'text') {
      document.body.classList.toggle('large-text');
      localStorage.setItem(storageKey('textSize'), document.body.classList.contains('large-text') ? 'large' : 'normal');
      render();
    }

    if (action === 'install' && state.installPrompt) {
      state.installPrompt.prompt();
      state.installPrompt = null;
      $('#install-button')?.classList.add('install-hidden');
    }

    if (action === 'reset') {
      Object.keys(localStorage).filter(key => key.startsWith(state.clientId + ':')).forEach(key => localStorage.removeItem(key));
      toast(t('resetDone'));
      await init();
    }

    if (action === 'print-plan') {
      const form = $('#plan-form');
      if (form) savePlanForm(form);
      window.print();
    }

    if (action === 'copy-plan') {
      const form = $('#plan-form');
      const plan = form ? savePlanForm(form) : getPlan();
      await navigator.clipboard?.writeText(planSummary(plan));
      toast(t('copied'));
    }

    if (action === 'export-plan') {
      const form = $('#plan-form');
      const plan = form ? savePlanForm(form) : getPlan();
      downloadJSON(`${state.clientId}-neighborhood-plan.json`, { clientId: state.clientId, exportedAt: new Date().toISOString(), plan });
    }

    if (action === 'clear-plan') {
      localStorage.removeItem(storageKey('plan'));
      render();
      showScreen('plan', false);
      toast(t('planCleared'));
    }

    const reset = event.target.closest('[data-reset-checks]')?.dataset.resetChecks;
    if (reset) {
      localStorage.removeItem(storageKey('checks:' + reset));
      render();
      showScreen(state.screen, false);
    }
  });

  app.addEventListener('change', async event => {
    if (event.target.matches('[data-action="language-select"]')) {
      await setLanguage(event.target.value);
      return;
    }

    if (event.target.matches('[data-checklist]')) {
      const name = event.target.dataset.checklist;
      const id = event.target.dataset.check;
      const saved = JSON.parse(localStorage.getItem(storageKey('checks:' + name)) || '{}');
      saved[id] = event.target.checked;
      localStorage.setItem(storageKey('checks:' + name), JSON.stringify(saved));
      render();
      showScreen(state.screen, false);
    }
  });

  app.addEventListener('submit', event => {
    if (event.target.id === 'plan-form') {
      event.preventDefault();
      savePlanForm(event.target);
      toast(t('saved'));
    }
  });

  app.addEventListener('input', event => {
    if (event.target.id === 'resource-search') {
      const q = event.target.value.toLowerCase().trim();
      const list = (state.data.resources || []).filter(resource => {
        const searchable = [
          textValue(resource.name),
          textValue(resource.category),
          textValue(resource.phone),
          textValue(resource.website),
          textValue(resource.description)
        ].join(' ').toLowerCase();
        return searchable.includes(q);
      });
      $('#resources-list').innerHTML = resourcesHTML(list);
    }
  });
}

function toast(message) {
  const el = $('#toast');
  if (!el) return;
  el.textContent = message;
  el.classList.remove('hidden');
  setTimeout(() => el.classList.add('hidden'), 2600);
}

function registerSW() {
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    state.installPrompt = event;
    const button = $('#install-button');
    if (button) {
      button.disabled = false;
      button.classList.remove('install-hidden');
    }
  });
}

init();
