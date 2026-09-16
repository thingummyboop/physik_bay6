'use strict';
(()=>{
 const euro=new Intl.NumberFormat('de-AT',{minimumFractionDigits:2,maximumFractionDigits:2});
 const fmt=v=>(Math.abs(v-Math.round(v*100)/100)>1e-8?'≈ ':'')+euro.format(v);
 function series(start,delta,rate){
  if(![100,500,1000].includes(start)||![-10,0,10].includes(delta)||![-10,0,10].includes(rate))return null;
  const rows=[];let proportional=start;
  for(let n=0;n<=6;n++){const previous=proportional;if(n)proportional*=1+rate/100;rows.push({n,linear:start+n*delta,proportional,change:n?proportional-previous:null});}
  return rows;
 }
 function svg(start,delta,rate,selected=2){
  const rows=series(start,delta,rate);if(!rows||!Number.isInteger(selected)||selected<0||selected>6)return '';
  const maximum=Math.ceil(Math.max(...rows.flatMap(r=>[r.linear,r.proportional]))/100)*100;
  const x=n=>65+43*n,y=v=>240-200*v/maximum;
  let s='<svg data-growth-svg data-maximum="'+maximum+'" viewBox="0 0 360 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Wachstumsvergleich: Start '+start+' Euro, feste Änderung '+delta+' Euro, prozentuelle Änderung '+rate+' Prozent. Die genauen Werte stehen in der Tabelle." style="background:white;color:#172033;font-family:Arial,sans-serif"><text x="65" y="20" font-size="16" fill="#172033">Wert / Euro</text>';
  for(let i=0;i<=4;i++){const v=i*maximum/4;s+='<path d="M65 '+y(v)+'H323" stroke="#cbd5e0"/><text x="56" y="'+(y(v)+6)+'" text-anchor="end" font-size="16" fill="#172033">'+v+'</text>';}
  s+='<path d="M65 35V240H332" fill="none" stroke="#172033"/>';
  for(let n=0;n<=6;n++)s+='<text x="'+x(n)+'" y="264" text-anchor="middle" font-size="18" fill="#172033">'+n+'</text>';
  s+='<text x="330" y="289" text-anchor="end" font-size="16" fill="#172033">Schritt n</text>';
  for(const key of ['linear','proportional']){
   const color=key==='linear'?'#146885':'#a54810';s+='<polyline data-growth-line="'+key+'" points="'+rows.map(r=>x(r.n)+','+y(r[key])).join(' ')+'" fill="none" stroke="'+color+'" stroke-width="2"'+(key==='proportional'?' stroke-dasharray="6 4"':'')+'/>';
   for(const r of rows){const attr=' data-growth-point="'+key+'" data-n="'+r.n+'" data-value="'+r[key]+'"';s+=key==='linear'?'<circle'+attr+' cx="'+x(r.n)+'" cy="'+y(r[key])+'" r="4" fill="'+color+'"/>':'<rect'+attr+' x="'+(x(r.n)-5)+'" y="'+(y(r[key])-5)+'" width="10" height="10" fill="white" stroke="'+color+'" stroke-width="2"/>';}
   s+='<circle data-growth-selected="'+key+'" cx="'+x(selected)+'" cy="'+y(rows[selected][key])+'" r="10" fill="none" stroke="'+color+'" stroke-width="2"/>';
  }return s+'</svg>';
 }
 function check(){const input=document.getElementById('ans_m310_1'),out=document.getElementById('res_m310_1');if(!input||!out)return;const raw=input.value.trim().replace(/−/g,'-'),value=/^[+-]?(?:\d+(?:[.,]\d+)?|[.,]\d+)$/.test(raw)?Number(raw.replace(',','.')):NaN;
  if(!Number.isFinite(value)){input.setAttribute('aria-invalid','true');out.textContent='Gib eine ganze Zahl oder Dezimalzahl ein, zum Beispiel 1,5.';return;}
  input.removeAttribute('aria-invalid');out.textContent=value===10?'Richtig! 20 % von 50 Euro sind 10 Euro. Der Preis nach dem Rabatt ist 40 Euro.':'Berechne erst 10 % von 50 Euro: Das sind 5 Euro. Verdopple für 20 %. Gefragt ist die Ersparnis, nicht der neue Preis.';
 }
 function init(){
  const input=document.getElementById('ans_m310_1'),feedback=document.getElementById('res_m310_1');if(input&&feedback){input.type='text';input.setAttribute('inputmode','decimal');input.setAttribute('aria-label','Ersparnis in Euro');input.setAttribute('aria-describedby',feedback.id);feedback.setAttribute('role','status');feedback.setAttribute('aria-live','polite');feedback.setAttribute('aria-atomic','true');input.oninput=()=>{feedback.textContent='';input.removeAttribute('aria-invalid');};input.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();check();}};}
  const lab=document.querySelector('[data-growth-lab]');if(!lab||lab.dataset.bound==='true')return;lab.dataset.bound='true';
  const start=lab.querySelector('#growth-start'),delta=lab.querySelector('#growth-delta'),rate=lab.querySelector('#growth-rate'),step=lab.querySelector('#growth-step');
  const draw=()=>{const s=Number(start.value),d=Number(delta.value),p=Number(rate.value),n=Number(step.value),rows=series(s,d,p);if(!rows)return;const r=rows[n];lab.querySelector('#growth-step-value').textContent=n;step.setAttribute('aria-valuetext','Schritt '+n);
   lab.querySelector('#growth-result').textContent='Schritt '+n+': L = '+fmt(r.linear)+' Euro; P = '+fmt(r.proportional)+' Euro. '+(n===0?'Gemeinsamer Startwert, noch keine Veränderung.':'Änderung seit Schritt '+(n-1)+': L '+fmt(d)+' Euro, P '+fmt(r.change)+' Euro.')+(d===0&&p===0?' Beide Reihen bleiben konstant.':'');
   lab.querySelector('[data-growth-plot]').innerHTML=svg(s,d,p,n);
   lab.querySelector('[data-growth-table]').innerHTML='<caption>Alle Werte in Euro; Start '+s+', feste Änderung '+d+', prozentuelle Änderung '+p+' %</caption><thead><tr><th scope="col">Schritt</th><th scope="col">L</th><th scope="col">P</th><th scope="col">Änderung L</th><th scope="col">Änderung P</th></tr></thead><tbody>'+rows.map(r=>'<tr'+(r.n===n?' data-selected="true"':'')+'><th scope="row">'+r.n+(r.n===n?' ←':'')+'</th><td>'+fmt(r.linear)+'</td><td>'+fmt(r.proportional)+'</td><td>'+(r.n?fmt(d):'–')+'</td><td>'+(r.n?fmt(r.change):'–')+'</td></tr>').join('')+'</tbody>';
   const row=n+2;lab.querySelector('[data-growth-formula]').textContent='Im Tabellenblatt unten: F2 = '+s+', G2 = '+d+', H2 = '+p+'. '+(n===0?'Startzellen B2 und C2: =$F$2.':'Für Schritt '+n+': B'+row+' = B'+(row-1)+'+$G$2; C'+row+' = C'+(row-1)+'*(1+$H$2/100).');
  };
  [start,delta,rate].forEach(e=>e.addEventListener('change',draw));step.addEventListener('input',draw);lab.querySelector('[data-growth-reset]').addEventListener('click',()=>{start.value='100';delta.value='10';rate.value='10';step.value='2';draw();start.focus();});draw();
 }
 window.check_m310=check;window.sciverseGrowthSeries=series;window.sciverseGrowthSvg=svg;window.topicInit=init;
})();
