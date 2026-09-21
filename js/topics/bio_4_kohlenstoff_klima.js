'use strict';
function topicInit() {
    document.querySelectorAll('[data-carbon-lab]').forEach(zone => {
        if (zone.dataset.initialized) return;
        zone.dataset.initialized='true';
        const path=zone.querySelector('[data-carbon-path]'),sink=zone.querySelector('[data-carbon-sink]'),periods=zone.querySelector('[data-carbon-periods]'),result=zone.querySelector('[data-carbon-result]');
        const inputs={A:[10,10,10,10],B:[10,8,6,4],C:[6,6,6,6]},uptakes={S:[6,6,6,6],W:[6,5,4,3]};
        const signed=n=>n>0?'+'+n:String(n).replace('-','−');
        function clear(){result.replaceChildren();delete result.dataset.invalid;}
        for(const input of [path,sink,periods])input.addEventListener('change',clear);
        const paragraph=text=>{const p=document.createElement('p');p.textContent=text;result.append(p);return p;};
        zone.querySelector('[data-carbon-check]').addEventListener('click',()=>{
            clear();
            const invalid=!['A','B','C'].includes(path.value)?[path,'path','Wähle den Eintragsverlauf.']:!['S','W'].includes(sink.value)?[sink,'sink','Wähle den Aufnahmeverlauf.']:!['1','2','3','4'].includes(periods.value)?[periods,'periods','Wähle die Anzahl der Zeiträume.']:null;
            if(invalid){result.dataset.invalid=invalid[1];result.textContent=invalid[2];invalid[0].focus();return;}
            const count=Number(periods.value),rows=[],stocks=[100];
            for(let i=0;i<count;i++){const input=inputs[path.value][i],uptake=uptakes[sink.value][i],delta=input-uptake,stock=stocks[i]+delta;rows.push([i+1,input,uptake,delta,stock]);stocks.push(stock);}
            const last=rows[rows.length-1],totalIn=rows.reduce((sum,r)=>sum+r[1],0),totalOut=rows.reduce((sum,r)=>sum+r[2],0);
            const heading=document.createElement('h4');heading.textContent=`Verlauf ${path.value}/${sink.value}: ${count} ${count===1?'Zeitraum':'Zeiträume'}`;result.append(heading);
            const final=paragraph(`Anfang 100 E; am Ende ${last[4]} E. Gesamtbilanz: 100 + ${totalIn} − ${totalOut} = ${last[4]} E.`);final.dataset.carbonFinal=String(last[4]);
            const trend=paragraph(`Letzter Schritt: ${signed(last[3])} E. Der Vorrat ${last[3]>0?'steigt':last[3]<0?'sinkt':'bleibt gleich'}. Gegenüber dem Anfang: ${signed(last[4]-100)} E.${last[3]<0&&last[4]>100?' Er sinkt im letzten Schritt, liegt aber noch über dem Anfangswert.':''}`);trend.dataset.carbonTrend=last[3]>0?'up':last[3]<0?'down':'equal';
            const table=document.createElement('table');table.className='bio-data-table carbon-results';
            const caption=document.createElement('caption');caption.textContent='Erfundene Kohlenstoffbilanz: Mengen in E, gleich lange Zeiträume';table.append(caption);
            const labels=['Zeitraum','Eintrag','Aufnahme','Änderung','Vorrat am Ende'],thead=document.createElement('thead'),head=document.createElement('tr');
            labels.forEach(label=>{const th=document.createElement('th');th.scope='col';th.textContent=label;head.append(th);});thead.append(head);table.append(thead);
            const tbody=document.createElement('tbody');for(const row of rows){const tr=document.createElement('tr');row.forEach((value,i)=>{const cell=document.createElement(i?'td':'th');if(i)cell.dataset.label=labels[i];else cell.scope='row';cell.textContent=i===3?signed(value):String(value);cell.dataset.carbonNumber=String(value);tr.append(cell);});tbody.append(tr);}table.append(tbody);result.append(table);
            const figure=document.createElement('figure');figure.className='carbon-chart';const ns='http://www.w3.org/2000/svg',svg=document.createElementNS(ns,'svg');
            svg.setAttribute('viewBox','0 0 300 190');svg.setAttribute('role','img');svg.setAttribute('aria-label','Vorrat in Kohlenstoffeinheiten zu Beginn und nach jedem Zeitraum: '+stocks.join(', ')+'. Achsenausschnitt 98 bis 124 E.');
            const el=(tag,attrs,text)=>{const e=document.createElementNS(ns,tag);for(const[k,v]of Object.entries(attrs))e.setAttribute(k,String(v));if(text!==undefined)e.textContent=text;svg.append(e);return e;};
            const y=value=>160-(value-98)*5;
            for(const value of [100,110,120]){el('line',{x1:48,y1:y(value),x2:248,y2:y(value),stroke:'currentColor','stroke-opacity':'.25'});el('text',{x:3,y:y(value)+5,fill:'currentColor','font-size':20},value);}
            el('path',{d:'M48 30 V160 H248',fill:'none',stroke:'currentColor','stroke-width':1.5});
            for(let i=0;i<=4;i++)el('text',{x:48+i*50,y:182,fill:'currentColor','font-size':20,'text-anchor':'middle'},i);
            el('polyline',{points:stocks.map((v,i)=>(48+i*50)+','+y(v)).join(' '),fill:'none',stroke:'var(--primary)','stroke-width':3,'data-carbon-line':''});
            stocks.forEach((value,i)=>el('circle',{cx:48+i*50,cy:y(value),r:4,fill:'var(--primary)','data-carbon-stock':value}));figure.append(svg);
            const figcaption=document.createElement('figcaption');figcaption.textContent='Waagrecht: vergangene Zeiträume, 0 = Anfang. Senkrecht: Vorrat in E. Ausschnitt von 98 bis 124 E, keine Nullachse und keine Temperaturskala. Die vollständigen Zahlen stehen in der Tabelle.';figure.append(figcaption);result.append(figure);
            paragraph('Die Einträge und Aufnahmen sind vorgegeben. Natürliche Rückkopplungen werden nicht berechnet; das Ergebnis ist keine CO₂- oder Temperaturprognose und kein Nachweis von Netto-null menschlicher Emissionen.');
            result.focus();
        });
        zone.querySelector('[data-carbon-reset]').addEventListener('click',()=>{path.value='A';sink.value='S';periods.value='1';clear();path.focus();});
    });
}
window.topicInit=topicInit;
