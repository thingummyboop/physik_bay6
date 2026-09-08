const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
let JSDOM;
try { ({ JSDOM } = require('jsdom')); }
catch { ({ JSDOM } = require('../../qa/node_modules/jsdom')); }
const dom = new JSDOM('', { runScripts: 'outside-only' });
const w = dom.window;
w.eval(fs.readFileSync(path.join(__dirname, '../js/renderer.js'), 'utf8'));
for (const values of [[0, 5, 10], [0, 0, 0], [1, 8, 6], [3, 9, 5]]) {
    const scenario = { labels: ['A', 'B', 'C'], values, unit: 'Funde' };
    w.document.body.innerHTML = w.buildBioInsightVisual({ type: 'data' }, scenario);
    const svg = w.document.querySelector('svg');
    const bars = [...svg.querySelectorAll('.bio-data-bar')];
    assert.equal(bars.length, 3);
    for (let i = 0; i < values.length; i++) {
        const h = Number(bars[i].getAttribute('height'));
        const y = Number(bars[i].getAttribute('y'));
        assert(Math.abs(h - 142 * values[i] / Math.max(1, ...values)) <= 0.051);
        assert(Math.abs(y + h - 188) <= 0.051, 'Every bar shares the zero baseline');
        if (values[i] === 0) assert.equal(h, 0);
        assert(svg.getAttribute('aria-label').includes(`${scenario.labels[i]}: ${values[i]}`));
    }
    assert(svg.textContent.includes('Fiktive Beispieldaten'));
}
for (const [prompt, expected, unit] of [
    ['Daten zum Puls', [72, 98, 132], 'Schläge/min'],
    ['Daten zur Erdgeschichte', [1, 100, 1000], 'Millionen Jahre'],
    ['Daten zum Boden', [1, 8, 6], 'gezählte Tiere'],
    ['Daten auswerten', [3, 9, 5], 'gezählte Pflanzen']
]) {
    const scenario = w.getBioScenario(prompt, 'data');
    assert.deepEqual(Array.from(scenario.values), expected);
    assert.equal(scenario.unit, unit);
    const game = w.buildBioInsightGame(prompt, 'bio_test', 0, 0);
    w.document.body.replaceChildren(game);
    assert(game.querySelector('.bio-data-context').textContent.includes(scenario.limitation));
    const buttons = [...game.querySelectorAll('[data-bio-insight-action]')];
    assert.equal(buttons.filter(b => b.dataset.correct === 'true').length, 1);
    const correct = buttons.find(b => b.dataset.correct === 'true');
    assert.equal(correct.textContent, scenario.conclusion);
    assert.equal(correct.dataset.note, scenario.limitation);
    const caption = game.querySelector('.bio-insight-graphic-label').textContent;
    for (const button of buttons) {
        button.focus();
        button.click();
        assert.equal(w.document.activeElement, button);
        assert.equal(game.querySelector('.bio-insight-stage').dataset.state,
            button.dataset.correct === 'true' ? 'correct' : 'wrong');
        assert(game.querySelector('.bio-insight-feedback').textContent.includes(button.dataset.note));
        assert.equal(game.querySelector('.bio-insight-graphic-label').textContent, caption);
    }
}
assert.equal(132 - 72, 60);
assert.equal(1000 / 100, 10);
assert.equal(8 - 6, 2);
assert.equal(9 / 3, 3);
dom.window.close();
console.log('PASS: proportional biology bars, shared zero baseline, zero-only data and accessible values.');
