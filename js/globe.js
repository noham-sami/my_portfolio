// Globe de nuit du hero : la carte NASA (équirectangulaire) est projetée en
// orthographique sur un canvas, puis les villes et les arcs sont dessinés en SVG
// par-dessus, aux vraies coordonnées géographiques.
window.NightGlobe = (() => {
  const RAD = Math.PI / 180;
  const REGION = {lon0:-140, lon1:70, lat0:-25, lat1:88}; // portion de la texture conservée
  let VIEW = {lat:12, lon:-22};                            // point de vue au-dessus de l'Atlantique
  const SVGNS = 'http://www.w3.org/2000/svg';

  let texture = null;   // {data, w, h}
  let host, canvas, overlay, cities, routes;
  let resizeTimer;

  function loadTexture(url){
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.decoding = 'async';
      img.onload = () => {
        try {
          const k = img.naturalWidth / 360;
          const sx = Math.round((REGION.lon0 + 180) * k), sy = Math.round((90 - REGION.lat1) * k);
          const sw = Math.round((REGION.lon1 - REGION.lon0) * k), sh = Math.round((REGION.lat1 - REGION.lat0) * k);
          const c = document.createElement('canvas');
          c.width = sw; c.height = sh;
          const ctx = c.getContext('2d', {willReadFrequently:true});
          ctx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);
          resolve({data:ctx.getImageData(0, 0, sw, sh).data, w:sw, h:sh});
        } catch (e) { resolve(null); }
      };
      img.onerror = () => resolve(null);
      img.src = url;
    });
  }

  // Disposition du globe selon la taille du hero : horizon courbe en haut à droite.
  function layout(w, h){
    if (w < 760) {
      const R = w * .8;
      return {cx:w * .5, cy:h * .86 + R * .47, R, lon:-35};
    }
    const R = Math.min(h * .72, w * .42);
    return {cx:w * .8, cy:h * .46 + R * .52, R, lon:-22};
  }

  function toView(lat, lon){
    const p = lat * RAD, l = (lon - VIEW.lon) * RAD, p0 = VIEW.lat * RAD;
    return {
      x: Math.cos(p) * Math.sin(l),
      y: Math.cos(p0) * Math.sin(p) - Math.sin(p0) * Math.cos(p) * Math.cos(l),
      z: Math.sin(p0) * Math.sin(p) + Math.cos(p0) * Math.cos(p) * Math.cos(l)
    };
  }

  function toVec(lat, lon){
    const p = lat * RAD, l = lon * RAD;
    return [Math.cos(p) * Math.cos(l), Math.cos(p) * Math.sin(l), Math.sin(p)];
  }
  function fromVec(v){
    const r = Math.hypot(v[0], v[1], v[2]);
    return {lat:Math.asin(v[2] / r) / RAD, lon:Math.atan2(v[1], v[0]) / RAD, r};
  }

  function renderCanvas(w, h, geo){
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const W = Math.round(w * dpr), H = Math.round(h * dpr);
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext('2d');
    const cx = geo.cx * dpr, cy = geo.cy * dpr, R = geo.R * dpr;

    // Étoiles discrètes (pseudo-aléatoire stable)
    let seed = 7;
    const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    for (let i = 0; i < 220; i++) {
      const x = rand() * W, y = rand() * H;
      if (Math.hypot(x - cx, y - cy) < R * 1.04) continue;
      ctx.fillStyle = `rgba(190,215,255,${(.15 + rand() * .45).toFixed(2)})`;
      ctx.fillRect(x, y, rand() < .9 ? 1 : 1.6, rand() < .9 ? 1 : 1.6);
    }

    // Halo atmosphérique
    const halo = ctx.createRadialGradient(cx, cy, R * .96, cx, cy, R * 1.16);
    halo.addColorStop(0, 'rgba(70,140,255,.55)');
    halo.addColorStop(.25, 'rgba(50,120,240,.22)');
    halo.addColorStop(1, 'rgba(40,100,220,0)');
    ctx.fillStyle = halo;
    ctx.beginPath(); ctx.arc(cx, cy, R * 1.16, 0, Math.PI * 2); ctx.fill();

    // Disque terrestre
    const x0 = Math.max(0, Math.floor(cx - R)), x1 = Math.min(W, Math.ceil(cx + R));
    const y0 = Math.max(0, Math.floor(cy - R)), y1 = Math.min(H, Math.ceil(cy + R));
    if (x1 > x0 && y1 > y0) {
      const bw = x1 - x0, bh = y1 - y0;
      const img = ctx.createImageData(bw, bh);
      const out = img.data;
      const sp0 = Math.sin(VIEW.lat * RAD), cp0 = Math.cos(VIEW.lat * RAD);
      const tex = texture;
      const kx = tex ? tex.w / (REGION.lon1 - REGION.lon0) : 0;
      const ky = tex ? tex.h / (REGION.lat1 - REGION.lat0) : 0;
      for (let py = 0; py < bh; py++) {
        const y = (cy - (py + y0)) / R;
        for (let px = 0; px < bw; px++) {
          const x = ((px + x0) - cx) / R;
          const rho2 = x * x + y * y;
          if (rho2 > 1) continue;
          const z = Math.sqrt(1 - rho2);
          const lat = Math.asin(z * sp0 + y * cp0) / RAD;
          const lon = VIEW.lon + Math.atan2(x, z * cp0 - y * sp0) / RAD;
          let r = 6, g = 12, b = 30;
          if (tex) {
            const u = ((lon - REGION.lon0) * kx) | 0, v = ((REGION.lat1 - lat) * ky) | 0;
            if (u >= 0 && u < tex.w && v >= 0 && v < tex.h) {
              const i = (v * tex.w + u) * 4;
              r = tex.data[i]; g = tex.data[i + 1]; b = tex.data[i + 2];
            }
          }
          // Teinte froide (lumières bleutées) + assombrissement vers le bord
          const lum = .3 * r + .59 * g + .11 * b;
          const boost = lum > 70 ? 1.35 : 1;
          const shade = (.28 + .72 * Math.pow(z, .55)) * boost;
          const o = (py * bw + px) * 4;
          out[o]     = Math.min(255, (r * .55 + lum * .45 * .85) * shade);
          out[o + 1] = Math.min(255, (g * .55 + lum * .45 * 1.0) * shade);
          out[o + 2] = Math.min(255, (b * .6 + lum * .4 * 1.35 + 8) * shade);
          out[o + 3] = 255;
        }
      }
      const off = document.createElement('canvas');
      off.width = bw; off.height = bh;
      off.getContext('2d').putImageData(img, 0, 0);
      ctx.drawImage(off, x0, y0);
    }

    // Liseré lumineux sur l'horizon
    ctx.save();
    ctx.strokeStyle = 'rgba(120,180,255,.75)';
    ctx.lineWidth = 1.4 * dpr;
    ctx.shadowColor = 'rgba(80,150,255,.9)';
    ctx.shadowBlur = 18 * dpr;
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();
    ctx.restore();
  }

  function el(name, attrs = {}, parent){
    const n = document.createElementNS(SVGNS, name);
    Object.entries(attrs).forEach(([k, v]) => n.setAttribute(k, v));
    if (parent) parent.appendChild(n);
    return n;
  }

  function renderOverlay(w, h, geo){
    overlay.setAttribute('viewBox', `0 0 ${w} ${h}`);
    overlay.setAttribute('width', w); overlay.setAttribute('height', h);
    overlay.innerHTML = '';
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const defs = el('defs', {}, overlay);
    const grad = el('linearGradient', {id:'arcGrad', x1:'0', x2:'1'}, defs);
    el('stop', {offset:'0', 'stop-color':'#9CCBFF', 'stop-opacity':'.25'}, grad);
    el('stop', {offset:'.5', 'stop-color':'#CFE6FF'}, grad);
    el('stop', {offset:'1', 'stop-color':'#9CCBFF', 'stop-opacity':'.25'}, grad);
    const glow = el('filter', {id:'arcGlow', x:'-20%', y:'-20%', width:'140%', height:'140%'}, defs);
    el('feGaussianBlur', {stdDeviation:'2.2', result:'b'}, glow);
    const merge = el('feMerge', {}, glow);
    el('feMergeNode', {in:'b'}, merge); el('feMergeNode', {in:'SourceGraphic'}, merge);

    const pos = {};
    cities.forEach(c => {
      const v = toView(c.lat, c.lon);
      pos[c.id] = {x:geo.cx + v.x * geo.R, y:geo.cy - v.y * geo.R, visible:v.z > 0};
    });

    routes.forEach(([a, b], idx) => {
      const A = cities.find(c => c.id === a), B = cities.find(c => c.id === b);
      const va = toVec(A.lat, A.lon), vb = toVec(B.lat, B.lon);
      const omega = Math.acos(Math.min(1, va[0] * vb[0] + va[1] * vb[1] + va[2] * vb[2]));
      const lift = .05 + omega * .28;
      const pts = [];
      for (let i = 0; i <= 64; i++) {
        const t = i / 64;
        const s0 = Math.sin((1 - t) * omega) / Math.sin(omega), s1 = Math.sin(t * omega) / Math.sin(omega);
        const g = fromVec([va[0] * s0 + vb[0] * s1, va[1] * s0 + vb[1] * s1, va[2] * s0 + vb[2] * s1]);
        const v = toView(g.lat, g.lon), alt = 1 + lift * Math.sin(Math.PI * t);
        pts.push(`${(geo.cx + v.x * geo.R * alt).toFixed(1)},${(geo.cy - v.y * geo.R * alt).toFixed(1)}`);
      }
      const d = `M${pts.join('L')}`;
      const path = el('path', {d, class:`globe-arc arc-${idx}`, fill:'none', stroke:'url(#arcGrad)', 'stroke-width':'1.6', filter:'url(#arcGlow)'}, overlay);
      const len = path.getTotalLength();
      path.style.setProperty('--len', len);
      if (!reduce) {
        const dot = el('circle', {r:'2.6', class:'globe-traveler'}, overlay);
        el('animateMotion', {dur:`${4.5 + idx * 1.4}s`, repeatCount:'indefinite', path:d, begin:`${1.6 + idx * .6}s`}, dot);
      }
    });

    cities.forEach(c => {
      const p = pos[c.id];
      if (!p.visible) return;
      const g = el('g', {class:'globe-city', transform:`translate(${p.x.toFixed(1)} ${p.y.toFixed(1)})`}, overlay);
      el('circle', {r:'16', class:'globe-pulse'}, g);
      el('circle', {r:'3.6', class:'globe-dot'}, g);
      const place = {above:{x:0, y:-14, a:'middle'}, left:{x:-10, y:-12, a:'end'}, right:{x:12, y:-8, a:'start'}, below:{x:-10, y:20, a:'end'}}[c.label] || {x:10, y:-10, a:'start'};
      const t = el('text', {x:place.x, y:place.y, 'text-anchor':place.a, class:'globe-label'}, g);
      t.textContent = c.name;
    });
  }

  function draw(){
    const w = host.clientWidth, h = host.clientHeight;
    if (!w || !h) return;
    const geo = layout(w, h);
    VIEW = {lat:VIEW.lat, lon:geo.lon};
    renderCanvas(w, h, geo);
    renderOverlay(w, h, geo);
  }

  function init({element, textureUrl, cityList, routeList}){
    host = element;
    canvas = host.querySelector('canvas');
    overlay = host.querySelector('svg');
    cities = cityList; routes = routeList;
    draw();                       // première passe sans texture (disque sombre)
    loadTexture(textureUrl).then(t => {
      texture = t;
      draw();
      host.classList.add('ready');
    });
    let lastW = host.clientWidth;
    addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        // Sur mobile, la barre d'adresse modifie la hauteur : on ne redessine que si la largeur change.
        if (host.clientWidth === lastW && innerWidth < 760) return;
        lastW = host.clientWidth;
        draw();
      }, 160);
    });
  }

  return {init};
})();
