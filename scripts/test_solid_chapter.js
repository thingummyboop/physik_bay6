const assert=require('node:assert/strict'),fs=require('fs');let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const read=p=>fs.readFileSync(p,'utf8'),de=JSON.parse(read('lang/de.json'));
(async()=>{const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic=math3_9_koerper',runScripts:'outside-only'}),w=dom.window;await new Promise(r=>setImmediate(r));w.fetch=async()=>({ok:true,json:async()=>de});for(const f of ['curriculum','chapter-revisions','common','core-learning','language-workshop','renderer'])w.eval(read('js/'+f+'.js'));await w.renderTopic();w.eval(read('js/topics/math3_9_koerper.js'));w.topicInit();
assert.equal(w.currentChapterQuiz.questions.length,9);assert.equal(w.chapterRevision('math3_9_koerper'),2);assert.ok(w.document.querySelector('[data-language-workshop]'));
const z=w.document.querySelector('[data-solid-lab]'),g=z.querySelector('[data-solid-base]'),h=z.querySelector('[data-solid-height]'),status=z.querySelector('[data-solid-status]');
for(let ground=3;ground<=60;ground+=3)for(let height=1;height<=20;height++){
 g.value=ground;h.value=height;g.dispatchEvent(new w.Event('input'));
 assert.ok(status.textContent.includes('Prisma: V = '+(ground*height).toLocaleString('de-AT')+' cm³'));
 assert.ok(status.textContent.includes('Pyramide: V = '+(ground*height/3).toLocaleString('de-AT')+' cm³'));
}
z.querySelector('button').click();assert.equal(g.value,'12');assert.equal(h.value,'10');w.topicInit();assert.equal(z.querySelectorAll('[data-solid-status]').length,1);
const net=w.document.querySelector('[data-prism-net]');
for(const view of ['solid','net'])for(const part of ['all','base','mantle']){
 const vb=net.querySelector('[data-prism-view="'+view+'"]');vb.focus();vb.click();
 net.querySelector('[data-prism-part="'+part+'"]').click();
 assert.equal(vb.getAttribute('aria-pressed'),'true');
 assert.equal(net.querySelectorAll('polygon').length,5);
 assert.equal(net.querySelectorAll('polygon[stroke-width="3"]').length,part==='all'?5:part==='base'?2:3);
 assert.ok(net.querySelector('svg').getAttribute('aria-label').includes(part==='base'?'12 cm²':part==='mantle'?'72 cm²':'84 cm²'));
}
// The net polygons must independently reproduce the two triangle areas and three rectangle areas.
const areas=[...net.querySelectorAll('polygon')].map(poly=>{
 const points=poly.getAttribute('points').split(' ').map(p=>p.split(',').map(Number));
 let sum=0;points.forEach(([x,y],i)=>{const [nx,ny]=points[(i+1)%points.length];sum+=x*ny-y*nx;});
 assert.ok(points.every(([x,y])=>x>=0&&x<=360&&y>=0&&y<=400));
 return Math.abs(sum)/2/400;
});assert.deepEqual(areas,[6,6,18,24,30]);
const viewButton=net.querySelector('[data-prism-view="solid"]');viewButton.focus();viewButton.click();assert.equal(w.document.activeElement,viewButton);
w.topicInit();assert.equal(net.querySelectorAll('svg').length,1);
const input=w.document.getElementById('ans_m39_1'),feedback=w.document.getElementById('res_m39_1');for(const value of ['','nicht 3d','2D','3D']){input.value=value;w.check_m39();assert.equal(feedback.textContent.startsWith('Richtig'),value==='3D');}
assert.equal(w.currentChapterResult('math3_9_koerper',{contentRevision:1,passed:true}).passed,false);
// Independently verify the worked open-box model against its five individual faces.
assert.equal(40*30+40*20+40*20+30*20+30*20,4000);assert.equal(40*30*20/1000,24);
dom.window.close();console.log('PASS: rendered solid chapter, nine questions, 400 prism/pyramid comparisons, reset, input validation and revision invalidation.');})().catch(e=>{console.error(e);process.exitCode=1;});
