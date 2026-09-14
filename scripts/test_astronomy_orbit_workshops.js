const assert=require('node:assert/strict'),fs=require('fs'),path=require('path'),{JSDOM}=require('jsdom');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8'),data=JSON.parse(read('lang/de.json'));
const close=(a,b,tolerance=1e-9)=>assert.ok(Math.abs(a-b)<tolerance,`${a} differs from ${b}`);
(async()=>{
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic=astronomie',runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(resolve=>setImmediate(resolve));w.fetch=async()=>({ok:true,json:async()=>data});
 for(const file of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+file+'.js'));
 await w.renderTopic();w.eval(read('js/topics/astronomie.js'));w.topicInit();w.topicInit();
 const initial=JSON.stringify(Object.fromEntries(Object.keys(w.localStorage).map(k=>[k,w.localStorage.getItem(k)])));
 const kz=d.querySelector('[data-kepler-workshop]'),oz=d.querySelector('[data-orbit-workshop]');
 const select=(zone,value)=>{const control=zone.querySelector('select');control.focus();control.value=String(value);control.dispatchEvent(new w.Event('change'));assert.equal(d.activeElement,control);};
 // Independent geometric checks: both ellipse foci, constant areal velocity,
 // periapsis/apapsis and speed ratio, then measured polygon areas from actual SVG.
 for(let i=0;i<=8;i++){
  select(kz,i);const p=w.astronomyKeplerPoint(i*Math.PI/4);
  close(Math.hypot(p.x,p.y)+Math.hypot(p.x+1.2,p.y),2);
  close(p.E-.6*Math.sin(p.E),i*Math.PI/4);
  assert.equal(kz.querySelector('[aria-current=true]').rowIndex,i+1);
  const dot=kz.querySelector('[data-kepler-point]');close(Number(dot.getAttribute('cx')),230+125*p.x);close(Number(dot.getAttribute('cy')),125-125*p.y);
  if(i){
   const numbers=kz.querySelector('[data-kepler-area]').getAttribute('d').match(/-?\d+(?:\.\d+)?(?:e[+-]?\d+)?/g).map(Number);
   const points=Array.from({length:numbers.length/2},(_,j)=>[numbers[j*2],numbers[j*2+1]]);
   const area=Math.abs(points.reduce((sum,[x,y],j)=>{const [nx,ny]=points[(j+1)%points.length];return sum+x*ny-y*nx;},0))/2;
   close(area,Math.PI*125*100/8,1.2); // Approximation by 80 short chords, <0.025% error.
   assert.match(kz.querySelector('[data-kepler-status]').textContent,/1\/8 der gesamten Ellipsenfläche/);
  }else assert.equal(kz.querySelector('[data-kepler-area]').getAttribute('d'),'');
 }
 close(w.astronomyKeplerPoint(0).radius,.4);close(w.astronomyKeplerPoint(Math.PI).radius,1.6);
 close(w.astronomyKeplerPoint(0).speed/w.astronomyKeplerPoint(Math.PI).speed,4);
 kz.querySelector('button').click();assert.equal(kz.querySelector('select').value,'0');assert.equal(d.activeElement,kz.querySelector('select'));
 const ratios=[.5,.9,1,1.2,Math.SQRT2,1.6],kinds=['impact','ellipse','circle','ellipse','escape','escape'];
 for(const [i,ratio]of ratios.entries()){
  select(oz,i);const m=w.astronomyOrbitCase(ratio);assert.equal(m.kind,kinds[i]);assert.equal(oz.dataset.orbitKind,kinds[i]);
  assert.equal(m.points.length,361);close(m.points[0].x,0);close(m.points[0].y,-1);
  const svg=oz.querySelector('svg');assert.doesNotMatch(svg.outerHTML,/NaN|Infinity|undefined/);
  const body=oz.querySelector('[data-orbit-body]'),start=oz.querySelector('[data-orbit-start]');
  close(Math.hypot(Number(start.getAttribute('cx'))-Number(body.getAttribute('cx')),Number(start.getAttribute('cy'))-Number(body.getAttribute('cy')))/Number(body.getAttribute('r')),2);
  if(i===0){close(m.points.at(-1).radius,.5);close(m.points.at(-1).x,Math.sqrt(5)/6);close(m.points.at(-1).y,-1/3);assert.ok(m.points.every(p=>p.radius>=.5-1e-10));}
  if(i===1||i===2||i===3){
   const a=1/(2-ratio*ratio),otherFocusY=2*a*(ratio*ratio-1);
   for(const p of m.points)close(Math.hypot(p.x,p.y)+Math.hypot(p.x,p.y-otherFocusY),2*a);
   close(m.points.at(-1).x,0);close(m.points.at(-1).y,-1);assert.ok(m.points.every(p=>p.radius>.5));
  }
  if(i===2)for(const p of m.points)close(Math.hypot(p.x,p.y),1);
  if(i>=4){close(m.points.at(-1).radius,4);assert.equal(m.apoapsis,null);assert.match(oz.querySelector('[data-orbit-status]').textContent,/Gravitation|Resttempo/);}
  // Numeric derivative of plotted conic, angular momentum h=ratio, energy invariant.
  // This checks a physical invariant independent of the SVG fitting transform.
  const last=m.points.at(-1),angleEnd=Math.atan2(last.x,-last.y)+(m.kind==='ellipse'||m.kind==='circle'?2*Math.PI:0),dt=angleEnd/360;
  for(let j=2;j<359;j++){
   const p=m.points[j],before=m.points[j-1],after=m.points[j+1],thetaRate=ratio/(p.radius*p.radius);
   const vx=(after.x-before.x)/(2*dt)*thetaRate,vy=(after.y-before.y)/(2*dt)*thetaRate;
   close((vx*vx+vy*vy)/2-1/p.radius,ratio*ratio/2-1,.006);
  }
 }
 oz.querySelector('button').click();assert.equal(oz.querySelector('select').value,'2');assert.equal(d.activeElement,oz.querySelector('select'));
 select(oz,3);w.topicInit();assert.equal(oz.querySelector('select').value,'3');assert.equal(oz.dataset.orbitKind,'ellipse');
 assert.equal(JSON.stringify(Object.fromEntries(Object.keys(w.localStorage).map(k=>[k,w.localStorage.getItem(k)]))),initial);
 assert.equal(kz.querySelectorAll('animateMotion,animate').length+oz.querySelectorAll('animateMotion,animate').length,0);
 const expected={astro_s3_q0:[1,2],astro_s3_p1:[2,2],astro_s3_p2:[0,2],astro_d2:[2,2],astro_s4_q0:[1,3],astro_s4_p1:[0,3],astro_s4_p2:[2,3],astro_d3:[1,3],astro_orbit_transfer:[0,3]};
 for(const [id,[correct,section]]of Object.entries(expected)){
  const index=w.currentChapterQuiz.questions.findIndex(q=>q.id===id),q=w.currentChapterQuiz.questions[index];assert.ok(q,id);assert.equal(q.sectionIndex,section);assert.equal(q.answers.length,3);assert.equal(q.answers.findIndex(a=>a.correct),correct);
  for(let choice=0;choice<3;choice++){
   w.currentChapterQuiz.questions.forEach((question,i)=>{const answer=i===index?choice:question.answers.findIndex(a=>a.correct);d.querySelector(`input[name="chapter_q_${i}"][value="${answer}"]`).checked=true;});
   w.submitChapterQuiz();const result=JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results')).astronomie;
   assert.equal(result.lastPercent,choice===correct?100:Math.round((w.currentChapterQuiz.questions.length-1)/w.currentChapterQuiz.questions.length*100));
   if(choice!==correct)assert.deepEqual(result.reviewQuestionIds,[id]);assert.equal(result.contentRevision,4);
   assert.ok(d.getElementById('chapter-quiz-result').textContent.includes(q.answers[choice].feedback));
  }
 }
 assert.equal(w.currentChapterResult('astronomie',{contentRevision:3,passed:true,bestPercent:100}).passed,false);
 const assessed=w.currentChapterQuiz.questions.length;dom.window.close();
 const paper=new JSDOM(read('topics/worksheet.html'),{url:'https://example.test/topics/worksheet.html?topic=astronomie',runScripts:'outside-only'}),pw=paper.window,pd=pw.document;
 pw.MathJax={typesetPromise:async()=>{}};pw.fetch=async()=>({ok:true,json:async()=>data});for(const file of ['curriculum','worksheet_generator','worksheet'])pw.eval(read('js/'+file+'.js'));await new Promise(resolve=>setImmediate(resolve));
 const material=pd.getElementById('ws-physics-material');assert.equal(material.querySelectorAll('.ws-model-alternative').length,3);assert.equal(material.querySelectorAll('[data-kepler-table] tbody tr').length,9);
 assert.equal(material.querySelectorAll('[data-orbit-paper] tbody tr').length,6);
 for(const row of material.querySelectorAll('[data-orbit-paper] tbody tr'))assert.equal(row.cells.length,3);
 assert.match(material.textContent,/Deine Zuordnung: A: __________ B: __________ C: __________/);
 assert.equal(material.querySelectorAll('[data-kepler-tasks] > li').length,4);assert.equal(material.querySelectorAll('[data-orbit-tasks] > li').length,4);
 assert.equal(material.querySelectorAll('svg[data-worksheet-static=true]').length,1);assert.equal(material.querySelectorAll('select,button,template,[role=status]').length,0);
 assert.equal(pd.querySelectorAll('.ws-paper-solution').length,4);assert.equal(pd.getElementById('ws-solutions').hidden,true);
 assert.match(pd.getElementById('ws-solutions').textContent,/viermal so groß/);assert.match(pd.getElementById('ws-solutions').textContent,/A trifft die Oberfläche/);
 paper.window.close();console.log(`PASS: nine Kepler states, equal areas, six conics with focus/energy invariants, native change/reset/focus and storage stability, all 27 revised answer paths in ${assessed}-question check, three paper alternatives and separate solutions.`);
})().catch(error=>{console.error(error);process.exitCode=1;});
