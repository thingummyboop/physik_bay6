const fs=require('fs'),path=require('path'),vm=require('vm');let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8'),data=JSON.parse(read('lang/de.json')),ctx={window:{}};
vm.runInNewContext(read('js/curriculum.js'),ctx);
const ids=[...new Set(Object.values(ctx.window.SCIVERSE_CURRICULUM).flatMap(s=>s.topics.map(t=>t.id)))];
(async()=>{
const report={scope:'German navigation chapters; shared renderer and shared labs. Does not execute per-topic scripts, external media, layout or factual/curriculum review.',chapters:ids.length,rendered:0,missingGuides:[],issues:[]};
for(const id of ids){
 const topic=data[id];if(!topic){report.issues.push({id,error:'Missing data'});continue;}
 if(!topic.learningGoals?.length||!topic.summary?.length)report.missingGuides.push(id);
 for(const section of topic.sections||[]){const questions=[...(section.quizzes||[]),...(topic.quizzes||[])];for(const match of (section.content||'').matchAll(/\{\{QUIZ_([^}]+)\}\}/g))if(!questions.some(q=>String(q.id)===match[1]))report.issues.push({id,error:'Unresolved source placeholder '+match[1]});}
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/physik_bay6/topics/template.html?topic='+id,runScripts:'outside-only'}),w=dom.window,d=w.document;
 try{
  await new Promise(r=>setImmediate(r));w.fetch=async()=>({ok:true,json:async()=>data});
  for(const file of ['curriculum','common','chapter-revisions','core-learning','language-workshop','geo-experiments','art-workshop','music-lab','meal-planner','area-lab','system-lab','sphere-lab','renderer'])w.eval(read('js/'+file+'.js'));
  await w.renderTopic();
  if(!d.querySelector('#sections-container .card'))report.issues.push({id,error:'No chapter cards'});
  if(d.body.textContent.includes('{{QUIZ_'))report.issues.push({id,error:'Unresolved rendered placeholder'});
  const expected=(topic.sections||[]).reduce((n,s)=>n+[...(s.content||'').matchAll(/\{\{QUIZ_([^}]+)\}\}/g)].length,0),actual=d.querySelectorAll('.practice-question').length;
  if(expected!==actual)report.issues.push({id,error:'Practice question count',expected,actual});
  // Core lists and the separately disclosed extension lists have different scopes.
  for(const [selector,key]of [['[data-core-intro] > ul > li','learningGoals'],['#chapter-summary > ul > li','summary'],['[data-core-intro] > details > ul > li','extensionGoals'],['[data-extension-summary] > ul > li','extensionSummary']]){
   const expected=topic[key]||[],actual=[...d.querySelectorAll(selector)].map(li=>li.textContent);
   if(JSON.stringify(actual)!==JSON.stringify(expected))report.issues.push({id,error:'Guide content '+key,expected,actual});
  }
  const comparisons=['1,41² < 2 und 1,42² > 2','x < 3 und y > 4'];for(const s of comparisons)if(w.cleanQuestionText(s)!==s)report.issues.push({id,error:'Comparison text damaged'});
  if(w.cleanQuestionText('<strong>Frage</strong><br>mit Text')!=='Frage mit Text')report.issues.push({id,error:'HTML question cleanup'});
  report.rendered++;
 }catch(e){report.issues.push({id,error:e.message});}finally{dom.window.close();}
}
const output=path.join(root,'../chapter-render-audit.json');fs.writeFileSync(output,JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({chapters:report.chapters,rendered:report.rendered,missingGuides:report.missingGuides.length,issues:report.issues,report:output},null,2));
if(report.issues.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1;});
