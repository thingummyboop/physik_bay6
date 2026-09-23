const assert=require('node:assert/strict'),fs=require('fs'),path=require('path');let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8'),data=JSON.parse(read('lang/de.json'));
(async()=>{
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic=kraft_und_bewegung',runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(resolve=>setImmediate(resolve));w.fetch=async()=>({ok:true,json:async()=>data});
 for(const file of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+file+'.js'));
 await w.renderTopic();assert.equal(d.querySelectorAll('.chapter-question').length,38);
 assert.equal(d.querySelectorAll('[data-force-pair-protocol] tbody tr').length,3);assert.equal(d.querySelectorAll('[data-force-pair-investigation] li').length,5);assert.doesNotMatch(d.body.textContent,/Personen stehen auf Rollbrettern|rutschfesten Socken/);
 assert.match(d.body.textContent,/auf verschiedene Körper/);assert.match(d.body.textContent,/Sie ist nicht immer maximal/);
 for(const revision of [1,2,3,4,5,6,7,8])assert.equal(w.currentChapterResult('kraft_und_bewegung',{contentRevision:revision,passed:true,bestPercent:100}).passed,false);
 w.eval(read('js/topics/kraft_und_bewegung.js'));w.topicInit();
 const frictionTime=d.getElementById('frictionTime');assert.equal(frictionTime.step,'0.25');assert.ok(d.querySelector('label[for="frictionTime"]'));
 for(const step of [...Array.from({length:17},(_,i)=>i),4,0,16]){
  const seconds=step/4;frictionTime.value=seconds;frictionTime.focus();w.eval(frictionTime.getAttribute('oninput'));assert.equal(d.activeElement,frictionTime);
  for(const [name,id,a]of [['A','iceBlock',0.5],['B','sandBlock',2]]){
   const elapsed=Math.min(seconds,2/a),distance=2*elapsed-a*elapsed**2/2,speed=Math.max(0,2-a*seconds),row=d.querySelector('[data-friction-row="'+name+'"]');
   const number=key=>Number(row.querySelector('[data-friction-'+key+']').textContent.split(' ')[0].replace(',','.'));
   assert.equal(number('distance'),Number(distance.toFixed(3)));assert.equal(number('speed'),speed);assert.equal(number('force'),speed>0?a:0);
   assert.equal(Number(d.getElementById(id).getAttribute('x')),20+100*distance);assert.ok(20+100*distance+30<=460);
   assert.ok(d.querySelector('[data-friction-diagram="'+id+'"]').getAttribute('aria-label').includes('Fläche '+name));
  }
 }
 const frictionReset=d.querySelector('[data-friction-model] button[onclick="pushBlocks()"]');frictionReset.focus();w.eval(frictionReset.getAttribute('onclick'));assert.equal(frictionTime.value,'0');assert.equal(d.activeElement,frictionReset);assert.equal(d.getElementById('iceBlock').getAttribute('x'),'20');assert.equal(d.getElementById('sandBlock').getAttribute('x'),'20');
 assert.doesNotMatch(d.body.textContent,/Welcher Block kommt bei gleicher Kraft weiter/);
 const lever=d.getElementById('leverRange');assert.ok(d.querySelector('label[for="leverRange"]'));assert.equal(lever.min,'0.2');assert.equal(lever.max,'1.8');assert.equal(lever.step,'0.1');assert.equal(d.getElementById('leverChance'),null);
 for(const i of [...Array.from({length:17},(_,j)=>j+2),4,2,18,10]){
  lever.value=i/10;lever.focus();w.updateLever();assert.equal(d.activeElement,lever);
  const num=selector=>Number(d.querySelector(selector).textContent.split(' ')[0].replace(',','.'));
  assert.equal(num('[data-lever-left-arm]'),i/10);assert.equal(num('[data-lever-right-arm]'),(20-i)/10);
  assert.equal(num('[data-lever-left-moment]'),4*i);assert.equal(num('[data-lever-right-moment]'),20-i);
  assert.equal(d.getElementById('seesawGroup').style.transform,'rotate('+(i===4?0:i<4?12:-12)+'deg)');
  assert.match(d.getElementById('leverText').textContent,i===4?/Gleichgewicht/:i<4?/zu heben/:/zu senken/);
  assert.ok(lever.getAttribute('aria-valuetext').includes(d.getElementById('leverText').textContent));
  assert.ok(d.querySelector('[data-lever-diagram]').getAttribute('aria-label').includes('Newtonmeter'));
 }
 assert.doesNotMatch(d.body.textContent,/Chance, die Last zu heben/);
 const zone=d.querySelector('[data-motion-plane]'),time=zone.querySelector('[data-motion-time]'),status=zone.querySelector('[data-motion-status]');
 assert.ok(time.closest('label'));assert.equal(status.getAttribute('aria-live'),'polite');assert.equal(status.getAttribute('aria-atomic'),'true');
 const points=[[0,0],[2,0],[4,0],[4,2],[4,4],[2,4],[0,4],[0,2],[0,0]];
 for(const index of [0,1,2,3,4,5,6,7,8,4,0]){
  time.value=index;time.focus();time.dispatchEvent(new w.Event('input'));assert.equal(d.activeElement,time);
  const [x,y]=points[index],marker=zone.querySelector('[data-motion-position]');assert.equal(Number(marker.getAttribute('cx')),70+40*x);assert.equal(Number(marker.getAttribute('cy')),250-40*y);
  assert.ok(status.textContent.includes('Bisher zurückgelegter Weg: '+2*index+' m'));
  assert.equal(zone.querySelector('[data-motion-trail]').getAttribute('points').split(' ').length,index+1);
  assert.ok(zone.querySelector('[data-motion-diagram]').getAttribute('aria-label').includes(status.textContent));
 }
 time.value=8;time.dispatchEvent(new w.Event('input'));w.initPlaneMotion();assert.equal(time.value,'8');const reset=zone.querySelector('[data-motion-reset]');reset.focus();reset.click();assert.equal(d.activeElement,reset);assert.equal(time.value,'0');assert.equal(w.localStorage.getItem('sciverse_chapter_quiz_results'),null);
 const questions=w.currentChapterQuiz.questions.filter(q=>q.id.startsWith('motion_plane_')||q.id.startsWith('motion_traffic_')||q.id.startsWith('force_pair_')||q.id==='q_force_intro'||q.id==='q5'||q.id==='q2');assert.equal(questions.length,11);
 for(const q of questions){assert.equal(q.sectionIndex,q.id.startsWith('motion_plane_')?1:q.id.startsWith('motion_traffic_')?4:q.id==='q_force_intro'?0:q.id==='q5'?8:q.id==='q2'?3:6);const index=w.currentChapterQuiz.questions.indexOf(q);
  for(let choice=0;choice<q.answers.length;choice++){
   w.currentChapterQuiz.questions.forEach((question,i)=>{d.querySelector('input[name="chapter_q_'+i+'"][value="'+(i===index?choice:question.answers.findIndex(a=>a.correct))+'"]').checked=true;});
   w.submitChapterQuiz();const result=JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results')).kraft_und_bewegung;
   assert.equal(result.lastPercent,Math.round(100*(33-(q.answers[choice].correct?0:1))/33));assert.ok(d.querySelector('#chapter-quiz-result').textContent.includes(q.answers[choice].feedback));
  }
 }

 const stopCases=[['A',30,1,7.5],['B',50,1,7.5],['C',50,2,7.5],['D',50,1,3.75]],numbers={};
 for(const [name,speed,reactionTime,deceleration] of stopCases){
  const row=d.querySelector('[data-stop-case="'+name+'"]'),readNumber=key=>Number(row.querySelector('[data-stop-'+key+']').textContent.replace(' m','').replace(',','.'));
  const reaction=speed/3.6*reactionTime,braking=(speed/3.6)**2/(2*deceleration);
  assert.equal(readNumber('reaction'),Number(reaction.toFixed(1)));assert.equal(readNumber('braking'),Number(braking.toFixed(1)));assert.equal(readNumber('total'),Number((reaction+braking).toFixed(1)));
  numbers[name]={reaction:readNumber('reaction'),braking:readNumber('braking'),total:readNumber('total')};
 }
 assert.equal(numbers.B.braking,numbers.C.braking);assert.equal(numbers.B.reaction,numbers.D.reaction);assert.ok(numbers.C.total>numbers.B.total);assert.ok(numbers.D.total>numbers.B.total);
 const right=d.getElementById('net-force-right'),left=d.getElementById('net-force-left'),out=d.getElementById('net-force-result');
 for(const [r,l,net,a] of [[6,6,0,'0'],[10,4,6,'3'],[4,10,-6,'-3'],[0,0,0,'0'],[0,1,-1,'-0,5'],[20,0,20,'10']]){
  right.value=r;left.value=l;
  // Execute the authored input handler, as a browser does after a slider change.
  w.eval(right.getAttribute('oninput'));
  assert.ok(out.textContent.includes(`= ${net} N resultierende Kraft`));
  assert.ok(out.textContent.includes(`= ${a} m/s²`));
  assert.equal(left.getAttribute('aria-valuetext'),`${l} Newton nach links`);
  assert.match(out.textContent,net===0?/rollendes behält seine Geschwindigkeit/:/nicht automatisch die Bewegungsrichtung/);
 }
 for(const [force,mass,a] of [[6,3,'2.0'],[12,3,'4.0'],[6,6,'1.0']]){
  d.getElementById('forceRange').value=force;d.getElementById('massRange').value=mass;w.updateForceLab();
  assert.equal(d.getElementById('accelLabel').innerText,`${a} m/s²`);
  assert.match(d.getElementById('forceLabText').innerText,/Resultierende Kraft/);
 }
 dom.window.close();console.log('PASS: 38 force questions, nine plane-motion states, four independently recalculated stopping cases and all 33 selected motion/traffic/force-intro/pair/lever/friction answer paths, 17 timed friction states and reset, 17 calculated lever positions including balance, revision migration, force-pair and friction explanations, six net-force cases including zero and negative acceleration, three existing force/mass cases.');
})().catch(error=>{console.error(error);process.exitCode=1;});
