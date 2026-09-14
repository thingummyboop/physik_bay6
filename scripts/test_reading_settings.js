const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{JSDOM}=require('jsdom');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8'),html=read('examples/leseansicht.html'),key='sciverse_reading_preferences';
function app(seed,denied=false){return new JSDOM(html,{url:'https://example.test/site/examples/leseansicht.html',runScripts:'dangerously',beforeParse(w){if(denied)Object.defineProperty(w,'localStorage',{get(){throw Error('Denied');}});else {w.localStorage.setItem('sciverse_chapter_quiz_results','PRIVATE QUIZ');if(seed!==undefined)w.localStorage.setItem(key,seed);}}});}
const dom=app(),w=dom.window,d=w.document,sample=d.getElementById('reading'),original=sample.innerHTML;
function choose(document,window,values){for(const [id,value]of Object.entries(values)){const e=document.getElementById(id);e.value=value;e.dispatchEvent(new window.Event('change'));}}
let states=0;
for(const size of ['1','1.25','1.5'])for(const spacing of ['1.5','1.8','2.2'])for(const colours of ['light','dark']){
 choose(d,w,{'text-size':size,'line-space':spacing,colours});assert.equal(sample.style.fontSize,size+'rem');assert.equal(sample.style.lineHeight,spacing);assert.equal(sample.dataset.colours,colours);assert.equal(sample.innerHTML,original);assert.equal(w.localStorage.getItem(key),null);states++;
}
assert.equal(states,18);assert.match(d.getElementById('view-state').textContent,/150 %.*2,2/);
for(const id of ['text-size','line-space','colours'])assert.equal(d.getElementById(id).labels.length,1);
assert.equal(d.getElementById('view-state').getAttribute('aria-live'),'polite');
d.getElementById('save').click();const saved=w.localStorage.getItem(key);assert.deepEqual(JSON.parse(saved),{size:'1.5',spacing:'2.2',colours:'dark'});
d.getElementById('defaults').focus();d.getElementById('defaults').click();assert.equal(d.activeElement.id,'defaults');assert.equal(sample.style.fontSize,'1rem');assert.equal(sample.style.lineHeight,'1.5');assert.equal(sample.dataset.colours,'light');assert.equal(w.localStorage.getItem(key),saved);
d.getElementById('load').click();assert.equal(sample.style.fontSize,'1.5rem');assert.equal(sample.dataset.colours,'dark');
const reopened=app(saved);assert.equal(reopened.window.document.getElementById('reading').style.fontSize,'1.5rem');assert.equal(reopened.window.document.getElementById('colours').value,'dark');reopened.window.close();
d.getElementById('forget').click();assert.equal(w.localStorage.getItem(key),null);assert.equal(sample.style.fontSize,'1.5rem');assert.equal(w.localStorage.getItem('sciverse_chapter_quiz_results'),'PRIVATE QUIZ');
assert.equal(d.querySelectorAll('script[src],iframe,img,link[rel="stylesheet"]').length,0);dom.window.close();
for(const seed of ['broken','null','[]','{}','{"size":"999","spacing":"1.5","colours":"light"}']){const broken=app(seed),doc=broken.window.document;assert.match(doc.getElementById('save-state').textContent,/nicht geladen/);assert.equal(doc.getElementById('reading').style.fontSize,'1rem');broken.window.close();}
const denied=app(undefined,true),dw=denied.window,dd=dw.document;choose(dd,dw,{'text-size':'1.25'});for(const id of ['save','load','forget']){dd.getElementById(id).click();assert.match(dd.getElementById('save-state').textContent,/nicht/);assert.equal(dd.getElementById('reading').style.fontSize,'1.25rem');}denied.window.close();
const local=new JSDOM(html,{url:'file:///lesson-copy.html',runScripts:'dangerously'});assert.equal(local.window.document.getElementById('chapter-link').href,'https://thingummyboop.github.io/physik_bay6/index.html#dgb7_produktion');assert.equal(local.window.document.getElementById('reading').style.fontSize,'1rem');local.window.close();
(async()=>{
 const data=JSON.parse(read('lang/de.json')),id='dgb7_produktion',chapter=data[id];
 const markup=new JSDOM(chapter.sections[2].content,{url:'https://example.test/site/topics/template.html'}),md=markup.window.document;
 assert.equal(md.querySelector('[data-reading-open]').href,'https://example.test/site/examples/leseansicht.html');assert.equal(md.querySelector('a[download="leseansicht.html"]').href,md.querySelector('[data-reading-open]').href);
 assert.equal(md.querySelectorAll('[data-reading-settings-tasks]>li').length,6);assert.equal(md.querySelectorAll('[data-reading-settings-protocol] tbody tr').length,4);
 assert.match(md.querySelector('[data-reading-settings-lesson]').textContent,/andere Person darf anders wählen/);assert.match(md.body.textContent,/keine Geräte- oder Kommunikationseinstellungen/);markup.window.close();
 const paper=new JSDOM(read('topics/worksheet.html'),{url:'https://example.test/site/topics/worksheet.html?topic='+id,runScripts:'outside-only'}),pw=paper.window,pd=pw.document;
 pw.fetch=async()=>({ok:true,json:async()=>data});for(const f of ['curriculum','worksheet_generator','worksheet'])pw.eval(read('js/'+f+'.js'));await new Promise(r=>setImmediate(r));
 const material=pd.getElementById('ws-dgb-material'),solutions=pd.getElementById('ws-solutions');
 assert.equal(material.querySelectorAll('[data-reading-settings-tasks]>li').length,6);assert.equal(material.querySelectorAll('[data-reading-settings-protocol] tbody tr').length,4);
 assert.match(material.textContent,/Lass Beobachtungsfelder leer/);assert.doesNotMatch(material.textContent,/Beginn 14:00 Uhr/);assert.match(solutions.textContent,/Beginn 14:00 Uhr/);assert.equal(solutions.hidden,true);assert.equal(material.querySelectorAll('button,input,select,script,details').length,0);paper.window.close();
 console.log('PASS: 18 configurable reading states, stable content, explicit save/load/defaults/delete, reopened settings, corrupt and denied storage, isolated quiz data, chapter/download integration and separate paper protocol/solution.');
})().catch(e=>{console.error(e);process.exitCode=1;});
