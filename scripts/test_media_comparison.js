const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{JSDOM}=require('jsdom');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8'),html=read('examples/medienvergleich.html'),key='sciverse_chapter_quiz_results';
const dom=new JSDOM(html,{runScripts:'dangerously',url:'https://example.test/site/examples/medienvergleich.html'}),w=dom.window,d=w.document;
w.localStorage.setItem(key,'PRIVATE RESULT');
const table=()=>[...d.querySelectorAll('#chart-card tbody td')].map(e=>Number(e.textContent));assert.deepEqual(table(),[16,12,8,4]);
assert.deepEqual([...d.querySelectorAll('.bar')].map(e=>e.style.width),['80%','60%','40%','20%']);
const input=(id,value)=>{const e=d.getElementById(id);e.value=value;e.dispatchEvent(new w.Event(id==='format'?'change':'input'));};
let states=0;
for(const headline of ['28 von 40 kommen zu Fuß oder mit dem Rad','12 von 40 nutzen Öffis oder Auto','<img src=x onerror="alert(1)">'])for(const format of ['text','chart','both']){
 input('headline',headline);input('introduction','Eigener Text: <script>wrong()</script> & Beleg.');input('format',format);
 assert.equal(d.getElementById('text-card').hidden,format==='chart');assert.equal(d.getElementById('chart-card').hidden,format==='text');
 for(const node of d.querySelectorAll('[data-headline]'))assert.equal(node.textContent,headline);
 assert.deepEqual(table(),[16,12,8,4]);
 const exported=new JSDOM(w.exportDocument()),ed=exported.window.document;assert.equal(ed.documentElement.lang,'de');assert.equal(ed.querySelectorAll('.media-card').length,format==='both'?2:1);
 assert.equal(ed.querySelectorAll('script,input,select,textarea,button,img,iframe').length,0);
 for(const card of ed.querySelectorAll('.media-card')){assert.equal(card.querySelector('h2').textContent,headline);assert.equal(card.querySelector('[data-introduction]').textContent,'Eigener Text: <script>wrong()</script> & Beleg.');assert.match(card.querySelector('.source').textContent,/erfundene.*40 Beispielfälle.*ganz Wien/);}
 if(format!=='text'){assert.deepEqual([...ed.querySelectorAll('tbody td')].map(e=>Number(e.textContent)),[16,12,8,4]);assert.match(ed.body.textContent,/Skala reicht bis 20/);}
 else assert.match(ed.body.textContent,/40 Kindern.*16 zu Fuß.*12.*Fahrrad.*8.*Verkehrsmitteln.*4.*Auto/);
 assert.ok(ed.querySelector('style'));assert.ok(ed.querySelector('meta[charset="utf-8"]'));exported.window.close();states++;
}
assert.equal(states,9);assert.equal(w.localStorage.getItem(key),'PRIVATE RESULT');assert.equal(w.localStorage.length,1);input('headline','   ');assert.equal(d.querySelector('[data-headline]').textContent,'Schulwege der Beispielgruppe');
for(const id of ['headline','introduction','format'])assert.equal(d.getElementById(id).labels.length,1);
assert.equal(d.querySelectorAll('script[src],iframe,img,link[rel="stylesheet"]').length,0);dom.window.close();
(async()=>{
 const data=JSON.parse(read('lang/de.json')),id='dgb7_produktion',chapter=data[id],section=chapter.sections.find(s=>s.id==='sec-media');assert.ok(section);assert.equal(chapter.sections.indexOf(section),3);assert.equal(chapter.sections[4].id,'sec4');
 const source=new JSDOM(section.content,{url:'https://example.test/site/topics/template.html'}),sd=source.window.document;
 assert.deepEqual([...sd.querySelectorAll('[data-media-source] tbody td')].map(e=>Number(e.textContent)),[16,12,8,4]);assert.equal(sd.querySelector('[data-media-open]').href,'https://example.test/site/examples/medienvergleich.html');assert.equal(sd.querySelectorAll('[data-media-comparison-tasks]>li').length,6);source.window.close();
 const paper=new JSDOM(read('topics/worksheet.html'),{url:'https://example.test/site/topics/worksheet.html?topic='+id,runScripts:'outside-only'}),pw=paper.window,pd=pw.document;
 pw.fetch=async()=>({ok:true,json:async()=>data});for(const f of ['curriculum','worksheet_generator','worksheet'])pw.eval(read('js/'+f+'.js'));await new Promise(r=>setImmediate(r));
 const material=pd.getElementById('ws-dgb-material'),solutions=pd.getElementById('ws-solutions');assert.equal(material.querySelectorAll('[data-media-comparison-tasks]>li').length,6);assert.equal(material.querySelectorAll('[data-media-comparison-protocol] tbody tr').length,3);assert.match(material.textContent,/tatsächliche Bearbeiten, Exportieren und Prüfen/);assert.doesNotMatch(material.textContent,/also 70 %/);assert.match(solutions.textContent,/also 70 %/);assert.equal(solutions.hidden,true);paper.window.close();
 console.log('PASS: nine format/headline combinations with unchanged data, independent zero-based bar values, complete inert HTML exports, literal user text, no storage writes, chapter integration and separate paper solutions.');
})().catch(e=>{console.error(e);process.exitCode=1;});
