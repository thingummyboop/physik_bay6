const assert=require('node:assert/strict'),fs=require('fs'),path=require('path');
const {JSDOM}=require('jsdom'),root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
(async()=>{
 const data=JSON.parse(read('lang/de.json'));
 for(const topic of Object.keys(data).filter(id=>id.startsWith('chemie_'))){
  const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic='+topic,runScripts:'outside-only'}),w=dom.window,d=w.document;
  await new Promise(resolve=>setImmediate(resolve));w.fetch=async()=>({ok:true,json:async()=>data});
  w.HTMLCanvasElement.prototype.getContext=()=>new Proxy({},{get:(o,k)=>o[k]||(()=>{})});w.requestAnimationFrame=()=>0;
  for(const file of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+file+'.js'));
  await w.renderTopic();w.eval(read('js/topics/chemie_common.js'));w.ChemieLabs.topicInit();
  for(const visual of d.querySelectorAll('.chem-visual')){
   assert.equal(visual.closest('[aria-hidden="true"]'),null,topic+' hides its model');
   for(const item of visual.querySelectorAll('table,[tabindex="0"],button,select,input'))assert.equal(item.closest('[aria-hidden="true"]'),null,topic+' hides content or control');
  }
  dom.window.close();
 }
 console.log('PASS: all 15 chemistry chapters expose model content, tables and controls without aria-hidden ancestors. This is a DOM check, not an assistive-technology or visual browser test.');
})().catch(error=>{console.error(error);process.exitCode=1;});
