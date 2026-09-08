'use strict';
function solveLineSystem(m1,b1,m2,b2){
 if(m1===m2)return{kind:b1===b2?'same':'parallel'};
 const x=(b2-b1)/(m1-m2),y=m1*x+b1;if(!Number.isFinite(x)||!Number.isFinite(y))return{kind:'limit'};return{kind:'point',x,y};
}
function initSystemLabs(){document.querySelectorAll('[data-system-lab]').forEach(zone=>{
 if(zone.dataset.initialized)return;zone.dataset.initialized='true';
 const fields=['m1','b1','m2','b2'].map(key=>zone.querySelector('[data-'+key+']')),svg=zone.querySelector('svg'),status=zone.querySelector('[data-status]');
 const make=(tag,attrs={},text)=>{const e=document.createElementNS('http://www.w3.org/2000/svg',tag);Object.entries(attrs).forEach(([k,v])=>e.setAttribute(k,v));if(text!==undefined)e.textContent=text;return e;};
 const fmt=n=>n.toLocaleString('de-AT',{maximumFractionDigits:3}),px=x=>230+36*x,py=y=>230-36*y;
 const render=()=>{
  svg.replaceChildren();
  if(fields.some(el=>el.value.trim()===''||!el.validity.valid||!Number.isFinite(Number(el.value)))){status.textContent='Gib für jede Steigung einen Wert von −5 bis 5 und für jeden Achsenabschnitt einen Wert von −10 bis 10 ein.';svg.setAttribute('aria-label','Keine Zeichnung: Eingaben prüfen.');return;}
  const[m1,b1,m2,b2]=fields.map(el=>Number(el.value)),result=solveLineSystem(m1,b1,m2,b2);
  for(let i=-5;i<=5;i++){svg.append(make('line',{x1:px(i),x2:px(i),y1:50,y2:410,stroke:i===0?'#475569':'#d1d5db'}),make('line',{x1:50,x2:410,y1:py(i),y2:py(i),stroke:i===0?'#475569':'#d1d5db'}));if(i!==0)svg.append(make('text',{x:px(i),y:246,'text-anchor':'middle','font-size':11},i),make('text',{x:222,y:py(i)+4,'text-anchor':'end','font-size':11},i));}
  svg.append(make('text',{x:421,y:232},'x'),make('text',{x:232,y:38},'y'));
  // Clip line segments numerically to the square [-5,5]²; no external graph service.
  const segment=(m,b)=>{const points=[];for(const x of [-5,5]){const y=m*x+b;if(y>=-5&&y<=5)points.push([x,y]);}if(m!==0)for(const y of [-5,5]){const x=(y-b)/m;if(x>=-5&&x<=5&&!points.some(p=>Math.abs(p[0]-x)<1e-10&&p[1]===y))points.push([x,y]);}return points;};
  [[m1,b1,'#1d4ed8'],[m2,b2,'#a21caf']].forEach(([m,b,color],i)=>{const points=segment(m,b);if(points.length>=2)svg.append(make('line',{x1:px(points[0][0]),y1:py(points[0][1]),x2:px(points[1][0]),y2:py(points[1][1]),stroke:color,'stroke-width':3,'stroke-dasharray':i?'7 4':'none','data-function':i+1}));});
  const equation=(m,b)=>`y = ${fmt(m)} · x ${b<0?'−':'+'} ${fmt(Math.abs(b))}`;
  let text='I: '+equation(m1,b1)+'. II: '+equation(m2,b2)+'. ';
  if(result.kind==='same')text+='Unendlich viele gemeinsame Lösungen: Die Geraden sind identisch.';
  else if(result.kind==='parallel')text+='Keine gemeinsame Lösung: gleiche Steigung, unterschiedliche Achsenabschnitte.';
  else if(result.kind==='limit')text+='Die Steigungen unterscheiden sich, aber die Schnittpunktrechnung überschreitet hier den Zahlenbereich. Wähle weniger nahe beieinanderliegende Steigungen.';
  else{const visible=Math.abs(result.x)<=5&&Math.abs(result.y)<=5;text+=`Eine gemeinsame Lösung: x ≈ ${fmt(result.x)}, y ≈ ${fmt(result.y)}. Probe: Beide Funktionen liefern bei diesem x denselben y-Wert.`;
   if(visible)svg.append(make('circle',{cx:px(result.x),cy:py(result.y),r:5,fill:'#111827','data-intersection':'true'}));else text+=' Der Schnittpunkt liegt außerhalb des gezeigten Fensters.';
  }
  status.textContent=text;svg.setAttribute('aria-label','Koordinatenfenster von −5 bis 5 auf beiden Achsen. '+text);
 };fields.forEach(el=>el.addEventListener('input',render));zone.querySelectorAll('[data-preset]').forEach(button=>button.addEventListener('click',()=>{const values={one:[2,1,-1,4],none:[1,1,1,3],many:[1,1,1,1]}[button.dataset.preset];fields.forEach((el,i)=>el.value=values[i]);render();}));render();
});}
window.solveLineSystem=solveLineSystem;window.initSystemLabs=initSystemLabs;
