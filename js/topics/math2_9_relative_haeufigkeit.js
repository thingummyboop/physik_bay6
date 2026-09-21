'use strict';
window.topicInit = function () {
    initRelativeComparison();
    initFrequencyObservation();
    initFrequencyTree();
    document.querySelectorAll('[data-share-diagrams]').forEach((lab,index) => {
        if (lab.dataset.ready) return;
        lab.dataset.ready = 'true';
        const input=lab.querySelector('[data-share-count]');
        const rows=[...lab.querySelectorAll('[data-share-row]')];
        const format=value=>value.toLocaleString(lab.dataset.locale,{maximumFractionDigits:1});
        const update=()=>{
            const n=Number(input.value),part=n/20,angle=part*360;
            const descriptions=rows.map((row,i)=>{
                const count=i?20-n:n,percent=count*5,degrees=count*18;
                const values=[format(count),format(percent)+' %',format(degrees)+'°'];
                [...row.querySelectorAll('td')].forEach((cell,j)=>{
                    const bdi=document.createElement('bdi');bdi.dir='ltr';bdi.textContent=values[j];cell.replaceChildren(bdi);
                });
                return row.querySelector('th').textContent+': \u2066'+format(count)+'/20 = '+format(percent)+' %; '+format(degrees)+'°\u2069';
            });
            input.setAttribute('aria-valuetext',descriptions[0]);
            lab.querySelector('[data-share-status]').textContent=descriptions.join('. ');
            const radians=angle*Math.PI/180,endX=160+90*Math.sin(radians),endY=125-90*Math.cos(radians);
            const pattern='share-hatch-'+index;
            const slice=n===0?'':n===20?'<circle data-share-sector cx="160" cy="125" r="90" fill="#1d4ed8"/>':`<path data-share-sector d="M160 125 L160 35 A90 90 0 ${angle>180?1:0} 1 ${endX} ${endY} Z" fill="#1d4ed8"/>`;
            const labels=[part,1-part].map((p,i)=>{
                if(p<0.1)return '';
                const middle=(i?part+(1-part)/2:part/2)*2*Math.PI;
                return `<text x="${160+55*Math.sin(middle)}" y="${131-55*Math.cos(middle)}" text-anchor="middle" font-size="22" fill="${i?'#172554':'white'}">${i?'B':'A'}</text>`;
            }).join('');
            const picture=lab.querySelector('[data-share-picture]');
            picture.innerHTML=`<svg class="relative-svg" viewBox="0 0 320 295" role="img" style="width:100%;max-width:420px;background:white" direction="ltr"><defs><pattern id="${pattern}" width="8" height="8" patternUnits="userSpaceOnUse"><rect width="8" height="8" fill="#fef3c7"/><path d="M0 0 L8 8" stroke="#92400e" stroke-width="1"/></pattern></defs><circle cx="160" cy="125" r="90" fill="url(#${pattern})"/>${slice}<circle cx="160" cy="125" r="90" fill="none" stroke="#172554"/>${labels}<rect x="20" y="240" width="280" height="28" fill="url(#${pattern})"/><rect data-share-strip x="20" y="240" width="${280*part}" height="28" fill="#1d4ed8"/><rect x="20" y="240" width="280" height="28" fill="none" stroke="#172554"/>${n>=2?`<text x="${20+140*part}" y="260" font-size="22" text-anchor="middle" fill="white">A</text>`:''}${n<=18?`<text x="${20+280*part+140*(1-part)}" y="260" font-size="22" text-anchor="middle" fill="#172554">B</text>`:''}</svg>`;
            picture.querySelector('svg').setAttribute('aria-label',lab.dataset.chartDescription+' '+descriptions.join('. '));
            const sector=picture.querySelector('[data-share-sector]');if(sector)sector.dataset.angle=String(angle);
        };
        input.addEventListener('input',update);
        lab.querySelector('[data-share-reset]').addEventListener('click',()=>{input.value='5';update();});
        update();
    });
}

