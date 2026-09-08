function calculateStatistics(raw) {
    const tokens = raw.trim().split(/[;\s]+/);
    if (tokens.length < 2 || tokens.length > 20 || tokens.some(t => !/^\d+(?:[.,]\d+)?$/.test(t))) return null;
    const values = tokens.map(t => Number(t.replace(',', '.'))).sort((a,b)=>a-b);
    if (values.some(v=>!Number.isFinite(v)||v<0||v>100)) return null;
    const medianOf = a => a.length%2 ? a[(a.length-1)/2] : (a[a.length/2-1]+a[a.length/2])/2;
    const half=Math.floor(values.length/2), counts=new Map();
    values.forEach(v=>counts.set(v,(counts.get(v)||0)+1));
    const highest=Math.max(...counts.values());
    return {values,mean:values.reduce((s,v)=>s+v,0)/values.length,median:medianOf(values),q1:medianOf(values.slice(0,half)),q3:medianOf(values.slice(Math.ceil(values.length/2))),min:values[0],max:values[values.length-1],modes:[...counts].filter(([,n])=>n===highest).map(([v])=>v),allEqualFrequency:[...counts.values()].every(n=>n===highest)};
}

function renderStatistics() {
    const host=document.querySelector('[data-statistics-lab]');if(!host)return;
    const data=calculateStatistics(host.querySelector('#stats_values').value),status=host.querySelector('[data-stats-status]'),out=host.querySelector('[data-stats-output]');
    out.replaceChildren();
    if(!data){status.textContent='Bitte 2 bis 20 Zahlen von 0 bis 100 eingeben. Trenne Werte durch Leerzeichen oder Semikolon; das Komma ist ein Dezimalzeichen.';return;}
    const f=n=>n.toLocaleString('de-AT',{maximumFractionDigits:3});
    status.textContent='Ausgewertet: '+data.values.length+' Werte. Kennzahlen werden auf höchstens drei Nachkommastellen gerundet.';
    const p=document.createElement('p');p.textContent='Sortiert: '+data.values.map(f).join('; ')+'. Mittelwert: '+f(data.mean)+' min; Median: '+f(data.median)+' min; Spannweite: '+f(data.max-data.min)+' min.';out.append(p);
    const mode=document.createElement('p');mode.textContent=data.allEqualFrequency&&data.modes.length>1?'Modus: Alle verschiedenen Werte kommen gleich häufig vor; kein einzelner Wert sticht hervor.':'Modus: '+data.modes.map(f).join('; ')+' min.';out.append(mode);
    const table=document.createElement('table'),caption=document.createElement('caption');caption.textContent='Fünf Kennzahlen des Boxplots (Minuten)';table.append(caption);
    const head=document.createElement('tr'),row=document.createElement('tr');
    for(const[label,key]of [['Minimum','min'],['Q1','q1'],['Median','median'],['Q3','q3'],['Maximum','max']]){const th=document.createElement('th'),td=document.createElement('td');th.scope='col';th.textContent=label;td.textContent=f(data[key]);head.append(th);row.append(td);}
    const thead=document.createElement('thead'),tbody=document.createElement('tbody');thead.append(head);tbody.append(row);table.append(thead,tbody);out.append(table);
    const ns='http://www.w3.org/2000/svg',svg=document.createElementNS(ns,'svg');svg.setAttribute('viewBox','0 0 600 170');svg.style.width='100%';svg.setAttribute('role','img');svg.setAttribute('aria-label','Boxplot: Minimum '+f(data.min)+', Q1 '+f(data.q1)+', Median '+f(data.median)+', Q3 '+f(data.q3)+', Maximum '+f(data.max)+' Minuten.');
    const lo=Math.max(0,Math.floor(data.min)-1),hi=Math.ceil(data.max)+1,x=v=>40+(v-lo)/(hi-lo)*520;
    const element=(tag,attrs)=>{const e=document.createElementNS(ns,tag);for(const[k,v]of Object.entries(attrs))e.setAttribute(k,v);svg.append(e);return e;};
    element('line',{x1:40,y1:130,x2:560,y2:130,stroke:'currentColor'});
    for(let i=0;i<=4;i++){const v=lo+(hi-lo)*i/4; element('line',{x1:x(v),x2:x(v),y1:126,y2:134,stroke:'currentColor'});const label=element('text',{x:x(v),y:155,'text-anchor':'middle',fill:'currentColor','font-size':13});label.textContent=f(v);}
    element('line',{x1:x(data.min),x2:x(data.max),y1:70,y2:70,stroke:'currentColor','stroke-width':2});
    element('rect',{x:x(data.q1),y:40,width:x(data.q3)-x(data.q1),height:60,fill:'#dbeafe',stroke:'#1d4ed8','stroke-width':2});
    for(const key of ['min','median','max'])element('line',{x1:x(data[key]),x2:x(data[key]),y1:key==='median'?40:55,y2:key==='median'?100:85,stroke:'#1d4ed8','stroke-width':3});
    out.append(svg);
}

function topicInit() {
    const host=document.querySelector('[data-statistics-lab]');if(!host)return;
    host.querySelector('[data-stats-calculate]').onclick=renderStatistics;
    for(const button of host.querySelectorAll('[data-stats-preset]'))button.onclick=()=>{host.querySelector('#stats_values').value=button.dataset.statsPreset==='high'?'2 4 6 8 10 60':'2 4 6 8 10 12';renderStatistics();};
    renderStatistics();
}
