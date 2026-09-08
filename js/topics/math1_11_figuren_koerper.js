function checkRect(){const raw=document.getElementById('rect_input').value.trim(),out=document.getElementById('rect_feedback');out.textContent=!/^\d+$/.test(raw)||!Number.isSafeInteger(Number(raw))?'Gib eine ganze Anzahl Ecken ein.':Number(raw)===4?'Richtig: Ein Rechteck hat vier Ecken.':'Verfolge den Rand und zähle jeden Treffpunkt zweier Seiten genau einmal.';}

function checkK(){const value=document.getElementById('k_select').value,out=document.getElementById('k_feedback');out.textContent=value==='zylinder'?'Richtig: Zwei kreisförmige Grundflächen und eine gekrümmte Mantelfläche passen näherungsweise zur Dose.':value==='kugel'?'Eine Kugel besitzt keine ebenen Kreisflächen. Vergleiche Boden und Deckel der Dose.':'Wähle zuerst ein Körpermodell aus.';}


function topicInit() { initRectangleModel(); initCuboidModel(); initShapeAnswers(); }

function initRectangleModel(){
 document.querySelectorAll('[data-rectangle-lab]').forEach(zone=>{
  if(zone.dataset.rectangleBound)return;zone.dataset.rectangleBound='true';
  const aInput=zone.querySelector('[data-rectangle-a]'),bInput=zone.querySelector('[data-rectangle-b]'),svg=zone.querySelector('[data-rectangle-grid]'),status=zone.querySelector('[data-rectangle-status]');
  const update=()=>{
   const normalize=(input,fallback)=>{let n=Number(input.value);n=Number.isFinite(n)?Math.max(1,Math.min(10,Math.round(n))):fallback;input.value=n;input.setAttribute('aria-valuetext',n+' Zentimeter');return n;};
   const a=normalize(aInput,4),b=normalize(bInput,3),ns='http://www.w3.org/2000/svg';svg.replaceChildren();
   for(let y=0;y<b;y++)for(let x=0;x<a;x++){const cell=document.createElementNS(ns,'rect');Object.entries({x:30+x*28,y:30+y*28,width:28,height:28,fill:'#dbeafe',stroke:'#64748b','data-unit-square':''}).forEach(([k,v])=>cell.setAttribute(k,v));svg.append(cell);}
   const border=document.createElementNS(ns,'rect');Object.entries({x:30,y:30,width:a*28,height:b*28,fill:'none',stroke:'#172554','stroke-width':3,'data-rectangle-border':''}).forEach(([k,v])=>border.setAttribute(k,v));svg.append(border);
   const label=document.createElementNS(ns,'text');label.setAttribute('x','30');label.setAttribute('y','20');label.setAttribute('fill','#172554');label.textContent=a+' cm × '+b+' cm';svg.append(label);
   status.dataset.area=a*b;status.dataset.perimeter=2*(a+b);status.textContent='a = '+a+' cm, b = '+b+' cm. Fläche: '+b+' Reihen mit je '+a+' Quadraten, A = '+a+' · '+b+' = '+a*b+' cm². Umfang: '+a+' + '+b+' + '+a+' + '+b+' = '+2*(a+b)+' cm.';
  };
  aInput.addEventListener('input',update);bInput.addEventListener('input',update);zone.querySelector('[data-rectangle-reset]').addEventListener('click',()=>{aInput.value=4;bInput.value=3;update();});update();
 });
}

function initCuboidModel(){document.querySelectorAll('[data-cuboid-lab]').forEach(zone=>{
 if(zone.dataset.cuboidBound)return;zone.dataset.cuboidBound='true';
 const inputs=['a','b','c'].map(k=>zone.querySelector('[data-cuboid-'+k+']')),net=zone.querySelector('[data-cuboid-net]'),layers=zone.querySelector('[data-cuboid-layers]'),table=zone.querySelector('[data-cuboid-faces]'),status=zone.querySelector('[data-cuboid-status]');
 const element=(tag,attrs,parent,text)=>{const el=document.createElementNS('http://www.w3.org/2000/svg',tag);Object.entries(attrs).forEach(([k,v])=>el.setAttribute(k,v));if(text!==undefined)el.textContent=text;parent.append(el);return el;};
 const update=()=>{const [a,b,c]=inputs.map((input,i)=>{const n=Number(input.value),v=Number.isFinite(n)?Math.max(1,Math.min(6,Math.round(n))):[4,3,2][i];input.value=v;input.setAttribute('aria-valuetext',v+' Zentimeter');return v;});net.replaceChildren();layers.replaceChildren();table.replaceChildren();
 const faces=[['A','Vorne',a,c,0,b],['B','Rechts',b,c,a,b],['C','Hinten',a,c,a+b,b],['D','Links',b,c,2*a+b,b],['E','Oben',a,b,0,0],['F','Unten',a,b,0,b+c]];
 for(const [label,name,width,height,x,y]of faces){element('rect',{x:20+x*16,y:20+y*16,width:width*16,height:height*16,fill:'#dbeafe',stroke:'#172554','data-cuboid-face':label},net);element('text',{x:20+(x+width/2)*16,y:24+(y+height/2)*16,'text-anchor':'middle','font-size':11,fill:'#172554'},net,label);const row=document.createElement('tr');for(const [i,value]of [label,name,width+' cm × '+height+' cm',width*height+' cm²'].entries()){const cell=document.createElement(i===0?'th':'td');cell.textContent=value;row.append(cell);}table.append(row);}
 for(let k=0;k<c;k++){const ox=10+(k%3)*110,oy=25+Math.floor(k/3)*105;element('text',{x:ox,y:oy-7,'font-size':11,fill:'#172554'},layers,'Schicht '+(k+1));for(let y=0;y<b;y++)for(let x=0;x<a;x++)element('rect',{x:ox+x*12,y:oy+y*12,width:12,height:12,fill:'#bfdbfe',stroke:'#64748b','data-unit-cube':k+1},layers);}
 status.dataset.surface=2*(a*b+a*c+b*c);status.dataset.volume=a*b*c;status.textContent='Oberfläche: 2 · ('+a*b+' + '+a*c+' + '+b*c+') = '+2*(a*b+a*c+b*c)+' cm². Volumen: '+c+' Schichten mit je '+a*b+' Würfeln, V = '+a+' · '+b+' · '+c+' = '+a*b*c+' cm³.';
 };inputs.forEach(input=>input.addEventListener('input',update));zone.querySelector('[data-cuboid-reset]').addEventListener('click',()=>{inputs.forEach((input,i)=>input.value=[4,3,2][i]);update();});update();
});}

function initShapeAnswers(){for(const [id,output,check]of [['rect_input','rect_feedback',checkRect],['k_select','k_feedback',checkK]]){const input=document.getElementById(id);if(!input||input.dataset.answerBound)continue;input.dataset.answerBound='true';input.addEventListener('input',()=>document.getElementById(output).textContent='');if(input.tagName==='INPUT')input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();check();}});}}
