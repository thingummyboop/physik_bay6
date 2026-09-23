'use strict';
// Use the actual assessment pool: extension/practice questions and duplicates are excluded.
// A resolvable reference is structural evidence, not proof of a helpful explanation.
const fs = require('node:fs'), path = require('node:path'), crypto = require('node:crypto');
const {JSDOM} = require('jsdom');
const root = path.join(__dirname,'..');
const read = p => fs.readFileSync(path.join(root,p),'utf8');
const data = JSON.parse(read('lang/de.json'));
const dom = new JSDOM('',{url:'https://example.test',runScripts:'outside-only'});
const w = dom.window;
const report = {
    scope:'Actual German chapter assessment pools in the five prioritized subjects',
    limitations:'Structural targets only. Does not establish factual accuracy, explanation quality, all runtime/visual behavior or curriculum completeness. Counts exclude practice/extension questions and duplicate questions, unlike the authored-source question inventory.',
    sourceHashes:Object.fromEntries(['lang/de.json','js/renderer.js','js/curriculum.js'].map(p => [p,crypto.createHash('sha256').update(read(p)).digest('hex')])),
    subjects:{}, invalidReferences:[]
};
try {
    for (const f of ['curriculum','renderer']) w.eval(read('js/'+f+'.js'));
    for (const subject of ['physik','mathematik','chemie','biologie','dgb']) {
        let assessed = 0, linked = 0;
        const missing = [];
        for (const {id} of w.SCIVERSE_CURRICULUM[subject].topics) {
            const chapter = data[id];
            const pool = w.collectChapterQuizQuestions(chapter);
            assessed += pool.length;
            linked += pool.filter(q => Number.isInteger(q.sectionIndex)).length;
            const questionIds = pool.filter(q => !Number.isInteger(q.sectionIndex)).map(q => q.id);
            if (questionIds.length) missing.push({chapter:id,questionIds});
            const authored = [...(chapter.quizzes||[]),...(chapter.diplom?.questions||[]),...(chapter.sections||[]).flatMap(s => s.quizzes||[])];
            for (const q of authored) {
                if (Object.hasOwn(q,'reviewSectionId') && w.quizReviewSectionIndex(chapter,q) === null) {
                    report.invalidReferences.push({chapter:id,question:q.id,reviewSectionId:q.reviewSectionId});
                }
            }
        }
        report.subjects[subject] = {assessed,linked,withoutSpecificSection:assessed-linked,missing};
    }
} finally {w.close();}
fs.writeFileSync(path.join(root,'docs/QUIZ_REVIEW_AUDIT.json'),JSON.stringify(report,null,2)+'\n');
for (const [subject,result] of Object.entries(report.subjects)) console.log(`${subject}: ${result.linked}/${result.assessed} assessment questions have a specific section; ${result.withoutSpecificSection} remain.`);
console.log(`${report.invalidReferences.length} invalid explicit references. Structural evidence only.`);
process.exitCode = report.invalidReferences.length ? 1 : 0;
