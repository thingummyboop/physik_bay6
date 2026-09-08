const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const root=path.join(__dirname,'..');
const stored={sciverse_chapter_quiz_results:JSON.stringify({optik1:{passed:true,bestPercent:92},farben:{attemptsUsed:3,lockUntil:Date.now()+86400000}})};
const context=vm.createContext({window:{addEventListener(){}},document:{addEventListener(){}},localStorage:{getItem:k=>stored[k]||null,setItem:(k,v)=>stored[k]=v},console,URLSearchParams,Date});
vm.runInContext(fs.readFileSync(path.join(root,'js/renderer.js'),'utf8'),context);
assert.equal(context.isChapterQuizUnlocked('farben'),true,'Every assigned chapter must be accessible');
assert.equal(context.getChapterQuizResult('farben').availableAttempts,3,'Old saved lock must not block studying');
assert.equal(context.getChapterQuizResult('optik1').bestPercent,92,'Preserve previously earned result');
const card=context.renderChapterQuizCard('farben',{title:'Farben'},[{question:'Q'}]);
assert.ok(!card.includes('disabled'),'Start button is enabled');
assert.ok(card.includes('Unbegrenzt üben'));
const en=JSON.parse(fs.readFileSync(path.join(root,'lang/en.json'),'utf8'));
const q=en.optik1.sections[0].quizzes[0];
assert.equal(q.answers.filter(a=>a.correct).length,1);
assert.match(q.answers.find(a=>a.correct).text,/shadow on the screen grows/);
for(let n=0;n<20;n++){
 const rendered=context.renderPracticeBox(q);
 assert.match(rendered,/onclick="handlePracticeAnswer\(this, true, this.dataset.feedback \|\| null\)"[^>]*>The shadow on the screen grows/);
}
console.log('PASS: arbitrary chapter access, saved-lock migration, earned-score preservation, rendered start control and answer identity after shuffling.');
