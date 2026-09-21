'use strict';
window.topicInit=function(){
 document.querySelectorAll('[data-origins-lab]').forEach(zone=>{
  if(zone.dataset.initialized)return;zone.dataset.initialized='true';
  // Material intervals in thousands of years before today, not exact species boundaries.
  const species={af:{name:'A. afarensis',old:3850,young:2950},er:{name:'H. erectus',old:1890,young:110},ne:{name:'Neandertaler',old:400,young:40},sa:{name:'H. sapiens',old:300,young:0}};
  const pairs=['af-er','af-ne','af-sa','er-ne','er-sa','ne-sa'],times=['0','50','200','1000','3000','3500'],predictions=['both','first','second','neither'];
  const pair=zone.querySelector('[data-origins-pair]'),time=zone.querySelector('[data-origins-time]'),prediction=zone.querySelector('[data-origins-prediction]'),result=zone.querySelector('[data-origins-result]');
  const el=(tag,text)=>{const e=document.createElement(tag);if(text!==undefined)e.textContent=text;return e;},number=n=>(n*1000).toLocaleString('de-AT');
  const clear=()=>{result.replaceChildren();for(const k of ['invalid','correct','actual','overlapOld','overlapYoung'])delete result.dataset[k];};
  for(const input of [pair,time])input.addEventListener('change',()=>{prediction.value='';clear();});prediction.addEventListener('change',clear);
  zone.querySelector('[data-origins-check]').addEventListener('click',()=>{
   clear();for(const[input,allowed,key,message]of [[pair,pairs,'pair','Bitte wähle ein Artenpaar.'],[time,times,'time','Bitte wähle einen Zeitpunkt.'],[prediction,predictions,'prediction','Bitte entscheide zuerst, welche Zeiträume passen.']])if(!allowed.includes(input.value)){result.dataset.invalid=key;result.append(el('p',message));input.focus();return;}
   const [a,b]=pair.value.split('-').map(k=>species[k]),t=Number(time.value),inside=s=>t>=s.young&&t<=s.old,matchA=inside(a),matchB=inside(b),actual=matchA?(matchB?'both':'first'):(matchB?'second':'neither');
   const labels={both:'in beiden Zeiträumen',first:'nur im ersten Zeitraum',second:'nur im zweiten Zeitraum',neither:'in keinem Zeitraum'},old=Math.min(a.old,b.old),young=Math.max(a.young,b.young),overlap=old>=young;
   result.dataset.correct=String(prediction.value===actual);result.dataset.actual=actual;result.dataset.overlapOld=overlap?String(old):'none';result.dataset.overlapYoung=overlap?String(young):'none';
   result.append(el('h4',prediction.value===actual?'Deine Vorhersage passt.':'Prüfe deine Vorhersage noch einmal.'),el('p',number(t)+' Jahre vor heute liegt '+labels[actual]+'.'));
   const list=el('ul');for(const [s,match]of [[a,matchA],[b,matchB]])list.append(el('li',s.name+': '+number(s.old)+' bis '+number(s.young)+' Jahre vor heute. Der gewählte Zeitpunkt liegt '+(match?'innerhalb':'außerhalb')+' dieses Bereichs.'));result.append(list);
   const ns='http://www.w3.org/2000/svg',svg=(tag,attrs,text)=>{const e=document.createElementNS(ns,tag);for(const[k,v]of Object.entries(attrs))e.setAttribute(k,String(v));if(text!==undefined)e.textContent=text;return e;};
   const max=Math.ceil(Math.max(a.old,b.old,t)/500)*500,x=value=>30+260*(1-value/max),figure=el('figure');figure.className='origins-chart';
   const graph=svg('svg',{viewBox:'0 0 320 250',role:'img','aria-label':'Zeitspannen für '+a.name+' und '+b.name+'. Links älter, rechts heute. Gestrichelte Linie: gewählter Zeitpunkt. Alle Werte stehen auch im Text.'});
   graph.append(svg('text',{x:160,y:20,'text-anchor':'middle',fill:'currentColor','font-size':17},'Tausend Jahre vor heute'));
   graph.append(svg('path',{d:'M30 58H290',stroke:'currentColor',fill:'none'}));
   for(let i=0;i<=4;i++){const v=max-i*max/4,px=x(v);graph.append(svg('path',{d:'M'+px+' 53V63',stroke:'currentColor'}),svg('text',{x:px,y:44,'text-anchor':'middle',fill:'currentColor','font-size':16},String(v)));}
   [a,b].forEach((s,i)=>{const y=105+i*70;graph.append(svg('text',{x:20,y:y-15,fill:'currentColor','font-size':18},s.name),svg('rect',{x:x(s.old),y,width:x(s.young)-x(s.old),height:18,fill:'currentColor','data-origins-bar':i}));});
   graph.append(svg('path',{d:'M'+x(t)+' 53V65M'+x(t)+' 101V127M'+x(t)+' 171V197',stroke:'currentColor','stroke-width':2,'stroke-dasharray':'4 3','data-origins-marker':t}),svg('text',{x:160,y:235,'text-anchor':'middle',fill:'currentColor','font-size':17},'Gewählter Zeitpunkt: '+t));
   figure.append(graph,el('figcaption','Maßstab dieser Ansicht: '+number(max)+' Jahre bis heute. Er passt sich dem Artenpaar und Zeitpunkt an. Balken = Materialzeiträume; gestrichelt = gewählter Zeitpunkt.'));result.append(figure);
   const shared=el('p');shared.dataset.originsOverlap='true';shared.textContent=overlap?'Gemeinsamer Materialbereich: '+number(old)+' bis '+number(young)+' Jahre vor heute, rechnerisch '+number(old-young)+' Jahre.':'Die beiden Materialzeiträume haben keinen gemeinsamen Bereich.';result.append(shared);
   result.append(el('p','Der Zeitpunktvergleich und die Überschneidung der gesamten Intervalle sind zwei verschiedene Fragen. Die angenäherten Zeitspannen belegen allein weder eine Begegnung am selben Ort noch direkte Abstammung. Neue Funde können ihre Grenzen verändern.'));result.focus();
  });
  zone.querySelector('[data-origins-reset]').addEventListener('click',()=>{pair.value='ne-sa';time.value='200';prediction.value='';clear();pair.focus();});
 });
};
