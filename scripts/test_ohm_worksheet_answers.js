const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{JSDOM}=require('jsdom');
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
const fraction=s=>{const[a,b='']=s.replace(',','.').split('.');return[BigInt(a+b),10n**BigInt(b.length)];};
function equalNumber(s,n,d=1n){const[a,b]=fraction(s);assert.equal(a*d,BigInt(n)*b,s+' != '+n+'/'+d);}
function verify(container){
 const tasks=[...container.querySelectorAll('[data-ohm-generated]')],template=container.querySelector('template[data-generated-worksheet-solutions]'),answers=[...(template?template.content:container).querySelectorAll('[data-ohm-generated-answer]')];
 assert.equal(tasks.length,10);assert.equal(answers.length,10);assert.deepEqual(tasks.map(t=>t.dataset.ohmGenerated),answers.map(a=>a.dataset.ohmGeneratedAnswer));const combinations=[];
 for(let index=0;index<10;index++){
  const task=tasks[index],answer=answers[index],given=task.querySelector('p').textContent,calc=answer.querySelector('p').textContent,probe=answer.querySelectorAll('p')[1].textContent;
  assert.equal(task.dataset.ohmGenerated,'O'+(index+1));assert.equal(task.dataset.ohmUnknown,index<5?'U':'I');
  if(index<5){
   const[,r,ma]=given.match(/^R = (\d+) Ω; I = (\d+) mA\.$/),[,actualMa,amp,actualR,actualAmp,u]=calc.match(/^I = (\d+) mA = ([\d,]+) A\. U = R · I = (\d+) Ω · ([\d,]+) A = ([\d,]+) V\.$/);
   assert.equal(actualMa,ma);assert.equal(actualR,r);equalNumber(amp,ma,1000n);equalNumber(actualAmp,ma,1000n);equalNumber(u,BigInt(r)*BigInt(ma),1000n);
   const[,pu,pr,pa,pm]=probe.match(/^Probe: ([\d,]+) V ÷ (\d+) Ω = ([\d,]+) A = (\d+) mA\.$/);equalNumber(pu,BigInt(r)*BigInt(ma),1000n);assert.equal(pr,r);equalNumber(pa,ma,1000n);assert.equal(pm,ma);combinations.push('U/'+r+'/'+ma);
  }else{
   const[,u,r]=given.match(/^U = ([\d,]+) V; R = (\d+) Ω\.$/),[un,ud]=fraction(u),[,cu,cr,ca,cm]=calc.match(/^I = U ÷ R = ([\d,]+) V ÷ (\d+) Ω = ([\d,]+) A = (\d+) mA\.$/);
   assert.equal(cu,u);assert.equal(cr,r);equalNumber(ca,un,ud*BigInt(r));equalNumber(cm,un*1000n,ud*BigInt(r));
   const[,pr,pa,pu]=probe.match(/^Probe: (\d+) Ω · ([\d,]+) A = ([\d,]+) V\.$/);assert.equal(pr,r);equalNumber(pa,un,ud*BigInt(r));equalNumber(pu,un,ud);combinations.push('I/'+r+'/'+cm);
  }
 }
 return combinations;
}
(async()=>{
 const dom=new JSDOM('',{runScripts:'outside-only'}),w=dom.window,box=w.document.createElement('div');w.eval(read('js/worksheet_generator.js'));const seen=new Set();
 for(let r=0;r<5;r++)for(let i=0;i<5;i++){let call=0;w.Math.random=()=>((call++%2?r:i)+.5)/5;box.innerHTML=w.generateWorksheetContent('elektrizitaet','Elektrizität');verify(box).forEach(c=>seen.add(c));assert.match(box.textContent,/keine Einstellvorgaben/);}
 assert.equal(seen.size,50);dom.window.close();
 const source=JSON.parse(read('lang/de.json'));let snapshots=[];
 for(const random of [0,0.999999]){
  const page=new JSDOM(read('topics/worksheet.html'),{url:'https://example.test/topics/worksheet.html?topic=elektrizitaet',runScripts:'outside-only'}),pw=page.window,d=pw.document;pw.Math.random=()=>random;pw.MathJax={typesetPromise:async()=>{}};pw.fetch=async()=>({ok:true,json:async()=>source});for(const script of ['curriculum','worksheet_generator','worksheet'])pw.eval(read('js/'+script+'.js'));await new Promise(resolve=>setImmediate(resolve));
  verify(d.querySelector('#ws-content'));assert.equal(d.querySelector('#ws-solutions').hidden,true);const tasks=d.querySelector('.electric-ohm-grid').textContent;snapshots.push(tasks);
  for(const value of [true,false,true]){const toggle=d.querySelector('#ws-include-solutions');toggle.checked=value;toggle.dispatchEvent(new pw.Event('change'));assert.equal(d.querySelector('#ws-solutions').hidden,!value);assert.equal(d.querySelector('.electric-ohm-grid').textContent,tasks);verify(d.querySelector('#ws-content'));}
  page.window.close();
 }
 assert.notEqual(snapshots[0],snapshots[1]);console.log('PASS: all 50 Ohm parameter/unknown combinations, 250 generated tasks and worked answers checked with rational arithmetic; independent probes, units, IDs, two complete worksheet draws and stable solution toggles.');
})().catch(e=>{console.error(e);process.exitCode=1;});
