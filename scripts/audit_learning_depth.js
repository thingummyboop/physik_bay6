#!/usr/bin/env node
// Editorial triage, not a correctness or curriculum-completeness certificate.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.join(__dirname,'..'),context={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(root,'js/curriculum.js'),'utf8'),context);
const data=JSON.parse(fs.readFileSync(path.join(root,'lang/de.json'),'utf8'));
const normalize=value=>String(value||'').replace(/\s+/g,' ').trim();
const generic=new Set([
 'Richtig. Du begründest mit dem passenden Fachwissen.',
 'Noch nicht. Prüfe die Fachwörter und die Kernregel im Abschnitt.',
 'Noch nicht. Achte darauf, was im biologischen Zusammenhang wirklich passiert.',
 'Noch nicht. Lies die Kernregel noch einmal und achte auf die Begründung.',
 'Nicht ganz. Lies die Erkl?rung noch einmal genau.',
 'Das passt hier nicht. Achte auf die Bedeutung der Zahlen.',
 'Richtig. Du verbindest Fachwissen mit einer überprüfbaren Begründung.',
 'Noch nicht. Lies die Kernregel und achte auf die Fachwörter im Abschnitt.',
 'Noch nicht. Prüfe, ob die Aussage wirklich biologisch begründet ist.',
 'Richtig. Du begründest mit biologischem Wissen und prüfbaren Hinweisen.',
 'Noch nicht. Prüfe, welche Aussage fachlich passt und welche Begründung fehlt.',
 'Noch nicht. Achte auf Fachwörter, Zusammenhänge und Belege.',
 'Noch nicht. Suche im Abschnitt nach der Kernregel und begründe deine Wahl.',
 'Noch nicht. Gehe einen Schritt zurück: Welche Beobachtung, welches Fachwort oder welche Begründung passt hier?',
 'Richtig.', 'Genau.', 'Nein.'
]);
function questions(node,location=[],out=[]){
 if(!node||typeof node!=='object')return out;
 if(typeof node.question==='string'&&Array.isArray(node.answers))out.push({node,location:location.join('.')});
 for(const [key,value]of Object.entries(node))questions(value,[...location,key],out);
 return out;
}
const chapters=[];
for(const [subject,curriculum]of Object.entries(context.window.SCIVERSE_CURRICULUM)){
 for(const chapter of curriculum.topics.filter(t=>t.available!==false)){
  const topic=data[chapter.id],all=questions(topic),assessed=all.filter(q=>!q.node.practiceOnly),seen=new Map(),duplicates=[],genericFeedback=[];
  for(const {node,location}of assessed){
   const key=JSON.stringify([normalize(node.question),node.answers.map(a=>normalize(a.text)).sort()]);
   if(seen.has(key))duplicates.push({first:seen.get(key),duplicate:location,question:node.question});else seen.set(key,location);
  }
  for(const {node,location}of all)node.answers.forEach((answer,index)=>{
   if(generic.has(normalize(answer.feedback)))genericFeedback.push({location:location+'.answers.'+index,question:node.question,answer:answer.text,feedback:answer.feedback});
  });
  chapters.push({id:chapter.id,subject,title:chapter.title,missingContent:!topic,structuredQuestions:all.length,assessedRecords:assessed.length,distinctAssessedQuestions:seen.size,duplicateCount:duplicates.length,genericFeedbackCount:genericFeedback.length,duplicates,genericFeedback});
 }
}
const subjects=Object.keys(context.window.SCIVERSE_CURRICULUM).map(subject=>{
 const rows=chapters.filter(c=>c.subject===subject);
 return {subject,chapters:rows.length,chaptersWithGenericFeedback:rows.filter(c=>c.genericFeedbackCount).length,genericFeedback:rows.reduce((n,c)=>n+c.genericFeedbackCount,0),duplicateQuestions:rows.reduce((n,c)=>n+c.duplicateCount,0)};
});
const report={createdAt:new Date().toISOString(),scope:'All available curriculum chapters in lang/de.json; structured questions including practice-only exercises.',genericPhrases:[...generic],limitations:['Only the listed exact phrases are detected. Other weak feedback may remain; short feedback may also be supported by surrounding content and needs review.','Duplicate wording is not automatically a bug: the renderer deduplicates assessment questions; repeated source records still warrant editorial review.','No claim about factual correctness, translations, curriculum coverage, text-embedded exercises or visual/interactivity quality.'],subjects,chapters};
fs.writeFileSync(path.join(root,'..','learning-depth-report.json'),JSON.stringify(report,null,2)+'\n');
for(const s of subjects)console.log(`${s.subject}: ${s.chaptersWithGenericFeedback}/${s.chapters} chapters with known generic feedback; ${s.genericFeedback} answers; ${s.duplicateQuestions} duplicate question records.`);
console.log('Editorial review required. Detailed source locations: ../learning-depth-report.json');
