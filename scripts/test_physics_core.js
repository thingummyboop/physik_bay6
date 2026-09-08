const assert=require('node:assert/strict'),fs=require('fs'),path=require('path');
let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const root=path.join(__dirname,'..'),data=require('../lang/de.json');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
function create(id){const t=data[id];const dom=new JSDOM('<div id="sections-container">'+t.sections.map(s=>'<section class="card">'+s.content+'</section>').join('')+'</div>',{url:'https://example.test/topics/template.html?topic='+id,runScripts:'outside-only'});dom.window.eval(read('js/core-learning.js'));dom.window.enhanceCoreLearning(t,id,'de');return dom;}
for(const id of ['erde_mond_sonne','strahlung_radioaktivitaet','kraftwerke_energieversorgung']){
 const t=data[id];assert.equal(t.sections.length,id==='erde_mond_sonne'?4:5);assert.equal(t.sections.flatMap(s=>s.quizzes).length,id==='strahlung_radioaktivitaet'?12:11);
 t.sections.flatMap(s=>s.quizzes).forEach(q=>{assert.equal(q.answers.filter(a=>a.correct).length,1);q.answers.forEach(a=>assert.ok(a.feedback.length>25));});
 const dom=create(id),d=dom.window.document;assert.ok(d.body.textContent.includes('Kurz wiederholen'));assert.ok(d.querySelector('[aria-label="Lernziele und Vorwissen"]'));assert.ok(d.querySelectorAll('a[rel="noopener"]').length>=2);dom.window.close();
}
const moon=create('erde_mond_sonne'),md=moon.window.document,slider=md.querySelector('#moon-angle');
for(const[angle,lit]of [[0,0],[90,50],[180,100],[270,50],[360,0]]){slider.value=angle;slider.dispatchEvent(new moon.window.Event('input'));assert.equal(md.querySelector('#moon-lit').value,lit);assert.ok(slider.getAttribute('aria-valuetext').includes(lit+' Prozent'));}moon.window.close();
const decay=create('strahlung_radioaktivitaet'),dd=decay.window.document;let randomIndex=0;decay.window.Math.random=()=>randomIndex++%2?0.75:0.25;
dd.querySelector('#decay-step').click();assert.equal(dd.querySelector('#decay-bar').value,100);
dd.querySelector('#decay-step').click();assert.equal(dd.querySelector('#decay-bar').value,50);
assert.equal(dd.querySelectorAll('#decay-history tr').length,3);
// Re-initialization must not attach a second step listener.
decay.window.enhanceCoreLearning(data.strahlung_radioaktivitaet,'strahlung_radioaktivitaet','de');dd.querySelector('#decay-step').click();assert.equal(dd.querySelector('#decay-bar').value,25);
dd.querySelector('#decay-reset').click();assert.equal(dd.querySelector('#decay-bar').value,200);assert.equal(dd.querySelectorAll('#decay-history tr').length,1);decay.window.close();
const power=create('kraftwerke_energieversorgung'),pd=power.window.document;
for(const value of ['electric','chp']){pd.querySelector('#power-mode').value=value;pd.querySelector('#power-mode').dispatchEvent(new power.window.Event('change'));assert.equal([...pd.querySelectorAll('#power-table td')].reduce((sum,x)=>sum+Number(x.textContent),0),100);assert.ok(pd.querySelector('#power-status').textContent.startsWith(value==='chp'?'85':'40'));}power.window.close();
console.log('PASS: 34 authored questions, chapter metadata, five Moon positions, independent decay steps/reset, re-init and conservation of energy in both plant modes.');
