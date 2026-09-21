const fs=require('fs'),path=require('path'),assert=require('node:assert/strict');let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8'),data=JSON.parse(read('lang/de.json'));
(async()=>{const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic=math4_1_reelle_zahlen',runScripts:'outside-only'}),w=dom.window,d=w.document;
await new Promise(r=>setImmediate(r));w.fetch=async()=>({ok:true,json:async()=>data});for(const f of ['curriculum','common','chapter-revisions','core-learning','renderer'])w.eval(read('js/'+f+'.js'));await w.renderTopic();w.eval(read('js/topics/math4_1_reelle_zahlen.js'));w.topicInit();
assert.equal(d.querySelectorAll('[data-core-intro] li').length,7);assert.equal(d.querySelectorAll('#chapter-summary li').length,7);assert.ok(!d.body.textContent.includes('{{QUIZ_'));
const questions=data.math4_1_reelle_zahlen.sections.flatMap(s=>s.quizzes);assert.equal(questions.length,17);for(const q of questions){assert.ok(d.body.textContent.includes(q.question),q.id+": "+q.question);assert.equal(q.answers.filter(a=>a.correct).length,1);}
const slider=d.getElementById('root_estimate'),out=d.getElementById('root_estimate_result');
for(let n=1000;n<=2000;n++){slider.value=String(n/1000);slider.dispatchEvent(new w.Event('input'));assert.equal(out.textContent.includes('unter √2'),n*n<2000000);assert.ok(!out.textContent.includes('NaN'));}
const input=d.getElementById('root1'),feedback=d.getElementById('feedback1');for(const[value,correct]of [['',false],['-5',false],['25',false],['5',true]]){input.value=value;input.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Enter',bubbles:true}));assert.equal(feedback.textContent.startsWith('Richtig!'),correct);}
assert.equal(w.currentChapterResult('math4_1_reelle_zahlen',{passed:true,bestPercent:100}).passed,false);dom.window.close();console.log('PASS: real-number chapter renders 17 section questions and guides; all 1001 approximation steps and root input checked.');
})().catch(e=>{console.error(e);process.exitCode=1;});
