const assert=require('node:assert/strict'),fs=require('fs'),path=require('path');
let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
(async()=>{
 const data=JSON.parse(read('lang/de.json')),id='bio_2_wirbellose';
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic='+id,runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(r=>setImmediate(r));w.fetch=async()=>({ok:true,json:async()=>data});
 for(const file of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+file+'.js'));
 await w.renderTopic();assert.equal(d.querySelectorAll('.chapter-question').length,10);
 assert.equal(w.currentChapterResult(id,{passed:true}).outdated,true);
 w.eval(read('js/topics/'+id+'.js'));w.topicInit();w.topicInit();
 const zone=d.querySelector('[data-invertebrate-key]'),legs=zone.querySelector('[data-key-legs]'),shell=zone.querySelector('[data-key-shell]'),status=zone.querySelector('[role=status]');
 const expected={'':['ant','spider','woodlouse','snail','worm'],'0':['snail','worm'],'6':['ant'],'8':['spider'],many:['woodlouse']};
 for(const legValue of ['', '0','6','8','many'])for(const shellValue of ['','yes','no']){
  legs.value=legValue;shell.value=shellValue;shell.focus();shell.dispatchEvent(new w.Event('change'));
  const ids=[...zone.querySelectorAll('[data-animal-example]')].map(e=>e.dataset.animalExample);
  assert.deepEqual(ids,expected[legValue].filter(id=>!shellValue||(id==='snail')===(shellValue==='yes')));
  assert.equal(d.activeElement,shell);
  if(!ids.length)assert.match(status.textContent,/nicht, dass ein solches Tier unmöglich/);
 }
 zone.querySelector('button').click();assert.equal(d.activeElement,legs);assert.equal(zone.querySelectorAll('li').length,5);
 assert.equal(legs.value,'');assert.equal(shell.value,'');assert.match(d.body.textContent,/Larven können anders aussehen/);
 dom.window.close();console.log('PASS: 10 invertebrate questions, revision, all 15 filter combinations, unknown traits, empty results, reset focus and developmental limits.');
})().catch(e=>{console.error(e);process.exitCode=1;});
