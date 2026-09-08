const assert=require('node:assert/strict'),fs=require('fs'),path=require('path');
const {JSDOM}=require('jsdom'),root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
(async()=>{
 const data=JSON.parse(read('lang/de.json'));
 const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic=chemie_bindungen',runScripts:'outside-only'}),w=dom.window,d=w.document;
 await new Promise(resolve=>setImmediate(resolve));w.fetch=async()=>({ok:true,json:async()=>data});
 for(const file of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+file+'.js'));
 await w.renderTopic();assert.equal(d.querySelectorAll('.chapter-question').length,7);
 assert.match(d.body.textContent,/nicht aus einzelnen NaCl-Molekülen/);
 assert.match(d.body.textContent,/Diamanten.*Netzwerk/);
 assert.equal(w.currentChapterResult('chemie_bindungen',{passed:true,bestPercent:100}).outdated,true);
 w.eval(read('js/topics/chemie_common.js'));w.ChemieLabs.topicInit();
 const lab=d.querySelector('[data-chem-lab="bonding"]');
 assert.equal(lab.querySelectorAll('[aria-pressed="true"]').length,0);
 for(const [action,phrase]of [['salt','Nicht alle Salze'],['water','H₂O-Moleküle erhalten'],['metal','bewegliche Elektronen']]){
  const button=lab.querySelector(`button[data-chem-action="${action}"]`);button.focus();button.click();
  assert.equal(d.activeElement,button);assert.equal(button.getAttribute('aria-pressed'),'true');
  assert.ok(lab.querySelector('.chem-status').textContent.includes(phrase));
  const graphic=lab.querySelector(`[data-chem-svg-action="${action}"]`);graphic.focus();
  graphic.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Enter',bubbles:true,cancelable:true}));
  assert.equal(d.activeElement.dataset.chemSvgAction,action);
  assert.equal(d.activeElement.getAttribute('aria-pressed'),'true');
  assert.equal(lab.querySelectorAll('svg').length,1);
 }
 dom.window.close();console.log('PASS: 7 bonding questions, structure explanations, three model selections, native and SVG focus, selection state and revision.');
})().catch(error=>{console.error(error);process.exitCode=1;});
