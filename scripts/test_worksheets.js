const assert=require('node:assert/strict'),fs=require('fs'),path=require('path');
let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8'),data=JSON.parse(read('lang/de.json'));
async function page(query,fail=false,math={typesetPromise:async()=>{}}){const dom=new JSDOM(read('topics/worksheet.html'),{url:'https://example.test/physik_bay6/topics/worksheet.html'+query,runScripts:'outside-only'}),w=dom.window;w.MathJax=math;w.fetch=async()=>({ok:!fail,status:503,json:async()=>data});w.eval(read('js/curriculum.js'));w.eval(read('js/worksheet_generator.js'));w.eval(read('js/worksheet.js')+';window.worksheetText=worksheetText;window.worksheetQuestions=worksheetQuestions;window.renderWorksheetQuestions=renderWorksheetQuestions;');await new Promise(resolve=>setImmediate(resolve));return dom;}
(async()=>{
 // Content-only DOM tests stub the external renderer; native formula output is checked in browser_print_math.js.
 let releaseMath;const pendingMath=new Promise(resolve=>{releaseMath=resolve;});
 const delayed=await page('?topic=math1_8_brueche',false,{typesetPromise:()=>pendingMath});
 assert.equal(delayed.window.document.querySelector('#ws-print').disabled,true);
 releaseMath();await new Promise(resolve=>setImmediate(resolve));
 assert.equal(delayed.window.document.querySelector('#ws-print').disabled,false);delayed.window.close();
 for(const math of [null,{typesetPromise:async()=>{throw Error('unavailable');}}]){
  const failedMath=await page('?topic=math1_8_brueche',false,math),fd=failedMath.window.document;
  assert.equal(fd.querySelector('#ws-print').disabled,true);assert.match(fd.querySelector('#ws-math-status').textContent,/Formeln konnten nicht/);
  assert.ok(fd.querySelectorAll('.exercise-item').length>0);failedMath.window.close();
 }
 const dom=await page('?topic=waermelehre'),w=dom.window,d=w.document;
 assert.equal(w.worksheetText('Fachw&ouml;rter &amp; Gr&#246;&#xDF;en'),'Fachwörter & Größen');
 assert.equal(w.worksheetText('x < 3 und x > 1'),'x < 3 und x > 1');
 const sampleDom=await page('?topic=waermelehre');const sample=sampleDom.window.document.createElement('div');sampleDom.window.renderWorksheetQuestions({quizzes:[{question:'Pr&uuml;fe &lt;img src=x onerror=alert(1)&gt;',answers:[{text:'Gr&ouml;&szlig;er',correct:true,feedback:'&Uuml;berpr&uuml;ft'}]}]},sample);
 assert.ok(sample.textContent.includes('Prüfe <img src=x onerror=alert(1)>'));assert.ok(sample.textContent.includes('Größer'));assert.equal(sample.querySelector('img'),null);sampleDom.window.close();
 assert.equal(d.querySelector('#ws-print').disabled,false);assert.equal(d.querySelectorAll('#ws-content > .question-block').length,24);
 assert.ok(d.querySelectorAll('.worksheet-options li').length>=42);assert.equal(d.querySelector('#ws-solutions').hidden,true);
 const toggle=d.querySelector('#ws-include-solutions');toggle.checked=true;toggle.dispatchEvent(new w.Event('change'));assert.equal(d.querySelector('#ws-solutions').hidden,false);toggle.checked=false;toggle.dispatchEvent(new w.Event('change'));assert.equal(d.querySelector('#ws-solutions').hidden,true);
 assert.match(d.querySelector('#ws-chapter-link').href,/physik_bay6\/topics\/template.html\?topic=waermelehre$/);
 assert.match(d.querySelector('#ws-description').textContent,/bleiben beim Neuladen gleich/);
 const q={question:'Vergleiche: x < 3 und x > 1',answers:[{text:'1 < x < 3',correct:true}]};assert.equal(w.worksheetQuestions({sections:[{quizzes:[q]}],quizzes:[q,{...q,practiceOnly:true}],diplom:{questions:[q]}}).length,1);
 const host=d.createElement('div');w.renderWorksheetQuestions({quizzes:[q]},host);assert.ok(host.textContent.includes('1 < x < 3'));
 dom.window.close();
 for(const id of Object.keys(data).filter(id=>id.startsWith('kunst_'))){
  const art=await page('?topic='+id),aw=art.window,ad=aw.document,material=ad.getElementById('ws-art-material');assert.ok(material,id);assert.equal(material.hidden,false);assert.equal(ad.getElementById('ws-subject').textContent,'Kunst und Gestaltung');
  assert.equal(material.querySelectorAll('article').length,data[id].sections.length);assert.ok(material.textContent.includes(data[id].workshop.writing));assert.equal(material.querySelectorAll('details,input,select,button,script,iframe,[role="status"]').length,0);assert.doesNotMatch(material.innerHTML,/\{\{QUIZ_/);
  assert.ok(!material.textContent.includes(data[id].workshop.model));for(const source of data[id].sources||[])assert.ok(material.textContent.includes(source.url));
  if(id==='kunst_3_zeichen_marken')assert.match(material.querySelector('[data-art-brand-gap]').textContent,/Papiervergleich/);
  if(id==='kunst_4_portfolio'){const figures=material.querySelectorAll('[data-art-ad] figure');assert.equal(figures.length,2);assert.equal(figures[0].textContent,figures[1].textContent);assert.equal(figures[0].querySelector('[data-ad-invitation]').style.fontSize,'2rem');assert.equal(figures[1].querySelector('[data-ad-invitation]').style.fontSize,'1rem');assert.equal(figures[1].querySelector('[data-ad-details]').style.fontSize,'2rem');}
  if(id==='kunst_3_foto_medien'){assert.equal(material.querySelectorAll('[data-art-trace-examples] svg').length,2);assert.match(material.textContent,/Deine Spurengeschichte/);const zone=material.querySelector('[data-art-study]');assert.match(zone.textContent,/zweimal auf Papier/);for(const caption of ['Formen auf einer hellen Fläche','Eine Form flieht','Die Formen treffen sich'])assert.ok(zone.textContent.includes(caption));}
  if(id==='kunst_2_raum'){const svg=material.querySelector('[data-art-story-scene] svg');assert.ok(svg);for(const ref of svg.getAttribute('aria-labelledby').split(' '))assert.ok(ad.getElementById(ref));}
  if(id==='kunst_4_koerper_selbstbild')assert.ok(material.querySelector('svg[aria-label]'));
  const include=ad.getElementById('ws-include-material');include.checked=false;include.dispatchEvent(new aw.Event('change'));assert.equal(material.hidden,true);assert.equal(ad.getElementById('ws-solutions').hidden,true);
  const solutions=ad.getElementById('ws-include-solutions');solutions.checked=true;solutions.dispatchEvent(new aw.Event('change'));assert.equal(material.hidden,true);assert.equal(ad.getElementById('ws-solutions').hidden,false);
  include.checked=true;include.dispatchEvent(new aw.Event('change'));assert.equal(material.hidden,false);assert.equal(ad.querySelectorAll('#ws-content > .question-block').length,aw.worksheetQuestions(data[id]).length);art.window.close();
 }
 const dynamic=await page('?topic=math1_8_brueche');assert.equal(dynamic.window.document.querySelector('#ws-print').disabled,false);assert.equal(dynamic.window.document.querySelector('#ws-solution-control').hidden,false);assert.match(dynamic.window.document.querySelector('#ws-description').textContent,/können sich die Übungszahlen ändern/);dynamic.window.close();
 for(const [query,fail,pattern]of [['',false,/Kein Kapitel/],['?topic=unknown',false,/nicht gefunden/],['?topic=waermelehre',true,/nicht geladen/]]){const dom=await page(query,fail);assert.equal(dom.window.document.querySelector('#ws-print').disabled,true);assert.match(dom.window.document.querySelector('#ws-content').textContent,pattern);dom.window.close();}
 console.log('PASS: 24 current worksheet questions with options, solution print toggle, chapter links, comparison symbols, question deduplication, dynamic exercises and missing/failed load states; all art materials, figures, sources, workshop tasks and independent material/solution toggles.');
})().catch(error=>{console.error(error);process.exitCode=1;});
