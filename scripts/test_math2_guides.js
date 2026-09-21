const assert=require('node:assert/strict'),fs=require('fs'),path=require('path');
let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8'),data=JSON.parse(read('lang/de.json'));
(async()=>{
 const context={window:{}};require('node:vm').runInNewContext(read('js/curriculum.js'),context);
 const ids=Array.from(context.window.SCIVERSE_CURRICULUM.mathematik.topics).filter(topic=>Array.isArray(topic.gradeLevels)?topic.gradeLevels.includes(6):topic.grade.includes('6. Schulstufe')).map(topic=>topic.id);
 assert.ok(ids.includes('math3_4_flaechensatz'));assert.ok(ids.includes('math2_9_relative_haeufigkeit'));assert.ok(!ids.includes('math2_8_statistik'));
 assert.equal(new Set(ids).size,ids.length);
 for(const id of ids){
  const topic=data[id],dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/physik_bay6/topics/template.html?topic='+id,runScripts:'outside-only'}),w=dom.window,d=w.document;
  await new Promise(resolve=>setImmediate(resolve));w.fetch=async()=>({ok:true,json:async()=>data});
  for(const f of ['curriculum','common','chapter-revisions','core-learning','language-workshop','renderer'])w.eval(read('js/'+f+'.js'));
  await w.renderTopic();
  assert.equal(d.querySelectorAll('[data-core-intro] li').length,topic.learningGoals.length,id);
  assert.equal(d.querySelectorAll('#chapter-summary li').length,topic.summary.length,id);
  assert.ok(!d.body.textContent.includes('{{QUIZ_'),id+' unresolved question');
  for(const p of topic.prerequisites)assert.ok(data[p],p);
  if(id==='math2_7_geometrie'){
   assert.equal(w.currentChapterQuiz.questions.length,26);
   const workshop=d.querySelector('[data-language-workshop]');assert.ok(workshop);
   [...workshop.querySelectorAll('select')].forEach((select,i)=>select.value=topic.workshop.items[i].answer);
   [...workshop.querySelectorAll('button')].find(button=>button.textContent==='Zuordnung prüfen').click();assert.match(workshop.textContent,/3 von 3/);

   assert.ok(topic.sections.find(section=>section.id==='sec_vierecke').quizzes[0].answers[0].text.includes('Rechteck und eine Raute'));
   assert.equal(w.currentChapterResult(id,{passed:true,contentRevision:0}).passed,false);
   w.eval(read('js/topics/math2_7_geometrie.js'));w.topicInit();
   const lab=d.querySelector('[data-triangle-lab]'),sides=[...lab.querySelectorAll('input')],result=lab.querySelector('[data-triangle-result]');
   for(let a=1;a<=10;a++)for(let b=1;b<=10;b++)for(let c=1;c<=10;c++){
    sides.forEach((input,i)=>input.value=[a,b,c][i]);sides[0].dispatchEvent(new w.Event('input'));
    const valid=a+b>c&&a+c>b&&b+c>a;assert.equal(result.dataset.valid,String(valid));
    const polygon=lab.querySelector('polygon');assert.equal(!!polygon,valid);
    if(valid){
     const pts=polygon.getAttribute('points').split(' ').map(p=>p.split(',').map(Number));const distance=(i,j)=>Math.hypot(pts[i][0]-pts[j][0],pts[i][1]-pts[j][1])/20;
     assert.ok(Math.abs(distance(0,1)-c)<1e-9);assert.ok(Math.abs(distance(0,2)-b)<1e-9);assert.ok(Math.abs(distance(1,2)-a)<1e-9);
     assert.ok(pts.every(([x,y])=>x>=0&&x<=500&&y>=0&&y<=290));
     const semi=(a+b+c)/2,heron=Math.sqrt(semi*(semi-a)*(semi-b)*(semi-c));assert.ok(Math.abs(c*(250-pts[2][1])/40-heron)<1e-8);
    }
   }
   const reset=lab.querySelector('button');reset.focus();reset.click();assert.deepEqual(sides.map(input=>input.value),['3','4','5']);assert.match(result.textContent,/rechtwinklig/);assert.equal(d.activeElement,reset);
   const reflection=d.querySelector('[data-reflection-lab]'),xi=reflection.querySelector('[data-reflect-x]'),yi=reflection.querySelector('[data-reflect-y]'),axis=reflection.querySelector('select');
   for(const mirror of ['x','y'])for(let x=-5;x<=5;x++)for(let y=-5;y<=5;y++){
    xi.value=x;yi.value=y;axis.value=mirror;axis.dispatchEvent(new w.Event('change'));
    const original=reflection.querySelector('[data-original]'),image=reflection.querySelector('[data-image]');
    const px=Number(original.getAttribute('cx')),py=Number(original.getAttribute('cy')),qx=Number(image.getAttribute('cx')),qy=Number(image.getAttribute('cy'));
    if(mirror==='x'){assert.equal(px,qx);assert.equal((py+qy)/2,180);}else{assert.equal(py,qy);assert.equal((px+qx)/2,180);}
    assert.equal(px,180+26*x);assert.equal(py,180-26*y);
    assert.ok([px,py,qx,qy].every(v=>v>=50&&v<=310));
    assert.equal(reflection.querySelector('[data-reflection-status]').textContent.includes('bleibt fest'),mirror==='x'?y===0:x===0);
   }
   const shifting=d.querySelector('[data-translation-lab]'),sx=shifting.querySelector('[data-shift-x]'),sy=shifting.querySelector('[data-shift-y]');
   const points=polygon=>polygon.getAttribute('points').split(' ').map(pair=>pair.split(',').map(Number));
   for(let dx=-2;dx<=2;dx++)for(let dy=-2;dy<=2;dy++){
    sx.value=dx;sy.value=dy;sx.dispatchEvent(new w.Event('input'));
    const original=points(shifting.querySelector('[data-shift-original]')),image=points(shifting.querySelector('[data-shift-image]'));
    for(let i=0;i<3;i++){assert.equal(image[i][0]-original[i][0],26*dx);assert.equal(image[i][1]-original[i][1],dy===0?0:-26*dy);const j=(i+1)%3;assert.equal(Math.hypot(image[i][0]-image[j][0],image[i][1]-image[j][1]),Math.hypot(original[i][0]-original[j][0],original[i][1]-original[j][1]));}
    assert.ok(image.every(([x,y])=>x>=50&&x<=310&&y>=50&&y<=310));
   }
   shifting.querySelector('button').click();assert.match(shifting.textContent,/genau aufeinander/);assert.equal(sx.value,'0');assert.equal(sy.value,'0');
   for(const view of ['box','tri','pent','net']){
    const button=d.querySelector('[data-prism-view="'+view+'"]');button.click();assert.equal(button.getAttribute('aria-pressed'),'true');
    const visible=[...d.querySelectorAll('[data-prism-scene]')].filter(scene=>scene.getAttribute('aria-hidden')==='false');assert.equal(visible.length,1);assert.equal(visible[0].dataset.prismScene,view);
   }
  }
  if(id==='math2_6_prop_prozent'){
   assert.equal(topic.sections.length,5);
   assert.ok(d.body.textContent.includes('5 € Grundgebühr plus 2 € je Heft'));
   w.eval(read('js/topics/math2_6_prop_prozent.js'));w.topicInit();
   const slider=d.getElementById('inverse_people'),out=d.getElementById('inverse_result');
   for(let n=1;n<=12;n++){
    slider.value=String(n);slider.dispatchEvent(new w.Event('input'));
    const expected=(60/n).toLocaleString('de-AT',{style:'currency',currency:'EUR'});
    assert.ok(out.textContent.includes(expected));assert.ok(slider.getAttribute('aria-valuetext').includes(expected));
   }
   const discount=d.getElementById('rabatt_input'),result=d.getElementById('rabatt_res'),button=discount.closest('.interactive-zone').querySelector('button');
   for(const value of ['','-1','101']){discount.value=value;button.click();assert.match(result.textContent,/zwischen 0 und 100/);}
   for(const [value,price] of [['0','100,00'],['20','80,00'],['12.5','87,50'],['100','0,00']]){discount.value=value;button.click();assert.ok(result.textContent.includes('Neuer Preis: '+Number(price.replace(',', '.')).toLocaleString('de-AT',{style:'currency',currency:'EUR'})));}
   discount.value='50';discount.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Enter',bubbles:true}));assert.ok(result.textContent.includes((50).toLocaleString('de-AT',{style:'currency',currency:'EUR'})));
   const base=d.getElementById('rabatt_base');w.topicInit();
   assert.equal(d.querySelectorAll('[data-discount-task] li').length,3);
   for(const [price,rate,saved,left] of [['50','20',10,40],['80','20',16,64],['100','20',20,80],['0,05','50',0.03,0.02],['19.99','12,5',2.5,17.49],['0','100',0,0],['999999,99','100',999999.99,0]]){
    base.value=price;discount.value=rate;button.click();
    const euro=n=>n.toLocaleString('de-AT',{style:'currency',currency:'EUR'});
    assert.ok(result.textContent.includes('Du sparst: '+euro(saved)));assert.ok(result.textContent.includes('Neuer Preis: '+euro(left)));
    assert.match(result.textContent,/Rechenweg:/);
   }
   base.value='80';
   for(const raw of ['','1e1','0x10','12,345','1,2,3','Infinity','-1','101']){discount.value=raw;button.click();assert.match(result.textContent,/zwischen 0 und 100/);}
   discount.value='20';
   for(const raw of ['','1e2','0x50','80,001','1000000','-1','NaN']){base.value=raw;button.click();assert.match(result.textContent,/ursprünglichen Preis von 0/);}
   for(const field of [base,discount]){
    base.value='80';discount.value='20';button.click();field.dispatchEvent(new w.Event('input'));assert.equal(result.textContent,'');
    field.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Enter',bubbles:true}));assert.ok(result.textContent.includes('64,00'));
   }
   for(const s of topic.sections.filter(s=>s.id.startsWith('m26_')))for(const q of s.quizzes){assert.ok(d.body.textContent.includes(q.question));assert.equal(q.answers.filter(a=>a.correct).length,1);}
   assert.equal(w.currentChapterResult(id,{passed:true,bestPercent:100}).passed,false);
  }
  if(id==='math2_1_teilbarkeit'){
   assert.equal(topic.sections.length,5);
   assert.ok(d.body.textContent.includes('Welche Zahl ist durch 9 teilbar?'));
   assert.ok(!JSON.stringify(topic).includes('passt als richtige Antwort'));
   w.eval(read('js/topics/math2_1_teilbarkeit.js'));w.topicInit();w.topicInit();
   const input=d.getElementById('prime_factors'),button=input.closest('.interactive-zone').querySelector('button'),feed=d.getElementById('prime_feedback');
   for(const[raw,pattern]of [['',/Gib die Faktoren/],['1 60',/größer als 1/],['4 3 5',/4 ist noch keine Primzahl/],['2 3 5',/Produkt ist 30/],['2.5 24',/ganze Zahlen/],['2 2 3 5',/^Richtig/],['5 2 3 2',/^Richtig/]]){input.value=raw;button.click();assert.match(feed.textContent,pattern);}
   input.value='3 5 2 2';input.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Enter',bubbles:true}));assert.match(feed.textContent,/Richtig/);
   assert.equal(d.querySelectorAll('#prime_feedback').length,1);
   input.value='2 3';input.dispatchEvent(new w.Event('input'));assert.equal(feed.textContent,'');
   for(const [fieldId,value,pattern] of [['ggt_input','1',/gemeinsamer Teiler.*nicht der größte/],['ggt_input','2',/gemeinsamer Teiler.*nicht der größte/],['ggt_input','3',/Vergleiche die Teiler/],['kgv_input','20',/gemeinsames Vielfaches.*nicht das kleinste/],['kgv_input','30',/gemeinsames Vielfaches.*nicht das kleinste/],['kgv_input','5',/Liste Vielfache/]]){
    const field=d.getElementById(fieldId),feedback=d.getElementById(fieldId==='ggt_input'?'ggt_feedback':'kgv_feedback');field.value=value;field.focus();field.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Enter',bubbles:true,cancelable:true}));assert.match(feedback.innerText,pattern);assert.equal(d.activeElement,field);field.dispatchEvent(new w.Event('input'));assert.equal(feedback.innerText,'');
   }
   for(const fieldId of ['ggt_input','kgv_input'])for(const value of ['', '0', '-2', '1.5']){
    const field=d.getElementById(fieldId);field.value=value;field.closest('.interactive-zone').querySelector('button').click();assert.match(d.getElementById(fieldId==='ggt_input'?'ggt_feedback':'kgv_feedback').innerText,/positive ganze Zahl/);
   }

   // Independently enumerate divisors to check every candidate factor from 2 to 60.
   for(let n=2;n<=60;n++){
    const divisors=Array.from({length:n},(_,i)=>i+1).filter(v=>n%v===0);
    const result=w.evaluatePrimeFactors(String(n));
    assert.equal(result.includes('keine Primzahl'),divisors.length!==2,String(n));
   }
   for(const[id,value,expected]of [['ggt_input','4',/Richtig/],['kgv_input','10',/Super/]]){
    const el=d.getElementById(id);el.value=value;el.closest('.interactive-zone').querySelector('button').click();
    assert.match(d.getElementById(id==='ggt_input'?'ggt_feedback':'kgv_feedback').innerText,expected);
   }
   assert.equal(w.currentChapterResult(id,{passed:true,bestPercent:100}).passed,false);
  }
  if(id==='math2_2_brueche'){
   assert.equal(topic.sections.length,6);
   for(const s of topic.sections.filter(s=>['m22_equivalent','m22_common'].includes(s.id)))for(const q of s.quizzes){assert.ok(d.body.textContent.includes(q.question));assert.equal(q.answers.filter(a=>a.correct).length,1);assert.ok(q.answers.every(a=>a.feedback));}
   w.eval(read('js/topics/math2_2_brueche.js'));w.topicInit();w.topicInit();
   const n=d.getElementById('bruch_common_n'),den=d.getElementById('bruch_common_d'),button=n.closest('.interactive-zone').querySelector('button'),feed=d.getElementById('bruch_common_feedback');
   for(const[a,b,correct]of [['','',false],['3','0',false],['2','5',false],['3','4',true],['6','8',true],['30','40',true],['1.5','2',false],['-3','-4',false]]){
    n.value=a;den.value=b;button.click();assert.equal(feed.innerText.startsWith('Richtig!'),correct,a+'/'+b);
   }
   n.value='3';den.value='4';den.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Enter',bubbles:true}));assert.match(feed.innerText,/Richtig/);
   assert.equal(d.querySelectorAll('#bruch_common_feedback').length,1);assert.equal(feed.getAttribute('role'),'status');
   assert.equal(w.currentChapterResult(id,{passed:true,bestPercent:100}).passed,false);
  }
  dom.window.close();
 }
 console.log('PASS: all catalog-assigned year-two chapter renders; four added fraction questions; unlike-denominator exercise accepts equivalent fractions, rejects invalid values and supports Enter without duplicate feedback.');
})().catch(e=>{console.error(e);process.exitCode=1;});
