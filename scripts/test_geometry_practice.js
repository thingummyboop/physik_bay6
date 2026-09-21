'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{JSDOM}=require('jsdom');
const read=f=>fs.readFileSync(path.join(__dirname,'..',f),'utf8'),data=JSON.parse(read('lang/de.json')),id='math2_7_geometrie';
const expected=[
  [[-3,-2],[2,-2],[2,2],[-3,2]],
  [[-1,-3],[4,-3],[4,1],[-1,1]],
  [[3,-2],[-2,-2],[-2,2],[3,2]]
];
// Independent vertex correspondences in the order x, y, rising, falling axis.
const matches=[[[3,2,1,0],[1,0,3,2],null,null],[null,null,null,null],[null,[1,0,2],null,null],[null,[0,3,2,1],null,null],[[3,2,1,0],[1,0,3,2],[0,3,2,1],[2,1,0,3]]];
const copy=x=>JSON.parse(JSON.stringify(x)),distance=(p,q)=>Math.hypot(p[0]-q[0],p[1]-q[1]);
(async()=>{
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic='+id,runScripts:'outside-only'}),w=dom.window,d=w.document,q=s=>d.querySelector(s);
 await new Promise(r=>setImmediate(r));w.fetch=async()=>({ok:true,json:async()=>data});
 for(const f of ['curriculum','common','chapter-revisions','core-learning','language-workshop','renderer','topics/'+id])w.eval(read('js/'+f+'.js'));
 await w.renderTopic();w.topicInit();w.topicInit();const saved=JSON.stringify(w.localStorage);
 const change=(el,value)=>{el.value=String(value);el.dispatchEvent(new w.Event(el.tagName==='INPUT'?'input':'change'));};
 const task=q('#coordinate-task'),point=q('#coordinate-point'),x=q('#coordinate-x'),y=q('#coordinate-y'),status=q('[data-coordinate-status]');
 const enter=(i,px,py)=>{change(point,i);change(x,px);change(y,py);q('[data-coordinate-place]').click();};
 q('[data-coordinate-check]').click();assert.match(status.textContent,/Es fehlt noch A/);assert.equal(d.activeElement,point);
 let inputs=0;
 for(let t=0;t<3;t++){
  change(task,t);const m=w.coordinateDrawingModel(t);assert.deepEqual(copy(m.expected),expected[t]);
  assert.equal(q('[data-coordinate-view] polygon'),null);assert.equal(q('[data-coordinate-source]').querySelectorAll('svg').length,t?1:0);
  for(let i=0;i<4;i++){
   const [px,py]=expected[t][i];enter(i,px,py);inputs++;
   const circle=q('[data-coordinate-view]').querySelectorAll('circle')[i];assert.equal(Number(circle.getAttribute('cx')),165+20*px);assert.equal(Number(circle.getAttribute('cy')),165-20*py);
   assert.ok(q('[data-coordinate-values]').textContent.includes('('+px+'|'+py+')'));
  }
  q('[data-coordinate-check]').click();assert.match(status.textContent,/Alle vier Punkte passen/);
  const ps=expected[t];assert.equal(distance(ps[0],ps[1]),5);assert.equal(distance(ps[1],ps[2]),4);
  // A changed, uncommitted input must be checked rather than the previously correct drawing.
  change(x,0);q('[data-coordinate-check]').click();assert.match(status.textContent,/D′?: x stimmt noch nicht/);
  change(x,expected[t][3][0]);change(y,0);q('[data-coordinate-check]').click();assert.match(status.textContent,/D′?: y stimmt noch nicht/);
  change(task,(t+1)%3);assert.match(q('[data-coordinate-values]').textContent,/A′?: noch offen/);assert.equal(x.value,'');
 }
 change(task,0);change(y,-2);
 for(const invalid of ['', '7','-7','1.5','2e0','0x2','NaN','Infinity','--2']){change(x,invalid);q('[data-coordinate-check]').click();assert.equal(x.getAttribute('aria-invalid'),'true');assert.equal(d.activeElement,x);assert.equal(q('[data-coordinate-view] circle'),null);inputs++;}
 change(x,' −3 ');change(y,'+2');x.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Enter',bubbles:true}));assert.match(q('[data-coordinate-values]').textContent,/A\(-3\|2\)/);
 change(point,1);change(x,2);change(y,'');q('[data-coordinate-place]').click();assert.equal(d.activeElement,y);assert.equal(y.getAttribute('aria-invalid'),'true');
 change(point,0);assert.equal(x.value,'-3');assert.equal(y.value,'2');assert.equal(y.hasAttribute('aria-invalid'),false);
 q('[data-coordinate-reset]').click();assert.equal(task.value,'0');assert.equal(d.activeElement,task);assert.equal(q('[data-coordinate-view] circle'),null);
 for(const value of [-1,3,.5,'0'])assert.equal(w.coordinateDrawingModel(value),null);
 for(const value of [[7,0],[0,-7],[1.5,0],['1',0]])assert.equal(w.coordinateDrawingSvg([value]),'');
 // All legal coincident and adjacent entries retain each point name, even for wrong pupil answers.
 let labelCases=0;
 for(let px=-6;px<=6;px++)for(let py=-6;py<=6;py++){
  const cases=[Array(4).fill([px,py]),[[px,py],null,null,null]];
  if(px<6&&py<6)cases.push([[px,py],[px+1,py],[px+1,py+1],[px,py+1]]);
  for(const ps of cases){const host=d.createElement('div');host.innerHTML=w.coordinateDrawingSvg(ps,['A′','B′','C′','D′']);assert.equal(host.querySelectorAll('text').length,11+ps.filter(Boolean).length);labelCases++;}
 }
 const shape=q('#symmetry-shape'),axis=q('#symmetry-axis'),guess=q('#symmetry-guess'),feedback=q('[data-symmetry-status]');let cases=0;
 q('[data-symmetry-check]').click();assert.equal(d.activeElement,guess);assert.match(feedback.textContent,/Wähle zuerst/);
 for(let s=0;s<5;s++)for(const[a,key]of ['x','y','up','down'].entries()){
  change(shape,s);change(axis,key);assert.equal(guess.value,'');assert.equal(q('[data-figure-symmetry] [data-coordinate-image]'),null);
  const m=w.figureSymmetryModel(s,key),oracle=matches[s][a];assert.equal(m.symmetric,!!oracle);
  if(oracle)assert.deepEqual(copy(m.matches),oracle);
  for(let i=0;i<m.points.length;i++){
   // Reflection preserves all side lengths and has its midpoint on the mirror line.
   const p=m.points[i],im=m.image[i],j=(i+1)%m.points.length;
   assert.ok(Math.abs(distance(p,m.points[j])-distance(im,m.image[j]))<1e-9);
   const mid=[(p[0]+im[0])/2,(p[1]+im[1])/2],delta=[im[0]-p[0],im[1]-p[1]];
   if(key==='x'){assert.equal(mid[1],0);assert.equal(delta[0],0);}
   if(key==='y'){assert.equal(mid[0],0);assert.equal(delta[1],0);}
   if(key==='up'){assert.equal(mid[0],mid[1]);assert.equal(delta[0]+delta[1],0);}
   if(key==='down'){assert.equal(mid[0]+mid[1],0);assert.equal(delta[0],delta[1]);}
  }
  for(const answer of ['yes','no']){change(guess,answer);q('[data-symmetry-check]').click();assert.equal(feedback.textContent.startsWith('Deine Vermutung stimmt.'),(answer==='yes')===!!oracle);assert.ok(q('[data-figure-symmetry] [data-coordinate-image]'));cases++;}
 }
 for(const args of [[-1,'x'],[5,'y'],[.5,'x'],['0','y'],[0,'z']])assert.equal(w.figureSymmetryModel(...args),null);
 q('[data-symmetry-reset]').click();assert.equal(shape.value,'0');assert.equal(axis.value,'y');assert.equal(d.activeElement,shape);assert.equal(guess.value,'');assert.equal(q('[data-figure-symmetry] [data-coordinate-image]'),null);
 assert.equal(JSON.stringify(w.localStorage),saved);assert.equal(d.querySelectorAll('[data-geometry-tasks]>li').length,18);
 assert.equal(d.querySelectorAll('[data-geometry-solution]').length,6);
 const allText=data[id].sections.map(s=>new JSDOM(s.content).window.document.body.textContent).join('\n');
 const deg=n=>n*Math.PI/180;
 for(const value of [Math.sqrt(36+16-48*Math.cos(deg(60))),6*Math.sin(deg(60))/Math.sin(deg(70)),6*Math.sin(deg(50))/Math.sin(deg(70)),Math.sqrt(25+9-30*Math.cos(deg(110)))])assert.ok(allText.includes(value.toFixed(2).replace('.',',')));
 dom.window.close();console.log('PASS: 3 four-point drawings, '+inputs+' entered/invalid input cases, '+labelCases+' point-label layouts, 20 independently checked reflections with '+cases+' guesses; keyboard, reset, persistence isolation, 18 paper tasks and construction measurements.');
})().catch(e=>{console.error(e);process.exitCode=1;});
