const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8');let cases=0;
for(const lang of ['de','en','tr','uk','sr','ar']){
 const chapter=JSON.parse(read('lang/'+lang+'.json')).geo_1_lebenssituationen;
 const dom=new JSDOM(chapter.sections[1].content,{runScripts:'outside-only'}),w=dom.window;
 w.eval(read('js/geo-experiments.js'));w.initGeoExperiments();
 const z=w.document.querySelector('[data-geo-experiment="commute"]'),fields=['a','b','days'].map(k=>z.querySelector('[data-commute="'+k+'"]')),status=z.querySelector('[data-status]');
 for(const a of [1,15,30,45,60])for(const b of [1,15,30,45,60])for(let days=1;days<=5;days++){
  fields.forEach((f,i)=>f.value=[a,b,days][i]);fields[0].dispatchEvent(new w.Event('input'));
  const delta=Math.abs(a-b)*2*days;
  assert.ok(status.textContent.includes('A: '+a+' × 2 × '+days+' = '+a*2*days+' min'));
  assert.ok(status.textContent.includes('B: '+b+' × 2 × '+days+' = '+b*2*days+' min'));
  assert.ok(status.textContent.includes(delta+' min ('+Math.floor(delta/60)+' h '+delta%60+' min)'));
  if(lang==='ar'){
   assert.ok(status.textContent.includes(a===b?'المدة الإجمالية للرحلتين متساوية.':'الرحلة \u2066'+(a>b?'A':'B')+'\u2069 تستغرق وقتًا أطول.'));
   assert.ok(status.textContent.startsWith('\u2066A: '));fields.forEach(f=>assert.equal(f.dir,'ltr'));
  }else{
  assert.ok(status.textContent.includes(a===b?(lang==='sr'?'ukupno traju jednako':lang==='uk'?'час обох поїздок однаковий':lang==='tr'?'toplam süresi eşit':lang==='en'?'same total time':'gleich viel Zeit'):(a>b?'A':'B')+(lang==='sr'?' zahteva više vremena':lang==='uk'?' потребує більше часу':lang==='tr'?' daha fazla zaman alır':lang==='en'?' takes more time':' beansprucht mehr Zeit')));
  }
  fields.forEach(f=>{assert.ok(f.closest('label'));assert.equal(z.querySelector('[data-value="'+f.dataset.commute+'"]').textContent,f.value);});cases++;
 }
 const reset=z.querySelector('[data-reset]');reset.focus();reset.click();assert.deepEqual(fields.map(f=>Number(f.value)),[45,15,5]);assert.ok(status.textContent.includes('300 min (5 h 0 min)'));assert.equal(w.document.activeElement,reset);
 w.initGeoExperiments();fields[0].value=15;fields[0].dispatchEvent(new w.Event('input'));assert.ok(status.textContent.includes('0 min (0 h 0 min)'));
 dom.window.close();
}
console.log('PASS: '+cases+' multilingual commute comparisons, equal/reversed times, hour conversion, labels, reset and repeated initialization.');
