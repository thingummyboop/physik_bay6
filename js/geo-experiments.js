'use strict';
function initGeoExperiments(){
 const make=(tag,text)=>{const e=document.createElement(tag);if(text!==undefined)e.textContent=text;return e;};
 document.querySelectorAll('[data-geo-experiment]').forEach(zone=>{
  if(zone.dataset.initialized)return;zone.dataset.initialized='true';
  if(zone.dataset.geoExperiment==='commute'){
   const fields=['a','b','days'].map(key=>zone.querySelector('[data-commute="'+key+'"]'));
   const labels={
    ar:['الفرق: ','المدة الإجمالية للرحلتين متساوية.','الرحلة \u2066A\u2069 تستغرق وقتًا أطول.','الرحلة \u2066B\u2069 تستغرق وقتًا أطول.'],
    sr:['Razlika: ','Oba putovanja ukupno traju jednako.','A zahteva više vremena.','B zahteva više vremena.'],
    de:['Differenz: ','Beide Wege beanspruchen insgesamt gleich viel Zeit.','A beansprucht mehr Zeit.','B beansprucht mehr Zeit.'],
    en:['Difference: ','Both journeys take the same total time.','A takes more time.','B takes more time.'],
    tr:['Fark: ','İki yolculuğun toplam süresi eşit.','A daha fazla zaman alır.','B daha fazla zaman alır.'],
    uk:['Різниця: ','Загальний час обох поїздок однаковий.','A потребує більше часу.','B потребує більше часу.']
   };
   const text=labels[zone.dataset.locale]||labels.de;
   const update=()=>{
    const [a,b,days]=fields.map(field=>Number(field.value));
    fields.forEach(field=>{zone.querySelector('[data-value="'+field.dataset.commute+'"]').textContent=field.value;});
    const totalA=2*a*days,totalB=2*b*days,difference=Math.abs(totalA-totalB);
    const direction=text[totalA===totalB?1:totalA>totalB?2:3];
    const isolate=value=>zone.dataset.locale==='ar'?'\u2066'+value+'\u2069':value;
    zone.querySelector('[data-status]').textContent=isolate('A: '+a+' × 2 × '+days+' = '+totalA+' min')+'. '+isolate('B: '+b+' × 2 × '+days+' = '+totalB+' min')+'. '+text[0]+isolate(difference+' min ('+Math.floor(difference/60)+' h '+difference%60+' min)')+'. '+direction;
   };
   fields.forEach(field=>field.addEventListener('input',update));
   zone.querySelector('[data-reset]').addEventListener('click',()=>{fields.forEach((field,i)=>field.value=[45,15,5][i]);update();});update();
  }
  if(zone.dataset.geoExperiment==='route'){

   const labels={
    ar:{goal:'الهدف',map:'مخطط شبكي افتراضي. الشمال في الأعلى. الموقع {pos}. البداية ⁦A5⁩. الهدف ⁦E1⁩. الخلية ⁦C3⁩ مغلقة بسبب أعمال البناء.',position:'الموقع {pos}. عدد الخطوات: {steps}. المسافة: {distance} متر.',done:'وصلت إلى الهدف. قارن مسارك بأقصر مسار ممكن.',edge:'وصلت إلى حدود المخطط النموذجي.',closed:'الخلية ⁦C3⁩ مغلقة. اختر طريقًا آخر.'},
    sr:{goal:'Cilj',map:'Izmišljeni mrežni plan. Sever je gore. Položaj {pos}. Početak A5. Cilj E1. Gradilište C3 je zatvoreno.',position:'Položaj {pos}. Broj koraka: {steps}. Rastojanje: {distance} m.',done:'Cilj je dostignut. Uporedi svoj put sa najkraćom mogućom rutom.',edge:'Ovde se završava model plana.',closed:'C3 je zatvoreno. Izaberi drugi put.'},
    uk:{goal:'Ціль',map:'Вигаданий сітковий план. Північ угорі. Позиція {pos}. Початок A5. Ціль E1. C3 закрито через будівництво.',position:'Позиція {pos}. Кількість кроків: {steps}. Відстань: {distance} м.',done:'Цілі досягнуто. Порівняй свій маршрут із найкоротшим можливим.',edge:'Це межа модельного плану.',closed:'C3 закрито. Обери інший шлях.'},
    de:{goal:'Ziel',map:'Fiktiver Rasterplan. Norden oben. Standort {pos}. Start A5. Ziel E1. Baustelle C3 ist gesperrt.',position:'Standort {pos}. {steps} Schritte = {distance} Meter.',done:'Ziel erreicht. Vergleiche deinen Weg mit der kürzesten möglichen Route.',edge:'Hier endet der Modellplan.',closed:'C3 ist gesperrt. Wähle einen anderen Weg.'},
    en:{goal:'Destination',map:'Fictional grid map. North is up. Position {pos}. Start A5. Destination E1. Construction site C3 is closed.',position:'Position {pos}. {steps} steps = {distance} metres.',done:'Destination reached. Compare your route with the shortest possible route.',edge:'This is the edge of the model map.',closed:'C3 is closed. Choose another route.'},
    tr:{goal:'Hedef',map:'Kurgusal kareli plan. Kuzey üstte. Konum {pos}. Başlangıç A5. Hedef E1. C3 şantiye nedeniyle kapalı.',position:'Konum {pos}. {steps} adım = {distance} metre.',done:'Hedefe ulaştın. Rotanı mümkün olan en kısa rotayla karşılaştır.',edge:'Model planın sınırına geldin.',closed:'C3 kapalı. Başka bir yol seç.'}
   };
   const text=labels[zone.dataset.locale]||labels.de;
   let x=0,y=4,steps=0;const grid=zone.querySelector('[data-grid]'),status=zone.querySelector('[data-status]');
   grid.dir='ltr';
   grid.style.display='grid';grid.style.gridTemplateColumns='repeat(5,minmax(0,1fr))';grid.style.gap='4px';grid.setAttribute('role','img');
   const render=message=>{
    grid.replaceChildren();
    for(let row=0;row<5;row++)for(let col=0;col<5;col++){
     const name=String.fromCharCode(65+col)+(row+1),cell=make('span',name+(x===col&&y===row?' ●':col===4&&row===0?' '+text.goal:col===2&&row===2?' ×':''));
     cell.style.padding='12px 4px';cell.style.border='1px solid var(--box-border)';cell.style.textAlign='center';grid.append(cell);
    }
    const coordinate=String.fromCharCode(65+x)+(y+1),pos=zone.dataset.locale==='ar'?'\u2066'+coordinate+'\u2069':coordinate,fill=value=>value.replace('{pos}',pos).replace('{steps}',steps).replace('{distance}',steps*100);
    grid.setAttribute('aria-label',fill(text.map));status.textContent=(message?message+' ':'')+fill(text.position)+(x===4&&y===0?' '+text.done:'');
   };
   zone.querySelectorAll('[data-direction]').forEach(button=>button.addEventListener('click',()=>{
    const delta={n:[0,-1],s:[0,1],e:[1,0],w:[-1,0]}[button.dataset.direction],nx=x+delta[0],ny=y+delta[1];
    if(nx<0||nx>4||ny<0||ny>4){render(text.edge);return;}
    if(nx===2&&ny===2){render(text.closed);return;}x=nx;y=ny;steps++;render();
   }));
   zone.querySelector('[data-reset]').addEventListener('click',()=>{x=0;y=4;steps=0;render();});render();
  }
  if(zone.dataset.geoExperiment==='flood'){
   const level=zone.querySelector('[data-water-level]'),move=zone.querySelector('[data-relocate]'),warning=zone.querySelector('[data-warning]'),table=zone.querySelector('[data-flood-rows]'),status=zone.querySelector('[data-status]');
   const update=()=>{
    const water=Number(level.value),heights=move.checked?[6,6,3,4]:[1,2,3,4];let exposed=0;table.replaceChildren();
    heights.forEach((height,i)=>{const wet=water>=height;if(wet)exposed++;const row=make('tr'),name=make('th','Haus '+String.fromCharCode(65+i));name.scope='row';row.append(name,make('td',String(height)),make('td',wet?'Im Modell überflutet':'Im Modell nicht überflutet'));table.append(row);});
    status.textContent=`Wasserstand: ${water} Modelleinheiten. ${exposed} von 4 Häusern im Modell überflutet. `+(warning.checked?'Eine verständliche, rechtzeitige Warnung kann Menschen bei der Vorbereitung helfen. Sie senkt den Wasserstand nicht.':'Ohne Warnung fehlt eine Möglichkeit zur rechtzeitigen Vorbereitung.')+' Die Tabelle zeigt betroffene Standorte, keine Schadenshöhe und keine Vorhersage für echte Orte.';
   };
   [level,move,warning].forEach(e=>e.addEventListener('change',update));
   zone.querySelector('[data-reset]').addEventListener('click',()=>{level.value='3';move.checked=false;warning.checked=false;update();});update();
  }
  if(zone.dataset.geoExperiment==='project'){
   const price=zone.querySelector('[data-project-price]'),batch=zone.querySelector('[data-project-batch]'),status=zone.querySelector('[data-status]');
   const update=()=>{const p=Number(price.value),n=Number(batch.value),demand={1:12,2:8,3:4}[p],sold=Math.min(n,demand),cost=4+n,revenue=p*sold;status.textContent=`Modellnachfrage: ${demand} Stück. Produziert: ${n}. Verkauft: ${sold}. Übrig: ${n-sold}. Einnahmen: ${revenue} €. Kosten: ${cost} €. Ergebnis: ${revenue-cost} €.`+(revenue<cost?' Die Einnahmen decken die Modellkosten nicht.':revenue===cost?' Die Modellkosten sind genau gedeckt.':' Es bleibt ein Überschuss nach den angegebenen Modellkosten.')+' Arbeitszeit ist nicht bezahlt; das ist kein vollständiger Betriebsgewinn. Die Nachfrage ist eine Annahme, keine Vorhersage.';};
   [price,batch].forEach(e=>e.addEventListener('change',update));zone.querySelector('[data-reset]').addEventListener('click',()=>{price.value='2';batch.value='8';update();});update();
  }
  if(zone.dataset.geoExperiment==='recycling'){
   const rate=zone.querySelector('[data-recovery]'),rows=zone.querySelector('[data-recycling-rows]'),status=zone.querySelector('[data-status]');
   const format=n=>n.toLocaleString('de-AT',{maximumFractionDigits:1});
   const update=()=>{let material=100;rows.replaceChildren();for(let cycle=1;cycle<=3;cycle++){material*=Number(rate.value)/100;const row=make('tr'),head=make('th',String(cycle));head.scope='row';row.append(head,make('td',format(material)),make('td',format(100-material)));rows.append(row);}status.textContent=`Nach drei Durchläufen: ${format(material)} von 100 Materialeinheiten im betrachteten Kreislauf. ${format(100-material)} Einheiten nicht zurückgewonnen. `+(Number(rate.value)===100?'100 % ist ein idealer Vergleichsfall, keine Zusage für echte Verfahren. ':'Die Verluste mehrerer Durchläufe summieren sich. ')+'Nicht zurückgewonnen bedeutet nicht, dass Materie verschwindet. Energiebedarf und Qualität werden hier nicht berechnet.';};
   rate.addEventListener('change',update);zone.querySelector('[data-reset]').addEventListener('click',()=>{rate.value='80';update();});update();
  }
  if(zone.dataset.geoExperiment==='purchasing'){
   const money=zone.querySelector('[data-money]'),price=zone.querySelector('[data-unit-price]'),status=zone.querySelector('[data-status]');
   const update=()=>{const cents=Number(money.value),unit=Number(price.value),count=Math.floor(cents/unit),rest=cents-count*unit;status.textContent=`Geldbetrag: ${(cents/100).toFixed(2).replace('.',',')} €. Stückpreis: ${(unit/100).toFixed(2).replace('.',',')} €. Kaufbar: ${count} ganze Hefte. Rest: ${(rest/100).toFixed(2).replace('.',',')} €. Zum Vergleich: Für 20 € zu je 2 € waren 10 Hefte kaufbar. Ein einzelner Heftpreis misst nicht die allgemeine Inflation.`;};
   [money,price].forEach(e=>e.addEventListener('change',update));zone.querySelector('[data-reset]').addEventListener('click',()=>{money.value='2100';price.value='250';update();});update();
  }
  if(zone.dataset.geoExperiment==='population'){
   const fields=['births','deaths','arrivals','departures'].map(key=>zone.querySelector('[data-'+key+']')),status=zone.querySelector('[data-status]');
   const signed=n=>n>0?'+'+n:String(n);
   const update=()=>{const [births,deaths,arrivals,departures]=fields.map(e=>Number(e.value)),natural=births-deaths,migration=arrivals-departures,total=natural+migration;status.textContent=`Geburtenbilanz: ${signed(natural)}. Wanderungsbilanz: ${signed(migration)}. Veränderung: ${signed(total)}. Neuer Bevölkerungsstand: ${1000+total} Personen.`+(total===0?' Der gleiche Gesamtstand bedeutet nicht, dass niemand geboren, gestorben oder umgezogen ist.':'')+' Alle Zahlen gelten für dasselbe fiktive Gebiet und Jahr; keine Prognose für Österreich.';};
   fields.forEach(e=>e.addEventListener('change',update));zone.querySelector('[data-reset]').addEventListener('click',()=>{fields.forEach((e,i)=>e.value=String([10,20,30,10][i]));update();});update();
  }
  if(zone.dataset.geoExperiment==='access'){
   const route=zone.querySelector('[data-access-route]'),time=zone.querySelector('[data-access-time]'),status=zone.querySelector('[data-status]');
   const update=()=>{const bus=route.value==='bus',walk=bus?6:12,ride=bus?12:15,wait=bus?(time.value==='morning'?4:24):5;status.textContent=`Fußwege insgesamt: ${walk} min. Wartezeit: ${wait} min. Fahrt: ${ride} min. Gesamter Weg: ${walk+wait+ride} min. `+'Das Modell gilt nur für diese fiktiven Abfahrtszeitpunkte. Kosten, Barrierefreiheit, Ausfälle und Rückfahrt sind noch nicht bewertet.';};
   [route,time].forEach(e=>e.addEventListener('change',update));zone.querySelector('[data-reset]').addEventListener('click',()=>{route.value='bus';time.value='morning';update();});update();
  }
  if(zone.dataset.geoExperiment==='budget'){
   const texts={
    ar:['النفقات: \u2066{spending}\u2069 يورو. المتبقي: \u2066{left}\u2069 يورو.','تتجاوز الخطة مبلغ 20 يورو المتاح. غيّر اختيارك.','تلتزم الخطة بالميزانية، لكنها لا تترك الاحتياطي المستهدف البالغ 5 يورو.','تترك الخطة احتياطيًا لا يقل عن 5 يورو.'],
    sr:['Izdaci: {spending} €. Preostaje: {left} €.','Plan premašuje raspoloživih 20 €. Promeni izbor.','Plan se uklapa u budžet, ali ne ostavlja planiranu rezervu od 5 €.','Plan ostavlja rezervu od najmanje 5 €.'],
    uk:['Витрати: {spending} €. Залишок: {left} €.','План перевищує доступні 20 €. Зміни свій вибір.','План вкладається в бюджет, але не залишає запланованого резерву 5 €.','План залишає резерв щонайменше 5 €.'],
    de:['Ausgaben: {spending} €. Rest: {left} €.','Der Plan überschreitet die verfügbaren 20 €. Ändere deine Auswahl.','Der Plan passt ins Budget, erreicht aber die geplante Rücklage von 5 € nicht.','Der Plan lässt mindestens 5 € Rücklage übrig.'],
    en:['Spending: €{spending}. Remaining: €{left}.','The plan exceeds the available €20. Change your selection.','The plan fits the budget but does not meet the planned €5 reserve.','The plan leaves a reserve of at least €5.'],
    tr:['Harcama: {spending} €. Kalan: {left} €.','Plan, mevcut 20 € tutarını aşıyor. Seçimini değiştir.','Plan bütçeye uyuyor, ancak hedeflenen 5 € payı ayırmıyor.','Plan en az 5 € ayırmana olanak sağlıyor.']
   };
   const text=texts[zone.dataset.locale]||texts.de;
   const update=()=>{
    const spending=[...zone.querySelectorAll('input:checked')].reduce((n,e)=>n+Number(e.value),0),left=20-spending;
    zone.querySelector('[data-status]').textContent=text[0].replace('{spending}',spending).replace('{left}',left)+' '+text[left<0?1:left<5?2:3];
   };
   zone.querySelectorAll('input').forEach(e=>e.addEventListener('change',update));update();
  }
 });
}
window.initGeoExperiments=initGeoExperiments;
