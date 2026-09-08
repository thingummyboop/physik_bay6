function topicInit() {
 initStatisticsComparisons();
 document.querySelectorAll('[data-frequency-lab]').forEach(zone=>{
  if(zone.dataset.ready)return;zone.dataset.ready='true';
  const inputs=[...zone.querySelectorAll('[data-frequency]')],status=zone.querySelector('[data-frequency-status]');
  const update=()=>{
   const values=inputs.map(input=>input.value.trim()===''?NaN:Number(input.value));
   const invalid=values.findIndex(value=>!Number.isInteger(value)||value<0||value>20);
   inputs.forEach((input,i)=>input.setAttribute('aria-invalid',String(i===invalid)));
   if(invalid!==-1){status.textContent='Gib für jeden Ort eine ganze Anzahl von 0 bis 20 ein. Das Diagramm zeigt weiterhin die letzten gültigen Daten.';inputs[invalid].focus();return;}
   const names=['Hof','Bibliothek','Spielraum'],total=values.reduce((sum,n)=>sum+n,0);
   const description='Fiktive Befragung: '+names.map((name,i)=>name+' '+values[i]+' Antworten').join(', ')+'. Gesamt: '+total+'. Skala: 0 bis 20 Antworten.';
   const grid=[0,5,10,15,20].map(n=>`<line x1="55" y1="${460-n*20}" x2="460" y2="${460-n*20}" stroke="#94a3b8"/><text x="44" y="${465-n*20}" text-anchor="end">${n}</text>`).join('');
   const bars=values.map((n,i)=>`<rect data-bar="${i}" x="${85+i*135}" y="${460-n*20}" width="60" height="${n*20}" fill="#1d4ed8"/><text x="${115+i*135}" y="${450-n*20}" text-anchor="middle">${n}</text><text x="${115+i*135}" y="485" text-anchor="middle">${names[i]}</text>`).join('');
   zone.querySelector('[data-frequency-chart]').innerHTML=`<svg viewBox="0 0 480 510" role="img" aria-label="${description}" style="width:100%;max-width:540px;background:white;border-radius:8px" xmlns="http://www.w3.org/2000/svg"><g fill="#172554" font-size="15"><text x="55" y="20">Anzahl der Antworten</text>${grid}${bars}</g></svg>`;
   zone.querySelector('[data-frequency-table]').innerHTML='<table><caption>Fiktive Antworten nach Pausenort</caption><thead><tr><th scope="col">Ort</th><th scope="col">Anzahl</th></tr></thead><tbody>'+names.map((name,i)=>`<tr><th scope="row">${name}</th><td>${values[i]}</td></tr>`).join('')+`</tbody><tfoot><tr><th scope="row">Gesamt</th><td>${total}</td></tr></tfoot></table>`;
   status.textContent=description+(total?' Jede gültige Antwort zählt genau einmal.':' Es liegen noch keine Antworten vor.');
  };
  zone.querySelector('[data-frequency-update]').addEventListener('click',update);
  inputs.forEach(input=>input.addEventListener('keydown',event=>{if(event.key==='Enter'){event.preventDefault();update();}}));
  zone.querySelector('[data-frequency-reset]').addEventListener('click',()=>{inputs.forEach((input,i)=>input.value=[4,6,2][i]);update();});update();
 });
}
function initStatisticsComparisons() {
 document.querySelectorAll('[data-statistics-lab]').forEach(zone=>{
  if(zone.dataset.ready)return;zone.dataset.ready='true';
  const slider=zone.querySelector('[data-statistics-value]'),fifth=zone.querySelector('[data-statistics-fifth]');
  const format=n=>n.toLocaleString('de-AT');
  const update=()=>{
   const values=[2,4,4,Number(slider.value)];if(fifth.checked)values.push(6);
   const sorted=values.slice().sort((a,b)=>a-b),n=values.length,sum=values.reduce((a,b)=>a+b,0);
   const left=Math.floor((n-1)/2),right=Math.floor(n/2),median=(sorted[left]+sorted[right])/2,mean=sum/n;
   slider.setAttribute('aria-valuetext',slider.value+' Minuten');
   const marked=sorted.map((v,i)=>i===left||i===right?'<strong>'+v+'</strong>':String(v)).join(', ');
   const medianCalculation=left===right?'Der mittlere Wert an Stelle '+(left+1)+' ist '+format(median):'Die zwei mittleren Werte ergeben ('+sorted[left]+' + '+sorted[right]+') / 2 = '+format(median);
   zone.querySelector('[data-statistics-calculation]').innerHTML='<p>Beobachtungen in Minuten: '+values.join(', ')+'.</p><p>Geordnet: '+marked+'.</p><p>Mittelwert: ('+values.join(' + ')+') / '+n+' = <span data-statistics-mean>'+format(mean)+'</span> Minuten.</p><p>Median: '+medianCalculation+' Minuten.</p>';
   const status=zone.querySelector('[data-statistics-status]');
   status.dataset.mean=String(mean);status.dataset.median=String(median);
   status.textContent=n+' Beobachtungen. Mittelwert '+format(mean)+' Minuten; Median '+format(median)+' Minuten. Minimum '+sorted[0]+', Maximum '+sorted[n-1]+', Spannweite '+(sorted[n-1]-sorted[0])+' Minuten.';
  };
  slider.addEventListener('input',update);fifth.addEventListener('change',update);
  zone.querySelector('[data-statistics-reset]').addEventListener('click',()=>{slider.value=10;fifth.checked=false;update();});update();
 });
}
