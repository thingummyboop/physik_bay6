'use strict';
// Inventory of authored sources, deliberately not a claim of curriculum coverage.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto');
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
const context={window:{}};vm.runInNewContext(read('js/curriculum.js'),context);
const data=JSON.parse(read('lang/de.json'));
const report={scope:'Source inventory only: no factual, curriculum, runtime, translation or visual approval.',
 sourceHashes:Object.fromEntries(['js/curriculum.js','lang/de.json'].map(p=>[p,crypto.createHash('sha256').update(read(p)).digest('hex')])),subjects:{}};
for(const [id,subject] of Object.entries(context.window.SCIVERSE_CURRICULUM)){
 const chapters=subject.topics.map(topic=>{
  const d=data[topic.id],sections=d?.sections||[];
  return {id:topic.id,title:topic.title,grade:topic.grade,gradeLevels:topic.gradeLevels||null,category:topic.category,
   available:topic.available!==false,sourcePresent:!!d,source:'lang/de.json#/'+topic.id,
   goals:d?.learningGoals||[],summaryCount:d?.summary?.length||0,
   sections:sections.map((s,i)=>({id:s.id||null,index:i,title:s.title,questions:(s.quizzes||[]).map(q=>q.id)})),
   workshop:!!d?.workshop,questionCount:sections.reduce((n,s)=>n+(s.quizzes?.length||0),0),
   questionCountScope:'section quizzes only; excludes separately authored final quizzes, generated tasks and workshops',
   factualAndCurriculumApproval:'not-established-by-this-inventory'};
 });
 report.subjects[id]={chapterCount:chapters.length,sourceCount:chapters.filter(c=>c.sourcePresent).length,chapters};
}
report.totalChapters=Object.values(report.subjects).reduce((n,s)=>n+s.chapterCount,0);
fs.writeFileSync(path.join(root,'docs/CHAPTER_INVENTORY.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({total:report.totalChapters,subjects:Object.fromEntries(Object.entries(report.subjects).map(([id,s])=>[id,{chapters:s.chapterCount,sources:s.sourceCount}]))},null,2));
