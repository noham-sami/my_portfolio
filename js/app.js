(() => {
  const data = window.PORTFOLIO_DATA;
  const translations = window.I18N;
  const store = {
    get(k){ try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v){ try { localStorage.setItem(k, v); } catch {} }
  };
  const browserLang = (navigator.language || 'fr').slice(0, 2) === 'fr' ? 'fr' : 'en';
  let lang = store.get('portfolio-lang') || browserLang;
  if (!translations[lang]) lang = 'fr';

  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const t = (key) => key.split('.').reduce((acc, part) => acc?.[part], translations[lang]) ?? key;
  const esc = (s = '') => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const visual = (key) => data.visuals[key] || key;
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');

  // Icônes au trait (24×24), dessinées à la main pour ne dépendre d'aucune librairie.
  const ICONS = {
    globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    bulb:'<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.7.5 1.1 1.3 1.1 2.1V16h5v-.1c0-.8.4-1.6 1.1-2.1A6 6 0 0 0 12 3z"/>',
    users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.6-3.4 3.2-5.5 6.5-5.5s5.9 2.1 6.5 5.5M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.8c1.9.7 3.2 2.5 3.5 5.2"/>',
    rocket:'<path d="M14 4.5c2.6-1.4 5-1.6 6.3-1.5.1 1.3-.1 3.7-1.5 6.3-1.3 2.4-3.6 4.6-6.8 6.2l-3.5-3.5c1.6-3.2 3.8-5.5 6.2-6.8z"/><path d="M8.5 12 5 11.5l2.5-3 3.8-.3M12 15.5l.5 3.5 3-2.5.3-3.8M6.5 15.5c-1.5.5-2.5 2-2.8 4.8 2.8-.3 4.3-1.3 4.8-2.8"/><circle cx="15.5" cy="8.5" r="1.4"/>',
    mail:'<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m4 7 8 6 8-6"/>',
    phone:'<path d="M5 3.5h3.2l1.6 4.2-2.1 1.4a11 11 0 0 0 5.2 5.2l1.4-2.1 4.2 1.6V17a2.5 2.5 0 0 1-2.7 2.5A15.5 15.5 0 0 1 2.5 6.2 2.5 2.5 0 0 1 5 3.5z"/>',
    linkedin:'<rect x="3" y="3" width="18" height="18" rx="3.5"/><path d="M8 10.5V16M8 7.6v.1M11.5 16v-5.5M11.5 13c0-1.6 1-2.6 2.4-2.6s2.1 1 2.1 2.6V16"/>',
    github:'<path d="M15 21v-3.5a4 4 0 0 0-1-3c3 0 6-1.8 6-5.5a4.6 4.6 0 0 0-1.2-3.2 4.2 4.2 0 0 0-.1-3.3s-1 0-3.2 1.5a11 11 0 0 0-5 0C7.3 2.5 6.3 2.5 6.3 2.5a4.2 4.2 0 0 0-.1 3.3A4.6 4.6 0 0 0 5 9c0 3.7 3 5.5 6 5.5a4 4 0 0 0-1 3V21"/><path d="M9 18.5c-3 1-4-1-5.5-1.5"/>',
    download:'<path d="M12 4v11m0 0 4.5-4.5M12 15l-4.5-4.5M5 20h14"/>',
    file:'<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>',
    arrowRight:'<path d="M5 12h14m-5-5 5 5-5 5"/>',
    arrowLeft:'<path d="M19 12H5m5-5-5 5 5 5"/>',
    arrowDown:'<path d="M12 5v14m-5-5 5 5 5-5"/>',
    chevronLeft:'<path d="m15 6-6 6 6 6"/>',
    chevronRight:'<path d="m9 6 6 6-6 6"/>',
    clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    pin:'<path d="M12 21s-6.5-6.1-6.5-11a6.5 6.5 0 0 1 13 0c0 4.9-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>',
    team:'<circle cx="12" cy="8" r="3"/><circle cx="5" cy="10" r="2.2"/><circle cx="19" cy="10" r="2.2"/><path d="M6.5 20c.5-3.2 2.8-5 5.5-5s5 1.8 5.5 5M1.8 18c.3-1.9 1.5-3 3.2-3.2M22.2 18c-.3-1.9-1.5-3-3.2-3.2"/>',
    target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2"/>',
    copy:'<rect x="8" y="8" width="12" height="12" rx="2.5"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',
    check:'<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    kanban:'<rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M8 8v6M12 8v9M16 8v4"/>',
    code:'<path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14"/>',
    chart:'<path d="M4 20V11M10 20V5M16 20v-6M2 20h20"/>',
    chip:'<rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9.5" y="9.5" width="5" height="5" rx="1"/><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3"/>',
    cycle:'<path d="M20 11a8 8 0 0 0-14.6-4.5M4 4v4h4M4 13a8 8 0 0 0 14.6 4.5M20 20v-4h-4"/>',
    list:'<path d="M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01"/>',
    gantt:'<rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M7 9h6M9 13h8M7 17h5"/>',
    sigma:'<path d="M17 5H7l6 7-6 7h10"/>',
    database:'<ellipse cx="12" cy="6" rx="7.5" ry="3"/><path d="M4.5 6v12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V6M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3"/>',
    network:'<rect x="9" y="3" width="6" height="5" rx="1"/><rect x="3" y="16" width="6" height="5" rx="1"/><rect x="15" y="16" width="6" height="5" rx="1"/><path d="M12 8v4M6 16v-2.5h12V16"/>',
    wifi:'<path d="M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0M2 9a14.5 14.5 0 0 1 20 0"/><circle cx="12" cy="19.5" r=".9"/>',
    plane:'<path d="M17.8 19.2 16 11l3.5-3.5A2.1 2.1 0 0 0 16.5 4.5L13 8 4.8 6.2l-1.6 1.6 6.6 3.6-3.3 3.3-2.4-.4-1.2 1.2 3.5 1.9 1.9 3.5 1.2-1.2-.4-2.4 3.3-3.3 3.6 6.6z"/>',
    pulse:'<path d="M3 12h4l3-8 4 16 3-8h4"/>',
    film:'<rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4"/>',
    sparkles:'<path d="M11 3l1.8 5.2L18 10l-5.2 1.8L11 17l-1.8-5.2L4 10l5.2-1.8zM18.5 14.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z"/>',
    close:'<path d="M6 6l12 12M18 6 6 18"/>',
    leaf:'<path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15M5 19c3-4 6-6.5 10-8.5"/>'
  };
  const icon = (name, cls = 'icon') => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${ICONS[name] || ''}</svg>`;
  const hydrateIcons = (root = document) => $$('[data-icon]', root).forEach(n => { if (!n.firstChild) n.innerHTML = icon(n.dataset.icon); });

  const img = (src, alt, cls = '', extra = '') =>
    `<img class="${cls}" src="${esc(src)}" alt="${esc(alt)}" loading="lazy" decoding="async" data-fallback="assets/images/visual-fallback.svg"${extra}>`;

  /* ---------- Traductions ---------- */
  function applyTranslations(){
    document.documentElement.lang = lang;
    $$('[data-i18n]').forEach(n => { const v = t(n.dataset.i18n); if (typeof v === 'string') n.textContent = v; });
    $$('[data-i18n-aria]').forEach(n => n.setAttribute('aria-label', t(n.dataset.i18nAria)));
    $$('[data-i18n-alt]').forEach(n => n.setAttribute('alt', t(n.dataset.i18nAlt)));
    $$('.lang-btn').forEach(b => { const on = b.dataset.lang === lang; b.classList.toggle('active', on); b.setAttribute('aria-pressed', String(on)); });
    renderDynamic();
  }

  /* ---------- Rendu des sections ---------- */
  function timelineVisual(item, c){
    if (item.visualType === 'code') {
      return `<div class="tl-visual tl-code" aria-hidden="true">
        <div class="code-dots"><i></i><i></i><i></i></div>
        <pre><span class="k">class</span> <span class="f">WebApp</span> {
  stack = <span class="s">'Symfony'</span>;
  design = <span class="s">'Figma'</span>;
  data = <span class="s">'AI ready'</span>;
}</pre>
      </div>`;
    }
    return `<div class="tl-visual">${img(visual(item.imageKey), '', '', ' aria-hidden="true"')}</div>`;
  }

  function renderTimeline(){
    $('#timeline').innerHTML = data.timeline.map(item => {
      const c = item[lang];
      const years = (lang === 'en' && item.yearsEn) || item.years;
      return `<li class="tl-item" data-type="${item.type}">
        <span class="tl-dot" aria-hidden="true"></span>
        <p class="tl-years">${esc(years)}</p>
        <h3>${esc(c.title)}</h3>
        <p class="tl-role">${esc(c.role)}</p>
        ${timelineVisual(item, c)}
        <ul>${c.bullets.map(b => `<li>${esc(b)}</li>`).join('')}</ul>
      </li>`;
    }).join('');
    applyTimelineFilter();
    $('#extrasGrid').innerHTML = data.supplementary.map(s => `<article class="extra"><span class="extra-mark">${esc(s.mark)}</span><div><h3>${esc(s[lang].title)}</h3><p>${esc(s[lang].text)}</p></div></article>`).join('');
  }

  function projectLogo(p){
    if (!p.logo) return '';
    if (p.logo.img) return `<span class="p-logo"><img src="${esc(p.logo.img)}" alt="${esc(p.logo.alt || '')}" loading="lazy"></span>`;
    return `<span class="p-logo p-logo-text${p.logo.leaf ? ' has-leaf' : ''}">${p.logo.leaf ? icon('leaf') : ''}${esc(p.logo.text)}</span>`;
  }

  function renderProjects(){
    $('#projectsGrid').innerHTML = data.projects.map(p => {
      const c = p[lang];
      return `<article class="project-card reveal">
        <div class="p-media">${img(visual(p.gallery[0]), '', '', ' aria-hidden="true"')}${projectLogo(p)}</div>
        <div class="p-body">
          <div class="tags">${c.tags.map(x => `<span class="tag">${esc(x)}</span>`).join('')}</div>
          <h3>${esc(c.title)}</h3>
          <p>${esc(c.short)}</p>
          <button class="p-link stretched" type="button" data-project="${p.id}" aria-haspopup="dialog">${esc(t('projects.view'))}<span class="visually-hidden"> — ${esc(c.title)}</span>${icon('arrowRight')}</button>
        </div>
      </article>`;
    }).join('');
    $$('[data-project]').forEach(b => b.addEventListener('click', () => openProject(b.dataset.project, b)));
  }

  function skillMark(s){
    if (s.icon) return `<span class="skill-logo"><img src="${esc(s.icon)}" alt="" loading="lazy" data-skill-icon></span>`;
    if (s.symbol === 'sigma') return `<span class="skill-logo skill-symbol"><b>6σ</b></span>`;
    return `<span class="skill-logo skill-symbol">${icon(s.symbol)}</span>`;
  }

  function renderSkills(){
    $('#skillsGrid').innerHTML = data.skillGroups.map(g => `<section class="skill-card reveal">
      <header><span class="skill-head-icon">${icon(g.icon)}</span><h3>${esc(g[lang])}</h3></header>
      <ul class="skill-list">${g.skills.map(s => `<li>${skillMark(s)}<span>${esc((lang === 'en' && s.nameEn) || s.name)}</span></li>`).join('')}</ul>
    </section>`).join('');
  }

  function renderInternational(){
    $('#cityCards').innerHTML = data.countries.map(c => `<article class="city-card">
      ${img(visual(c.imageKey), '', '', ' aria-hidden="true"')}
      <div><strong>${esc(c[lang].country)}</strong><span>${esc(c[lang].city)}</span><small>${esc(c[lang].text)}</small></div>
    </article>`).join('');
  }

  // Carte plate : la texture équirectangulaire est posée en coordonnées (lon+180, 90-lat).
  function renderIntlMap(){
    const svg = $('#intlMap');
    if (svg.dataset.ready) return;
    svg.dataset.ready = '1';
    const P = c => ({x:c.lon + 180, y:90 - c.lat});
    const byId = Object.fromEntries(data.cities.map(c => [c.id, P(c)]));
    const arcs = data.routes.map(([a, b], i) => {
      const A = byId[a], B = byId[b];
      const lift = Math.hypot(B.x - A.x, B.y - A.y) * .32 + 2;
      const d = `M${A.x} ${A.y} Q${(A.x + B.x) / 2} ${Math.min(A.y, B.y) - lift} ${B.x} ${B.y}`;
      return `<path class="map-arc" d="${d}" pathLength="1" style="--d:${i * .5}s"/>`;
    }).join('');
    const place = {above:['middle', 0, -2.4], left:['end', -1.6, -1.8], right:['start', 1.8, -1.2], below:['end', -1.4, 3.6]};
    const pins = data.cities.map(c => {
      const p = byId[c.id], [anchor, dx, dy] = place[c.label] || ['start', 1.6, -1.6];
      return `<g class="map-city" transform="translate(${p.x} ${p.y})"><circle class="map-halo" r="3"/><circle class="map-dot" r=".75"/><text x="${dx}" y="${dy}" text-anchor="${anchor}">${esc(c.name)}</text></g>`;
    }).join('');
    svg.setAttribute('viewBox', '92 14 110 69');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
    svg.innerHTML = `<image href="${esc(data.earthNight)}" x="0" y="0" width="360" height="180" preserveAspectRatio="none" class="map-texture"/>${arcs}${pins}`;
  }

  function renderDynamic(){
    $('#aboutValues').innerHTML = data.values.map(v => `<article class="value"><span class="value-icon">${icon(v.icon)}</span><h3>${esc(v[lang].title)}</h3><p>${esc(v[lang].text)}</p></article>`).join('');
    renderTimeline();
    renderProjects();
    renderSkills();
    renderInternational();
    $('#interestGrid').innerHTML = data.interests.map(i => `<article class="interest"><span class="value-icon">${icon(i.icon)}</span><div><h3>${esc(i[lang].title)}</h3><p>${esc(i[lang].text)}</p></div></article>`).join('');
    bindImages();
    observeReveals();
    if (openProjectId) openProject(openProjectId);
  }

  function bindImages(root = document){
    $$('img[data-fallback]', root).forEach(n => n.addEventListener('error', () => {
      const fb = n.dataset.fallback;
      if (fb) { n.removeAttribute('data-fallback'); n.src = fb; }
    }, {once:true}));
    $$('img[data-skill-icon]', root).forEach(n => n.addEventListener('error', () => n.closest('.skill-logo')?.classList.add('failed'), {once:true}));
    $$('.p-logo img', root).forEach(n => n.addEventListener('error', () => n.parentElement.classList.add('failed'), {once:true}));
  }

  /* ---------- Fiche projet (dialog + galerie) ---------- */
  const dialog = $('#projectDialog');
  let openProjectId = null, lastTrigger = null, slide = 0;

  function openProject(id, trigger){
    const p = data.projects.find(x => x.id === id);
    if (!p) return;
    const c = p[lang];
    const firstOpen = !dialog.open;
    if (firstOpen) slide = 0;
    openProjectId = id;
    if (trigger) lastTrigger = trigger;
    const meta = [['clock', 'duration'], ['pin', 'place'], ['team', 'team']]
      .filter(([, k]) => c.meta?.[k])
      .map(([ic, k]) => `<div>${icon(ic)}<span><small>${esc(t('projects.' + k))}</small>${esc(c.meta[k])}</span></div>`).join('');
    const imgs = p.gallery.map(visual);
    $('#dialogContent').innerHTML = `
      <div class="d-copy">
        <button class="d-back" type="button" data-close>${icon('arrowLeft')}${esc(t('projects.back'))}</button>
        <h2 id="dialogTitle">${esc(c.title)}</h2>
        <div class="tags">${c.tags.map(x => `<span class="tag">${esc(x)}</span>`).join('')}</div>
        <section><h3>${esc(t('projects.context'))}</h3><p>${esc(c.context)}</p></section>
        <section><h3>${esc(t('projects.problem'))}</h3><p>${esc(c.problem)}</p></section>
        <section class="d-role">${icon('target')}<div><h3>${esc(t('projects.role'))}</h3><p>${esc(c.role)}</p></div></section>
        <section><h3>${esc(t('projects.actions'))}</h3><ul>${c.actions.map(a => `<li>${esc(a)}</li>`).join('')}</ul></section>
        <section class="d-result"><h3>${esc(t('projects.result'))}</h3><p>${esc(c.result)}</p></section>
        ${meta ? `<div class="d-meta">${meta}</div>` : ''}
      </div>
      <div class="d-media">
        <div class="d-stage">
          ${imgs.map((src, i) => img(src, `${t('projects.visual')} ${i + 1} — ${c.title}`, i === slide ? 'active' : '')).join('')}
          ${projectLogo(p)}
        </div>
        ${imgs.length > 1 ? `<div class="d-thumbs">${imgs.map((src, i) => `<button type="button" class="${i === slide ? 'active' : ''}" data-slide="${i}" aria-label="${i + 1} / ${imgs.length}">${img(src, '')}</button>`).join('')}</div>
        <div class="d-nav"><span class="d-count">${slide + 1} / ${imgs.length}</span><div><button type="button" data-step="-1" aria-label="${esc(t('projects.prev'))}">${icon('chevronLeft')}</button><button type="button" data-step="1" aria-label="${esc(t('projects.next'))}">${icon('chevronRight')}</button></div></div>` : ''}
        <div class="d-tools"><h3>${esc(t('projects.tools'))}</h3><div class="tags">${c.tools.map(x => `<span class="tag tag-soft">${esc(x)}</span>`).join('')}</div></div>
      </div>`;
    bindImages(dialog);
    $$('[data-close]', dialog).forEach(b => b.addEventListener('click', closeProject));
    $$('[data-slide]', dialog).forEach(b => b.addEventListener('click', () => goTo(+b.dataset.slide)));
    $$('[data-step]', dialog).forEach(b => b.addEventListener('click', () => goTo(slide + +b.dataset.step)));
    if (firstOpen) {
      dialog.showModal();
      document.body.classList.add('dialog-open');
      $('#dialogContent').scrollTop = 0;
      $('.d-back', dialog).focus({preventScroll:true});
    }
  }

  function goTo(i){
    const slides = $$('.d-stage > img', dialog);
    if (!slides.length) return;
    slide = (i + slides.length) % slides.length;
    slides.forEach((s, k) => s.classList.toggle('active', k === slide));
    $$('[data-slide]', dialog).forEach((b, k) => b.classList.toggle('active', k === slide));
    const count = $('.d-count', dialog);
    if (count) count.textContent = `${slide + 1} / ${slides.length}`;
  }

  function closeProject(){ if (dialog.open) dialog.close(); }

  dialog.addEventListener('close', () => {
    document.body.classList.remove('dialog-open');
    openProjectId = null;
    lastTrigger?.focus({preventScroll:true});
  });
  $('#dialogClose').addEventListener('click', closeProject);
  dialog.addEventListener('click', e => { if (e.target === dialog) closeProject(); });
  dialog.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') goTo(slide + 1);
    if (e.key === 'ArrowLeft') goTo(slide - 1);
  });

  /* ---------- Apparition au scroll ---------- */
  let revealObserver;
  function observeReveals(){
    const pending = $$('.reveal:not(.in-view)');
    if (!('IntersectionObserver' in window) || reduceMotion.matches) { pending.forEach(n => n.classList.add('in-view')); return; }
    revealObserver ||= new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in-view'); revealObserver.unobserve(e.target); }
    }), {threshold:.08, rootMargin:'0px 0px -6% 0px'});
    pending.forEach(n => revealObserver.observe(n));
  }

  /* ---------- Scroll : header, progression, menu actif ---------- */
  function onScroll(){
    const y = scrollY;
    $('#siteHeader').classList.toggle('scrolled', y > 24);
    const max = document.documentElement.scrollHeight - innerHeight;
    $('#pageProgress').style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
  }

  function setupScrollSpy(){
    const links = $$('[data-section-link]');
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) links.forEach(l => l.classList.toggle('active', l.dataset.sectionLink === e.target.dataset.section));
    }), {rootMargin:'-45% 0px -50% 0px'});
    $$('[data-section]').forEach(s => io.observe(s));
  }

  /* ---------- Menus ---------- */
  function setupMenus(){
    const cvBtn = $('#cvMenuButton'), cvMenu = $('#cvMenu');
    const setCv = open => { cvMenu.hidden = !open; cvBtn.setAttribute('aria-expanded', String(open)); };
    cvBtn.addEventListener('click', e => { e.stopPropagation(); setCv(cvMenu.hidden); });
    $$('[data-open-cv]').forEach(b => b.addEventListener('click', e => { e.stopPropagation(); setCv(true); $('a', cvMenu).focus(); }));
    document.addEventListener('click', e => { if (!e.target.closest('.cv-menu-wrap')) setCv(false); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && !cvMenu.hidden) { setCv(false); cvBtn.focus(); } });

    const toggle = $('#menuToggle'), mobile = $('#mobileMenu');
    const setMobile = open => { mobile.hidden = !open; toggle.setAttribute('aria-expanded', String(open)); $('#siteHeader').classList.toggle('menu-open', open); };
    toggle.addEventListener('click', () => setMobile(mobile.hidden));
    $$('a', mobile).forEach(a => a.addEventListener('click', () => setMobile(false)));
  }

  let filter = 'all';
  function applyTimelineFilter(){
    $$('.tl-item').forEach(n => n.hidden = filter !== 'all' && n.dataset.type !== filter);
  }
  function setupTimelineFilters(){
    $$('[data-filter]').forEach(b => b.addEventListener('click', () => {
      filter = b.dataset.filter;
      $$('[data-filter]').forEach(x => { const on = x === b; x.classList.toggle('active', on); x.setAttribute('aria-pressed', String(on)); });
      applyTimelineFilter();
    }));
  }

  function setupLanguage(){
    $$('.lang-btn').forEach(b => b.addEventListener('click', () => {
      if (b.dataset.lang === lang) return;
      lang = b.dataset.lang; store.set('portfolio-lang', lang); applyTranslations();
    }));
  }

  function setupProfilePhoto(){
    const photo = $('#profilePhoto');
    photo.addEventListener('error', () => {
      if (photo.dataset.fallen) return;
      photo.dataset.fallen = '1';
      photo.src = data.profileFallback;
      photo.closest('.about-photo').classList.add('is-placeholder');
    });
    photo.src = data.profilePhoto;
  }

  function setupCopyEmail(){
    const btn = $('#copyEmail'), toast = $('#toast');
    let timer;
    btn.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(btn.dataset.email); } catch { return; }
      btn.innerHTML = icon('check');
      toast.textContent = t('contact.copied');
      toast.classList.add('show');
      clearTimeout(timer);
      timer = setTimeout(() => { toast.classList.remove('show'); btn.innerHTML = icon('copy'); }, 2200);
    });
  }

  /* ---------- Initialisation ---------- */
  hydrateIcons();
  $('#year').textContent = new Date().getFullYear();
  setupProfilePhoto();
  applyTranslations();
  renderIntlMap();
  setupMenus();
  setupTimelineFilters();
  setupLanguage();
  setupCopyEmail();
  setupScrollSpy();
  addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  window.NightGlobe.init({
    element: $('#heroGlobe'),
    textureUrl: data.earthNight,
    cityList: data.cities,
    routeList: data.routes
  });
})();
