const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8'),data=JSON.parse(read('lang/de.json'));
(async()=>{
 const catalog=new JSDOM('',{runScripts:'outside-only'});catalog.window.eval(read('js/curriculum.js'));
 const topics=catalog.window.SCIVERSE_CURRICULUM.physik.topics;
 for(const {id} of topics){
  const dom=new JSDOM(read('topics/worksheet.html'),{url:'https://example.test/site/topics/worksheet.html?topic='+id,runScripts:'outside-only'}),w=dom.window,d=w.document;
  // Content-only DOM check; the external formula renderer is exercised by browser_print_math.js.
  w.MathJax={typesetPromise:async()=>{}};
  w.fetch=async()=>({ok:true,json:async()=>data});for(const file of ['curriculum','worksheet_generator','worksheet'])w.eval(read('js/'+file+'.js'));
  await new Promise(resolve=>setImmediate(resolve));
  const material=d.getElementById('ws-physics-material');assert.ok(material,id);assert.equal(d.getElementById('ws-print').disabled,false,id);
  if(id==='sieinheiten'){
   assert.equal(material.querySelectorAll('[data-measurement-protocol] tbody tr').length,3);
   assert.equal(material.querySelectorAll('[data-measurement-analysis] > li').length,4);
   assert.ok(material.querySelectorAll('article')[1].querySelector('[data-measurement-protocol]'));
   const graph=material.querySelector('[data-source-section="sec4"]');
   assert.deepEqual([...graph.querySelectorAll('[data-si-graph-table] tbody tr')].map(row=>[...row.cells].map(c=>Number(c.textContent))),[[0,0],[1,5],[2,20],[3,45],[4,80]]);
   const axes=graph.querySelector('svg[data-worksheet-static="true"]');assert.ok(axes);assert.equal(axes.getAttribute('viewBox'),'0 0 350 225');assert.equal(axes.querySelectorAll('.graphPoint').length,0);
   assert.equal(graph.querySelectorAll('[data-si-graph-tasks] > li').length,4);
   assert.ok(!graph.textContent.includes('Die fünf Punkte sind'));
   assert.match(d.getElementById('ws-solutions').textContent,/32,5 m/);
  }
  const articles=[...material.querySelectorAll('article')];assert.equal(articles.length,data[id].sections.length,id);
  articles.forEach((article,index)=>{
   assert.equal(article.dataset.sourceSection,data[id].sections[index].id||'learning-section-'+index);
   const link=article.querySelector('a');assert.equal(link.hash,'#learning-section-'+index);assert.equal(new URL(link.href).searchParams.get('topic'),id);
   assert.ok(article.textContent.includes(link.href),'URL remains usable on paper');assert.equal(article.querySelectorAll(':scope > .answer-lines').length,3);
  });
  assert.equal(material.querySelectorAll('details,script,style,[style],svg:not([data-worksheet-static="true"]),canvas,img,iframe,video,audio,object,embed,button,input,select,textarea,output,progress,[role="status"],[hidden]').length,0,id);
  assert.doesNotMatch(material.innerHTML,/\{\{QUIZ_/);for(const el of material.querySelectorAll('*'))for(const attr of el.attributes)assert.ok(!/^on/i.test(attr.name));
  const toggle=d.getElementById('ws-include-material');assert.equal(toggle.checked,true);toggle.checked=false;toggle.dispatchEvent(new w.Event('change'));assert.equal(material.hidden,true);toggle.checked=true;toggle.dispatchEvent(new w.Event('change'));assert.equal(material.hidden,false);
  const solutions=d.getElementById('ws-solutions');if(solutions){assert.equal(solutions.hidden,true);const choice=d.getElementById('ws-include-solutions');choice.checked=true;choice.dispatchEvent(new w.Event('change'));assert.equal(solutions.hidden,false);assert.equal(material.hidden,false);toggle.checked=false;toggle.dispatchEvent(new w.Event('change'));assert.equal(solutions.hidden,false);}
  if(id==='optik1'){assert.match(material.textContent,/Eigener Versuch: ein Bild im Karton/);assert.match(material.textContent,/Dein Protokoll/);assert.match(material.textContent,/Transparentpapier/);}
  if(id==='kraft_und_bewegung'){assert.ok(material.querySelector('[data-friction-assumptions]'));assert.match(material.textContent,/Stoppzeit ist Anfangstempo geteilt durch Verzögerung/);assert.match(material.textContent,/links 40 N und rechts 10 N/);assert.match(material.textContent,/Der rechte Hebelarm ist 2 m minus/);assert.equal(material.querySelectorAll('[data-force-pair-protocol] tbody tr').length,3);assert.equal(material.querySelectorAll('[data-force-pair-investigation] li').length,5);assert.match(material.textContent,/erfundene Beispiel auf Papier/);
   assert.equal(material.querySelectorAll('[data-stop-case]').length,4);assert.match(material.textContent,/Veröffentlichungsdatum/);assert.match(material.textContent,/Spielstein/);
   const positions=material.querySelector('[data-source-section="bewegung_ebene"] table');assert.equal(positions.querySelectorAll('tbody tr').length,9);
  }
  if(id==='elektrizitaet'){
   const paper=material.querySelector('.ws-model-alternative');assert.ok(paper);assert.match(paper.textContent,/Papieraufgabe/);assert.equal(paper.querySelectorAll('template').length,0);assert.equal(paper.querySelectorAll('[data-circuit-paper-cases] tbody tr').length,8);
   const cases=[...paper.querySelectorAll('tbody tr')].map(row=>[...row.children].map(cell=>cell.textContent));
   const combinations=new Set(cases.map(row=>row.slice(0,3).join('|')));assert.equal(combinations.size,8);
   for(const type of ['Reihe','Parallel'])for(const a of ['offen','geschlossen'])for(const b of ['offen','geschlossen'])assert.ok(combinations.has([type,a,b].join('|')));
   for(const row of cases)assert.deepEqual(row.slice(3),['…','…','…']);assert.match(paper.textContent,/keine eigenen Messungen/);assert.ok(!paper.querySelector('[data-circuit-status],svg,input,button,select'));
assert.equal(material.querySelectorAll('[data-circuit-investigation] li').length,6);assert.equal(material.querySelectorAll('[data-circuit-observation] tbody tr').length,5);assert.ok(!material.querySelector('[data-circuit-comparison]'));assert.match(material.textContent,/Die Beobachtungsspalte bleibt leer/);assert.ok(solutions.querySelector('.ws-paper-solution'));assert.match(solutions.textContent,/Ist nur S1 offen, bleibt L2 an/);assert.equal(material.querySelectorAll('[data-ohm-comparison] tbody tr').length,3);assert.equal(material.querySelectorAll('[data-ohm-task] li').length,5);assert.ok(!material.querySelector('[data-ohm-solution]'));assert.match(material.textContent,/Begründete Entscheidung/);assert.match(material.textContent,/Erfundenes Vergleichsbeispiel/);assert.equal(material.querySelector('[data-source-section="schutzmassnahmen"] table tbody').children.length,4);assert.equal(material.querySelector('[data-source-section="alltagsgeraet"] table tbody').children.length,5);}
  if(id==='waermelehre'){const task=material.querySelector('[data-source-section="temperatur_messen"]');assert.ok(task);assert.equal(task.querySelectorAll('table tbody tr').length,4);assert.match(task.textContent,/erfundene Übungsdaten/);assert.match(task.textContent,/Anpassung/);}
  if(id==='wetter'){assert.equal(material.querySelectorAll('[data-weather-bulletins] tbody tr').length,3);assert.equal(material.querySelectorAll('[data-rain-comparison] tbody tr').length,2);assert.equal(material.querySelectorAll('[data-warning-investigation] li').length,3);assert.ok(!material.querySelector('[data-rain-model],[data-warning-model]'));assert.equal(material.querySelectorAll('[data-coast-cases] tbody tr').length,3);assert.equal(material.querySelectorAll('[data-coast-investigation] li').length,4);assert.match(material.textContent,/Zwei Temperaturwerte allein/);assert.match(material.textContent,/Ein Wetterprotokoll für unsere Schule/);assert.match(material.textContent,/Erfindet keine fehlenden Messwerte/);}
  if(id==='akustik'){assert.match(material.textContent,/Frage und Vermutung/);assert.match(material.textContent,/keine Tonaufnahme/);}
  if(id==='kraftwerke_energieversorgung'){assert.equal(material.querySelectorAll('[data-plant-offers] tbody tr').length,6);assert.equal(material.querySelectorAll('[data-plant-roles] tbody tr').length,4);assert.equal(material.querySelectorAll('[data-plant-priorities] li').length,3);assert.ok(!material.querySelector('[data-plant-cost-model],[data-plant-decision-model]'));}
  if(id==='strahlung_radioaktivitaet'){assert.equal(material.querySelectorAll('[data-radiation-signals] tbody tr').length,4);assert.equal(material.querySelectorAll('[data-radiation-investigation] li').length,4);assert.ok(material.querySelector('[data-radiation-research-source]'));assert.ok(!material.querySelector('[data-radiation-signal-model]'));}
  if(id==='erde_mond_sonne'){assert.equal(material.querySelectorAll('[data-season-protocol] tbody tr').length,4);assert.equal(material.querySelectorAll('[data-season-investigation] li').length,5);assert.equal(material.querySelectorAll('[data-moon-investigation] li').length,3);}
  if(id==='linsen_spiegel'){assert.equal(material.querySelectorAll('[data-lens-investigation] li').length,7);assert.equal(material.querySelectorAll('[data-lens-observation] tbody tr').length,5);assert.ok(!material.querySelector('[data-lens-investigation-solution]'));assert.match(material.textContent,/Papieralternative ohne Geräte/);assert.equal(material.querySelectorAll('[data-plane-mirror-task] li').length,5);assert.equal(material.querySelectorAll('[data-plane-mirror-protocol] tbody tr').length,3);assert.ok(!material.querySelector('[data-plane-mirror-solution]'));}
  if(id==='energie'){assert.equal(material.querySelectorAll('[data-pendulum-protocol] tbody tr').length,6);assert.match(material.textContent,/10 J = 7 J \+ 3 J/);assert.match(material.textContent,/keine Energieangabe in Joule/);}
  dom.window.close();
 }
 catalog.window.close();console.log('PASS: all 20 physics worksheets include ordered section material, paper URLs, writing space, source/data tasks, no uninitialized media or answer disclosures, and independent material/solution toggles. Print layout still needs browser verification.');
})().catch(error=>{console.error(error);process.exitCode=1;});
