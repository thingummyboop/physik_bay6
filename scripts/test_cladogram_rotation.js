const assert = require('node:assert/strict'), fs = require('node:fs'), path = require('node:path');
let JSDOM;
try { ({ JSDOM } = require('jsdom')); } catch { ({ JSDOM } = require('../../qa/node_modules/jsdom')); }
const root = path.join(__dirname, '..'), read = p => fs.readFileSync(path.join(root, p), 'utf8');
(async () => {
    const data = JSON.parse(read('lang/de.json'));
    const dom = new JSDOM(read('topics/template.html'), { url: 'https://example.test/topics/template.html?topic=bio_3_kladogramme', runScripts: 'outside-only' });
    const w = dom.window, d = w.document;
    await new Promise(resolve => setImmediate(resolve));
    w.fetch = async () => ({ ok: true, json: async () => data });
    for (const file of ['curriculum', 'chapter-revisions', 'common', 'core-learning', 'renderer']) w.eval(read('js/' + file + '.js'));
    await w.renderTopic();
    assert.equal(d.querySelectorAll('.chapter-question').length, 10);
    w.eval(read('js/topics/bio_3_kladogramme.js'));
    w.topicInit(); w.topicInit();
    const zone = d.querySelector('[data-cladogram-rotation]');
    const order = () => [...zone.querySelectorAll('[data-tip]')].sort((a, b) => Number(a.getAttribute('y')) - Number(b.getAttribute('y'))).map(n => n.dataset.tip).join('');
    assert.equal(order(), 'ABC');
    const initial = zone.querySelector('svg').innerHTML;
    for (const [selector, expected] of [
        ['[data-rotate-pair]', 'ACB'], ['[data-rotate-root]', 'CBA'],
        ['[data-rotate-pair]', 'BCA'], ['[data-rotate-root]', 'ABC']
    ]) {
        const button = zone.querySelector(selector);
        button.focus(); button.click();
        assert.equal(order(), expected);
        assert.equal(d.activeElement, button);
        const b = Number(zone.querySelector('[data-tip="B"]').getAttribute('y')) - 7;
        const c = Number(zone.querySelector('[data-tip="C"]').getAttribute('y')) - 7;
        assert.equal(Number(zone.querySelector('[data-bc-node]').getAttribute('cy')), (b + c) / 2);
        assert.match(zone.querySelector('[role="status"]').textContent, /B und C teilen Knoten 2/);
        assert.match(zone.querySelector('svg').getAttribute('aria-label'), /Keine Zeitskala/);
    }
    zone.querySelector('[data-rotate-root]').click();
    zone.querySelector('[data-tree-reset]').click();
    assert.equal(zone.querySelector('svg').innerHTML, initial);
    assert.equal(zone.querySelector('[data-rotate-root]').getAttribute('aria-pressed'), 'false');
    assert.equal(zone.querySelector('[data-rotate-pair]').getAttribute('aria-pressed'), 'false');
    dom.window.close();
    console.log('PASS: 10 questions, four tree orientations, unchanged B/C node, reset, focus and idempotent initialization.');
})().catch(e => { console.error(e); process.exitCode = 1; });
