const fs = require('node:fs'), path = require('node:path'), assert = require('node:assert/strict');
const { chromium } = require('playwright');
const data = require('../lang/de.json').klimawandel, keys = require('./fixtures/climate_targets_keys.json');
const base = process.env.SCIVERSE_PREVIEW_URL || 'http://127.0.0.1:4173';
const out = path.resolve(__dirname, '../../browser-qa/climate-targets');
(async () => {
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch(), errors = [];
  let layouts = 0, practice = 0, assessed = 0;
  try {
    const p = await browser.newPage({ viewport: { width: 390, height: 1000 }, reducedMotion: 'reduce' });
    p.on('pageerror', e => errors.push(e.message));
    await p.goto(base + '/topics/template.html?topic=klimawandel');
    await p.waitForFunction(() => window.currentChapterQuiz?.questions.length === 17);
    await p.addStyleTag({ content: 'html{scroll-behavior:auto!important}' });
    const saved = await p.evaluate(() => JSON.stringify(localStorage));
    for (const width of [320, 390, 1280]) for (const dark of [false, true]) {
      await p.setViewportSize({ width, height: 1000 });
      await p.evaluate(d => { if (d) document.documentElement.dataset.theme = 'dark'; else delete document.documentElement.dataset.theme; }, dark);
      await p.waitForFunction(d => getComputedStyle(document.body).color === (d ? 'rgb(224, 224, 224)' : 'rgb(45, 55, 72)'), dark);
      assert.equal(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), true, 'page width ' + width);
      for (const id of ['vienna', 'eu', 'global']) {
        const card = p.locator('[data-climate-target="' + id + '"]');
        assert.equal(await card.evaluate(e => e.scrollWidth <= e.clientWidth + 1), true, id + ' overflow');
        const contrast = await card.evaluate(e => {
          const luminance = color => {
            const channels = color.match(/[\d.]+/g).slice(0, 3).map(Number).map(n => {
              const c = n / 255; return c <= .04045 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4;
            });
            return channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722;
          };
          const fg = luminance(getComputedStyle(e.querySelector('strong')).color);
          const bg = luminance(getComputedStyle(e).backgroundColor);
          return (Math.max(fg, bg) + .05) / (Math.min(fg, bg) + .05);
        });
        assert.ok(contrast >= 4.5, id + ' emphasized text contrast ' + contrast);
        if ((width === 320 && dark) || (width === 1280 && !dark)) {
          await card.evaluate(e => e.scrollIntoView({ block: 'start', behavior: 'instant' }));
          await p.evaluate(() => scrollBy(0, -90));
          await p.screenshot({ path: path.join(out, id + '-' + width + '-' + (dark ? 'dark' : 'light') + '.png'), animations: 'disabled' });
        }
      }
      layouts++;
    }
    for (const [id, key] of Object.entries(keys)) {
      const q = data.sections[5].quizzes.find(q => q.id === id), box = p.locator('.practice-box[data-id="' + id + '"]');
      for (const [i, a] of q.answers.entries()) {
        const button = box.getByRole('button', { name: a.text, exact: true });
        await button.focus(); await button.press('Enter');
        assert.equal(await button.evaluate(e => e.classList.contains('is-correct')), i === key);
        assert.ok((await box.locator('.feedback').innerText()).includes(a.feedback));
        practice++;
      }
    }
    assert.equal(await p.evaluate(() => JSON.stringify(localStorage)), saved);
    for (const [qid, key] of Object.entries(keys)) for (let a = 0; a < 3; a++) {
      if (await p.locator('#chapter-quiz-launch').isVisible()) await p.locator('#chapter-quiz-launch').click();
      if (await p.locator('[onclick="restartChapterQuiz()"]').isVisible()) await p.locator('[onclick="restartChapterQuiz()"]').click();
      await p.evaluate(({ qid, a, keys }) => currentChapterQuiz.questions.forEach((q, i) => {
        const chosen = q.id === qid ? a : keys[q.id] ?? q.answers.findIndex(a => a.correct);
        document.querySelector(`input[name="chapter_q_${i}"][value="${chosen}"]`).checked = true;
      }), { qid, a, keys });
      await p.locator('.chapter-submit-btn').click();
      const result = await p.evaluate(() => JSON.parse(localStorage.getItem('sciverse_chapter_quiz_results')).klimawandel);
      assert.equal(result.lastPercent, a === key ? 100 : 94);
      assert.equal(result.contentRevision, 2);
      assert.deepEqual(result.reviewQuestionIds, a === key ? [] : [qid]);
      if (a !== key) {
        await p.locator('[onclick="reviewChapterSection(5)"]').click();
        assert.equal(await p.locator('[data-chapter-section="5"] h2').evaluate(e => e === document.activeElement), true);
      }
      assessed++;
    }
    await p.goto(base + '/topics/worksheet.html?topic=klimawandel');
    await p.waitForFunction(() => !document.getElementById('ws-print').disabled);
    assert.equal(await p.locator('#ws-content>.question-block').count(), 17);
    assert.equal(await p.locator('[data-climate-target-tasks]>li').count(), 5);
    assert.equal(await p.locator('#ws-solutions').isVisible(), false);
    const options = { format: 'A4', printBackground: true, margin: { top: '15mm', bottom: '15mm', left: '15mm', right: '15mm' } };
    await p.pdf({ ...options, path: path.join(out, 'targets-student.pdf') });
    await p.locator('#ws-include-solutions').check();
    await p.pdf({ ...options, path: path.join(out, 'targets-solutions.pdf') });
    assert.deepEqual(errors, []);
    const report = { time: new Date().toISOString(), layouts, practice, assessed, keyboard: true, errors };
    fs.writeFileSync(path.join(out, 'report.json'), JSON.stringify(report, null, 2));
    console.log('PASS ' + JSON.stringify(report));
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
