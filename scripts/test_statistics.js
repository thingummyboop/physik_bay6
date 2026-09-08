const fs=require('fs'),path=require('path'),assert=require('node:assert/strict');let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8'),data=JSON.parse(read('lang/de.json'));
(async()=>{const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic=math4_7_statistik',runScripts:'outside-only'}),w=dom.window,d=w.document;
await new Promise(r=>setImmediate(r));w.fetch=async()=>({ok:true,json:async()=>data});for(const f of ['curriculum','common','chapter-revisions','core-learning','renderer'])w.eval(read('js/'+f+'.js'));await w.renderTopic();w.eval(read('js/topics/math4_7_statistik.js'));w.topicInit();
assert.equal(d.querySelectorAll('[data-core-intro] li').length,4);assert.equal(d.querySelectorAll('#chapter-summary li').length,4);assert.ok(!d.body.textContent.includes('{{QUIZ_'));
for(const q of data.math4_7_statistik.sections.flatMap(s=>s.quizzes)){assert.ok(d.body.textContent.includes(q.question),q.id);assert.equal(q.answers.filter(a=>a.correct).length,1);}
for(const[raw,expected]of [['2 4 6 8 10 12',[2,4,7,10,12,7]],['12 10 8 6 4 2',[2,4,7,10,12,7]],['1 3 5 7 9',[1,2,5,8,9,5]],['0 100',[0,0,50,100,100,50]],['7 7 7',[7,7,7,7,7,7]],['2,5; 3,5',[2.5,2.5,3,3.5,3.5,3]]]){
const result=w.calculateStatistics(raw);assert.deepEqual(['min','q1','median','q3','max','mean'].map(k=>result[k]),expected);
}
assert.deepEqual(Array.from(w.calculateStatistics('2 2 3 3 4').modes),[2,3]);assert.equal(w.calculateStatistics('2 3 4').allEqualFrequency,true);
for(const raw of ['','5','-1 2','101 2','2 apple','2,,3','2;','1 '.repeat(21)])assert.equal(w.calculateStatistics(raw),null,raw);
const input=d.getElementById('stats_values'),button=d.querySelector('[data-stats-calculate]'),out=d.querySelector('[data-stats-output]');
d.querySelector('[data-stats-preset="high"]').click();assert.match(out.textContent,/Mittelwert: 15 min; Median: 7 min/);
for(const raw of ['7 7 7','0 100','2,5; 3,5']){input.value=raw;button.click();const svg=out.querySelector('svg');assert.ok(svg);assert.ok(!svg.outerHTML.includes('NaN'));const box=svg.querySelector('rect');assert.ok(Number(box.getAttribute('width'))>=0);assert.equal(out.querySelectorAll('td').length,5);}
input.value='invalid';button.click();assert.equal(out.children.length,0);assert.match(d.querySelector('[data-stats-status]').textContent,/Bitte/);
d.querySelector('[data-stats-preset="base"]').click();assert.match(out.textContent,/Mittelwert: 7 min; Median: 7 min/);
w.topicInit();assert.equal(out.querySelectorAll('svg').length,1);assert.equal(w.currentChapterResult('math4_7_statistik',{passed:true,bestPercent:100}).passed,false);
dom.window.close();console.log('PASS: statistics chapter, known even/odd/tied/decimal datasets, invalid input, boxplot geometry, presets and revision handling.');
})().catch(e=>{console.error(e);process.exitCode=1;});
