const assert=require('node:assert/strict'),fs=require('fs'),path=require('path'),{JSDOM}=require('jsdom');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8'),data=JSON.parse(read('lang/de.json')),id='math3_7_aehnlichkeit';
(async()=>{
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic='+id,runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(r=>setImmediate(r));w.fetch=async()=>({ok:true,json:async()=>data});
 for(const f of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+f+'.js'));
 await w.renderTopic();w.eval(read('js/topics/'+id+'.js'));w.topicInit();w.topicInit();
 assert.equal(w.currentChapterQuiz.questions.length,11);
 const keys={m37_q1:0,m37_dilation_ray:0,m37_dilation_center:1,m37_area_factor:2,m37_area_reverse:1,m37_triangle_angles:0,m37_triangle_sides:2,m37_q2:0,m37_equal:0,m37_reverse:0,m37_dip1:0};
 for(const q of w.currentChapterQuiz.questions)assert.equal(q.answers.findIndex(a=>a.correct),keys[q.id],q.id);
 for(const [i,q]of w.currentChapterQuiz.questions.entries())for(let a=0;a<q.answers.length;a++){
  w.currentChapterQuiz.questions.forEach((item,j)=>d.querySelector(`input[name="chapter_q_${j}"][value="${j===i?a:item.answers.findIndex(x=>x.correct)}"]`).checked=true);
  w.submitChapterQuiz();assert.equal(JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results'))[id].lastPercent,q.answers[a].correct?100:91);
  assert.ok(d.getElementById('chapter-quiz-result').textContent.includes(q.answers[a].feedback));
 }
 assert.equal(w.currentChapterResult(id,{contentRevision:0,passed:true,bestPercent:100}).passed,false);
 assert.equal(w.currentChapterResult(id,{contentRevision:1,passed:true,bestPercent:100}).passed,false);
 const input=d.getElementById('aehn_sel'),out=d.getElementById('aehn_feedback'),zone=input.closest('.interactive-zone'),button=zone.querySelector('button');
 const rows=[...zone.querySelectorAll('tbody tr')],rects=[...zone.querySelectorAll('rect')];assert.equal(rows.length,3);
 rows.forEach((row,i)=>{const width=parseFloat(row.cells[1].textContent),height=parseFloat(row.cells[2].textContent);assert.equal(Number(rects[i].getAttribute('width'))/width,10);assert.equal(Number(rects[i].getAttribute('height'))/height,10);});
 assert.equal(zone.querySelector('svg').getAttribute('role'),'img');assert.ok(d.getElementById(zone.querySelector('svg').getAttribute('aria-labelledby')));
 assert.equal(d.querySelectorAll('[data-scale-task] li').length,5);assert.ok(d.querySelector('label[for="aehn_sel"]'));
 for(const [value,pattern]of [['',/Wähle zuerst/],['red',/0,75.*1,5/],['green',/Beide Seiten.*Faktor 2/]]){input.value=value;button.click();assert.match(out.textContent,pattern);}
 input.value='red';input.dispatchEvent(new w.Event('change'));assert.equal(out.textContent,'');input.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Enter',bubbles:true}));assert.match(out.textContent,/nicht ähnlich/);
 const lab=d.querySelector('[data-dilation-lab]'),shape=d.getElementById('dilation-shape'),center=d.getElementById('dilation-center'),factor=d.getElementById('dilation-factor'),x=d.getElementById('dilation-x'),y=d.getElementById('dilation-y'),result=lab.querySelector('[data-dilation-result]');
 for(const figure of ['triangle','rectangle'])for(const [name,z]of Object.entries({origin:[0,0],vertex:[2,1],outside:[6,4]}))for(const k of [0.5,1,1.5,2]){
  shape.value=figure;center.value=name;factor.value=String(k);factor.dispatchEvent(new w.Event('change'));
  assert.equal(lab.dataset.revealed,'false');assert.equal(x.value,'');
  x.value=String(z[0]+k*(2-z[0]));y.value=String(z[1]+k*(1-z[1])).replace('.',',');lab.querySelector('[data-dilation-check]').click();
  assert.equal(result.dataset.correct,'true',figure+name+k);assert.equal(lab.dataset.revealed,'true');assert.equal(d.activeElement,result);
  assert.equal(lab.querySelectorAll('tbody tr').length,figure==='triangle'?3:4);
  const boxes=[...lab.querySelectorAll('[data-dilation-label-box]')].map(e=>({x:+e.getAttribute('x'),y:+e.getAttribute('y'),w:+e.getAttribute('width'),h:+e.getAttribute('height')})),points=[...lab.querySelectorAll('circle')].map(e=>({x:+e.getAttribute('cx'),y:+e.getAttribute('cy'),r:+e.getAttribute('r')}));
  for(const [i,a]of boxes.entries()){for(const c of boxes.slice(i+1))assert.ok(!(a.x<c.x+c.w&&a.x+a.w>c.x&&a.y<c.y+c.h&&a.y+a.h>c.y),'overlapping labels');for(const p of points)assert.ok(!(p.x+p.r>a.x&&p.x-p.r<a.x+a.w&&p.y+p.r>a.y&&p.y-p.r<a.y+a.h),'covered vertex');}
 }
 x.value='';lab.querySelector('[data-dilation-check]').click();assert.equal(x.getAttribute('aria-invalid'),'true');assert.equal(d.activeElement,x);
 x.value='999';y.value='999';lab.querySelector('[data-dilation-check]').click();assert.equal(result.dataset.correct,'false');
 lab.querySelector('[data-dilation-reset]').click();assert.equal(lab.dataset.revealed,'false');assert.equal(shape.value,'triangle');assert.equal(factor.value,'2');assert.equal(d.activeElement,shape);
 assert.equal(d.querySelectorAll('[data-dilation-tasks] > li').length,9);
 w.eval(read('js/worksheet_generator.js'));
 for(const random of [0,0.2,0.4,0.6,0.999]){
  w.Math.random=()=>random;const holder=d.createElement('div');holder.innerHTML=w.generateWorksheetContent(id,'Ähnlichkeit');const template=holder.querySelector('template[data-generated-worksheet-solutions]'),tasks=[...holder.querySelectorAll('[data-dilation-generated]')],solutions=[...template.content.querySelectorAll('[data-dilation-generated-answer]')];assert.equal(tasks.length,6);assert.equal(solutions.length,6);
  tasks.forEach((t,i)=>{const a=Number(t.dataset.a),imageA=Number(t.dataset.imageA),b=Number(t.dataset.b);assert.equal(Number(solutions[i].dataset.dilationGeneratedAnswer)/b,imageA/a);assert.match(solutions[i].textContent,/Probe:/);});assert.match(holder.textContent,/Alle Längen sind in Zentimetern/);
 }
 const paper=new JSDOM(read('topics/worksheet.html'),{url:'https://example.test/topics/worksheet.html?topic='+id,runScripts:'outside-only'}),pw=paper.window,pd=pw.document;pw.fetch=async()=>({ok:true,json:async()=>data});for(const f of ['curriculum','worksheet_generator','worksheet'])pw.eval(read('js/'+f+'.js'));await new Promise(r=>setImmediate(r));
 assert.equal(pd.querySelectorAll('[data-dilation-generated]').length,6);assert.equal(pd.querySelectorAll('#ws-solutions [data-dilation-generated-answer]').length,6);assert.equal(pd.getElementById('ws-solutions').hidden,true);assert.equal(pd.querySelectorAll('#ws-math-material [data-dilation-generated-answer]').length,0);const toggle=pd.getElementById('ws-include-solutions');toggle.checked=true;toggle.dispatchEvent(new pw.Event('change'));assert.equal(pd.getElementById('ws-solutions').hidden,false);paper.window.close();
 dom.window.close();console.log('PASS: 33 answer paths, 24 dilation cases, labels leave vertices visible, invalid/reset/focus/revision; 30 generated calculations and six optional paper solutions.');
})().catch(e=>{console.error(e);process.exitCode=1;});
