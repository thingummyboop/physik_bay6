const assert=require('node:assert/strict'),fs=require('fs'),path=require('path'),vm=require('vm');
const {JSDOM}=require('jsdom'),root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
(async()=>{
 const data=JSON.parse(read('lang/de.json')),context={window:{}};vm.runInNewContext(read('js/curriculum.js'),context);
 const ids=Array.from(context.window.SCIVERSE_CURRICULUM.chemie.topics,t=>t.id);
 assert.equal(ids.length,15);assert.equal(new Set(ids).size,15);
 for(const id of ids)for(const prereq of data[id].prerequisites||[]){assert.ok(ids.includes(prereq),prereq);assert.ok(ids.indexOf(prereq)<ids.indexOf(id),`${prereq} must precede ${id}`);}
 for(const topic of ['chemie_roadmap','chemie_alltag_stoffe']){
  const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic='+topic,runScripts:'outside-only'}),w=dom.window,d=w.document;
  await new Promise(resolve=>setImmediate(resolve));w.fetch=async()=>({ok:true,json:async()=>data});
  for(const file of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+file+'.js'));
  await w.renderTopic();assert.equal(d.querySelectorAll('.chapter-question').length,7);
  if(topic==='chemie_roadmap'){
   const links=[...d.querySelectorAll('.step-list a[href^="template.html?topic=chemie_"]')].map(a=>new URL(a.href).searchParams.get('topic'));
   assert.deepEqual(links,ids.slice(1));
   assert.equal(w.currentChapterResult(topic,{contentRevision:1,passed:true}).outdated,true);
   w.eval(read('js/topics/chemie_common.js'));w.ChemieLabs.topicInit();
   d.querySelector('[data-chem-action="grade4"]').click();assert.match(d.querySelector('.chem-status').textContent,/Atome, Bindungen und Lösungen wiederholen/);
  }else assert.match(d.body.textContent,/Klar und gleichmäßig aussehend bedeutet deshalb nicht automatisch rein/);
  dom.window.close();
 }
 console.log('PASS: all 15 chemistry prerequisites precede their chapters; roadmap links follow navigation, two chapters render, revised results and learning recommendation agree.');
})().catch(error=>{console.error(error);process.exitCode=1;});
