const assert=require('node:assert/strict'),fs=require('fs'),path=require('path');
let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8'),de=JSON.parse(read('lang/de.json'));
(async()=>{
 for(const language of ['en','ar','uk','sr','tr']){
  const translated=JSON.parse(read('lang/'+language+'.json'));
  const dom=new JSDOM(read('topics/template.html'),{url:'https://example.test/topics/template.html?topic=waermelehre',runScripts:'outside-only'}),w=dom.window,d=w.document;
  await new Promise(resolve=>setImmediate(resolve));w.localStorage.setItem('physik_lang',language);
  w.fetch=async url=>({ok:true,json:async()=>url.includes('/de.json')?de:translated});
  for(const script of ['curriculum','chapter-revisions','common','core-learning','renderer'])w.eval(read('js/'+script+'.js'));
  await w.renderTopic();
  assert.equal(w.currentChapterQuiz.questions.length,29);
  assert.ok(w.currentChapterQuiz.questions.some(q=>q.question.includes('Temperatur und Wärme richtig')));
  assert.equal(d.querySelector('#sections-container').lang,'de');assert.equal(d.querySelector('#sections-container').dir,'ltr');
  const notice=d.querySelector('[data-content-language-notice]');assert.ok(notice);assert.equal(notice.lang,language);assert.equal(notice.dir,language==='ar'?'rtl':'ltr');
  assert.match(d.querySelector('#topic-subtitle').textContent,/Energieübertragung/);
  const missing=w.selectCurrentTopic('waermelehre',undefined,de.waermelehre,language);assert.equal(missing.languageFallback,true);
  const current={...de.waermelehre,title:'Current translated chapter',sourceRevision:w.chapterRevision('waermelehre'),contentLanguage:language};
  assert.equal(w.selectCurrentTopic('waermelehre',current,de.waermelehre,language).title,current.title);
  const future={...current,sourceRevision:w.chapterRevision('waermelehre')+1};assert.equal(w.selectCurrentTopic('waermelehre',future,de.waermelehre,language).languageFallback,true);
  assert.equal(w.selectCurrentTopic('waermelehre',de.waermelehre,null,'de'),de.waermelehre);
  dom.window.close();
 }
 console.log('PASS: five real language files render current thermal assessment; localized fallback and text direction; missing, stale, current and mismatched source revisions.');
})().catch(error=>{console.error(error);process.exitCode=1;});
