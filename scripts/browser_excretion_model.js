'use strict';
const fs = require('node:fs'), path = require('node:path'), assert = require('node:assert/strict'), { chromium } = require('playwright');
const base = process.env.SCIVERSE_PREVIEW_URL || 'http://127.0.0.1:4173', out = path.resolve(process.env.SCIVERSE_BROWSER_REPORT_DIR || path.join(__dirname, '../../browser-qa/excretion')), topic = 'bio_3_ausscheidung_gesundheit';
const keys = { bio_3_ausscheidung_s1: 1, bio_3_ausscheidung_d1: 2, bio_3_ausscheidung_d3: 0, bio_3_ausscheidung_d4: 1, bio_3_ausscheidung_model: 2, bio_3_ausscheidung_concentration: 0, bio_3_ausscheidung_s2: 1, bio_3_ausscheidung_s3: 2, bio_3_ausscheidung_s4: 0, bio_3_ausscheidung_d2: 1 };
const cases = [['A', 'filter', [100, 10, 4], '0.4'], ['B', 'filter', [100, 10, 4], '0.4'], ['C', 'filter', [100, 10, 4], '0.4'], ['A', 'return', [10, 0, 4], '4'], ['B', 'return', [5, 0, 4], '8'], ['C', 'return', [2, 0, 4], '20']];
(async () => {
    fs.mkdirSync(out, { recursive: true }); const b = await chromium.launch({ headless: true }), errors = [], layouts = [];
    try {
        const p = await b.newPage({ viewport: { width: 390, height: 900 } }); p.on('pageerror', e => errors.push(e.message));
        await p.goto(base + '/topics/template.html?topic=' + topic); await p.waitForFunction(() => document.querySelector('[data-excretion-lab]')?.dataset.initialized === 'true');
        const model = p.locator('[data-excretion-model]'), process = p.locator('[data-excretion-process]'), calc = p.locator('[data-excretion-calculate]'), reset = p.locator('[data-excretion-reset]'), output = p.locator('[data-excretion-output]'), storage = await p.evaluate(() => JSON.stringify(localStorage));
        for (const dark of [false, true]) for (const width of [320, 390, 1280]) {
            await p.setViewportSize({ width, height: 900 }); await p.evaluate(d => { if (d) document.documentElement.dataset.theme = 'dark'; else delete document.documentElement.dataset.theme; }, dark);
            await p.waitForFunction(d => getComputedStyle(document.body).color === (d ? 'rgb(224, 224, 224)' : 'rgb(45, 55, 72)'), dark);
            for (const [m, step, expected, ratio] of cases) {
                await model.selectOption(m); assert.equal(await output.locator('[data-excretion-ratio]').count(), 0);
                await process.selectOption(step); await calc.focus(); await p.keyboard.press('Enter');
                assert.deepEqual(await output.locator('[data-excretion-remaining]').evaluateAll(es => es.map(e => Number(e.dataset.value))), expected);
                assert.equal(await output.locator('[data-excretion-ratio]').getAttribute('data-excretion-ratio'), ratio);
                assert.equal(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), true);
                for (const control of [model, process, calc, reset]) assert.ok((await control.boundingBox()).height >= 44);
                layouts.push({ dark, width, model: m, process: step });
            }
            for (const card of await p.locator('.excretion-card').all()) {
                assert.equal(await card.evaluate(e => getComputedStyle(e).backgroundColor), dark ? 'rgb(30, 30, 30)' : 'rgb(255, 255, 255)');
                assert.equal(await card.evaluate(e => getComputedStyle(e).color), dark ? 'rgb(224, 224, 224)' : 'rgb(45, 55, 72)');
            }
            if (width === 390) for (const [name, selector] of [['routes', '.excretion-routes'], ['schema', '.excretion-map'], ['rules', '.excretion-model-data'], ['workshop', '[data-excretion-lab]'], ['diary', '.excretion-diary'], ['plans', '.excretion-plans'], ['cases', '.excretion-cases']]) await p.locator(selector).screenshot({ path: path.join(out, name + '-' + (dark ? 'dark' : 'light') + '.png') });
        }
        await reset.focus(); await p.keyboard.press('Enter'); assert.equal(await model.inputValue(), 'A'); assert.equal(await process.inputValue(), 'filter'); assert.equal(await output.textContent(), ''); assert.equal(await model.evaluate(e => e === document.activeElement), true);
        // Exercise native select keyboard behavior, rather than only programmatic changes.
        await p.keyboard.press('ArrowDown'); assert.equal(await model.inputValue(), 'B'); await p.keyboard.press('Tab'); assert.equal(await process.evaluate(e => e === document.activeElement), true); await p.keyboard.press('ArrowDown'); assert.equal(await process.inputValue(), 'return'); await p.keyboard.press('Tab'); await p.keyboard.press('Enter'); assert.equal(await output.locator('[data-excretion-ratio]').getAttribute('data-excretion-ratio'), '8');
        assert.equal(await p.evaluate(() => JSON.stringify(localStorage)), storage);
        const qs = await p.evaluate(() => currentChapterQuiz.questions.map(q => q.id)); assert.equal(qs.length, 10); let answers = 0;
        for (const [index, id] of qs.entries()) for (let choice = 0; choice < 3; choice++) {
            if (!answers) await p.locator('#chapter-quiz-launch').click(); else await p.locator('#chapter-quiz-result button[onclick="restartChapterQuiz()"]').click();
            await p.evaluate(({ keys, index }) => currentChapterQuiz.questions.forEach((q, k) => { if (k !== index) document.querySelector(`input[name="chapter_q_${k}"][value="${keys[q.id]}"]`).checked = true; }), { keys, index });
            await p.locator(`input[name="chapter_q_${index}"][value="${choice}"]`).check(); await p.locator('#chapter-quiz-panel .chapter-submit-btn').click();
            const result = await p.evaluate(topic => JSON.parse(localStorage.getItem('sciverse_chapter_quiz_results'))[topic], topic);
            assert.equal(result.lastPercent, choice === keys[id] ? 100 : 90); assert.deepEqual(result.reviewQuestionIds, choice === keys[id] ? [] : [id]);
            const f = await p.evaluate(({ index, choice }) => currentChapterQuiz.questions[index].answers[choice].feedback, { index, choice }); assert.ok((await p.locator('#chapter-quiz-result').textContent()).includes(f)); answers++;
        }
        const paper = await b.newPage(); paper.on('pageerror', e => errors.push(e.message)); await paper.goto(base + '/topics/worksheet.html?topic=' + topic); await paper.waitForFunction(() => !document.getElementById('ws-print').disabled);
        assert.equal(await paper.locator('[data-excretion-paper]').count(), 1); assert.equal(await paper.locator('.excretion-map svg').count(), 1); assert.equal(await paper.locator('#ws-solutions').isVisible(), false);
        await paper.locator('#ws-include-solutions').check(); assert.equal(await paper.locator('#ws-solutions [data-excretion-solution]').count(), 4);
        await paper.pdf({ path: path.join(out, 'excretion-solutions.pdf'), format: 'A4', printBackground: true, preferCSSPageSize: true, margin: { top: '15mm', right: '15mm', bottom: '15mm', left: '15mm' } });
        assert.deepEqual(errors, []); fs.writeFileSync(path.join(out, 'report.json'), JSON.stringify({ createdAt: new Date().toISOString(), browser: b.version(), layouts, answers, keyboard: true, storageUnchanged: true, themeColors: true, errors }, null, 2));
        console.log('PASS: 36 model/layout states, native keyboard/reset/focus/storage, 30 quiz answers and paper export.');
    } finally { await b.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
