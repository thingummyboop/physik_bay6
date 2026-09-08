const assert=require('node:assert/strict'),fs=require('node:fs');let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const source=fs.readFileSync('js/language-workshop.js','utf8'),base=JSON.parse(fs.readFileSync('lang/de.json','utf8')).englisch_1_basics;
const languages={de:'Die Vorlesestimme',en:'The reading voice',ar:'تعذّر',sr:'Glas za čitanje',tr:'Okuma sesi',uk:'Голос читання'};
for(const [language,message] of Object.entries(languages)){
 const dom=new JSDOM('<div id="sections-container"></div>',{url:'https://example.test/',runScripts:'outside-only'}),w=dom.window,d=w.document;let utterances=[],cancellations=0,throwSpeak=false;
 w.SpeechSynthesisUtterance=function(text){this.text=text;};
 w.speechSynthesis={speak:u=>{if(throwSpeak)throw Error('Unavailable');utterances.push(u);},cancel:()=>{cancellations++;utterances.at(-1)?.onerror?.({error:'canceled'});}};
 w.eval(source);w.buildLanguageWorkshop({...base,contentLanguage:language},'speech-test');
 const controls=d.querySelector('[data-listening-controls]'),[start,stop]=controls.querySelectorAll('button'),status=controls.querySelector('[data-speech-status]'),transcript=d.querySelector('[data-listening-transcript]');
 assert.equal(utterances.length,0);assert.equal(status.textContent,'');assert.equal(transcript.open,false);
 start.click();assert.equal(utterances.length,1);assert.equal(utterances[0].lang,'en-GB');utterances[0].onerror({error:'voice-unavailable'});assert.ok(status.textContent.startsWith(message));assert.equal(transcript.open,false,'Failure never exposes answer text automatically');
 start.click();assert.equal(status.textContent,'');utterances[0].onerror({error:'late-failure'});assert.equal(status.textContent,'','Stale callbacks cannot change the new attempt');
 stop.click();assert.equal(status.textContent,'','Intentional cancellation is not a playback failure');const afterStop=cancellations;utterances[1].onerror({error:'late-canceled'});assert.equal(status.textContent,'');
 start.click();Object.defineProperty(d,'hidden',{configurable:true,value:true});d.dispatchEvent(new w.Event('visibilitychange'));assert.equal(cancellations,afterStop+2);assert.equal(status.textContent,'');
 throwSpeak=true;start.click();assert.ok(status.textContent.startsWith(message),'Synchronous speech failure is visible');throwSpeak=false;
 start.click();assert.equal(status.textContent,'');const latest=utterances.at(-1);latest.onend();const beforeHide=cancellations;w.dispatchEvent(new w.Event('pagehide'));assert.equal(cancellations,beforeHide,'Finished audio needs no cancellation');
 start.click();const activeHide=cancellations;w.dispatchEvent(new w.Event('pagehide'));assert.equal(cancellations,activeHide+1,'Playback stops on later pagehide after returning to a cached page');assert.equal(status.textContent,'');
 const text=transcript.querySelector('p');assert.equal(text.textContent,base.workshop.listen);assert.equal(text.lang,'en-GB');
 dom.window.close();
}
for(const broken of [{},{speak(){}},{speak(){},cancel(){}}]){
 const dom=new JSDOM('<div id="sections-container"></div>',{url:'https://example.test/',runScripts:'outside-only'}),w=dom.window;
 w.speechSynthesis=broken;w.eval(source);w.buildLanguageWorkshop(base,'unsupported');assert.equal(w.document.querySelectorAll('[data-listening-controls] button').length,0);assert.ok(w.document.querySelector('[data-listening-transcript]'));dom.window.close();
}
console.log('PASS: speech errors and retry in six languages, stale callbacks, intentional stop, hidden-page cancellation, completed playback, synchronous failures, transcript access and partial API fallback.');
