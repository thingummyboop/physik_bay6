const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.join(__dirname,'..'),dir=path.join(root,'assets/audio'),manifest=JSON.parse(fs.readFileSync(path.join(dir,'freude-manifest.json')));
assert.equal(manifest.examples.length,3);
const expectedPitch=[64,64,65,67,67,65,64,62,60,60,62,64,64,62,62];
const buffers=[];
for(const [i,item] of manifest.examples.entries()){
 const b=fs.readFileSync(path.join(dir,item.file));buffers.push(b);
 assert.equal(b.toString('ascii',0,4),'RIFF');assert.equal(b.toString('ascii',8,16),'WAVEfmt ');
 assert.equal(b.readUInt16LE(20),1);assert.equal(b.readUInt16LE(22),1);assert.equal(b.readUInt32LE(24),22050);assert.equal(b.readUInt16LE(34),16);
 const frames=(b.length-44)/2;assert.equal(frames,i===2?176400:235200);assert.equal(b.readUInt32LE(40),frames*2);
 assert.equal(crypto.createHash('sha256').update(b).digest('hex'),item.sha256);
 assert.deepEqual(item.notes.map(n=>n.midi),expectedPitch);assert.equal(item.notes.reduce((n,x)=>n+x.durationBeats,0),16);
 assert.deepEqual(item.notes.slice(12).map(n=>n.durationBeats),i===1?[1,1,2]:[1.5,.5,2]);
 assert.equal(b.readInt16LE(44),0);assert.equal(b.readInt16LE(b.length-2),0);
 let peak=0;for(let n=0;n<frames;n++)peak=Math.max(peak,Math.abs(b.readInt16LE(44+2*n)));assert.ok(peak>4000&&peak<=5243);
 // Count rising zero crossings in the middle of each actual PCM tone, independently of generator math.
 for(const note of item.notes){
  const start=Math.round((note.beat+.2*note.durationBeats)*60/item.bpm*22050),end=Math.round((note.beat+.8*note.durationBeats)*60/item.bpm*22050);
  let crossings=0;for(let n=start+1;n<end;n++)if(b.readInt16LE(44+2*(n-1))<=0&&b.readInt16LE(44+2*n)>0)crossings++;
  const measured=crossings*22050/(end-start),expected=440*2**((note.midi-69)/12);assert.ok(Math.abs(measured/expected-1)<.03,item.id+' pitch '+note.midi);
 }
}
const firstThreeBars=44+8*22050*2;
assert.ok(buffers[0].subarray(0,firstThreeBars).equals(buffers[1].subarray(0,firstThreeBars)),'A and B match until the final bar');
assert.ok(!buffers[0].equals(buffers[1]),'B actually changes the recorded rhythm');
const data=JSON.parse(fs.readFileSync(path.join(root,'lang/de.json')));const section=data.musik_1_hoeren.sections.find(s=>s.id==='freude_hoervergleich');
for(const item of manifest.examples)assert.ok(section.content.includes('../assets/audio/'+item.file));
console.log('PASS: three linked local PCM files, durations, sample format, bounded signal, hashes, all 45 measured tone pitches, 16-beat phrases and actual final-bar rhythm difference.');
