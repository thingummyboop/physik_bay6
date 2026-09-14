const assert=require('node:assert/strict'),fs=require('fs'),path=require('path'),{JSDOM}=require('jsdom');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8'),data=JSON.parse(read('lang/de.json'));
(async()=>{
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic=astronomie',runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(resolve=>setImmediate(resolve));w.fetch=async()=>({ok:true,json:async()=>data});
 for(const file of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+file+'.js'));
 await w.renderTopic();w.eval(read('js/topics/astronomie.js'));w.topicInit();
 const zone=d.querySelector('[data-solar-workshop]'),body=zone.querySelector('[data-solar-body]'),view=zone.querySelector('[data-solar-view]'),scale=zone.querySelector('[data-solar-scale]');
 const source=[...zone.querySelectorAll('[data-solar-source] tbody tr')];
 // Independently transcribed rounded JPL values, not read from the implementation.
 const axes=[.39,.72,1,1.52,5.2,9.54,19.19,30.07],diameters=[4879,12104,12742,6779,139822,116464,50724,49244];
 assert.deepEqual(source.map(r=>Number(r.dataset.axisAu)),axes);assert.deepEqual(source.map(r=>Number(r.dataset.diameterKm)),diameters);
 assert.equal(d.getElementById('solarZoomRange'),null);assert.equal(typeof w.updateSolarZoom,'function');
 const before=JSON.stringify(Object.fromEntries(Object.keys(w.localStorage).map(k=>[k,w.localStorage.getItem(k)])));
 const change=(el,value)=>{el.focus();el.value=String(value);el.dispatchEvent(new w.Event('change'));assert.equal(d.activeElement,el);};
 const fmt=(n,digits)=>n.toLocaleString('de-AT',{minimumFractionDigits:digits,maximumFractionDigits:digits});
 let states=0;
 for(const mm of [1,10,100])for(const mode of ['orbit','diameter'])for(let selected=0;selected<8;selected++){
  change(scale,mm);change(view,mode);change(body,selected);w.topicInit();
  assert.equal(body.value,String(selected));assert.equal(scale.value,String(mm));assert.equal(view.value,mode);
  const rows=[...zone.querySelectorAll('[data-solar-model] tbody tr')],bars=[...zone.querySelectorAll('[data-solar-bars] > li')];
  assert.equal(rows.length,8);assert.equal(bars.length,8);
  for(let i=0;i<8;i++){
   const expectedLength=axes[i]*149597870700*(mm/12742000000),expectedDiameter=diameters[i]*1000000*(mm/12742000000);
   assert.equal(rows[i].cells[1].textContent,fmt(expectedLength,1));assert.equal(rows[i].cells[2].textContent,fmt(expectedDiameter,2));
   const percentage=parseFloat(bars[i].querySelector('[data-solar-bar]').style.width);
   assert.ok(Math.abs(percentage-(mode==='orbit'?axes[i]/40:diameters[i]/12742/12)*100)<1e-9);
   assert.equal(rows[i].hasAttribute('aria-current'),i===selected);assert.equal(bars[i].hasAttribute('aria-current'),i===selected);
  }
  const status=zone.querySelector('[role=status]').textContent;assert.ok(status.startsWith(source[selected].cells[0].textContent+':'));assert.ok(status.includes(fmt(mm,0)+' mm Erddurchmesser'));
  states++;
 }
 zone.querySelector('[data-solar-reset]').click();assert.equal(body.value,'2');assert.equal(scale.value,'10');assert.equal(view.value,'orbit');assert.equal(d.activeElement,body);
 assert.equal(JSON.stringify(Object.fromEntries(Object.keys(w.localStorage).map(k=>[k,w.localStorage.getItem(k)]))),before);
 assert.equal(zone.querySelectorAll('[data-solar-tasks] > li').length,4);
 for(const id of ['astro_solar_scale','astro_solar_distance']){const q=w.currentChapterQuiz.questions.find(q=>q.id===id);assert.equal(q.sectionIndex,6);assert.equal(q.answers.length,3);assert.equal(q.answers.filter(a=>a.correct).length,1);}
 dom.window.close();
 const paper=new JSDOM(read('topics/worksheet.html'),{url:'https://example.test/topics/worksheet.html?topic=astronomie',runScripts:'outside-only'}),pw=paper.window,pd=pw.document;
 pw.MathJax={typesetPromise:async()=>{}};pw.fetch=async()=>({ok:true,json:async()=>data});for(const file of ['curriculum','worksheet_generator','worksheet'])pw.eval(read('js/'+file+'.js'));await new Promise(resolve=>setImmediate(resolve));
 const material=pd.getElementById('ws-physics-material');assert.equal(material.querySelectorAll('[data-solar-source] tbody tr').length,8);assert.equal(material.querySelectorAll('[data-solar-protocol] tbody tr').length,4);assert.equal(material.querySelectorAll('[data-solar-tasks] > li').length,4);
 assert.equal(material.querySelectorAll('[data-solar-workshop],select,template,[role=status]').length,0);assert.doesNotMatch(material.textContent,/Mars liegt im Modell bei etwa 178/);assert.match(pd.getElementById('ws-solutions').textContent,/3 530,4 m/);assert.equal(pd.getElementById('ws-solutions').hidden,true);
 paper.window.close();console.log(`PASS: ${states} solar states, eight independently checked source values and scale conversions, proportional bars, selection/reset/focus, idempotent init, no storage writes, two assessed transfer questions, printable data/tasks and separate solutions.`);
})().catch(error=>{console.error(error);process.exitCode=1;});
