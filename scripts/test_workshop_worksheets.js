const assert=require('node:assert/strict'),fs=require('fs'),path=require('path');let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const root=path.join(__dirname,'..'),read=file=>fs.readFileSync(path.join(root,file),'utf8'),data=JSON.parse(read('lang/de.json'));
(async()=>{let count=0;
for(const [id,topic]of Object.entries(data).filter(([,c])=>c.workshop)){
 const dom=new JSDOM(read('topics/worksheet.html'),{url:'https://example.test/site/topics/worksheet.html?topic='+id,runScripts:'outside-only'}),w=dom.window,d=w.document;
 w.fetch=async()=>({ok:true,json:async()=>data});w.localStorage.setItem('sciverse_draft_'+id,'PRIVATE DRAFT DO NOT PRINT');w.localStorage.setItem('sciverse_draft_'+id+'_reflection','PRIVATE REFLECTION DO NOT PRINT');
 for(const script of ['curriculum','worksheet_generator','worksheet'])w.eval(read('js/'+script+'.js'));
 await new Promise(resolve=>setImmediate(resolve));
 const task=d.querySelector('[data-worksheet-workshop]');assert.ok(task,id);assert.equal(d.querySelectorAll('[data-worksheet-workshop]').length,1,id);assert.ok(task.textContent.includes(topic.workshop.writing),id);
 assert.equal(task.querySelectorAll('.worksheet-reflection').length,topic.workshop.rubric.length,id);assert.equal(task.querySelectorAll('.answer-lines').length,2*topic.workshop.rubric.length,id);
 for(const text of topic.workshop.rubric)assert.ok(task.textContent.includes(text),id);
 if(topic.workshop.listen)assert.ok(task.textContent.includes(topic.workshop.listen),id);
 assert.ok(!task.textContent.includes(topic.workshop.model),id);assert.ok(!d.body.textContent.includes('PRIVATE DRAFT'));assert.ok(!d.body.textContent.includes('PRIVATE REFLECTION'));
 const material=task.parentElement,toggle=d.querySelector('#ws-include-material'),solutions=d.querySelector('#ws-solutions');assert.equal(material.hidden,false);toggle.checked=false;toggle.dispatchEvent(new w.Event('change'));assert.equal(material.hidden,true);if(solutions)assert.equal(solutions.hidden,true);
 const solutionToggle=d.querySelector('#ws-include-solutions');solutionToggle.checked=true;solutionToggle.dispatchEvent(new w.Event('change'));if(solutions)assert.equal(solutions.hidden,false);assert.equal(material.hidden,true);
 toggle.checked=true;toggle.dispatchEvent(new w.Event('change'));assert.equal(material.hidden,false);if(solutions)assert.equal(solutions.hidden,false);assert.equal(d.querySelector('#ws-print').disabled,false);count++;dom.window.close();
}
console.log('PASS: '+count+' workshop worksheets include practical tasks, criteria and evidence space, listening texts where present, independent print toggles and no private drafts or model answers.');
})().catch(e=>{console.error(e);process.exitCode=1;});
