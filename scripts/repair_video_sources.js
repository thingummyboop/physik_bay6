const fs=require('node:fs'),path=require('node:path');
const root=path.join(__dirname,'..');let removed=0,videos=0;
for(const language of ['de','en','ar','uk','sr','tr']){
 const file=path.join(root,'lang',language+'.json'),data=JSON.parse(fs.readFileSync(file,'utf8'));
 for(const topic of Object.values(data))for(const section of topic.sections||[]){
  section.content=(section.content||'').replace(/<video\b[^>]*>[\s\S]*?<\/video>/gi,video=>{
   const sources=[...video.matchAll(/<source\b[^>]*src="([^"]+)"[^>]*>/gi)];
   const exists=src=>!/^https?:/i.test(src)&&fs.existsSync(path.resolve(root,'topics',src.split(/[?#]/)[0]));
   if(sources.some(s=>exists(s[1])))for(const source of sources){if(source[1].startsWith('../assets/videos/')&&!exists(source[1])){video=video.replace(source[0],'');removed++;}}
   video=video.replace(/<video\b([^>]*)>/i,(_,attributes)=>{
    attributes=attributes.replace(/\sautoplay(?:="[^"]*")?/gi,'');
    if(!/\bcontrols\b/i.test(attributes))attributes+=' controls';
    if(!/\bpreload\s*=/i.test(attributes))attributes+=' preload="metadata"';
    return '<video'+attributes+'>';
   });videos++;return video;
  });
 }
 fs.writeFileSync(file,JSON.stringify(data,null,2)+'\n');
}
console.log(JSON.stringify({removedMissingSources:removed,videosWithControls:videos}));