function initFrequencyTree() {
 document.querySelectorAll('[data-frequency-tree]').forEach(lab=>{
  if(lab.dataset.ready)return;lab.dataset.ready='true';
  const inputs=[...lab.querySelectorAll('[data-tree-input]')];
  const format=n=>n.toLocaleString(lab.dataset.locale,{maximumFractionDigits:1});
  const ratio=(n,total)=>{const percent=n/total*100;return format(n)+'/'+format(total)+(Math.abs(percent*10-Math.round(percent*10))<1e-9?' = ':' ≈ ')+format(percent)+' %';};
  const update=()=>{
   const counts=inputs.map(input=>Number(input.value)),leaves=[counts[0],12-counts[0],counts[1],8-counts[1]];
   lab.querySelectorAll('[data-tree-leaf]').forEach((node,i)=>node.textContent=format(leaves[i]));
   lab.querySelectorAll('[data-tree-within]').forEach((node,i)=>node.textContent=ratio(counts[i],i?8:12));
   lab.querySelectorAll('[data-tree-whole]').forEach((node,i)=>node.textContent=ratio(counts[i],20));
   lab.querySelector('[data-tree-total]').textContent=ratio(counts[0]+counts[1],20);
   inputs.forEach((input,i)=>input.setAttribute('aria-valuetext',ratio(counts[i],i?8:12)));
  };
  inputs.forEach(input=>input.addEventListener('input',update));
  lab.querySelector('[data-tree-reset]').addEventListener('click',()=>{inputs[0].value=6;inputs[1].value=2;update();});update();
 });
}

