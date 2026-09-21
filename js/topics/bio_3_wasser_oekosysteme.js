'use strict';
function topicInit(){
 const rows=[{hour:6,near:4,deep:2},{hour:12,near:7,deep:3},{hour:16,near:9,deep:3},{hour:22,near:6,deep:2}];
 document.querySelectorAll('[data-water-lab]').forEach(zone=>{
  if(zone.dataset.initialized)return;
  zone.dataset.initialized='true';
  const select=zone.querySelector('[data-water-view]'),result=zone.querySelector('[data-water-result]'),show=zone.querySelector('[data-water-show]');
  const chart=zone.querySelector('[data-water-chart]'),table=zone.querySelector('[data-water-table]');
  const x=hour=>48+(hour-6)*20,y=value=>248-value*18;
  const render=()=>{
   const mode=select.value,chosen=mode==='single'?[rows[2]]:rows,both=mode==='depths';
   result.hidden=true;show.setAttribute('aria-expanded','false');show.textContent='Auswertung zeigen';
   zone.querySelector('[data-water-context]').textContent='Erfundene Daten, Stelle P an einem Tag. '+(mode==='single'?'Ein eingeblendeter Messwert.':both?'Acht eingeblendete Messwerte in zwei Tiefen.':'Vier eingeblendete Messwerte bei 0,2 m Tiefe.');
   table.innerHTML='<table class="bio-data-table water-measurements"><caption>Gelöster Sauerstoff in mg/l; Tiefen ab Oberfläche</caption><thead><tr><th scope="col">Uhrzeit</th><th scope="col">0,2 m Tiefe (mg/l)</th><th scope="col">2 m Tiefe (mg/l)</th></tr></thead><tbody>'+chosen.map(r=>`<tr><th scope="row">${String(r.hour).padStart(2,'0')}:00</th><td data-label="0,2 m Tiefe (mg/l)">${r.near}</td><td data-label="2 m Tiefe (mg/l)">${both?r.deep:'nicht eingeblendet'}</td></tr>`).join('')+'</tbody></table>';
   const grid=[0,2,4,6,8,10].map(v=>`<path d="M48 ${y(v)}H378" stroke="#c4ced7"/><text x="36" y="${y(v)+6}" text-anchor="end">${v}</text>`).join('');
   const ticks=rows.map(r=>`<text x="${x(r.hour)}" y="278" text-anchor="middle">${String(r.hour).padStart(2,'0')}</text>`).join('');
   const series=(key,color,dashed)=>`${chosen.length>1?`<polyline data-water-line="${key}" points="${chosen.map(r=>`${x(r.hour)},${y(r[key])}`).join(' ')}" fill="none" stroke="${color}" stroke-width="3" ${dashed?'stroke-dasharray="8 5"':''}/>`:''}${chosen.map(r=>`<circle data-water-point="${key}" data-hour="${r.hour}" cx="${x(r.hour)}" cy="${y(r[key])}" r="5" fill="${color}"/>`).join('')}`;
   chart.innerHTML=`<svg viewBox="0 0 420 315" role="img" aria-label="Sauerstoffwerte nach Tageszeit; alle sichtbaren Werte stehen in der Tabelle"><rect width="420" height="315" rx="8" fill="#f8fbff"/><g fill="#172c42" font-family="Arial,sans-serif" font-size="24"><text x="16" y="27">Sauerstoff (mg/l)</text>${grid}<path d="M48 58V248H378" fill="none" stroke="#172c42"/>${ticks}<text x="210" y="305" text-anchor="middle">Uhrzeit (Stunden)</text>${series('near','#075ca8',false)}${both?series('deep','#862c85',true):''}</g></svg>`;
   result.textContent=mode==='single'?'9 mg/l beschreibt nur die Messung um 16 Uhr bei 0,2 m Tiefe an Stelle P. Andere Zeiten und Tiefen sind in dieser Ansicht nicht sichtbar.':mode==='day'?'Bei 0,2 m liegen die gezeigten Werte zwischen 4 und 9 mg/l: Spannweite 5 mg/l. Ein Nachmittagswert beschreibt die anderen Zeiten nicht. Der Verlauf allein beweist keinen Düngereintrag.':'Um 16 Uhr: 9 mg/l bei 0,2 m, 3 mg/l bei 2 m, Unterschied 6 mg/l. Die acht Werte zeigen zeitliche und räumliche Unterschiede an Stelle P. Ursache, andere Tage, andere Stellen und Trinkbarkeit sind damit nicht bestimmt.';
  };
  select.addEventListener('change',render);
  show.addEventListener('click',()=>{result.hidden=!result.hidden;show.setAttribute('aria-expanded',String(!result.hidden));show.textContent=result.hidden?'Auswertung zeigen':'Auswertung verbergen';});
  zone.querySelector('[data-water-reset]').addEventListener('click',()=>{select.value='single';render();select.focus();});
  render();
 });
}
window.topicInit=topicInit;
