const assert=require('node:assert/strict'),fs=require('fs'),path=require('path');
let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8'),data=JSON.parse(read('lang/de.json'));
const route='geo_3_europa,elektrizitaet,waermelehre';
const hub=new JSDOM(read('topics/learning.html'),{url:'https://example.test/physik_bay6/topics/learning.html?'+new URLSearchParams({mode:'review',plan:route}),runScripts:'outside-only'});
const host={location:{hash:''}};
Object.defineProperty(hub.window,'parent',{value:host});
Object.defineProperty(hub.window,'localStorage',{get(){throw new Error('Storage denied');}});
hub.window.fetch=()=>new Promise(()=>{});
hub.window.eval(read('js/curriculum.js'));hub.window.eval(read('js/learning.js'));
hub.window.document.querySelector('[data-focus-key="plan-open-elektrizitaet"]').click();
assert.equal(new URLSearchParams(host.location.hash.split('?')[1]).get('plan'),route,'Opening a chapter carries the selected plan even without storage');
hub.window.close();
function chapter(id,plan){
 const dom=new JSDOM('<div id="sections-container"></div>',{url:'https://example.test/physik_bay6/topics/template.html?'+new URLSearchParams({topic:id,mode:'review',plan}),runScripts:'outside-only'}),w=dom.window;
 Object.defineProperty(w,'localStorage',{get(){throw new Error('Storage denied');}});
 w.eval(read('js/curriculum.js'));w.eval(read('js/core-learning.js'));w.enhanceCoreLearning(data[id],id,'de');return dom;
}
const preserved='geo_3_europa,elektrizitaet,unknown,waermelehre';
const dom=chapter('elektrizitaet','geo_3_europa,elektrizitaet,unknown,elektrizitaet,waermelehre');
const links=[...dom.window.document.querySelectorAll('[data-chapter-continuation] li a')];
assert.equal(links.length,2);
for(const [i,a]of links.entries()){
 const query=new URLSearchParams(a.hash.split('?')[1]);
 assert.equal(query.get('plan'),preserved);assert.equal(query.get('topic'),i?'waermelehre':'geo_3_europa');
 const next=chapter(query.get('topic'),query.get('plan'));
 assert.ok(next.window.document.querySelector('[data-chapter-continuation]'),'Next chapter retains the route without storage');next.window.close();
}
for(const a of [...dom.window.document.querySelectorAll('a')].filter(a=>a.textContent==='Zur Stoffliste'))assert.equal(new URLSearchParams(a.hash.split('?')[1]).get('plan'),preserved);
dom.window.close();
const empty=chapter('elektrizitaet','');assert.equal(empty.window.document.querySelector('[data-chapter-continuation]'),null);empty.window.close();
console.log('PASS: explicit review route survives blocked storage, chapter transitions and return links; unknown IDs retained as context but excluded from navigation; duplicates removed; empty selection respected.');