function relativeNumber(n) { return n.toLocaleString('de-AT',{maximumFractionDigits:1}); }
function relativeRatio(n,total) {
    if(!total)return 'nicht bestimmbar (keine Beobachtungen)';
    let a=n,b=total;while(b){const r=a%b;a=b;b=r;}const divisor=a||1,percent=n/total*100;
    return n+'/'+total+(divisor===1?'':' = '+(n/divisor)+'/'+(total/divisor))+(Math.abs(percent*10-Math.round(percent*10))<1e-9?' = ':' ≈ ')+relativeNumber(percent)+' %';
}
function relativeComparisonModel(a,na,b,nb) {
    if([a,na,b,nb].some(n=>!Number.isInteger(n)||n<0||n>200)||a>na||b>nb)return null;
    return {a,na,b,nb,pa:na?a/na:null,pb:nb?b/nb:null,comparison:na&&nb?Math.sign(a*nb-b*na):null,countMax:Math.max(10,Math.ceil(Math.max(a,b)/10)*10)};
}
function relativeComparisonSvg(m,mode,staticId) {
    const percent=mode==='percent',max=percent?100:m.countMax,id=staticId||'relative-'+mode+'-title';
    const values=percent?[m.pa===null?null:m.pa*100,m.pb===null?null:m.pb*100]:[m.a,m.b];
    return '<svg class="relative-svg" '+(staticId?'data-worksheet-static="true" ':'')+'viewBox="0 0 330 215" role="img" aria-labelledby="'+id+'"><title id="'+id+'">'+(percent?'Relative Bibliotheksanteile':'Absolute Bibliotheksstimmen')+' in Gruppe A und B.</title><g fill="currentColor" font-size="22"><text x="10" y="28">'+(percent?'Bibliotheksanteil in %':'Bibliotheksstimmen')+'</text><text x="30" y="91">A</text><text x="30" y="151">B</text><text x="80" y="207">0</text><text x="195" y="207" text-anchor="middle">'+relativeNumber(max/2)+'</text><text x="310" y="207" text-anchor="end">'+relativeNumber(max)+'</text></g><g stroke="currentColor" fill="none"><path d="M80 52 V177 H310"/>'+[0,.5,1].map(p=>'<path d="M'+(80+230*p)+' 52 V177" opacity=".2"/>').join('')+'</g>'+values.map((v,i)=>v===null?'<text x="100" y="'+(91+60*i)+'" fill="currentColor" font-size="22">keine Daten</text>':'<rect data-relative-bar="'+i+'" x="80" y="'+(67+60*i)+'" width="'+(230*v/max)+'" height="28" fill="'+(i?'#f59e0b':'#60a5fa')+'" stroke="currentColor" stroke-width="2"/>').join('')+'</svg>';
}
function initRelativeComparison() {
    const host=document.querySelector('[data-relative-comparison]');if(!host||host.dataset.bound)return;host.dataset.bound='true';
    const fields=[...host.querySelectorAll('input')],out=host.querySelector('[data-relative-comparison-status]'),view=host.querySelector('[data-relative-comparison-view]');
    function clear(){out.textContent='';view.replaceChildren();fields.forEach(e=>e.removeAttribute('aria-invalid'));}
    function run(){clear();const values=fields.map(e=>/^\d{1,3}$/.test(e.value.trim())?Number(e.value):NaN),m=relativeComparisonModel(...values);if(!m){out.textContent='Gib ganze Anzahlen von 0 bis 200 ein. Die Bibliotheksstimmen dürfen die Gesamtzahl der jeweiligen Gruppe nicht überschreiten.';const invalid=values.findIndex(n=>!Number.isInteger(n)||n<0||n>200),index=invalid>=0?invalid:values[0]>values[1]?0:2;fields[index].setAttribute('aria-invalid','true');fields[index].focus();return;}out.textContent='A: '+relativeRatio(m.a,m.na)+'. B: '+relativeRatio(m.b,m.nb)+'. '+(m.comparison===null?'Für mindestens eine Gruppe fehlen Beobachtungen. Ihre relative Häufigkeit ist deshalb nicht bestimmbar.':m.comparison===0?'Die Anteile sind gleich groß.':m.comparison>0?'Der Anteil ist in A größer.':'Der Anteil ist in B größer.');view.innerHTML='<div class="relative-graphs">'+relativeComparisonSvg(m,'count')+relativeComparisonSvg(m,'percent')+'</div><table class="relative-table relative-detail-table"><caption>Dieselben Antworten in Zahlen</caption><thead><tr><th scope="col">Gruppe</th><th scope="col">Bibliothek / alle</th><th scope="col">Anteil</th></tr></thead><tbody><tr><th scope="row">A</th><td>'+m.a+' / '+m.na+'</td><td>'+(m.pa===null?'nicht bestimmbar':relativeNumber(m.pa*100)+' %')+'</td></tr><tr><th scope="row">B</th><td>'+m.b+' / '+m.nb+'</td><td>'+(m.pb===null?'nicht bestimmbar':relativeNumber(m.pb*100)+' %')+'</td></tr></tbody></table><p>Beide Diagramme beginnen bei 0. Anzahlen und Prozentwerte haben unterschiedliche Einheiten. Prozentwerte in der Tabelle sind bei Bedarf auf eine Nachkommastelle gerundet; die Balken verwenden die ungerundeten Anteile.</p>';view.querySelectorAll('tbody tr').forEach(tr=>tr.querySelectorAll('td').forEach((td,i)=>td.dataset.label=i?'Anteil':'Bibliothek / alle'));}
    fields.forEach(e=>{e.addEventListener('input',clear);e.addEventListener('keydown',event=>{if(event.key==='Enter'){event.preventDefault();run();}});});host.querySelector('[data-relative-comparison-run]').addEventListener('click',run);host.querySelector('[data-relative-comparison-reset]').addEventListener('click',()=>{[6,12,8,20].forEach((v,i)=>fields[i].value=v);clear();fields[0].focus();});
}

