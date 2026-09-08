const fs=require('fs'),path=require('path'),assert=require('node:assert/strict');let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8'),data=JSON.parse(read('lang/de.json'));
(async()=>{const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic=math4_3_terme_gleichungen',runScripts:'outside-only'}),w=dom.window,d=w.document;
await new Promise(r=>setImmediate(r));w.fetch=async()=>({ok:true,json:async()=>data});for(const f of ['curriculum','common','chapter-revisions','core-learning','renderer'])w.eval(read('js/'+f+'.js'));await w.renderTopic();w.eval(read('js/topics/math4_3_terme_gleichungen.js'));w.topicInit();
assert.equal(d.querySelectorAll('[data-core-intro] li').length,4);assert.equal(d.querySelectorAll('#chapter-summary li').length,4);assert.ok(!d.body.textContent.includes('{{QUIZ_'));
const questions=data.math4_3_terme_gleichungen.sections.flatMap(s=>s.quizzes);assert.equal(questions.length,9);for(const q of questions){assert.ok(d.body.textContent.includes(q.question));assert.equal(q.answers.filter(a=>a.correct).length,1);}
const tasks=[
 {actions:['Auf beiden Seiten 2x subtrahieren.','Auf beiden Seiten 4 subtrahieren.'],solution:5,probe:x=>[3*x+4,2*x+9]},
 {actions:['Links zu 2x − 6 ausmultiplizieren.','Auf beiden Seiten x subtrahieren.','Auf beiden Seiten 6 addieren.'],solution:10,probe:x=>[2*(x-3),x+4]},
 {actions:['Beide Seiten mit 3 multiplizieren.','Auf beiden Seiten 2 subtrahieren.'],solution:10,probe:x=>[(x+2)/3,4]}
];
const select=d.getElementById('equation_task'),current=d.querySelector('[data-equation-current]'),options=d.querySelector('[data-equation-options]'),feedback=d.querySelector('[data-equation-feedback]');
for(const [index,task]of tasks.entries()){
 select.value=String(index);select.dispatchEvent(new w.Event('change'));
 for(const action of task.actions){
  const before=current.textContent;
  for(const bad of [...options.querySelectorAll('button')].filter(b=>b.textContent!==action)){bad.click();assert.equal(current.textContent,before);assert.ok(feedback.textContent.length>10);}
  const correct=[...options.querySelectorAll('button')].find(b=>b.textContent===action);assert.ok(correct);correct.click();
 }
 assert.equal(current.textContent,'x = '+task.solution);assert.match(feedback.textContent,/Probe:/);assert.equal(options.children.length,0);assert.equal(d.querySelectorAll('[data-equation-history] li').length,task.actions.length);assert.equal(...task.probe(task.solution));
 d.querySelector('[data-equation-reset]').click();assert.equal(d.querySelectorAll('[data-equation-history] li').length,0);assert.equal(options.children.length,3);
}
const input=d.getElementById('term1');input.value='6';input.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Enter',bubbles:true}));assert.match(d.getElementById('fb_term1').textContent,/Richtig/);
assert.equal(w.currentChapterResult('math4_3_terme_gleichungen',{passed:true,bestPercent:100}).passed,false);dom.window.close();console.log('PASS: nine equation questions and guides; all correct/incorrect step choices in three tasks, independent substitution, reset and existing term input.');
})().catch(e=>{console.error(e);process.exitCode=1;});
