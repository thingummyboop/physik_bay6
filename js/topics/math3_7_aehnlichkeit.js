function checkAehn() {
 const input=document.getElementById('aehn_sel'),feedback=document.getElementById('aehn_feedback');if(!input||!feedback)return;
 feedback.textContent=input.value==='green'?'Richtig: Bei B gilt 8 : 4 = 2 und 4 : 2 = 2. Beide Seiten haben denselben Faktor 2.':input.value==='red'?'Noch nicht: Bei C wären die Faktoren 3 : 4 = 0,75 und 3 : 2 = 1,5. Sie sind verschieden; C ist nicht ähnlich zu A.':'Wähle zuerst Figur B oder Figur C.';
}
function topicInit() {
 initDilationLabs();
 const input=document.getElementById('aehn_sel'),feedback=document.getElementById('aehn_feedback');if(!input||!feedback||input.dataset.bound==='true')return;
 input.dataset.bound='true';input.setAttribute('aria-describedby','aehn_feedback');
 input.addEventListener('change',()=>{feedback.textContent='';});
 input.addEventListener('keydown',event=>{if(event.key==='Enter'){event.preventDefault();checkAehn();}});
 input.closest('.interactive-zone').querySelector('button').onclick=checkAehn;
}
function initDilationLabs(){
 document.querySelectorAll('[data-dilation-lab]').forEach(zone=>{
  if(zone.dataset.ready)return;zone.dataset.ready='true';
  const shape=zone.querySelector('#dilation-shape'),center=zone.querySelector('#dilation-center'),factor=zone.querySelector('#dilation-factor'),xInput=zone.querySelector('#dilation-x'),yInput=zone.querySelector('#dilation-y'),drawing=zone.querySelector('[data-dilation-drawing]'),result=zone.querySelector('[data-dilation-result]'),table=zone.querySelector('[data-dilation-table]');
  const figures={triangle:[[2,1],[4,1],[2,3]],rectangle:[[2,1],[5,1],[5,3],[2,3]]},centers={origin:[0,0],vertex:[2,1],outside:[6,4]},format=n=>n.toLocaleString('de-AT',{maximumFractionDigits:3}),point=p=>'('+p.map(format).join('|')+')';
  let revealed=false;
  const state=()=>{const source=figures[shape.value],z=centers[center.value],k=Number(factor.value);return{source,z,k,target:source.map(p=>p.map((v,i)=>z[i]+k*(v-z[i])))};};
  const el=(tag,text)=>{const node=document.createElement(tag);if(text!==undefined)node.textContent=text;return node;};
  const graph=()=>{
   const{source,z,k,target}=state(),svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 480 390');svg.setAttribute('role','img');svg.setAttribute('aria-label','Zentrische Streckung: Z'+point(z)+', k = '+format(k)+'. '+(revealed?'Original blau durchgezogen, Bild orange gestrichelt; alle Koordinaten stehen in der Tabelle.':'Die blaue Ausgangsfigur und das Zentrum sind eingezeichnet.'));
   const add=(tag,attrs,text)=>{const n=document.createElementNS(svg.namespaceURI,tag);Object.entries(attrs).forEach(([a,v])=>n.setAttribute(a,v));if(text!==undefined)n.textContent=text;svg.append(n);return n;},screen=p=>[50+(p[0]+3)*26,330-(p[1]+3)*26];
   for(let x=-3;x<=11;x++){const sx=screen([x,0])[0];add('line',{x1:sx,y1:44,x2:sx,y2:330,stroke:'#e2e8f0'});add('text',{x:sx,y:349,'text-anchor':'middle','font-size':12,fill:'#475569'},x);}
   for(let y=-3;y<=8;y++){const sy=screen([0,y])[1];add('line',{x1:50,y1:sy,x2:414,y2:sy,stroke:'#e2e8f0'});add('text',{x:36,y:sy+4,'text-anchor':'end','font-size':12,fill:'#475569'},y);}
   const zero=screen([0,0]);add('path',{d:`M50 ${zero[1]}H430M${zero[0]} 330V30`,stroke:'#64748b',fill:'none'});add('text',{x:440,y:zero[1]+5,'font-size':16,fill:'#111827'},'x');add('text',{x:zero[0]-6,y:23,'font-size':16,fill:'#111827'},'y');
   const zs=screen(z);source.forEach((p,i)=>{const end=screen(k>1&&revealed?target[i]:p);add('line',{x1:zs[0],y1:zs[1],x2:end[0],y2:end[1],stroke:'#94a3b8','stroke-dasharray':'3 4','data-dilation-ray':i});});
   add('polygon',{points:source.map(screen).map(p=>p.join(',')).join(' '),fill:'#dbeafe','fill-opacity':0.6,stroke:'#1e40af','stroke-width':2,'data-dilation-original':''});
   if(revealed)add('polygon',{points:target.map(screen).map(p=>p.join(',')).join(' '),fill:'#ffedd5','fill-opacity':0.3,stroke:'#9a3412','stroke-width':3,'stroke-dasharray':'7 4','data-dilation-image':''});
   const groups=new Map();const mark=(p,name)=>{const key=p.join(',');if(!groups.has(key))groups.set(key,{p,names:[]});groups.get(key).names.push(name);};source.forEach((p,i)=>mark(p,'ABCD'[i]));if(revealed)target.forEach((p,i)=>mark(p,'ABCD'[i]+'′'));mark(z,'Z');const occupied=[];
   for(const {p,names}of groups.values()){
    const [sx,sy]=screen(p),text=names.join('/'),width=text.length*9+6,height=20;add('circle',{cx:sx,cy:sy,r:names.includes('Z')?4:3,fill:'#111827'});
    const candidates=[[sx+7,sy-25],[sx+7,sy+7],[sx-width-7,sy-25],[sx-width-7,sy+7],[sx+7,sy+28],[sx-width-7,sy-46]];
    const chosen=candidates.find(([x,y])=>x>=48&&x+width<=470&&y>=27&&y+height<=328&&!occupied.some(r=>x<r.x+r.width&&x+width>r.x&&y<r.y+r.height&&y+height>r.y))||candidates[0];const [x,y]=chosen;occupied.push({x,y,width,height});add('rect',{x,y,width,height,fill:'white','fill-opacity':0.94,rx:2});add('text',{x:x+3,y:y+15,'font-size':15,fill:'#111827','data-dilation-label':''},text);
   }
   drawing.replaceChildren(svg);zone.dataset.revealed=String(revealed);
  };
  const renderTable=()=>{
   table.replaceChildren();if(!revealed)return;const{source,target,k}=state(),t=el('table'),caption=el('caption','Koordinaten der Ausgangs- und Bildfigur'),head=el('thead'),hr=el('tr');for(const text of ['Punkt','Ausgangsfigur','Bildfigur']){const th=el('th',text);th.scope='col';hr.append(th);}head.append(hr);const body=el('tbody');source.forEach((p,i)=>{const tr=el('tr'),th=el('th','ABCD'[i]);th.scope='row';tr.append(th,el('td',point(p)),el('td',point(target[i])));body.append(tr);});t.append(caption,head,body);table.append(t);
   const area=shape.value==='triangle'?2:6;table.append(el('p','Längenfaktor und Umfangsfaktor: '+format(k)+'. Flächenfaktor: '+format(k*k)+'. Ausgangsfläche '+area+' FE → Bildfläche '+format(area*k*k)+' FE. FE bedeutet Flächeneinheiten: Ein Kästchen ist ein Einheitsquadrat.'));
  };
  const clear=()=>{result.textContent='';delete result.dataset.correct;[xInput,yInput].forEach(e=>e.removeAttribute('aria-invalid'));};
  const refresh=()=>{clear();revealed=false;xInput.value='';yInput.value='';const{source,z,k}=state();zone.querySelector('[data-dilation-givens]').textContent=source.map((p,i)=>'ABCD'[i]+point(p)).join(', ')+'. Zentrum Z'+point(z)+', k = '+format(k)+'.';graph();renderTable();};
  const reveal=()=>{revealed=true;graph();renderTable();};
  const check=()=>{
   clear();const inputs=[xInput,yInput],values=inputs.map(input=>{const text=input.value.trim().replace(/^−/,'-');return /^[+-]?\d+(?:[.,]\d+)?$/.test(text)?Number(text.replace(',','.')):NaN;}),bad=values.findIndex(n=>!Number.isFinite(n));
   if(bad>=0){result.textContent='Gib für beide Koordinaten eine Zahl ein. Null, negative Zahlen und Dezimalzahlen mit Komma oder Punkt sind möglich.';inputs[bad].setAttribute('aria-invalid','true');inputs[bad].focus();return;}
   const{source,z,k,target}=state(),correct=values.every((v,i)=>Math.abs(v-target[0][i])<1e-8);reveal();result.dataset.correct=String(correct);result.textContent=(correct?'Der Bildpunkt passt. ':'Vergleiche deinen Punkt mit der Konstruktion. ')+'A′'+point(target[0])+'. Von Z zu A sind die Änderungen '+format(source[0][0]-z[0])+' und '+format(source[0][1]-z[1])+'. Multipliziere diese Änderungen mit '+format(k)+' und gehe von Z'+point(z)+' aus. '+(z[0]===source[0][0]&&z[1]===source[0][1]?'A liegt im Zentrum und bleibt fest.':'');result.focus();
  };
  [shape,center,factor].forEach(e=>e.addEventListener('change',refresh));[xInput,yInput].forEach(e=>{e.addEventListener('input',clear);e.addEventListener('keydown',event=>{if(event.key==='Enter'){event.preventDefault();check();}});});zone.querySelector('[data-dilation-check]').addEventListener('click',check);zone.querySelector('[data-dilation-show]').addEventListener('click',()=>{clear();reveal();result.textContent='Die Konstruktion ist sichtbar. Vergleiche Strahlen, Koordinaten und Flächen; begründe deinen eigenen Lösungsweg.';result.focus();});zone.querySelector('[data-dilation-reset]').addEventListener('click',()=>{shape.value='triangle';center.value='origin';factor.value='2';refresh();shape.focus();});refresh();
 });
}
