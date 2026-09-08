const assert=require('node:assert/strict'),fs=require('fs'),path=require('path');let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
(async()=>{
 const dom=new JSDOM(read('topics/learning.html'),{url:'https://example.test/topics/learning.html?mode=teach&plan=energie,arbeit',runScripts:'outside-only'}),w=dom.window,d=w.document;
 w.eval(read('js/curriculum.js'));w.eval(read('js/chapter-revisions.js'));
 const results={energie:{contentRevision:w.chapterRevision('energie'),lastPercent:87,passed:true,bestPercent:87}};
 w.localStorage.setItem('sciverse_chapter_quiz_results',JSON.stringify(results));
 w.fetch=async()=>({ok:true,json:async()=>JSON.parse(read('lang/de.json'))});w.eval(read('js/learning.js'));await new Promise(resolve=>setImmediate(resolve));
 assert.equal(d.querySelector('#plan h2').textContent,'Stoffliste für die Klasse');
 assert.equal(d.querySelectorAll('.personal-result').length,0);
 assert.doesNotMatch(d.getElementById('plan').textContent,/87 %|letzten Kapitelcheck/);
 assert.match(d.querySelector('#selected>li .meta').textContent,/Physik/);
 const resource=d.querySelector('#selected>li .plan-chapter-link a');assert.equal(resource.href,'https://example.test/index.html#energie');assert.equal(resource.target,'_top');assert.ok(!resource.href.includes('87'));

 assert.match(d.querySelector('#selected>li .plan-prerequisites').textContent,/Mechanische Arbeit.*erst später eingeplant/);assert.match(d.querySelectorAll('#selected>li')[1].querySelector('.plan-prerequisites').textContent,/Kraft & Bewegung.*nicht in dieser Stoffliste/);assert.deepEqual(JSON.parse(w.localStorage.getItem('sciverse_study_plan')),['energie','arbeit']);
 assert.ok(d.querySelector('#selected>li ul li'));assert.match(d.querySelector('.chapter .primary').textContent,/ansehen/);
 d.querySelector('[data-mode="review"]').click();assert.match(d.querySelector('#selected .personal-result').textContent,/87 %/);
 d.querySelector('[data-focus-key="plan-move-1-energie"]').click();
 assert.match(d.querySelectorAll('#selected>li')[1].querySelector('.plan-prerequisites').textContent,/Mechanische Arbeit.*davor eingeplant/);
 assert.ok(d.querySelector('#plan-progress .personal-result'),'Reorder announcements preserve the print-exclusion wrapper');
 // Inspect actual print rules without pretending JSDOM renders printed pages.
 const style=d.createElement('style');style.textContent=read('css/learning.css');d.head.append(style);
 const printRules=[...style.sheet.cssRules].filter(r=>r.conditionText==='print').flatMap(r=>[...r.cssRules]);
 assert.ok(printRules.some(r=>r.selectorText==='.plan-chapter-link a::after'&&r.style.getPropertyValue('content').includes('attr(href)')));
 assert.ok(printRules.some(r=>r.selectorText==='.personal-result'&&r.style.getPropertyValue('display')==='none'&&r.style.getPropertyPriority('display')==='important'));
 d.getElementById('share').click();assert.ok(!d.getElementById('share-url').value.includes('87'));
 d.querySelector('[data-mode="teach"]').click();assert.equal(d.querySelectorAll('.personal-result').length,0);
 assert.deepEqual(JSON.parse(w.localStorage.getItem('sciverse_chapter_quiz_results')),results,'Mode change preserves personal results');
 dom.window.close();console.log('PASS: teaching mode omits personal scores, retains subject and goals, review restores scores, reordering preserves print exclusions, print CSS excludes results, sharing remains score-free.');
})().catch(error=>{console.error(error);process.exitCode=1;});
