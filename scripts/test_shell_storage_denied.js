const assert=require('node:assert/strict'),fs=require('fs');let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const read=p=>fs.readFileSync(p,'utf8');
(async()=>{
 const dom=new JSDOM(read('index.html'),{url:'https://example.test/physik_bay6/index.html',runScripts:'outside-only'}),w=dom.window;await new Promise(r=>setImmediate(r));const errors=[];w.addEventListener('error',e=>errors.push(e.message));Object.defineProperty(w,'localStorage',{get(){throw new w.DOMException('Denied','SecurityError');}});
 Object.defineProperty(w.HTMLElement.prototype,'innerText',{get(){return this.textContent;},set(value){this.textContent=value;},configurable:true});w.HTMLMediaElement.prototype.pause=()=>{};w.matchMedia=()=>({matches:false,addEventListener(){},removeEventListener(){}});w.eval(read('js/curriculum.js'));for(const script of w.document.querySelectorAll('script:not([src])'))w.eval(script.textContent);
 w.document.dispatchEvent(new w.Event('DOMContentLoaded'));await new Promise(r=>setImmediate(r));
 assert.ok(w.document.getElementById('game-frame').src.includes('topics/learning.html'));
 w.setLanguage('en');assert.equal(w.document.documentElement.lang,'en');assert.equal(w.readShellSetting('physik_lang'),'en');
 w.toggleDarkMode();assert.equal(w.document.documentElement.dataset.theme,'dark');w.toggleDarkMode();assert.equal(w.document.documentElement.hasAttribute('data-theme'),false);
 w.loadPage('math2_9_relative_haeufigkeit',null);assert.ok(w.document.getElementById('game-frame').src.includes('math2_9_relative_haeufigkeit'));
 w.eval(read('js/learning_radio.js'));assert.ok(w.document.querySelector('audio'));
 // The same-origin embedded chapter inherits preferences without localStorage.
 const child=new JSDOM('<div id="sections-container"></div>',{url:'https://example.test/topics/template.html',runScripts:'outside-only'}),cw=child.window;await new Promise(r=>setImmediate(r));Object.defineProperty(cw,'parent',{value:w});Object.defineProperty(cw,'localStorage',{get(){throw Error('Denied');}});cw.eval(read('js/common.js'));cw.eval(read('js/renderer.js'));assert.equal(cw.uiText('Abgeben'),'Submit');assert.equal(cw.commonText('Richtig!'),'Correct!');
 assert.deepEqual(errors,[]);child.window.close();dom.window.close();console.log('PASS: denied-storage shell startup, navigation, language, repeated theme toggle, radio initialization and inherited chapter preferences.');
})().catch(e=>{console.error(e);process.exitCode=1;});
