'use strict';
window.topicInit = function () {
  document.querySelectorAll('[data-area-inverse]').forEach(zone => {
    if (zone.dataset.initialized) return;
    zone.dataset.initialized = 'true';
    const select = zone.querySelector('select'), input = zone.querySelector('input');
    const result = zone.querySelector('[data-area-inverse-result]');
    const cases = {
      triangle: {height: 7, hint: 'Verdopple A und teile durch b: h = 2 · A / b.', proof: 'h = 2 · 28 : 8 = 7 cm. Probe: 8 · 7 : 2 = 28 cm².'},
      trapezoid: {height: 5, hint: 'Verdopple A und teile durch die Summe a + b.', proof: 'h = 2 · 30 : (4 + 8) = 5 cm. Probe: (4 + 8) · 5 : 2 = 30 cm².'},
      parallelogram: {height: 3.5, hint: 'Teile A durch b: h = A / b.', proof: 'h = 21 : 6 = 3,5 cm. Probe: 6 · 3,5 = 21 cm².'}
    };
    const givens = {triangle: 'Dreieck: A = 28 cm², b = 8 cm.', trapezoid: 'Trapez: A = 30 cm², a = 4 cm, b = 8 cm.', parallelogram: 'Parallelogramm: A = 21 cm², b = 6 cm.'};
    const showTask = () => { zone.querySelector('[data-area-inverse-givens]').textContent = givens[select.value] + ' Gesucht ist die senkrechte Höhe h.'; };
    const clear = () => { result.textContent = ''; delete result.dataset.correct; input.removeAttribute('aria-invalid'); };
    const check = () => {
      clear();
      const text = input.value.trim(), value = Number(text.replace(',', '.')), task = cases[select.value];
      if (!task || !/^\d+(?:[.,]\d+)?$/.test(text) || !Number.isFinite(value) || value <= 0) {
        result.textContent = 'Gib eine positive Höhe als Zahl ein, zum Beispiel 3,5. Schreibe die Einheit nicht ins Eingabefeld.';
        input.setAttribute('aria-invalid', 'true'); input.focus(); return;
      }
      const correct = Math.abs(value - task.height) < 1e-9;
      result.dataset.correct = String(correct);
      result.textContent = correct ? 'Der Zahlenwert passt. ' + task.proof + ' Vergleiche auch deine eigene Umformung.' : 'Prüfe deinen Rechenweg. ' + task.hint + ' Setze deine Höhe in die ursprüngliche Flächenformel ein.';
      result.focus();
    };
    input.addEventListener('input', clear);
    input.addEventListener('keydown', event => { if (event.key === 'Enter') { event.preventDefault(); check(); } });
    select.addEventListener('change', () => { input.value = ''; clear(); showTask(); });
    zone.querySelector('[data-area-inverse-check]').addEventListener('click', check);
    zone.querySelector('[data-area-inverse-reset]').addEventListener('click', () => { select.value = 'triangle'; input.value = ''; clear(); showTask(); select.focus(); });
    showTask();
  });
  document.querySelectorAll('[data-area-hex]').forEach(zone => {
    if (zone.dataset.initialized) return;
    zone.dataset.initialized = 'true';
    const select = zone.querySelector('select'), svg = zone.querySelector('svg');
    const status = zone.querySelector('[data-area-hex-status]'), previous = zone.querySelector('[data-area-hex-prev]'), next = zone.querySelector('[data-area-hex-next]');
    let step = 0;
    const add = (tag, attrs, text) => {
      const node = document.createElementNS('http://www.w3.org/2000/svg', tag);
      Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
      if (text) node.textContent = text;
      svg.append(node); return node;
    };
    const render = () => {
      const radius = Number(select.value), R = radius * 19;
      const points = Array.from({length: 6}, (_, i) => [180 + R * Math.cos(i * Math.PI / 3), 180 - R * Math.sin(i * Math.PI / 3)]);
      svg.replaceChildren();
      add('circle', {cx: 180, cy: 180, r: R, fill: 'none', stroke: '#1e40af', 'stroke-width': 2, 'data-hex-circle': ''});
      if (step > 0) {
        const center = points[step - 1];
        add('circle', {cx: center[0], cy: center[1], r: R, fill: 'none', stroke: '#9a3412', 'stroke-width': 2, 'stroke-dasharray': '5 4', 'data-hex-compass': ''});
      }
      if (step === 6) add('polygon', {points: points.map(p => p.join(',')).join(' '), fill: '#dbeafe', stroke: 'none', 'data-hex-area': ''});
      points.forEach((p, i) => {
        if (i > step) return;
        add('line', {x1: 180, y1: 180, x2: p[0], y2: p[1], stroke: '#64748b', 'data-hex-radius': i});
        add('circle', {cx: p[0], cy: p[1], r: 3, fill: '#111827', 'data-hex-vertex': i});
        add('text', {x: 180 + (R + 20) * Math.cos(i * Math.PI / 3), y: 187 - (R + 20) * Math.sin(i * Math.PI / 3), fill: '#111827', 'font-size': 21, 'text-anchor': 'middle'}, 'ABCDEF'[i]);
      });
      for (let i = 0; i < step; i++) {
        const p = points[i], q = points[(i + 1) % 6];
        add('line', {x1: p[0], y1: p[1], x2: q[0], y2: q[1], stroke: '#1e40af', 'stroke-width': 3, 'data-hex-side': i});
      }
      add('circle', {cx: 180, cy: 180, r: 3, fill: '#111827'});
      add('text', {x: 164, y: 201, fill: '#111827', 'font-size': 21}, 'M');
      const last = 'ABCDEF'[step - 1], current = 'ABCDEF'[step % 6];
      status.textContent = step === 0 ? `Start: Kreis mit Radius ${radius} cm; A liegt auf dem Kreis. Die Zirkelöffnung bleibt ${radius} cm.` : step === 6 ? `Schritt 6 von 6: Von F zurück zu A. Sechs Seiten zu je ${radius} cm; Umfang ${6 * radius} cm. Sechs gleichseitige Dreiecke mit je 60° bei M füllen das Sechseck.` : `Schritt ${step} von 6: Zirkelspitze in ${last}, Öffnung ${radius} cm. ${current} ist der nächste Schnittpunkt mit dem blauen Kreis${step > 1 ? ', nicht der schon besuchte Punkt ' + 'ABCDEF'[step - 2] : '; wir gehen gegen den Uhrzeigersinn weiter'}.`;
      svg.setAttribute('aria-label', status.textContent);
      zone.dataset.step = String(step); zone.dataset.radius = String(radius);
      previous.disabled = step === 0; next.disabled = step === 6;
    };
    previous.addEventListener('click', () => { step = Math.max(0, step - 1); render(); if (previous.disabled) next.focus(); });
    next.addEventListener('click', () => { step = Math.min(6, step + 1); render(); if (next.disabled) previous.focus(); });
    select.addEventListener('change', () => { step = 0; render(); });
    zone.querySelector('[data-area-hex-reset]').addEventListener('click', () => { step = 0; select.value = '3'; render(); select.focus(); });
    render();
  });
};
