const assert = require('node:assert/strict'), fs = require('node:fs'), path = require('node:path');
const { JSDOM } = require('jsdom');
const read = p => fs.readFileSync(path.join(__dirname, '..', p), 'utf8');
const data = JSON.parse(read('lang/de.json')), keys = require('./fixtures/climate_targets_keys.json');
(async () => {
  const dom = new JSDOM(read('topics/template.html'), { url: 'https://example.test/topics/template.html?topic=klimawandel', runScripts: 'outside-only' });
  const w = dom.window, d = w.document;
  await new Promise(r => setImmediate(r));
  w.fetch = async () => ({ ok: true, json: async () => data });
  for (const f of ['curriculum', 'chapter-revisions', 'common', 'core-learning', 'renderer']) w.eval(read('js/' + f + '.js'));
  await w.renderTopic();
  assert.equal(w.currentChapterQuiz.questions.length, 17);
  assert.equal(w.chapterRevision('klimawandel'), 2);
  assert.equal(w.currentChapterResult('klimawandel', { contentRevision: 1, passed: true, bestPercent: 100 }).passed, false);
  const task = d.querySelector('[data-climate-targets]');
  assert.equal(task.querySelectorAll('[data-climate-target]').length, 3);
  assert.equal(task.querySelectorAll('[data-climate-target-tasks]>li').length, 5);
  assert.match(task.textContent, /23.09.2026/);
  assert.match(task.querySelector('[data-climate-target="vienna"]').textContent, /pro Kopf um 55 % gegenüber 2005/);
  assert.match(task.querySelector('[data-climate-target="eu"]').textContent, /mindestens 55 % weniger Netto-Treibhausgasemissionen gegenüber 1990/);
  assert.match(task.querySelector('[data-climate-target="eu"]').textContent, /85 Prozentpunkte/);
  assert.match(task.querySelector('[data-climate-target="global"]').textContent, /deutlich unter 2 °C/);
  assert.match(task.textContent, /Originalquelle nicht selbst geprüft/);
  assert.match(task.textContent, /Niemand muss Einkommen/);
  let practice = 0, assessed = 0;
  const saved = JSON.stringify(w.localStorage);
  for (const [id, key] of Object.entries(keys)) {
    const q = data.klimawandel.sections[5].quizzes.find(q => q.id === id);
    const box = d.querySelector('.practice-box[data-id="' + id + '"]');
    for (const [i, a] of q.answers.entries()) {
      const button = [...box.querySelectorAll('button')].find(b => b.textContent === a.text);
      new w.Function(button.getAttribute('onclick')).call(button);
      assert.equal(button.classList.contains('is-correct'), i === key);
      assert.ok(box.querySelector('.feedback').innerText.includes(a.feedback));
      practice++;
    }
  }
  assert.equal(JSON.stringify(w.localStorage), saved);
  for (const [qid, key] of Object.entries(keys)) for (let a = 0; a < 3; a++) {
    w.restartChapterQuiz();
    w.currentChapterQuiz.questions.forEach((q, i) => {
      const chosen = q.id === qid ? a : keys[q.id] ?? q.answers.findIndex(a => a.correct);
      d.querySelector(`input[name="chapter_q_${i}"][value="${chosen}"]`).checked = true;
    });
    w.submitChapterQuiz();
    const result = JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results')).klimawandel;
    assert.equal(result.lastPercent, a === key ? 100 : 94);
    assert.equal(result.contentRevision, 2);
    assert.deepEqual(result.reviewQuestionIds, a === key ? [] : [qid]);
    assert.equal(w.currentChapterQuiz.questions.find(q => q.id === qid).sectionIndex, 5);
    if (a !== key) {
      w.reviewChapterSection(5);
      assert.equal(d.activeElement, d.querySelector('[data-chapter-section="5"] h2'));
    }
    assessed++;
  }
  dom.window.close();
  const paper = new JSDOM(read('topics/worksheet.html'), { url: 'https://example.test/topics/worksheet.html?topic=klimawandel', runScripts: 'outside-only' });
  const pw = paper.window, pd = pw.document;
  pw.fetch = async () => ({ ok: true, json: async () => data });
  for (const f of ['curriculum', 'worksheet']) pw.eval(read('js/' + f + '.js'));
  await new Promise(r => setImmediate(r));
  assert.equal(pd.querySelectorAll('#ws-content>.question-block').length, 17);
  assert.equal(pd.querySelectorAll('[data-climate-target]').length, 3);
  assert.equal(pd.querySelectorAll('[data-climate-target-tasks]>li').length, 5);
  assert.equal(pd.querySelectorAll('#ws-physics-material [data-climate-target-solution]').length, 0);
  assert.match(pd.getElementById('ws-solutions').textContent, /Vergleichshinweise zu Zielen und Maßnahmen/);
  assert.equal(pd.getElementById('ws-solutions').hidden, true);
  paper.window.close();
  console.log(`PASS: ${practice} practice and ${assessed} independently keyed assessment paths; three dated target cards, five source/implementation tasks, revision 2 and separate paper solution.`);
})().catch(e => { console.error(e); process.exitCode = 1; });
