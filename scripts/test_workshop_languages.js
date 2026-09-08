const assert=require('node:assert/strict'),fs=require('fs');let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const cases={de:['Zuordnung prüfen','Ordne zuerst','3 von 3','Entwurf in diesem Browser gespeichert.','Speichern ist hier nicht möglich.'],en:['Check matches','Match all examples first','3 of 3','Draft saved in this browser.','Saving is unavailable here.'],ar:['تحقق من المطابقات','طابق جميع الأمثلة',(3).toLocaleString('ar')+' من '+(3).toLocaleString('ar'),'تم حفظ المسودة','الحفظ غير متاح'],sr:['Proveri povezivanje','Prvo poveži','3 od 3','Nacrt je sačuvan','Čuvanje ovde nije moguće'],tr:['Eşleştirmeleri kontrol et','Önce tüm örnekleri','3 eşleştirmeden 3','Taslak bu tarayıcıya kaydedildi.','Burada kaydetmek mümkün değil.'],uk:['Перевірити відповідності','Спочатку встанови','3 із 3','Чернетку збережено','Збереження тут недоступне']};
(async()=>{for(const [language,expected]of Object.entries(cases)){
 const topic=JSON.parse(fs.readFileSync('lang/'+language+'.json','utf8')).math3_4_flaechensatz;
 const dom=new JSDOM('<div id="sections-container"></div>',{url:'https://example.test/',runScripts:'outside-only'}),w=dom.window;
 w.eval(fs.readFileSync('js/language-workshop.js','utf8'));w.buildLanguageWorkshop(topic,'math3_4_flaechensatz');
 const card=w.document.querySelector('[data-language-workshop]'),button=[...card.querySelectorAll('button')].find(b=>b.textContent===expected[0]);assert.ok(button,language+' button');button.click();assert.ok(card.textContent.includes(expected[1]));
 const selects=[...card.querySelectorAll('select')];assert.equal(w.document.activeElement,selects[0]);
 selects.forEach((s,i)=>s.value=topic.workshop.items[i].answer);button.click();assert.ok(card.textContent.includes(expected[2]),language+": "+[...card.querySelectorAll('[role="status"]')].map(e=>e.textContent).join(" | "));
 if(language!=='de')assert.doesNotMatch(card.textContent,/Bitte zuordnen|Zuordnung prüfen|Dein Entwurf|Richtig:|Noch nicht:/);
 const draft=card.querySelector('textarea');draft.value='Test';draft.dispatchEvent(new w.Event('input'));await new Promise(r=>setTimeout(r,380));assert.ok(card.textContent.includes(expected[3]));
 w.Storage.prototype.setItem=()=>{throw Error('Storage disabled');};draft.value='Test 2';draft.dispatchEvent(new w.Event('input'));assert.ok(card.textContent.includes(expected[4]));
 w.buildLanguageWorkshop(topic,'math3_4_flaechensatz');assert.equal(w.document.querySelectorAll('[data-language-workshop]').length,1);dom.window.close();
 }
 // A German replacement chapter must keep German controls even if metadata requests English.
 const dom=new JSDOM('<div id="sections-container"></div>',{url:'https://example.test/',runScripts:'outside-only'}),w=dom.window;w.eval(fs.readFileSync('js/language-workshop.js','utf8'));const topic=JSON.parse(fs.readFileSync('lang/de.json','utf8')).math3_4_flaechensatz;w.buildLanguageWorkshop({...topic,contentLanguage:'en',languageFallback:true},'fallback');assert.ok(w.document.body.textContent.includes('Zuordnung prüfen'));dom.window.close();
 console.log('PASS: workshop controls, incomplete/correct matching, saved/failed drafts and fallback across six languages.');
})().catch(e=>{console.error(e);process.exitCode=1;});
