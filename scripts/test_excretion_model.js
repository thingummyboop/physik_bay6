'use strict';
const assert = require('node:assert/strict'), fs = require('node:fs'), path = require('node:path'), { JSDOM } = require('jsdom');
const root = path.join(__dirname, '..'), read = p => fs.readFileSync(path.join(root, p), 'utf8'), id = 'bio_3_ausscheidung_gesundheit';
const keys = { bio_3_ausscheidung_s1: [1, 0], bio_3_ausscheidung_d1: [2, 0], bio_3_ausscheidung_d3: [0, 0], bio_3_ausscheidung_d4: [1, 1], bio_3_ausscheidung_model: [2, 1], bio_3_ausscheidung_concentration: [0, 1], bio_3_ausscheidung_s2: [1, 2], bio_3_ausscheidung_s3: [2, 2], bio_3_ausscheidung_s4: [0, 3], bio_3_ausscheidung_d2: [1, 3] };
// Expected outcomes are fixed independently of the interaction's implementation.
const cases = [['A', 'filter', [100, 10, 4], 0.4], ['B', 'filter', [100, 10, 4], 0.4], ['C', 'filter', [100, 10, 4], 0.4], ['A', 'return', [10, 0, 4], 4], ['B', 'return', [5, 0, 4], 8], ['C', 'return', [2, 0, 4], 20]];
(async () => {
    const data = JSON.parse(read('lang/de.json'));
    const dom = new JSDOM(read('topics/template.html'), { url: 'https://example.test/topics/template.html?topic=' + id, runScripts: 'outside-only' });
    const w = dom.window, d = w.document;
    await new Promise(r => setImmediate(r));
    w.fetch = async () => ({ ok: true, json: async () => data });
    for (const f of ['curriculum', 'chapter-revisions', 'common', 'core-learning', 'renderer']) w.eval(read('js/' + f + '.js'));
    await w.renderTopic(); w.eval(read('js/topics/' + id + '.js')); w.topicInit(); w.topicInit();
    const zone = d.querySelector('[data-excretion-lab]'), model = zone.querySelector('select[data-excretion-model]'), process = zone.querySelector('select[data-excretion-process]'), out = zone.querySelector('[data-excretion-output]'), calc = zone.querySelector('[data-excretion-calculate]'), reset = zone.querySelector('[data-excretion-reset]');
    const storage = JSON.stringify(w.localStorage);
    const choose = (select, value) => { select.value = value; select.dispatchEvent(new w.Event('change')); assert.equal(out.querySelector('[data-excretion-ratio]'), null); };
    for (const [m, p, expected, ratio] of cases) {
        choose(model, m); choose(process, p); calc.click();
        assert.deepEqual([...out.querySelectorAll('[data-excretion-remaining]')].map(e => Number(e.dataset.value)), expected);
        assert.equal(Number(out.querySelector('[data-excretion-ratio]').dataset.excretionRatio), ratio);
        assert.equal(out.querySelectorAll('ul').length, 1);
        assert.match(out.textContent, p === 'filter' ? /fehlt die Rückgewinnung/ : /Sekretion/);
        if (p === 'filter') assert.ok(out.textContent.includes('0,4 Einheiten X'));
    }
    choose(model, ''); calc.click(); assert.match(out.textContent, /Wähle ein Modell/); assert.equal(out.querySelector('[data-excretion-ratio]'), null);
    choose(model, 'B'); choose(process, ''); calc.click(); assert.match(out.textContent, /Wähle ein Modell/);
    reset.click(); assert.equal(model.value, 'A'); assert.equal(process.value, 'filter'); assert.equal(out.textContent, ''); assert.equal(d.activeElement, model);
    choose(process, 'return'); calc.click(); reset.click(); assert.equal(out.textContent, ''); assert.equal(JSON.stringify(w.localStorage), storage);
    assert.equal(w.chapterRevision(id), 2); assert.equal(w.currentChapterResult(id, { contentRevision: 1, passed: true }).outdated, true);
    const qs = w.currentChapterQuiz.questions; assert.equal(qs.length, 10); assert.deepEqual(new Set(qs.map(q => q.id)), new Set(Object.keys(keys)));
    for (const [i, q] of qs.entries()) {
        assert.equal(q.answers.findIndex(a => a.correct), keys[q.id][0]); assert.equal(q.sectionIndex, keys[q.id][1]);
        for (let choice = 0; choice < 3; choice++) {
            w.restartChapterQuiz(); qs.forEach((item, k) => d.querySelector(`input[name="chapter_q_${k}"][value="${i === k ? choice : keys[item.id][0]}"]`).checked = true); w.submitChapterQuiz();
            const result = JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results'))[id];
            assert.equal(result.lastPercent, choice === keys[q.id][0] ? 100 : 90); assert.deepEqual(result.reviewQuestionIds, choice === keys[q.id][0] ? [] : [q.id]);
            assert.ok(d.querySelector('#chapter-quiz-result').textContent.includes(q.answers[choice].feedback));
        }
    }
    const authored = new JSDOM(data[id].sections.map(s => s.content).join('')).window.document;
    assert.deepEqual([...d.querySelectorAll('.bio-training-card')].map(e => e.textContent), [...authored.querySelectorAll('.bio-training-card')].map(e => e.textContent));
    assert.equal(d.querySelectorAll('.bio-training-card').length, 12); assert.equal(d.querySelectorAll('.bio-vocab-item').length, 16); assert.equal(d.querySelectorAll('.excretion-map svg[data-worksheet-static]').length, 1);
    assert.equal(d.querySelectorAll('.excretion-plans .excretion-card').length, 2); assert.equal(d.querySelectorAll('.excretion-cases .excretion-card').length, 3); assert.equal(d.querySelectorAll('[data-excretion-solution]').length, 4);
    const amounts = [...d.querySelectorAll('.excretion-diary tbody tr')].map(r => Number(r.querySelector('td').textContent)); assert.deepEqual(amounts, [150, 200, 250, 200]); assert.equal(amounts.reduce((a, b) => a + b), 800);
    assert.deepEqual([...d.querySelectorAll('.excretion-model-data tbody tr')].map(r => [...r.querySelectorAll('td')].map(e => Number(e.textContent))), [[90, 10, 0], [95, 10, 0], [98, 10, 0]]);
    const practice = data[id].sections.flatMap(s => s.quizzes).filter(q => q.practiceOnly); assert.equal(practice.length, 1); assert.ok(practice[0].answers.every(a => a.pts === 0)); assert.doesNotMatch(d.body.textContent, /Stell dir eine echte Situation vor/); dom.window.close();
    const paper = new JSDOM(read('topics/worksheet.html'), { url: 'https://example.test/topics/worksheet.html?topic=' + id, runScripts: 'outside-only' }), pw = paper.window, pd = pw.document;
    pw.fetch = async () => ({ ok: true, json: async () => data });
    for (const f of ['curriculum', 'chapter-revisions', 'worksheet_generator', 'worksheet']) pw.eval(read('js/' + f + '.js'));
    await new Promise(r => setImmediate(r));
    assert.equal(pd.querySelectorAll('[data-excretion-paper]').length, 1); assert.equal(pd.querySelectorAll('.excretion-map svg').length, 1); assert.equal(pd.querySelectorAll('.excretion-vocab .ws-glossary-entry').length, 16);
    assert.equal(pd.querySelectorAll('.excretion-model-data tbody tr').length, 3); assert.equal(pd.querySelectorAll('.excretion-diary tbody tr').length, 4); assert.equal(pd.querySelectorAll('.excretion-routes tbody tr').length, 4);
    assert.equal(pd.querySelectorAll('#ws-solutions [data-excretion-solution]').length, 4); assert.equal(pd.querySelectorAll('#ws-biology-material [data-excretion-solution]').length, 0); assert.equal(pd.querySelectorAll('#ws-biology-material select').length, 0); paper.window.close();
    console.log('PASS: 6 independent model outcomes, stale-result clearing, invalid inputs, reset/focus/storage, 30 quiz answers, 12 direct tasks, 16 terms and complete paper material.');
})().catch(e => { console.error(e); process.exitCode = 1; });
