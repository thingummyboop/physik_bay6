const fs = require('node:fs'), path = require('node:path'), assert = require('node:assert/strict');
const { chromium } = require('playwright');
const data = require('../lang/de.json').waermelehre;
const keys = require('./fixtures/thermal_inquiry_keys.json');
const base = process.env.SCIVERSE_PREVIEW_URL || 'http://127.0.0.1:4173';
const out = path.resolve(__dirname, '../../browser-qa/thermal-inquiry');

(async () => {
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch(), errors = [];
  let layouts = 0, practice = 0, assessed = 0;
  try {
    const p = await browser.newPage({ viewport: { width: 390, height: 1000 }, reducedMotion: 'reduce' });
    p.on('pageerror', e => errors.push(e.message));
    await p.goto(base + '/topics/template.html?topic=waermelehre');
    await p.waitForFunction(() => window.currentChapterQuiz?.questions.length === 29);
    await p.addStyleTag({ content: 'html{scroll-behavior:auto!important}' });
    const saved = await p.evaluate(() => JSON.stringify(localStorage));
    for (const width of [320, 390, 1280]) for (const dark of [false, true]) {
      await p.setViewportSize({ width, height: 1000 });
      await p.evaluate(d => { if (d) document.documentElement.dataset.theme = 'dark'; else delete document.documentElement.dataset.theme; }, dark);
      await p.waitForFunction(d => getComputedStyle(document.body).color === (d ? 'rgb(224, 224, 224)' : 'rgb(45, 55, 72)'), dark);
      assert.equal(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), true);
      for (const id of ['conduction', 'radiation', 'convection']) {
        const lab = p.locator('[data-thermal-inquiry="' + id + '"]');
        const record = lab.locator('.thermal-record-scroll');
        assert.equal(await lab.locator('[data-thermal-steps]>li').count(), 5);
        if (width < 620) {
          await record.evaluate(e => { e.scrollLeft = 0; });
          await record.focus();
          for (let i = 0; i < 8; i++) await p.keyboard.press('ArrowRight');
          await p.waitForFunction(id => document.querySelector('[data-thermal-inquiry="' + id + '"] .thermal-record-scroll').scrollLeft > 0, id);
          await record.evaluate(e => new Promise(resolve => {
            let previous = e.scrollLeft, stableFrames = 0;
            const settle = () => {
              stableFrames = e.scrollLeft === previous ? stableFrames + 1 : 0;
              previous = e.scrollLeft;
              if (stableFrames >= 12) resolve(); else requestAnimationFrame(settle);
            };
            requestAnimationFrame(settle);
          }));
          await record.evaluate(e => { e.blur(); e.scrollLeft = 0; });
          assert.equal(await record.evaluate(e => e.scrollLeft), 0);
        }
        if ((width === 320 && dark) || (width === 1280 && !dark)) {
          await record.evaluate(e => e.scrollIntoView({ block: 'center', behavior: 'instant' }));
          await p.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))));
          await p.screenshot({ path: path.join(out, id + '-' + width + '-' + (dark ? 'dark' : 'light') + '.png'), animations: 'disabled' });
        }
        layouts++;
      }
    }
    for (const [id, x] of Object.entries(keys)) {
      const q = data.sections[x.section].quizzes.find(q => q.id === id);
      const box = p.locator('.practice-box[data-id="' + id + '"]');
      for (const [i, a] of q.answers.entries()) {
        const button = box.getByRole('button', { name: a.text, exact: true });
        await button.focus();
        await button.press('Enter');
        assert.equal(await button.evaluate(e => e.classList.contains('is-correct')), i === x.key);
        assert.ok((await box.locator('.feedback').innerText()).includes(a.feedback));
        practice++;
      }
    }
    assert.equal(await p.evaluate(() => JSON.stringify(localStorage)), saved);
    for (const [qid, x] of Object.entries(keys)) for (let a = 0; a < 3; a++) {
      if (await p.locator('#chapter-quiz-launch').isVisible()) await p.locator('#chapter-quiz-launch').click();
      if (await p.locator('[onclick="restartChapterQuiz()"]').isVisible()) await p.locator('[onclick="restartChapterQuiz()"]').click();
      await p.evaluate(({ qid, a, keys }) => currentChapterQuiz.questions.forEach((q, i) => {
        const chosen = q.id === qid ? a : keys[q.id]?.key ?? q.answers.findIndex(a => a.correct);
        document.querySelector(`input[name="chapter_q_${i}"][value="${chosen}"]`).checked = true;
      }), { qid, a, keys });
      await p.locator('.chapter-submit-btn').click();
      const result = await p.evaluate(() => JSON.parse(localStorage.getItem('sciverse_chapter_quiz_results')).waermelehre);
      assert.equal(result.lastPercent, a === x.key ? 100 : 97);
      assert.equal(result.contentRevision, 4);
      assert.deepEqual(result.reviewQuestionIds, a === x.key ? [] : [qid]);
      if (a !== x.key) {
        await p.locator('[onclick="reviewChapterSection(' + x.section + ')"]').click();
        assert.equal(await p.locator('[data-chapter-section="' + x.section + '"] h2').evaluate(e => e === document.activeElement), true);
      }
      assessed++;
    }
    await p.goto(base + '/topics/worksheet.html?topic=waermelehre');
    await p.waitForFunction(() => !document.getElementById('ws-print').disabled);
    assert.equal(await p.locator('#ws-content>.question-block').count(), 29);
    assert.equal(await p.locator('[data-thermal-record] tbody tr').count(), 13);
    assert.equal(await p.locator('#ws-solutions').isVisible(), false);
    const options = { format: 'A4', printBackground: true, margin: { top: '15mm', bottom: '15mm', left: '15mm', right: '15mm' } };
    await p.pdf({ ...options, path: path.join(out, 'thermal-student.pdf') });
    await p.locator('#ws-include-solutions').check();
    await p.pdf({ ...options, path: path.join(out, 'thermal-solutions.pdf') });
    assert.deepEqual(errors, []);
    const report = { time: new Date().toISOString(), layouts, practice, assessed, keyboard: true, paperRows: 13, errors };
    fs.writeFileSync(path.join(out, 'report.json'), JSON.stringify(report, null, 2));
    console.log('PASS ' + JSON.stringify(report));
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
