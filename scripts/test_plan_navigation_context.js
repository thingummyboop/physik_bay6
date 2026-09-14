const assert=require('node:assert/strict'),fs=require('fs'),path=require('path'),{JSDOM}=require('jsdom');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8'),data=JSON.parse(read('lang/de.json'));
const base='https://example.test/physik_bay6/';
async function hub(query){
 const dom=new JSDOM(read('topics/learning.html'),{url:base+'topics/learning.html?'+query,runScripts:'outside-only'}),w=dom.window;
 Object.defineProperty(w,'localStorage',{get(){throw new w.DOMException('Denied','SecurityError');}});
 Object.defineProperty(w,'parent',{value:{location:{hash:''}}});
 w.fetch=async()=>({ok:true,json:async()=>data});
 for(const file of ['curriculum','chapter-revisions','learning'])w.eval(read('js/'+file+'.js'));
 await new Promise(r=>setImmediate(r));return dom;
}
const route=href=>new URL(new URL(href,base).hash.slice(1),base);
(async()=>{
 for(const mode of ['learn','teach','review']){
  const plan='energie,arbeit,missing_chapter',initial=await hub(new URLSearchParams({mode,plan})),w=initial.window;
  // This is the native link that can be copied, opened in a new tab or followed from a PDF.
  // It must work on another device without relying on the sender's browser storage.
  const printed=w.document.querySelector('.plan-chapter-link a'),printedRoute=route(printed.href);
  assert.equal(printedRoute.pathname,'/physik_bay6/topics/template.html');
  assert.equal(printedRoute.searchParams.get('topic'),'energie');
  assert.equal(printedRoute.searchParams.get('plan'),plan);
  assert.equal(printedRoute.searchParams.get('mode'),mode);
  w.document.querySelector('[data-focus-key="plan-open-energie"]').click();
  const opened=new URL(w.parent.location.hash,base);
  assert.equal(opened.pathname,'/physik_bay6/topics/template.html');
  assert.equal(opened.searchParams.get('plan'),plan);assert.equal(opened.searchParams.get('mode'),mode);
  assert.equal(opened.href,printedRoute.href,'Visible link and open button lead to the same chapter context');
  const chapter=new JSDOM(read('topics/template.html'),{url:opened.href,runScripts:'outside-only'}),cw=chapter.window;
  await new Promise(r=>setImmediate(r));cw.fetch=async()=>({ok:true,json:async()=>data});
  for(const f of ['curriculum','chapter-revisions','common','core-learning','renderer'])cw.eval(read('js/'+f+'.js'));
  await cw.renderTopic();
  const back=cw.document.querySelector('[data-core-navigation] a[target="_top"]'),backRoute=route(back.href);
  assert.equal(backRoute.searchParams.get('plan'),plan);assert.equal(backRoute.searchParams.get('mode'),mode);
  const continued=cw.document.querySelector('[data-chapter-continuation] li a');assert.ok(continued);
  assert.equal(route(continued.href).searchParams.get('plan'),plan);
  assert.equal(route(continued.href).searchParams.get('mode'),mode);
  const prior=cw.document.querySelector('[data-core-intro] a');assert.ok(prior);
  assert.equal(route(prior.href).searchParams.get('plan'),plan);
  assert.equal(route(prior.href).searchParams.get('mode'),mode);
  const restored=await hub(backRoute.searchParams);
  assert.equal(restored.window.document.querySelectorAll('#selected>li').length,2);
  assert.equal(restored.window.document.querySelectorAll('#unavailable-chapters>li').length,1);
  assert.equal(restored.window.document.querySelector('#plan h2').textContent,mode==='teach'?'Stoffliste für die Klasse':'Mein Prüfungsstoff');
  w.document.querySelector('[data-focus-key="plan-move-1-energie"]').click();
  const reordered=route(w.document.querySelector('.plan-chapter-link a').href);
  assert.equal(reordered.searchParams.get('topic'),'arbeit');
  assert.equal(reordered.searchParams.get('plan'),'arbeit,energie,missing_chapter');
  w.document.querySelector('[data-focus-key="plan-remove-energie"]').click();
  assert.equal(route(w.document.querySelector('.plan-chapter-link a').href).searchParams.get('plan'),'arbeit,missing_chapter');
  restored.window.close();chapter.window.close();initial.window.close();
 }
 const empty=await hub('mode=learn&plan=');empty.window.document.querySelector('[data-focus-key="catalog-open-sieinheiten"]').click();
 assert.equal(new URL(empty.window.parent.location.hash,base).searchParams.get('plan'),'');empty.window.close();
 const teacher=await hub('mode=teach');teacher.window.document.querySelector('[data-focus-key="catalog-open-sieinheiten"]').click();
 const teacherRoute=new URL(teacher.window.parent.location.hash,base);
 assert.equal(teacherRoute.searchParams.get('mode'),'teach','Previewing a chapter before choosing material retains teacher mode');
 assert.equal(teacherRoute.searchParams.get('plan'),'');teacher.window.close();
 console.log('PASS: all three learning modes preserve plan and unavailable entries through chapter, prerequisite, continuation and return links with blocked hub storage; explicit empty plan remains explicit.');
})().catch(e=>{console.error(e);process.exitCode=1;});
