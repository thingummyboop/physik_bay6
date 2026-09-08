'use strict';
// Own sine-wave learning render; no recorded performance or sound library used.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const dir=path.join(__dirname,'../assets/audio');fs.mkdirSync(dir,{recursive:true});
const pitch=[64,64,65,67,67,65,64,62,60,60,62,64,64,62,62];
const original=[...Array(12).fill(1),1.5,.5,2],variant=[...Array(12).fill(1),1,1,2];
const examples=[['a',90,original],['b',90,variant],['c',120,original]],rate=22050;
const manifest={description:'Own monophonic sine-wave learning adaptation in C major of the opening four-bar Freude theme from Beethoven Symphony 9, finale. A: dotted rhythm; B: our rhythm alteration; C: A at a faster tempo. Not an orchestral recording or critical edition.',sampleRate:rate,examples:[]};
for(const [id,bpm,durations] of examples){
 let beat=0;const notes=pitch.map((midi,i)=>{const n={midi,beat,durationBeats:durations[i]};beat+=durations[i];return n;});
 const seconds=beat*60/bpm,frames=Math.round(seconds*rate),buffer=Buffer.alloc(44+frames*2);
 buffer.write('RIFF');buffer.writeUInt32LE(buffer.length-8,4);buffer.write('WAVEfmt ',8);buffer.writeUInt32LE(16,16);buffer.writeUInt16LE(1,20);buffer.writeUInt16LE(1,22);buffer.writeUInt32LE(rate,24);buffer.writeUInt32LE(rate*2,28);buffer.writeUInt16LE(2,32);buffer.writeUInt16LE(16,34);buffer.write('data',36);buffer.writeUInt32LE(frames*2,40);
 for(const note of notes){
  const begin=Math.round(note.beat*60/bpm*rate),end=Math.min(frames,Math.round((note.beat+note.durationBeats)*60/bpm*rate)),freq=440*2**((note.midi-69)/12);
  const length=end-begin,release=Math.min(Math.round(.035*rate),Math.floor(length/4)),attack=Math.min(Math.round(.012*rate),Math.floor(length/4));
  for(let i=0;i<length;i++){
   const envelope=Math.max(0,Math.min(1,i/attack,(length-1-i)/release));
   buffer.writeInt16LE(Math.round(32767*.16*envelope*Math.sin(2*Math.PI*freq*i/rate)),44+2*(begin+i));
  }
 }
 const filename='freude-'+id+'.wav';fs.writeFileSync(path.join(dir,filename),buffer);
 manifest.examples.push({id,file:filename,bpm,beats:beat,seconds,frames,notes,sha256:crypto.createHash('sha256').update(buffer).digest('hex')});
}
fs.writeFileSync(path.join(dir,'freude-manifest.json'),JSON.stringify(manifest,null,2)+'\n');
console.log('Generated three original PCM learning renders and timing manifest.');
