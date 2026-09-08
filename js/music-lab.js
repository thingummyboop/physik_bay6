'use strict';
// Editable labs use eight eighth-note cells in one 4/4 bar; listening clips are authored separately.
const MUSIC_NOTES={rest:0,C4:261.6256,D4:293.6648,E4:329.6276,G4:391.9954,A4:440};
function musicEvents(notes,bpm,pulse){
 const beat=60/bpm,events=[];
 for(let i=0;i<4;i++)events.push({time:i*beat,freq:880,duration:.045,volume:.035,type:'sine'});
 for(let bar=0;bar<2;bar++){
  if(pulse)for(let i=0;i<4;i++)events.push({time:(4+bar*4+i)*beat,freq:i===0?1000:880,duration:.045,volume:.025,type:'sine'});
  notes.forEach((note,i)=>{if(MUSIC_NOTES[note])events.push({time:(4+bar*4+i/2)*beat,freq:MUSIC_NOTES[note],duration:beat*.4,volume:.07,type:null});});
 }
 return{events,duration:12*beat};
}
function initMusicLabs(){
 initMusicListening();
 document.querySelectorAll('[data-music-lab]').forEach(zone=>{
  if(zone.dataset.initialized)return;zone.dataset.initialized='true';
  const make=(tag,text)=>{const e=document.createElement(tag);if(text!==undefined)e.textContent=text;return e;};
  const grid=zone.querySelector('[data-notes]'),status=zone.querySelector('[data-status]'),tempo=zone.querySelector('[data-tempo]'),pulse=zone.querySelector('[data-pulse]'),timbre=zone.querySelector('[data-timbre]');
  const counts=['1','und','2','und','3','und','4','und'],notes=[];
  for(let i=0;i<8;i++){const label=make('label',(i+1)+'. Feld · '+counts[i]),select=make('select');select.setAttribute('aria-label','Feld '+(i+1)+', Zählzeit '+counts[i]);Object.keys(MUSIC_NOTES).forEach(value=>{const opt=make('option',value==='rest'?'Pause':value.replace('4',''));opt.value=value;select.append(opt);});select.value=i%2===0?'C4':'rest';label.append(select);grid.append(label);notes.push(select);}
  let context=null,nodes=[],timer=null,version=0,playing=false;
  const stop=(message='Wiedergabe gestoppt.')=>{version++;clearTimeout(timer);nodes.forEach(({osc,gain})=>{try{osc.stop();}catch{}osc.disconnect();gain.disconnect();});nodes=[];playing=false;zone.querySelector('[data-play]').disabled=false;if(message)status.textContent=message;};
  const describe=()=>{zone.querySelector('[data-pattern]').textContent='Ein Takt in Achteln: '+notes.map((s,i)=>counts[i]+': '+(s.value==='rest'?'Pause':s.value.replace('4',''))).join(' · ')+'. Tempo: '+tempo.value+' Viertelschläge pro Minute.';};
  [...notes,tempo,pulse,timbre].forEach(el=>el.addEventListener('change',()=>{if(playing)stop('Einstellung geändert. Starte die neue Fassung.');describe();}));
  zone.querySelector('[data-play]').addEventListener('click',async()=>{
   window.dispatchEvent(new CustomEvent('sciverse-music-start',{detail:zone}));
   stop('');const current=version;playing=true;zone.querySelector('[data-play]').disabled=true;
   try{
    const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)throw Error('unsupported');
    if(!context||context.state==='closed')context=new Audio();await context.resume();if(version!==current)return;
    const schedule=musicEvents(notes.map(s=>s.value),Number(tempo.value),pulse.checked),start=context.currentTime+.08;
    schedule.events.forEach(e=>{const osc=context.createOscillator(),gain=context.createGain();osc.type=e.type||timbre.value;osc.frequency.value=e.freq;gain.gain.setValueAtTime(0,start+e.time);gain.gain.linearRampToValueAtTime(e.volume,start+e.time+.008);gain.gain.linearRampToValueAtTime(0,start+e.time+e.duration);osc.connect(gain);gain.connect(context.destination);osc.start(start+e.time);osc.stop(start+e.time+e.duration+.01);nodes.push({osc,gain});});
    status.textContent='Vier Schläge zählen ein, dann erklingt dein Takt zweimal. Zähle 1 und 2 und 3 und 4 und.';
    timer=setTimeout(()=>{if(version===current)stop('Fertig. Vergleiche deine Beobachtung mit dem notierten Muster.');},(schedule.duration+.15)*1000);
   }catch{if(version===current)stop('Tonwiedergabe ist hier nicht möglich. Zähle das Muster und klatsche die belegten Felder; die Notation bleibt nutzbar.');}
  });
  zone.querySelector('[data-stop]').addEventListener('click',()=>stop());
  zone.querySelector('[data-clear]').addEventListener('click',()=>{stop('Alle Felder sind Pausen. Setze eigene Töne.');notes.forEach(s=>s.value='rest');describe();});
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&playing)stop('Wiedergabe beim Verlassen der Ansicht gestoppt.');});
  window.addEventListener('pagehide',()=>{stop('');if(context&&context.state!=='closed')context.close().catch(()=>{});});
  window.addEventListener('sciverse-music-start',event=>{if(event.detail!==zone&&playing)stop('Andere Hörquelle gestartet.');});
  describe();
 });
}
function initMusicListening(){
 document.querySelectorAll('audio[data-music-listening]').forEach(clip=>{
  if(clip.dataset.initialized)return;clip.dataset.initialized='true';
  clip.style.width='100%';clip.style.maxWidth='32rem';
  const status=document.createElement('p');status.dataset.listeningStatus='true';status.setAttribute('role','status');clip.after(status);
  clip.addEventListener('play',()=>{status.textContent='';window.dispatchEvent(new CustomEvent('sciverse-music-start',{detail:clip}));});
  clip.addEventListener('error',()=>{status.textContent='Die Hördatei konnte nicht geladen werden. Versuche den WAV-Link oder nutze die Tonfolge als gekennzeichnete Leseaufgabe.';});
  const pause=()=>{if(!clip.paused)clip.pause();};
  window.addEventListener('sciverse-music-start',event=>{if(event.detail!==clip)pause();});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)pause();});
  window.addEventListener('pagehide',pause);
 });
}
window.musicEvents=musicEvents;window.initMusicLabs=initMusicLabs;
