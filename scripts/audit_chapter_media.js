const fs=require('node:fs'),path=require('node:path');
let JSDOM;try{({JSDOM}=require('jsdom'));}catch{({JSDOM}=require('../../qa/node_modules/jsdom'));}
const root=path.join(__dirname,'..'),records=[],videoIssues=[];
for(const language of ['de','en','ar','uk','sr','tr']){
 const data=JSON.parse(fs.readFileSync(path.join(root,'lang',language+'.json'),'utf8'));
 for(const [chapter,topic]of Object.entries(data))for(const section of topic.sections||[]){
  const dom=new JSDOM(section.content||'');
  for(const video of dom.window.document.querySelectorAll('video')){
   if(!video.hasAttribute('controls')||video.hasAttribute('autoplay'))videoIssues.push({language,chapter,section:section.id,issue:'Video must have controls and must not autoplay'});
  }
  for(const node of dom.window.document.querySelectorAll('img[src],video[src],audio[src],source[src],video[poster]')){
   for(const attribute of ['src','poster']){const src=node.getAttribute(attribute);if(!src)continue;
    if(/^(https?:)?\/\//i.test(src)){records.push({language,chapter,section:section.id,tag:node.tagName,src,status:'external-unverified'});continue;}
    if(/^(data:|blob:|#)/i.test(src))continue;
    const clean=decodeURIComponent(src.split(/[?#]/)[0]);const resolved=path.resolve(root,'topics',clean);
    records.push({language,chapter,section:section.id,tag:node.tagName,src,status:fs.existsSync(resolved)?'exists':'missing',path:resolved});
   }
  }dom.window.close();
 }
}
const report={createdAt:new Date().toISOString(),total:records.length,missing:records.filter(r=>r.status==='missing'),videoIssues,externalCount:records.filter(r=>r.status==='external-unverified').length,records};
fs.writeFileSync(path.join(root,'..','chapter-media-audit.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({total:report.total,externalCount:report.externalCount,missing:report.missing,videoIssues},null,2));
process.exitCode=report.missing.length||videoIssues.length?1:0;
