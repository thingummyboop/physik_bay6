const assert=require('node:assert/strict'),fs=require('fs'),path=require('path');let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8'),data=JSON.parse(read('lang/de.json'));
(async()=>{const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/physik_bay6/topics/template.html?topic=math4_4_funktionen_sys',runScripts:'outside-only'}),w=dom.window,d=w.document;await new Promise(resolve=>setImmediate(resolve));w.fetch=async()=>({ok:true,json:async()=>data});for(const f of ['curriculum','common','core-learning','system-lab','renderer'])w.eval(read('js/'+f+'.js'));await w.renderTopic();
assert.equal(d.querySelectorAll('.practice-box').length,20);assert.ok(d.getElementById('ggb-funktionen'));assert.match(d.getElementById('topic-title').textContent,/Gleichungssysteme/);
for(let m1=-2;m1<=2;m1++)for(let b1=-2;b1<=2;b1++)for(let m2=-2;m2<=2;m2++)for(let b2=-2;b2<=2;b2++){const r=w.solveLineSystem(m1,b1,m2,b2);if(m1===m2)assert.equal(r.kind,b1===b2?'same':'parallel');else{assert.equal(r.kind,'point');assert.ok(Math.abs(m1*r.x+b1-r.y)<1e-9);assert.ok(Math.abs(m2*r.x+b2-r.y)<1e-9);}}
const zone=d.querySelector('[data-system-lab]'),status=()=>zone.querySelector('[data-status]').textContent;assert.match(status(),/x ≈ 1, y ≈ 3/);assert.ok(zone.querySelector('[data-intersection]'));
zone.querySelector('[data-preset="none"]').click();assert.match(status(),/Keine gemeinsame Lösung/);assert.equal(zone.querySelector('[data-intersection]'),null);
zone.querySelector('[data-preset="many"]').click();assert.match(status(),/Unendlich viele/);
const set=(key,value)=>{const el=zone.querySelector('[data-'+key+']');el.value=value;el.dispatchEvent(new w.Event('input'));};
set('m1',1);set('b1',0);set('m2',1.1);set('b2',10);assert.match(status(),/außerhalb/);assert.equal(zone.querySelector('[data-intersection]'),null);
set('m1','');assert.match(status(),/Gib für jede Steigung/);assert.equal(zone.querySelectorAll('svg line').length,0);zone.querySelector('[data-preset="one"]').click();assert.ok(zone.querySelector('[data-intersection]'));
set('m1',6);assert.match(status(),/Gib für jede Steigung/);zone.querySelector('[data-preset="one"]').click();w.initSystemLabs();assert.equal(zone.querySelectorAll('svg').length,1);
assert.equal(w.solveLineSystem(1e-320,0,0,10).kind,'limit');
for(const line of zone.querySelectorAll('[data-function]'))for(const name of ['x1','x2','y1','y2'])assert.ok(Number(line.getAttribute(name))>=50&&Number(line.getAttribute(name))<=410);
dom.window.close();console.log('PASS: actual expanded chapter, 20 practice questions, retained graph explorer; 625 coefficient combinations checked in both equations, all three solution cases, outside-window point, invalid input and numerical limit.');
})().catch(error=>{console.error(error);process.exitCode=1;});
