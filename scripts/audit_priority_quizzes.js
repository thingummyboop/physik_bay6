// Structural evidence only: this does not establish factual correctness.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.join(__dirname,'..'),context={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(root,'js/curriculum.js'),'utf8'),context);
const data=JSON.parse(fs.readFileSync(path.join(root,'lang/de.json'),'utf8'));
const report={createdAt:new Date().toISOString(),scope:'German structured questions in the five user-prioritized subjects',limitations:'Checks stored options, flags and feedback presence only. Does not prove factual correctness, distinct mathematical meanings, runtime coverage, generated questions or curriculum completeness.',subjects:{},issues:[]};
for(const subject of ['physik','mathematik','chemie','biologie','dgb']){
 let questions=0;const topics=context.window.SCIVERSE_CURRICULUM[subject].topics;
 for(const {id}of topics){
  const chapter=data[id];if(!chapter){report.issues.push({chapter:id,issue:'missing chapter'});continue;}
  for(const q of [...(chapter.sections||[]).flatMap(s=>s.quizzes||[]),...(chapter.quizzes||[]),...(chapter.diplom?.questions||[])]){
   questions++;const answers=q.answers||[],texts=answers.map(a=>String(a.text||'').trim().toLowerCase());
   const issue=message=>report.issues.push({chapter:id,question:q.id,issue:message});
   if(answers.filter(a=>a.correct===true).length!==1)issue('expected exactly one correct answer');
   if(answers.length<2)issue('fewer than two options');
   if(texts.some(t=>!t))issue('empty option');
   if(new Set(texts).size!==texts.length)issue('duplicate option text');
   if(answers.some(a=>!String(a.feedback||'').trim()))issue('missing feedback');
   if(answers.some(a=>/^(Richtig\. .+ ist hier korrekt\.|Noch nicht\. Korrekt ist: .+)$/s.test(a.feedback||'')))issue('answer-only feedback template without reasoning');
  }
 }
 report.subjects[subject]={chapters:topics.length,questions};
}
report.totalQuestions=Object.values(report.subjects).reduce((sum,s)=>sum+s.questions,0);
fs.writeFileSync(path.join(root,'docs/PRIORITY_QUIZ_AUDIT.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({totalQuestions:report.totalQuestions,subjects:report.subjects,issues:report.issues},null,2));
process.exitCode=report.issues.length?1:0;
