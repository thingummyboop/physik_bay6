'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { JSDOM } = require('jsdom');
const read = p => fs.readFileSync(path.join(__dirname, '..', p), 'utf8');
const data = JSON.parse(read('lang/de.json'));
const expected = require('./fixtures/physics_review_sections.json');
const counts = require('./fixtures/physics_assessment_counts.json');
const plan = 'wetter,waermelehre,klima';

async function chapter(id, denied = false) {
    const dom = new JSDOM(read('topics/template.html'), {
        url: 'https://example.test/physik_bay6/topics/template.html?' + new URLSearchParams({topic:id, mode:'review', plan}),
        runScripts: 'outside-only'
    });
    const w = dom.window;
    await new Promise(resolve => setImmediate(resolve));
    if (denied) Object.defineProperty(w, 'localStorage', {get() {throw Error('Storage denied');}});
    w.fetch = async () => ({ok:true, json:async () => data});
    for (const f of ['curriculum','chapter-revisions','common','core-learning','renderer']) w.eval(read('js/' + f + '.js'));
    await w.renderTopic();
    return {dom, w, d:w.document};
}

(async () => {
    let checked = 0;
    for (const [id, count] of Object.entries(counts)) {
        const {dom, w, d} = await chapter(id);
        const original = JSON.stringify(data[id]);
        const pool = w.collectChapterQuizQuestions(data[id]);
        assert.equal(pool.length, count);
        assert.equal(new Set(pool.map(q => q.id)).size, count);
        for (const q of pool) {
            assert.ok(Number.isInteger(q.sectionIndex), id + '/' + q.id);
            const section = data[id].sections[q.sectionIndex];
            assert.ok(section && section.level !== 'extension' && !section.practiceOnly);
            if (expected[id]?.[q.id]) assert.equal(section.id, expected[id][q.id]);
            checked++;
        }
        const reordered = {...data[id], sections:[...data[id].sections].reverse()};
        for (const q of w.collectChapterQuizQuestions(reordered)) {
            if (expected[id]?.[q.id]) assert.equal(reordered.sections[q.sectionIndex].id, expected[id][q.id], 'Stable section identity after reordering');
        }
        assert.equal(JSON.stringify(data[id]), original, 'Collecting questions does not edit source data');
        w.startChapterQuiz();
        pool.forEach((q,i) => {d.querySelector(`input[name="chapter_q_${i}"][value="${q.answers.findIndex(a => !a.correct)}"]`).checked = true;});
        w.submitChapterQuiz();
        const buttons = [...d.querySelectorAll('#chapter-quiz-result button[onclick^="reviewChapterSection"]')];
        assert.equal(buttons.length, count);
        for (const [i, button] of buttons.entries()) {
            w.startChapterQuiz();
            new w.Function(button.getAttribute('onclick')).call(button);
            assert.equal(d.querySelector('#chapter-quiz-panel').hidden, true);
            const section = d.querySelector(`[data-chapter-section="${pool[i].sectionIndex}"]`);
            assert.equal(section.hidden, false);
            assert.equal(d.activeElement, section.querySelector('h2'));
        }
        const stored = w.localStorage.getItem('sciverse_chapter_quiz_results');
        const url = w.location.href;
        await w.renderTopic();
        const links = [...d.querySelectorAll('[data-chapter-review] li a')];
        assert.equal(links.length, count, 'All current saved errors have specific section links');
        for (const [i, link] of links.entries()) {
            link.click();
            assert.equal(d.activeElement, d.querySelector(`[data-chapter-section="${pool[i].sectionIndex}"] h2`));
        }
        const modifiedClick = new w.MouseEvent('click', {ctrlKey:true, bubbles:true, cancelable:true});
        links[0].dispatchEvent(modifiedClick);
        assert.equal(modifiedClick.defaultPrevented, false, 'Modified click keeps native anchor behavior');
        assert.equal(w.location.href, url, 'Review retains topic, mode and explicit plan');
        assert.equal(w.localStorage.getItem('sciverse_chapter_quiz_results'), stored, 'Navigation does not change results');
        w.startChapterQuiz();
        for (const invalid of [null,undefined,'0',-1,0.5,NaN,999]) w.reviewChapterSection(invalid);
        assert.equal(d.querySelector('#chapter-quiz-panel').hidden, false, 'Invalid navigation does not close the quiz');
        dom.window.close();
    }
    assert.equal(checked, 406);
    assert.equal(Object.values(expected).reduce((n,map) => n + Object.keys(map).length,0),109);

    const {dom, w, d} = await chapter('wetter', true);
    const q = {id:'q', question:'Which?', answers:[{text:'Yes',correct:true},{text:'No',correct:false}]};
    const sections = [{id:'base',content:'{{QUIZ_q}}'}, {id:'extra',level:'extension'}, {id:'practice',practiceOnly:true}];
    const target = value => w.collectChapterQuizQuestions({sections, diplom:{questions:[{...q, reviewSectionId:value}]}})[0].sectionIndex;
    assert.equal(target('base'), 0);
    for (const invalid of ['missing','extra','practice','',null,0,{},'base\"]']) assert.equal(target(invalid), null);
    assert.equal(w.quizReviewSectionIndex({sections:[...sections,{id:'base'}]}, {reviewSectionId:'base'}), null, 'Ambiguous IDs do not guess');
    assert.equal(w.collectChapterQuizQuestions({sections,diplom:{questions:[q]}})[0].sectionIndex, null, 'No implicit diploma mapping');
    assert.equal(w.collectChapterQuizQuestions({sections,quizzes:[q]})[0].sectionIndex, 0, 'Legacy placeholder mapping retained');
    assert.equal(w.collectChapterQuizQuestions({sections,quizzes:[{...q,reviewSectionId:'missing'}]})[0].sectionIndex, null, 'Invalid explicit reference does not silently guess');
    w.startChapterQuiz();
    w.currentChapterQuiz.questions.forEach((q,i) => {d.querySelector(`input[name="chapter_q_${i}"][value="${q.answers.findIndex(a => !a.correct)}"]`).checked = true;});
    w.submitChapterQuiz();
    assert.equal(d.querySelectorAll('#chapter-quiz-result button[onclick^="reviewChapterSection"]').length, 18);
    w.reviewChapterSection(2);
    assert.equal(d.activeElement, d.querySelector('[data-chapter-section="2"] h2'));
    assert.equal(new URL(w.location.href).searchParams.get('plan'), plan);
    assert.ok(d.querySelector('[data-weather-wind-unit]'));
    assert.ok(d.querySelector('[data-weather-light-sound]'));
    dom.window.close();
    console.log('PASS: all 406 physics assessments link to valid explanations; 109 authored diploma mappings survive reordering; result and saved-review navigation/focus, unchanged plan/results, invalid targets and blocked storage.');
})().catch(error => {console.error(error);process.exitCode = 1;});
