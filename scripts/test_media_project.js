const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{JSDOM}=require('jsdom');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8'),html=read('examples/medienprojekt.html');
function open(source=html,url='https://example.test/examples/medienprojekt.html'){
  return new JSDOM(source,{url,runScripts:'dangerously',beforeParse(w){Object.defineProperty(w,'localStorage',{get(){throw Error('Storage unavailable');}});}});
}
const dom=open(),w=dom.window,d=w.document;
const set=(id,value)=>{const e=d.getElementById(id);e.value=value;e.dispatchEvent(new w.Event('input',{bubbles:true}));};
const values=doc=>Object.fromEntries([...doc.querySelectorAll('input,textarea,select')].map(e=>[e.id,e.value]));
assert.equal(d.querySelectorAll('script[src],img,iframe,link[rel=stylesheet]').length,0);
for(const e of d.querySelectorAll('input,textarea,select'))assert.equal(e.labels.length,1,e.id);
for(const variant of ['a','b']){
  const svg=d.querySelector('#poster-'+variant+' svg');
  assert.equal(svg.querySelectorAll('rect').length,9);
  assert.deepEqual([...svg.querySelectorAll('circle')].map(e=>e.dataset.cell),['1,2','1,3','2,1','3,1']);
  assert.match(svg.getAttribute('aria-label'),/Zeile 3 Spalte 1/);
}
for(const focus of ['idea','plan'])for(const size of ['2','2.6'])for(const palette of ['blau','wald','beere']){
  for(const variant of ['a','b']){
    set('focus-'+variant,focus);set('size-'+variant,size);set('palette-'+variant,palette);
    const poster=d.getElementById('poster-'+variant);
    assert.equal(poster.dataset.focus,focus);assert.equal(poster.dataset.palette,palette);assert.equal(poster.style.getPropertyValue('--title'),size+'rem');
    assert.deepEqual([...poster.querySelectorAll('[data-copy]')].map(e=>e.textContent),['headline','intro','facts','caption','invitation'].map(id=>d.getElementById(id).value));
  }
}
const payload='Eigener Entwurf: <img src=x onerror="window.attack=1"> & </textarea><script>window.attack=1</script> – äß';
set('headline',payload);set('intro','Unsere Einladung\nEine zweite Zeile.');set('notes','Interne Rollen und Beobachtungen – nicht auf dem Plakat.');
set('palette-a','wald');set('palette-b','beere');set('focus-a','idea');set('focus-b','plan');set('chosen','b');
const saved=w.workspaceHTML(),restored=open(saved,'file:///rasterstation-arbeitsdatei.html'),rd=restored.window.document;
assert.deepEqual(values(rd),values(d));assert.equal(rd.querySelectorAll('script').length,1);assert.equal(rd.querySelectorAll('img').length,0);assert.equal(restored.window.attack,undefined);
assert.equal(rd.getElementById('chapter-link').href,'https://thingummyboop.github.io/physik_bay6/index.html#dgb8_produktion');
assert.equal(rd.querySelectorAll('svg').length,2);assert.equal(rd.querySelectorAll('circle').length,8);
for(const variant of ['a','b']){
  const result=new JSDOM(w.posterHTML(variant)),doc=result.window.document;
  assert.equal(doc.querySelectorAll('script,input,select,textarea,button,img').length,0);
  assert.equal(doc.querySelectorAll('article').length,1);
  assert.equal(doc.querySelector('[data-copy="headline"]').textContent,payload);
  assert.equal(doc.querySelector('.poster').dataset.palette,variant==='a'?'wald':'beere');
  assert.equal(doc.querySelectorAll('circle').length,4);
  assert.ok(!doc.body.textContent.includes('Interne Rollen'));
  assert.match(doc.body.textContent,/Übungsentwurf/);
  result.window.close();
}
d.getElementById('show-preview').click();assert.equal(d.activeElement.id,'preview-title');
restored.window.close();dom.window.close();
(async()=>{
  const data=JSON.parse(read('lang/de.json')),chapter=data.dgb8_produktion,source=new JSDOM(chapter.sections[3].content),sd=source.window.document;
  assert.equal(chapter.sections.length,5);assert.equal(chapter.sections[3].id,'medienprojekt');
  assert.equal(sd.querySelectorAll('[data-media-milestones] > li').length,6);
  assert.equal(sd.querySelectorAll('[data-media-protocol] tbody tr').length,5);
  assert.equal(sd.querySelectorAll('[data-media-criteria] > li').length,5);
  assert.deepEqual([...sd.querySelectorAll('[data-media-grid] tbody tr')].map(row=>[...row.querySelectorAll('td')].map(e=>e.textContent)),[['·','●','●'],['●','·','·'],['●','·','·']]);
  source.window.close();
  const paper=new JSDOM(read('topics/worksheet.html'),{url:'https://example.test/topics/worksheet.html?topic=dgb8_produktion',runScripts:'outside-only'}),pw=paper.window,pd=pw.document;
  pw.fetch=async()=>({ok:true,json:async()=>data});for(const file of ['curriculum','chapter-revisions','worksheet_generator','worksheet'])pw.eval(read('js/'+file+'.js'));
  await new Promise(resolve=>setImmediate(resolve));
  const material=pd.getElementById('ws-dgb-material');
  assert.equal(material.querySelectorAll('[data-media-milestones] > li').length,6);
  assert.equal(material.querySelectorAll('[data-media-grid] tbody tr').length,3);
  assert.equal(material.querySelectorAll('[data-media-protocol] tbody tr').length,5);
  assert.match(material.querySelector('[data-media-paper]').textContent,/bleiben bis zur Gerätearbeit offen/);
  assert.equal(material.querySelectorAll('[data-media-solution]').length,0);
  assert.equal([...pd.querySelectorAll('#ws-solutions .ws-paper-solution')].filter(e=>e.textContent.includes('Beispiel für eine begründete Überarbeitung')).length,1);
  assert.equal(pd.getElementById('ws-solutions').hidden,true);paper.window.close();
  console.log('PASS: both media variants and 24 design combinations, independently checked raster graphic, shared text, editable offline round trip, literal text safety, separate script-free poster exports, private team notes excluded, focus and complete project paper material/solutions.');
})().catch(error=>{console.error(error);process.exitCode=1;});
