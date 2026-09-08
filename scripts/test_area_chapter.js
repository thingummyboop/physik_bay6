const assert=require('node:assert/strict'),fs=require('fs'),path=require('path');let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8'),data=JSON.parse(read('lang/de.json'));
(async()=>{const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/physik_bay6/topics/template.html?topic=math3_4_flaechensatz',runScripts:'outside-only'}),w=dom.window,d=w.document;
await new Promise(resolve=>setImmediate(resolve));w.fetch=async()=>({ok:true,json:async()=>data});for(const f of ['curriculum','common','core-learning','language-workshop','area-lab','renderer'])w.eval(read('js/'+f+'.js'));await w.renderTopic();
assert.match(d.getElementById('topic-title').textContent,/Flächeninhalte/);assert.equal(d.querySelectorAll('.practice-box').length,8);assert.equal(d.querySelectorAll('.chapter-question').length,8);assert.equal(data.math3_4_flaechensatz.script,false);
const zone=d.querySelector('[data-area-lab]'),shape=zone.querySelector('select'),base=zone.querySelector('[data-base]'),height=zone.querySelector('[data-height]'),top=zone.querySelector('[data-top]');
for(const type of ['rectangle','triangle','parallelogram','trapezoid'])for(const b of [1,6,10])for(const h of [1,4,10])for(const a of [1,3,10]){
 shape.value=type;base.value=b;height.value=h;top.value=a;shape.dispatchEvent(new w.Event('input'));
 const pts=zone.querySelector('polygon').getAttribute('points').split(' ').map(p=>p.split(',').map(Number));let sum=0;for(let i=0;i<pts.length;i++){const n=(i+1)%pts.length;sum+=pts[i][0]*pts[n][1]-pts[n][0]*pts[i][1];}
 const drawnArea=Math.abs(sum)/2/(20*20),expected=type==='triangle'?b*h/2:type==='trapezoid'?(a+b)*h/2:b*h;
 assert.equal(drawnArea,expected,'Drawn geometry matches formula');assert.equal(w.areaValue(type,b,h,a),expected);assert.equal(top.disabled,type!=='trapezoid');assert.match(zone.querySelector('svg').getAttribute('aria-label'),/senkrechte Höhe/);
 assert.ok(pts.every(([x,y])=>x>=0&&x<=400&&y>=0&&y<=280));
}
w.initAreaLabs();assert.equal(zone.querySelectorAll('svg').length,1);
const work=d.querySelector('[data-language-workshop]');[...work.querySelectorAll('select')].forEach((s,i)=>s.value=data.math3_4_flaechensatz.workshop.items[i].answer);[...work.querySelectorAll('button')].find(b=>b.textContent==='Zuordnung prüfen').click();assert.match(work.textContent,/3 von 3/);dom.window.close();
const en=JSON.parse(read('lang/en.json')),english=new JSDOM(read('topics/template.html'),{url:'https://example.test/physik_bay6/topics/template.html?topic=math3_4_flaechensatz',runScripts:'outside-only'}),ew=english.window;await new Promise(resolve=>setImmediate(resolve));ew.localStorage.setItem('physik_lang','en');ew.fetch=async url=>({ok:true,json:async()=>url.includes('/de.json')?data:en});for(const f of ['curriculum','chapter-revisions','common','core-learning','language-workshop','area-lab','renderer'])ew.eval(read('js/'+f+'.js'));await ew.renderTopic();assert.match(ew.document.getElementById('topic-title').textContent,/Areas of plane shapes/);assert.equal(ew.document.querySelector('[data-content-language-notice]'),null);assert.equal(ew.currentChapterQuiz.questions.length,8);const ez=ew.document.querySelector('[data-area-lab]');ez.querySelector('select').value='triangle';ez.querySelector('[data-base]').value=3;ez.querySelector('[data-height]').value=3;ez.querySelector('select').dispatchEvent(new ew.Event('input'));assert.match(ez.querySelector('[data-status]').textContent,/4\.5 cm²/);assert.match(ez.querySelector('svg').getAttribute('aria-label'),/perpendicular height/);assert.doesNotMatch(ez.textContent,/Grundseite|Flächenlabor|Vergleiche/);assert.match(ew.document.querySelector('[data-language-workshop]').textContent,/Calculate a floor area/);english.window.close();
// Exercise every additional offered translation through the real chapter renderer.
for (const language of ['sr','tr','uk','ar']) {
 const translated=JSON.parse(read('lang/'+language+'.json'));
 const chapter=translated.math3_4_flaechensatz;
 const localized=new JSDOM(read('topics/template.html'),{url:'https://example.test/physik_bay6/topics/template.html?topic=math3_4_flaechensatz',runScripts:'outside-only'});
 const lw=localized.window; await new Promise(resolve=>setImmediate(resolve));
 lw.localStorage.setItem('physik_lang',language);
 lw.fetch=async url=>({ok:true,json:async()=>url.includes('/de.json')?data:translated});
 for(const f of ['curriculum','chapter-revisions','common','core-learning','language-workshop','area-lab','renderer'])lw.eval(read('js/'+f+'.js'));
 await lw.renderTopic();
 assert.equal(lw.document.getElementById('topic-title').textContent,chapter.title);
 assert.equal(lw.document.querySelector('[data-content-language-notice]'),null,language+' must not fall back to German');
 assert.equal(lw.currentChapterQuiz.questions.length,8);
 assert.equal(lw.document.getElementById('sections-container').dir,language==='ar'?'rtl':'ltr');
 const lab=lw.document.querySelector('[data-area-lab]');
 lab.querySelector('select').value='triangle';lab.querySelector('[data-base]').value=3;lab.querySelector('[data-height]').value=3;
 lab.querySelector('select').dispatchEvent(new lw.Event('input'));
 assert.ok(lab.querySelector('[data-status]').textContent.includes((4.5).toLocaleString(language)),language+' decimal formatting');
 assert.ok(lab.querySelector('svg').getAttribute('aria-label').includes(lab.dataset.heightName));
 assert.doesNotMatch(lab.textContent,/Grundseite|Flächenlabor|Vergleiche/);
 if(language==='ar'){
  assert.equal(lab.querySelector('svg').getAttribute('direction'),'ltr');
  assert.equal(lab.querySelector('[data-status]').dir,'ltr');
 }
 const workshop=lw.document.querySelector('[data-language-workshop]');
 assert.ok(workshop.textContent.includes(chapter.workshop.title));
 localized.window.close();
}
console.log('PASS: actual area chapter render, 8 practice/check questions, three formula classifications; 108 shape/length combinations checked against independent polygon area and viewport bounds.');
})().catch(error=>{console.error(error);process.exitCode=1;});
