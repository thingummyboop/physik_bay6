const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8'),data=JSON.parse(read('lang/de.json'));
(async()=>{
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic=linsen_spiegel',runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(r=>setImmediate(r));w.fetch=async()=>({ok:true,json:async()=>data});
 for(const f of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+f+'.js'));
 await w.renderTopic();w.eval(read('js/topics/linsen_spiegel.js'));w.topicInit();
 assert.equal(w.chapterRevision('linsen_spiegel'),8);
 assert.equal(w.currentChapterResult('linsen_spiegel',{passed:true,bestPercent:100,contentRevision:7}).passed,false);
 for(const id of ['q_total','q4','f1','f2','f3','f5','f6','f7','f10','f11','f12','f13','f14','f15']){
  const q=data.linsen_spiegel.sections.flatMap(s=>s.quizzes||[]).find(q=>q.id===id);assert.ok(q,id);assert.equal(q.answers.length,3);assert.equal(q.answers.filter(a=>a.correct).length,1);assert.ok(q.answers.every(a=>a.feedback.length>30));
 }
 assert.equal(d.querySelectorAll('[data-lens-investigation] li').length,7);assert.equal(d.querySelectorAll('[data-lens-observation] tbody tr').length,5);assert.equal(d.querySelectorAll('[data-plane-mirror-task] li').length,5);assert.equal(d.querySelectorAll('[data-plane-mirror-protocol] tbody tr').length,3);
 for(const [index,q]of w.currentChapterQuiz.questions.entries()){if(!q.id.startsWith('mirror_virtual_')&&!q.id.startsWith('lens_screen_')&&!q.id.startsWith('lens_eye_'))continue;assert.equal(q.sectionIndex,q.id.startsWith('mirror_virtual_')?0:2);for(let choice=0;choice<q.answers.length;choice++){w.currentChapterQuiz.questions.forEach((item,i)=>d.querySelector('input[name="chapter_q_'+i+'"][value="'+(i===index?choice:item.answers.findIndex(a=>a.correct))+'"]').checked=true);w.submitChapterQuiz();const count=w.currentChapterQuiz.questions.length;assert.equal(JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results')).linsen_spiegel.lastPercent,Math.round(100*(count-(q.answers[choice].correct?0:1))/count));assert.ok(d.getElementById('chapter-quiz-result').textContent.includes(q.answers[choice].feedback));}}
 const angleInput=d.getElementById('angleRange');angleInput.oninput=new w.Function(angleInput.getAttribute('oninput'));
 for(let angle=0;angle<=70;angle++){
  angleInput.value=angle;angleInput.dispatchEvent(new w.Event('input'));
  const incoming=d.getElementById('rayIn').getAttribute('d').match(/-?[\d.]+/g).map(Number);
  const outgoing=d.getElementById('rayOut').getAttribute('d').match(/-?[\d.]+/g).map(Number);
  const a=Math.atan2(200-incoming[0],160-incoming[1])*180/Math.PI;
  const b=Math.atan2(outgoing[2]-200,160-outgoing[3])*180/Math.PI;
  assert.ok(Math.abs(a-angle)<1e-9);assert.ok(Math.abs(b-angle)<1e-9);
  assert.ok(Math.abs(Math.hypot(200-incoming[0],160-incoming[1])-120)<1e-9);
  assert.equal(angleInput.getAttribute('aria-valuetext'),angle+' Grad zum Lot');
  if(angle===0)assert.match(d.getElementById('reflectionStatus').textContent,/demselben Weg/);
 }
 for(let angle=-60;angle<=60;angle++){
  w.updateFiber(angle);const group=d.getElementById('raysGroup'),lines=[...group.querySelectorAll('line')];assert.ok(lines.length>0);
  for(const line of lines){const coords=['x1','y1','x2','y2'].map(k=>Number(line.getAttribute(k)));assert.ok(coords.every(Number.isFinite));assert.ok(coords[0]>=80&&coords[2]<=380);assert.ok(coords[1]>=0&&coords[3]<=200);}
  if(angle===0){assert.equal(lines.length,1);assert.equal(group.dataset.total,'false');assert.equal(lines[0].getAttribute('y2'),'100');assert.match(d.getElementById('fiberStatus').textContent,/keine Reflexion/);}
  const transmitted=group.querySelector('[data-fiber-ray="transmitted"]');
  if(Math.abs(angle)>=49){
   assert.ok(transmitted);assert.ok(group.querySelector('[data-fiber-ray="partial"]'));
   const dx=Number(transmitted.getAttribute('x2'))-Number(transmitted.getAttribute('x1')),dy=Number(transmitted.getAttribute('y2'))-Number(transmitted.getAttribute('y1'));
   assert.ok(Math.abs(dx/Math.hypot(dx,dy)-1.5*Math.cos(angle*Math.PI/180))<1e-12);
   assert.equal(Math.sign(dy),Math.sign(angle));
  }else assert.equal(transmitted,null);
  if(group.dataset.wallHits!=='0'&&Math.abs(angle)<=48)assert.equal(group.dataset.total,'true');
 }
 const eyeResults={};
 d.querySelectorAll('[data-eye-focus]').forEach(button=>button.onclick=new w.Function(button.getAttribute('onclick')));
 for(const mode of ['near','far','near','far']){
  const button=d.querySelector('[data-eye-focus="'+mode+'"]');button.focus();button.click();
  const top=d.getElementById('rayPathTop').getAttribute('d').match(/-?[\d.]+/g).map(Number),central=d.getElementById('rayPathBottom').getAttribute('d').match(/-?[\d.]+/g).map(Number);
  assert.equal(top[1],70);assert.equal(top[3],70);assert.deepEqual(top.slice(4),central.slice(4));assert.equal(top[4],355);
  assert.ok(Math.abs((central[3]-central[1])/(central[2]-central[0])-(central[5]-central[3])/(central[4]-central[2]))<1e-12,'central ray remains straight');
  const g=260-top[0],b=95,f=Number(d.getElementById('eyeLens').dataset.focalLength);
  assert.ok(Math.abs(1/f-1/g-1/b)<1e-12);assert.ok(Math.abs((top[5]-100)/30-b/g)<1e-12);
  assert.equal(Number(d.querySelector('#eyeImage line').getAttribute('y2')),top[5]);
  assert.equal(button.getAttribute('aria-pressed'),'true');assert.equal(d.activeElement,button);eyeResults[mode]={f,height:top[5]-100};
 }
 assert.ok(eyeResults.near.f<eyeResults.far.f);assert.ok(eyeResults.near.height>eyeResults.far.height);
 for(let step=0;step<10;step++){
  const sign=step%2===0?-1:1;
  for(const name of ['Top','Mid','Bot']){
   const a=d.getElementById('inRay'+name).getAttribute('d').match(/-?[\d.]+/g).map(Number),r=d.getElementById('mirrorRay'+name).getAttribute('d').match(/-?[\d.]+/g).map(Number);
   assert.equal(a[2],r[0]);assert.equal(a[3],r[1]);assert.equal(r[0],260+sign*(r[1]-120)**2/320);
   const ny=-sign*(r[1]-120)/160,norm2=1+ny*ny;
   const expected=[1-2/norm2,-2*ny/norm2],actual=[r[2]-r[0],r[3]-r[1]],length=Math.hypot(...actual);
   expected.forEach((value,i)=>assert.ok(Math.abs(actual[i]/length-value)<1e-12,'reflection about local normal'));
   assert.ok(r[2]>=30&&r[2]<=380&&r[3]>=10&&r[3]<=230);
   if(name!=='Mid')assert.ok(Math.abs(r[0]+(120-r[1])*(r[2]-r[0])/(r[3]-r[1])-(260+sign*80))<1e-10);
  }
  w.toggleMirror();
 }
 const objectDistance=d.getElementById('microObjDist'),tubeDistance=d.getElementById('microTubeDist');
 for(let g=22;g<=45;g+=.5)for(const distance of [80,100,130,160,180]){
  objectDistance.value=g;tubeDistance.value=distance;w.updateVerticalMicroscope();
  const b=20*g/(g-20),paths=['vertRay1','vertRay2'].map(id=>d.getElementById(id));
  for(const path of paths){const p=path.getAttribute('d').match(/-?[\d.]+/g).map(Number);assert.ok(p.every(Number.isFinite));assert.equal(p[1],270);
   const m0=(p[2]-p[0])/(p[1]-p[3]),m1=(p[4]-p[2])/(p[3]-p[5]),m2=(p[6]-p[4])/(p[5]-p[7]);
   assert.ok(Math.abs(m1-(m0-(p[2]-125)/20))<1e-10,'objective thin-lens refraction');assert.ok(Math.abs(m2-(m1-(p[4]-125)/30))<1e-10,'ocular thin-lens refraction');
  }
  assert.equal(d.getElementById('vertIntLine').style.display,b<distance?'':'none');
  if(g===25&&distance===130)assert.ok(Math.abs(Number(paths[0].dataset.outputSlope)-Number(paths[1].dataset.outputSlope))<1e-12);
 }
 assert.ok(d.getElementById('microModelNote'));
 const unit=v=>{const length=Math.hypot(...v);return v.map(x=>x/length);};
 const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-9);
 for(const ray of d.querySelectorAll('[data-telescope-ray="reflector"]')){
  const p=ray.getAttribute('d').match(/-?[\d.]+/g).map(Number),x=p[2],y=p[3];
  near(x,350-(y-120)**2/680);
  const normal=unit([1,(y-120)/340]),expected=[1-2*normal[0]**2,-2*normal[0]*normal[1]],reflected=unit([p[4]-x,p[5]-y]);expected.forEach((v,i)=>near(v,reflected[i]));
  near(p[5],p[4]-100);
  const after=unit([p[6]-p[4],p[7]-p[5]]);near(after[0],reflected[1]);near(after[1],reflected[0]);
  near(p[6],220);near(p[7],80);near(p[8],p[10]);
  near((p[8]-p[6])/(p[7]-p[9])-(p[8]-220)/40,0);
 }
 for(const ray of d.querySelectorAll('[data-telescope-ray="refractor"]')){
  const p=ray.getAttribute('d').match(/-?[\d.]+/g).map(Number);near(p[4],260);near(p[5],120);near((p[7]-p[5])/(p[6]-p[4]),(p[5]-p[3])/(p[4]-p[2]));near(p[7],p[9]);
 }
 for(let i=0;i<4;i++){w.toggleTelescope();assert.equal(d.getElementById('refractorGrp').getAttribute('aria-hidden'),String(i%2===0));assert.ok(d.getElementById('telescopeStatus').textContent.includes(i%2===0?'Hauptspiegel':'Objektiv'));}
 const mediumRay=d.getElementById('refractedRay'),mediumText=d.getElementById('mediumText');
 // outside-only JSDOM does not compile inline handlers; execute the actual markup handler.
 d.querySelectorAll('[data-medium]').forEach(button=>button.onclick=new w.Function(button.getAttribute('onclick')));
 const original=mediumRay.getAttribute('d');w.setMedium('unknown');assert.equal(mediumRay.getAttribute('d'),original);
 for(const [type,n] of [['air',1],['water',1.33],['glass',1.5],['air',1]]){
  const button=d.querySelector('[data-medium="'+type+'"]');button.focus();button.click();
  const [x1,y1,x2,y2]=mediumRay.getAttribute('d').match(/-?[\d.]+/g).map(Number),dx=x2-x1,dy=y2-y1;
  assert.ok(Math.abs(n*dx/Math.hypot(dx,dy)-Math.SQRT1_2)<1e-12,'Snell law from actual ray coordinates');
  assert.equal(d.querySelectorAll('[data-medium][aria-pressed="true"]').length,1);assert.equal(button.getAttribute('aria-pressed'),'true');assert.equal(d.activeElement,button);
  assert.ok(mediumText.textContent.includes('Brechungswinkel'));assert.doesNotMatch(mediumText.textContent,/Dichte|NaN|Infinity/);
 }
 const rays=['rayTopLens','rayBotLens'].map(id=>d.getElementById(id)),description=d.getElementById('lensText');
 for(let i=0;i<10;i++){
  const converging=i%2===0;
  for(const ray of rays){
   const [x1,y1,x2,y2]=ray.getAttribute('d').match(/-?\d+/g).map(Number);
   assert.equal(x1,200);assert.equal(x2,380);
   const axisCrossing=x1+(120-y1)*(x2-x1)/(y2-y1);
   assert.equal(axisCrossing,converging?320:80);
   if(converging)assert.ok(axisCrossing>x1&&axisCrossing<x2,'real rays continue beyond focus');
   else assert.ok(axisCrossing<x1,'only the backward extensions meet');
  }
  assert.equal(Number(d.getElementById('virtualLensRays').style.opacity),converging?0:1);
  assert.ok(description.textContent.includes(converging?'näherungsweise':'Verlängerungen'));
  w.toggleLens();
 }
 const video=[...d.querySelectorAll('video')].find(v=>v.querySelector('source')?.src.includes('linsen_brechung'));
 assert.equal(video.getAttribute('aria-describedby'),'lens-model-description');
 assert.match(d.getElementById('lens-model-description').textContent,/Grenzflächen/);
 dom.window.close();console.log('PASS: converging/diverging lens geometry, real ray continuation, virtual extensions, ten switches and accessible model explanation.');
})().catch(e=>{console.error(e);process.exitCode=1;});
