const fs=require('fs'),path=require('path'),assert=require('node:assert/strict');let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8'),data=JSON.parse(read('lang/de.json'));
(async()=>{for(const id of ['math3_10_prozent_zins','math4_8_finanzmathematik']){
const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic='+id,runScripts:'outside-only'}),w=dom.window,d=w.document;
await new Promise(r=>setImmediate(r));w.fetch=async()=>({ok:true,json:async()=>data});for(const f of ['curriculum','common','chapter-revisions','core-learning','renderer'])w.eval(read('js/'+f+'.js'));await w.renderTopic();
assert.equal(d.querySelectorAll('[data-core-intro] li').length,data[id].learningGoals.length);assert.ok(!d.body.textContent.includes('{{QUIZ_'));for(const q of data[id].sections.flatMap(s=>s.quizzes)){assert.ok(d.body.textContent.includes(q.question));}
if(id==='math4_8_finanzmathematik'){
w.eval(read('js/topics/'+id+'.js'));w.topicInit();
assert.deepEqual(Array.from(w.financeComparison(100),r=>r.compound),[105,110.25,115.76,121.55,127.63]);assert.equal(w.financeComparison(100)[4].simple,125);assert.equal(w.financeComparison(1000)[4].compound,1276.29);assert.equal(w.financeComparison(0)[4].compound,0);assert.equal(w.financeComparison(0.1)[4].compound,0.15);
for(const value of [NaN,Infinity,-1,100001,1.001])assert.equal(w.financeComparison(value),null);
const input=d.getElementById('fin_z'),button=input.closest('.interactive-zone').querySelector('button'),out=d.querySelector('[data-interest-table]');
assert.equal(out.querySelectorAll('tbody tr').length,5);
for(const value of ['','-1','100001','1.001']){input.value=value;button.click();assert.equal(out.children.length,0);assert.match(d.getElementById('finanz_feedback').textContent,/höchstens zwei/);}
input.value='100';input.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Enter',bubbles:true}));assert.equal(out.querySelectorAll('tbody tr').length,5);assert.match(out.textContent,/127,63/);w.topicInit();assert.equal(out.querySelectorAll('table').length,1);
}
assert.equal(w.currentChapterResult(id,{passed:true,bestPercent:100}).passed,false);dom.window.close();
}console.log('PASS: both finance chapters, annual cent rounding, simple/compound comparison, zero/invalid amounts, recovery, Enter and revisions.');})().catch(e=>{console.error(e);process.exitCode=1;});
