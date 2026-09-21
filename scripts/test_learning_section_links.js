'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{JSDOM}=require('jsdom');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8'),id='bio_4_kompetenzplan';
async function scenario({hash,script=false,event='load',changeHash,hidden=false}){
 const data=JSON.parse(read('lang/de.json'));data[id].script=script;const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/physik_bay6/topics/template.html?topic='+id+hash,runScripts:'outside-only'}),w=dom.window,d=w.document,frames=[],scrolls=[];let initialized=false;
 await new Promise(r=>setImmediate(r));w.fetch=async()=>({ok:true,json:async()=>data});w.requestAnimationFrame=callback=>frames.push(callback);w.HTMLElement.prototype.scrollIntoView=function(options){scrolls.push({id:this.id,options});};for(const f of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+f+'.js'));await w.renderTopic();
 if(script){assert.equal(frames.length,0,'Wait for optional topic initialization');w.topicInit=()=>{initialized=true;};d.querySelector('script[src*="js/topics/"]').dispatchEvent(new w.Event(event));assert.equal(initialized,event==='load');}
 if(changeHash)w.history.replaceState(null,'','?topic='+id+changeHash);if(hidden)d.getElementById(hash.slice(1)).hidden=true;
 frames.forEach(fn=>fn());return{dom,w,d,scrolls};
}
(async()=>{
 for(const options of [{hash:'#learning-section-1'},{hash:'#chapter-summary'},{hash:'#learning-section-2',script:true},{hash:'#learning-section-0',script:true,event:'error'}]){const {dom,d,scrolls}=await scenario(options);assert.equal(scrolls.length,1);assert.equal(scrolls[0].id,options.hash.slice(1));assert.equal(scrolls[0].options.block,'start');assert.equal(d.activeElement.id,options.hash.slice(1));assert.equal(d.activeElement.getAttribute('tabindex'),'-1');dom.window.close();}
 for(const options of [{hash:''},{hash:'#learning-section-999'},{hash:'#learning-section--1'},{hash:'#topic-title'},{hash:'#learning-section-1',changeHash:'#learning-section-2'},{hash:'#learning-section-1',hidden:true}]){const {dom,scrolls}=await scenario(options);assert.equal(scrolls.length,0,JSON.stringify(options));dom.window.close();}
 console.log('PASS: section and summary anchors after rendering, after optional initialization or load failure; no focus/scroll for absent, invalid, changed or hidden targets.');
})().catch(e=>{console.error(e);process.exitCode=1;});
