const assert=require('node:assert/strict'),fs=require('fs'),path=require('path');
const {JSDOM}=require('jsdom'),root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
(async()=>{
 const data=JSON.parse(read('lang/de.json'));
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic=chemie_sauerstoff_verbrennung',runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(resolve=>setImmediate(resolve));w.fetch=async()=>({ok:true,json:async()=>data});
 for(const file of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+file+'.js'));
 await w.renderTopic();assert.equal(d.querySelectorAll('.chapter-question').length,7);
 assert.match(d.body.textContent,/bevor der gesamte Sauerstoff verbraucht ist/);
 assert.match(d.body.textContent,/Feuerwehr-Notruf 122/);
 assert.doesNotMatch(d.body.textContent,/sichtbare Energie bei einer Reaktion/);
 assert.equal(w.currentChapterResult('chemie_sauerstoff_verbrennung',{passed:true,bestPercent:100}).outdated,true);
 w.eval(read('js/topics/chemie_common.js'));w.ChemieLabs.topicInit();
 const lab=d.querySelector('[data-chem-lab="combustion"]'),boxes=[...lab.querySelectorAll('input')];
 for(let mask=0;mask<8;mask++){
  boxes.forEach((box,i)=>{box.checked=Boolean(mask&(1<<i));box.dispatchEvent(new w.Event('change'));});
  const status=lab.querySelector('.chem-status').textContent;
  assert.equal(status.startsWith('Alle drei'),mask===7);
  if(mask!==7)for(const [i,label]of ['Brennstoff','genügend Sauerstoff','ausreichend hohe Temperatur'].entries())assert.equal(status.includes(label),!(mask&(1<<i)));
  else assert.match(status,/nicht berechnet/);
  assert.equal(lab.querySelectorAll('svg').length,1);
 }
 boxes[1].checked=false;boxes[1].dispatchEvent(new w.Event('change'));
 assert.match(lab.querySelector('.chem-status').textContent,/Im Modell fehlt: genügend Sauerstoff\./);
 dom.window.close();console.log('PASS: 7 combustion questions, candle caveat, Austrian emergency number, revision and all eight model combinations plus extinguishing transition.');
})().catch(error=>{console.error(error);process.exitCode=1;});