const FREQUENCY_OBSERVATION_SERIES=['KKKKKZZZZZKZKZKZKZKZ','ZZZZZKKKKKZKZKZKZKZK','KKZKZZKKKZZKZKZZKZKK','KZKZKZKZKZKZKZKZKZKZ','KKKKKKKKKKKKKKKKKKKK','ZZZZZZZZZZZZZZZZZZZZ'];
function frequencyObservationModel(index,n) {
    if(!Number.isInteger(index)||index<0||index>=FREQUENCY_OBSERVATION_SERIES.length||!Number.isInteger(n)||n<0||n>20)return null;
    const series=FREQUENCY_OBSERVATION_SERIES[index],prefix=series.slice(0,n);let heads=0;const points=[...prefix].map((letter,i)=>{if(letter==='K')heads++;return {n:i+1,heads,ratio:heads/(i+1)};});return {series,prefix,n,heads,ratio:n?heads/n:null,points};
}
function frequencyObservationSvg(m,staticId) {
    const id=staticId||'frequency-observation-title',px=n=>55+n*250/20,py=h=>225-h*170;
    return '<svg class="relative-svg" '+(staticId?'data-worksheet-static="true" ':'')+'viewBox="0 0 330 290" role="img" aria-labelledby="'+id+'"><title id="'+id+'">Beobachteter Kopfanteil im Verlauf; gestrichelt der Modellwert 50 Prozent für eine faire Münze.</title><g stroke="currentColor" fill="none"><path d="M55 45 V225 H308"/><path data-frequency-model-line d="M55 140 H305" stroke-dasharray="7 5" stroke-width="2"/></g><g fill="currentColor" font-size="22"><text x="10" y="28">Kopfanteil in %</text>'+[0,50,100].map(p=>'<text x="46" y="'+(py(p/100)+7)+'" text-anchor="end">'+p+'</text>').join('')+[0,10,20].map(n=>'<text x="'+px(n)+'" y="253" text-anchor="middle">'+n+'</text>').join('')+'<text x="182" y="283" text-anchor="middle">Beobachtungen</text></g>'+(m.points.length?'<polyline data-frequency-line points="'+m.points.map(p=>px(p.n)+','+py(p.ratio)).join(' ')+'" fill="none" stroke="#2563eb" stroke-width="3"/><circle data-frequency-last cx="'+px(m.n)+'" cy="'+py(m.ratio)+'" r="5" fill="#f59e0b" stroke="currentColor"/>':'')+'</svg>';
}
function initFrequencyObservation() {
    const host=document.querySelector('[data-frequency-observation]');if(!host||host.dataset.bound)return;host.dataset.bound='true';const select=host.querySelector('select'),range=host.querySelector('input'),out=host.querySelector('[data-frequency-observation-status]'),view=host.querySelector('[data-frequency-observation-view]');
    function update(){const m=frequencyObservationModel(Number(select.value),Number(range.value));if(!m)return;out.textContent=m.n+' beobachtete Würfe, davon '+m.heads+' mal Kopf: '+relativeRatio(m.heads,m.n)+'. '+(m.n?'Nächster Wurf: Aus dieser Folge nicht sicher vorhersagbar.':'Wähle mindestens eine Beobachtung.');range.setAttribute('aria-valuetext',m.n+' beobachtete Würfe');view.innerHTML='<p><strong>Gelesener Teil der vorgegebenen Reihe:</strong> '+(m.prefix.split('').join(' · ')||'noch keiner')+'</p>'+frequencyObservationSvg(m)+'<p>Die durchgezogene Linie verbindet nur die beobachteten Zwischenstände. Gestrichelt: 50 % als Annahme für eine faire, unabhängig geworfene Münze. Eine Beobachtungsreihe muss diese Linie weder treffen noch sich ihr bei jedem Schritt nähern.</p>';}
    select.addEventListener('change',()=>{range.value='0';update();});range.addEventListener('input',update);host.querySelector('[data-frequency-observation-reset]').addEventListener('click',()=>{select.value='0';range.value='0';update();select.focus();});update();
}

Object.assign(window,{relativeComparisonModel,relativeComparisonSvg,frequencyObservationModel,frequencyObservationSvg,relativeRatio});
