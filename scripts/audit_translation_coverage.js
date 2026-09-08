// Reports actual renderer language selection for every catalog chapter.
// A selectable translation is not proof of linguistic or factual quality.
const fs=require('node:fs'),path=require('node:path');let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
(async()=>{
 const dom=new JSDOM('<!doctype html><html><body></body></html>',{url:'https://example.test/',runScripts:'outside-only'}),w=dom.window;
 await new Promise(r=>setImmediate(r));for(const f of ['curriculum','chapter-revisions','renderer'])w.eval(read('js/'+f+'.js'));
 const de=JSON.parse(read('lang/de.json')),chapters=Object.entries(w.SCIVERSE_CURRICULUM).flatMap(([subject,data])=>data.topics.filter(t=>t.available!==false).map(t=>({...t,subject})));
 const report={checkedAt:new Date().toISOString(),chapters:chapters.length,scope:'Actual selectCurrentTopic result; no certification of translated text, script labels, media or correctness.',languages:{}};
 for(const language of ['en','ar','sr','tr','uk']){
  const translated=JSON.parse(read('lang/'+language+'.json'));
  const entries=chapters.map(t=>{
   const selected=w.selectCurrentTopic(t.id,translated[t.id],de[t.id],language);
   const fallback=!!selected?.languageFallback||selected?.contentLanguage==='de';
   let reason='selected_translation';
   if(!de[t.id])reason='missing_german_source';
   else if(!translated[t.id])reason='missing_translation';
   else if(w.chapterRevision(t.id)>0&&Number(translated[t.id].sourceRevision??0)!==w.chapterRevision(t.id))reason='revision_mismatch';
   else if(selected?.languageFallback)reason='incompatible_structure';
   else if(selected?.contentLanguage==='de')reason='explicit_german_content';
   return {id:t.id,subject:t.subject,fallback,reason};
  });
  const reasons={};entries.forEach(e=>reasons[e.reason]=(reasons[e.reason]||0)+1);
  report.languages[language]={selectedTranslations:entries.filter(e=>!e.fallback&&e.reason==='selected_translation').length,germanFallbacks:entries.filter(e=>e.fallback).length,reasons,entries};
  console.log(language+': '+JSON.stringify({selectedTranslations:report.languages[language].selectedTranslations,germanFallbacks:report.languages[language].germanFallbacks,reasons}));
 }
 fs.writeFileSync(path.join(root,'..','translation-coverage-report.json'),JSON.stringify(report,null,2)+'\n');dom.window.close();
})().catch(error=>{console.error(error);process.exitCode=1;});
