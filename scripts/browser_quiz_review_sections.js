'use strict';
const fs = require('node:fs'), path = require('node:path'), assert = require('node:assert/strict');
const {chromium} = require('playwright');
const expected = require('./fixtures/physics_review_sections.json');
const data = require('../lang/de.json');
const counts = require('./fixtures/physics_assessment_counts.json');
const base = process.env.SCIVERSE_PREVIEW_URL || 'http://127.0.0.1:4173';
const out = path.resolve(process.env.SCIVERSE_BROWSER_REPORT_DIR || path.join(__dirname,'../../browser-qa/physics-review-complete'));
const plan = 'wetter,waermelehre,klima';

(async () => {
    fs.mkdirSync(out,{recursive:true});
    const browser = await chromium.launch();
    const errors = [];
    let resultVisits = 0, savedVisits = 0, layouts = 0;
    try {
        const p = await browser.newPage({viewport:{width:390,height:950},reducedMotion:'reduce'});
        p.on('pageerror',error => errors.push(error.message));
        for (const [id,count] of Object.entries(counts)) {
            const url = base + '/topics/template.html?' + new URLSearchParams({topic:id,mode:'review',plan});
            await p.goto(url);
            await p.waitForFunction(count => window.currentChapterQuiz?.questions.length === count,count);
            await p.locator('#chapter-quiz-launch').click();
            await p.evaluate(() => window.currentChapterQuiz.questions.forEach((q,i) => {
                document.querySelector(`input[name="chapter_q_${i}"][value="${q.answers.findIndex(a => !a.correct)}"]`).checked = true;
            }));
            await p.locator('.chapter-submit-btn').click();
            const buttons = p.locator('#chapter-quiz-result button[onclick^="reviewChapterSection"]');
            assert.equal(await buttons.count(),count);
            const pool = await p.evaluate(() => window.currentChapterQuiz.questions.map(q => ({id:q.id,sectionIndex:q.sectionIndex})));
            const stored = await p.evaluate(() => localStorage.getItem('sciverse_chapter_quiz_results'));
            for (const width of [320,390,1280]) for (const dark of [false,true]) {
                await p.setViewportSize({width,height:950});
                await p.evaluate(dark => {document.documentElement.dataset.theme = dark ? 'dark' : 'light';},dark);
                await p.waitForFunction(dark => getComputedStyle(document.body).color === (dark ? 'rgb(224, 224, 224)' : 'rgb(45, 55, 72)'),dark);
                await p.evaluate(() => startChapterQuiz());
                assert.equal(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),true);
                assert.deepEqual(await buttons.evaluateAll(es => es.filter(e => e.scrollWidth > e.clientWidth + 1).map(e => e.textContent)),[]);
                assert.deepEqual(await p.locator('.chapter-question,.chapter-options label').evaluateAll(es => es.filter(e => e.getBoundingClientRect().right > innerWidth + 1 || e.scrollWidth > e.clientWidth + 1).map(e => e.textContent)),[]);
                // All paths once; the 109 explicitly authored paths in every layout.
                for (const [index,q] of pool.entries()) {
                    if (!(width === 320 && !dark) && !expected[id]?.[q.id]) continue;
                    if (expected[id]?.[q.id]) assert.equal(data[id].sections[q.sectionIndex].id,expected[id][q.id]);
                    await p.evaluate(() => startChapterQuiz());
                    await buttons.nth(index).focus();
                    await p.keyboard.press('Enter');
                    assert.equal(await p.locator('#chapter-quiz-panel').isVisible(),false);
                    const heading = p.locator(`[data-chapter-section="${q.sectionIndex}"] h2`).first();
                    assert.equal(await heading.isVisible(),true);
                    assert.equal(await heading.evaluate(e => e === document.activeElement),true);
                    assert.equal(p.url(),url);
                    resultVisits++;
                }
                if (id === 'wetter' && width === 320 && dark) {
                    await p.evaluate(() => startChapterQuiz());
                    await buttons.nth(1).locator('..').screenshot({path:path.join(out,'weather-result-320-dark.png')});
                    await buttons.nth(1).focus();await p.keyboard.press('Enter');
                    await p.locator('[data-weather-light-sound]').screenshot({path:path.join(out,'weather-explanation-320-dark.png')});
                }
                layouts++;
            }
            await p.reload();
            await p.waitForFunction(count => document.querySelectorAll('[data-chapter-review] li a').length === count,count);
            const links = p.locator('[data-chapter-review] li a');
            for (const [index,q] of pool.entries()) {
                await links.nth(index).focus();await p.keyboard.press('Enter');
                assert.equal(await p.locator(`[data-chapter-section="${q.sectionIndex}"] h2`).first().evaluate(e => e === document.activeElement),true);
                assert.equal(p.url(),url);
                savedVisits++;
            }
            assert.equal(await p.evaluate(() => localStorage.getItem('sciverse_chapter_quiz_results')),stored);
            if (id === 'wetter') {
                await p.evaluate(() => {document.documentElement.dataset.theme = 'light';});
                await p.waitForFunction(() => getComputedStyle(document.body).color === 'rgb(45, 55, 72)');
                await links.nth(1).locator('..').screenshot({path:path.join(out,'weather-saved-review-1280-light.png')});
                await p.goto(base + '/topics/worksheet.html?topic=wetter');
                await p.waitForSelector('[data-weather-light-sound]');
                await p.emulateMedia({media:'print'});
                assert.equal(await p.locator('[data-weather-wind-unit]').isVisible(),true);
                assert.equal(await p.locator('[data-weather-light-sound]').isVisible(),true);
                await p.pdf({path:path.join(out,'weather-student.pdf'),format:'A4',printBackground:true});
                await p.emulateMedia({media:'screen'});
            }
            console.log('Checked result and saved-review paths: ' + id);
        }
        assert.equal(resultVisits,951);
        assert.equal(savedVisits,406);
        assert.equal(layouts,120);
        assert.deepEqual(errors,[]);
        fs.writeFileSync(path.join(out,'report.json'),JSON.stringify({createdAt:new Date().toISOString(),browser:browser.version(),resultVisits,savedVisits,layouts,keyboardFocus:true,planAndResultsPreserved:true,errors},null,2));
        console.log('PASS: 951 result and 406 saved-review keyboard visits, 120 chapter/layout combinations, correct focused explanations, unchanged plan/results and printable weather explanations.');
    } finally {await browser.close();}
})().catch(error => {console.error(error);process.exitCode = 1;});
