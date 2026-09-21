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
    for(const[label,key]of [['Minimum','min'],['Q1','q1'],['Median','median'],['Q3','q3'],['Maximum','max']]){const th=document.createElement('th'),td=document.createElement('td');th.scope='col';th.textContent=label;td.dataset.label=label;td.textContent=f(data[key]);head.append(th);row.append(td);}
    const thead=document.createElement('thead'),tbody=document.createElement('tbody');thead.append(head);tbody.append(row);table.append(thead,tbody);out.append(table);
    const ns='http://www.w3.org/2000/svg',svg=document.createElementNS(ns,'svg');svg.setAttribute('viewBox','0 0 600 170');svg.style.width='100%';svg.setAttribute('role','img');svg.setAttribute('aria-label','Boxplot: Minimum '+f(data.min)+', Q1 '+f(data.q1)+', Median '+f(data.median)+', Q3 '+f(data.q3)+', Maximum '+f(data.max)+' Minuten.');
    const lo=Math.max(0,Math.floor(data.min)-1),hi=Math.ceil(data.max)+1,x=v=>40+(v-lo)/(hi-lo)*520;
    const element=(tag,attrs)=>{const e=document.createElementNS(ns,tag);for(const[k,v]of Object.entries(attrs))e.setAttribute(k,v);svg.append(e);return e;};
    element('line',{x1:40,y1:130,x2:560,y2:130,stroke:'currentColor'});
    for(let i=0;i<=4;i++){const v=lo+(hi-lo)*i/4; element('line',{x1:x(v),x2:x(v),y1:126,y2:134,stroke:'currentColor'});const label=element('text',{x:x(v),y:155,'text-anchor':'middle',fill:'currentColor','font-size':13});label.textContent=f(v);}
    element('line',{x1:x(data.min),x2:x(data.max),y1:70,y2:70,stroke:'currentColor','stroke-width':2});
    element('rect',{x:x(data.q1),y:40,width:x(data.q3)-x(data.q1),height:60,fill:'#dbeafe',stroke:'#1d4ed8','stroke-width':2});
    for(const key of ['min','median','max'])element('line',{x1:x(data[key]),x2:x(data[key]),y1:key==='median'?40:55,y2:key==='median'?100:85,stroke:'#1d4ed8','stroke-width':3});
    const plot=document.createElement('div');plot.className='stat4-scroll stat4-boxplot';plot.tabIndex=0;plot.setAttribute('role','region');plot.setAttribute('aria-label','Boxplot, seitlich verschiebbar');plot.append(svg);out.append(plot);
    const hint=document.createElement('p');hint.textContent='Auf kleinen Bildschirmen kannst du den Boxplot seitlich verschieben, auch mit den Pfeiltasten, wenn er fokussiert ist.';out.append(hint);
}

function topicInit() {
    initStatisticsYear4();
    const host=document.querySelector('[data-statistics-lab]');if(!host)return;
    host.querySelector('[data-stats-calculate]').onclick=renderStatistics;
    for(const button of host.querySelectorAll('[data-stats-preset]'))button.onclick=()=>{host.querySelector('#stats_values').value=button.dataset.statsPreset==='high'?'2 4 6 8 10 60':'2 4 6 8 10 12';renderStatistics();};
    renderStatistics();
}

function stat4Format(n) { return n.toLocaleString('de-AT',{maximumFractionDigits:2}); }
function stat4Fraction(n,d) {
    let a=n,b=d;while(b){const rest=a%b;a=b;b=rest;}
    return n===0?'0':d/a===1?String(n/a):(n/a)+'/'+(d/a);
}
function stat4Model(red,replace,event) {
    const blue=4-red,remove=replace?0:1,denominator=replace?16:12;
    const numerators=[red*(red-remove),red*blue,blue*red,blue*(blue-remove)];
    const selected=event==='both'?[0]:event==='one'?[1,2]:[0,1,2];
    return {red,blue,replace,event,denominator,numerators,selected,
        numerator:selected.reduce((sum,i)=>sum+numerators[i],0),
        first:[red,blue],second:[[red-remove,blue],[red,blue-remove]],secondDenominator:replace?4:3};
}
function stat4CrossData(key,base) {
    const cells=key==='second'?[[6,12],[9,3]]:key==='empty'?[[0,0],[4,6]]:[[9,3],[2,6]];
    const rows=cells.map(row=>row[0]+row[1]),columns=[cells[0][0]+cells[1][0],cells[0][1]+cells[1][1]],total=rows[0]+rows[1];
    const denominators=cells.map((row,r)=>row.map((_,c)=>base==='row'?rows[r]:base==='column'?columns[c]:total));
    return {cells,rows,columns,total,denominators};
}
function stat4Element(tag,text,attrs={}) {
    const e=document.createElement(tag);if(text!==undefined)e.textContent=text;
    for(const [k,v]of Object.entries(attrs))e.setAttribute(k,v);return e;
}
function stat4CrossRender(host) {
    const key=host.querySelector('#stat4-data').value,base=host.querySelector('#stat4-base').value;
    const data=stat4CrossData(key,base),out=host.querySelector('[data-stat4-cross-output]');out.replaceChildren();
    const caption='Erfundene Befragung: absolute Zahlen und '+(base==='all'?'Anteile an allen Befragten':base==='row'?'Anteile innerhalb der jeweiligen Gruppe':'Anteile innerhalb der jeweiligen Antwort')+'. Randzahlen sind absolute Zahlen.';
    out.append(stat4Element('p',caption,{'data-stat4-cross-description':''}));
    const table=stat4Element('table',undefined,{'class':'stat4-cross-table'});table.append(stat4Element('caption','Kreuztabelle'));
    const thead=stat4Element('thead'),head=stat4Element('tr');
    ['Gruppe','Teilnahme ja','Teilnahme nein','Gesamt'].forEach(label=>head.append(stat4Element('th',label,{scope:'col'})));thead.append(head);table.append(thead);
    const body=stat4Element('tbody');
    data.cells.forEach((row,r)=>{
        const tr=stat4Element('tr');tr.append(stat4Element('th',r===0?'A':'B',{scope:'row'}));
        row.forEach((value,c)=>{
            const denominator=data.denominators[r][c];
            const td=stat4Element('td',undefined,{'data-stat4-cell':r+','+c,'data-denominator':denominator});
            td.append(stat4Element('strong',String(value)),stat4Element('br'));
            td.append(stat4Element('span',denominator===0?'Kein Anteil bestimmbar (Bezugsgruppe leer)':value+'/'+denominator+' = '+stat4Format(100*value/denominator)+' %'));
            tr.append(td);
        });
        tr.append(stat4Element('td',String(data.rows[r])));body.append(tr);
    });table.append(body);
    const foot=stat4Element('tfoot'),sum=stat4Element('tr');sum.append(stat4Element('th','Gesamt',{scope:'row'}));
    [...data.columns,data.total].forEach(v=>sum.append(stat4Element('td',String(v))));foot.append(sum);table.append(foot);
    const region=stat4Element('div',undefined,{class:'stat4-scroll',tabindex:0,role:'region','aria-label':'Kreuztabelle, seitlich verschiebbar'});region.append(table);out.append(region);
    host.querySelector('[data-stat4-cross-status]').textContent=data.total+' Beobachtungen. '+(base==='all'?'Die vier inneren Anteile ergeben zusammen 100 %.':base==='row'?'In jeder nicht leeren Zeile ergeben die beiden Anteile zusammen 100 %.':'In jeder nicht leeren Antwortspalte ergeben die beiden Anteile zusammen 100 %.')+(data.rows[0]===0?' In A gibt es keine Beobachtungen. Ein Anteil mit Nenner 0 ist nicht bestimmbar.':'')+' Prozentwerte sind auf höchstens zwei Nachkommastellen gerundet.';
}
function stat4DrawTree(host,model) {
    const out=host.querySelector('[data-stat4-tree-drawing]');out.replaceChildren();out.scrollLeft=0;
    const ns='http://www.w3.org/2000/svg',svg=document.createElementNS(ns,'svg');
    svg.setAttribute('viewBox','0 0 480 390');svg.setAttribute('role','img');
    svg.setAttribute('aria-label','Zwei Ziehungen, '+model.red+' rote und '+model.blue+' blaue Kugeln, '+(model.replace?'mit':'ohne')+' Zurücklegen. Astwahrscheinlichkeiten: zuerst Rot '+model.red+'/4, Blau '+model.blue+'/4; nach Rot: Rot '+model.second[0][0]+'/'+model.secondDenominator+', Blau '+model.second[0][1]+'/'+model.secondDenominator+'; nach Blau: Rot '+model.second[1][0]+'/'+model.secondDenominator+', Blau '+model.second[1][1]+'/'+model.secondDenominator+'. Gesucht: '+host.querySelector('#stat4-event').selectedOptions[0].textContent+'.');
    const add=(tag,attrs,text)=>{const el=document.createElementNS(ns,tag);Object.entries(attrs).forEach(([k,v])=>el.setAttribute(k,v));if(text!==undefined)el.textContent=text;svg.append(el);return el;};
    const label=(x,y,text)=>add('text',{x,y,fill:'#172033','font-size':16,'text-anchor':'middle'},text);
    const line=(x1,y1,x2,y2,active)=>add('line',{x1,y1,x2,y2,stroke:active?'#047857':'#64748b','stroke-width':active?4:1.5});
    label(180,22,'1. Ziehung');label(400,22,'2. Ziehung');
    const firstYs=[105,280],lastYs=[55,155,245,345],codes=['RR','RB','BR','BB'];
    firstYs.forEach((y,i)=>line(30,190,190,y,model.selected.some(p=>Math.floor(p/2)===i)));
    lastYs.forEach((y,i)=>line(190,firstYs[Math.floor(i/2)],420,y,model.selected.includes(i)));
    label(93,132,model.red+'/4');label(93,257,model.blue+'/4');
    [65,145,248,332].forEach((y,i)=>label(305,y,model.second[Math.floor(i/2)][i%2]+'/'+model.secondDenominator));
    add('circle',{cx:30,cy:190,r:5,fill:'#172033'});
    const node=(x,y,color)=>{add('circle',{cx:x,cy:y,r:14,fill:color===0?'#fed7aa':'#bfdbfe',stroke:'#334155'});label(x,y+5,color===0?'R':'B');};
    firstYs.forEach((y,i)=>node(190,y,i));lastYs.forEach((y,i)=>{node(420,y,i%2);label(456,y+5,codes[i]);});
    out.append(svg);
}
function stat4TreeInit(host) {
    if(host.dataset.bound)return;host.dataset.bound='true';
    const red=host.querySelector('#stat4-red'),replace=host.querySelector('#stat4-replace'),event=host.querySelector('#stat4-event'),answer=host.querySelector('#stat4-answer'),status=host.querySelector('[data-stat4-result]'),paths=host.querySelector('[data-stat4-paths]');
    let model;
    const clear=()=>{status.textContent='';paths.replaceChildren();answer.removeAttribute('aria-invalid');};
    const render=()=>{
        clear();answer.value='';model=stat4Model(Number(red.value),replace.value==='yes',event.value);
        host.querySelector('[data-stat4-tree-givens]').textContent=model.red+' rote und '+model.blue+' blaue Kugeln. '+(model.replace?'Mit Zurücklegen und erneutem Mischen.':'Ohne Zurücklegen.')+' Gesucht: '+event.selectedOptions[0].textContent+'. Multipliziere entlang der gesuchten Pfade und addiere ihre Wahrscheinlichkeiten.';
        stat4DrawTree(host,model);
    };
    const reveal=()=>{
        paths.replaceChildren();
        const table=stat4Element('table',undefined,{class:'stat4-path-table'});table.append(stat4Element('caption','Vier geordnete Farbpfade. Sie sind nicht automatisch gleich wahrscheinlich.'));
        const headers=['Pfad','1. Ziehung','2. Ziehung','Wahrscheinlichkeit'],head=stat4Element('tr'),thead=stat4Element('thead');headers.forEach(t=>head.append(stat4Element('th',t,{scope:'col'})));thead.append(head);table.append(thead);
        const body=stat4Element('tbody');
        ['RR','RB','BR','BB'].forEach((code,i)=>{
            const tr=stat4Element('tr',undefined,{'data-stat4-path':code}),n=model.numerators[i],first=Math.floor(i/2);
            tr.append(stat4Element('th',code+(model.selected.includes(i)?' – gehört zum Ereignis':''),{scope:'row'}));
            [model.first[first]+'/4',model.second[first][i%2]+'/'+model.secondDenominator,n+'/'+model.denominator+' = '+stat4Fraction(n,model.denominator)+' ≈ '+stat4Format(100*n/model.denominator)+' %'+(n===0?' (unmöglich)':'')].forEach((v,j)=>tr.append(stat4Element('td',v,{'data-label':headers[j+1]})));
            body.append(tr);
        });table.append(body);paths.append(table);
        paths.append(stat4Element('p','Gesuchtes Ereignis: '+model.selected.map(i=>['RR','RB','BR','BB'][i]).join(' oder ')+'. Rechnung: '+model.selected.map(i=>model.numerators[i]+'/'+model.denominator).join(' + ')+' = '+stat4Fraction(model.numerator,model.denominator)+' ≈ '+stat4Format(100*model.numerator/model.denominator)+' %. Die vier Pfadwahrscheinlichkeiten ergeben zusammen 1.'));
    };
    const check=()=>{
        const raw=answer.value.trim(),value=Number(raw.replace(',','.'));
        if(!/^\d+(?:[.,]\d+)?$/.test(raw)||value<0||value>100){clear();answer.setAttribute('aria-invalid','true');status.textContent='Bitte eine Zahl von 0 bis 100 ohne Prozentzeichen eingeben, mit Komma oder Punkt als Dezimalzeichen.';answer.focus();return;}
        const correct=Math.abs(value-100*model.numerator/model.denominator)<=0.0050000001;
        answer.removeAttribute('aria-invalid');status.textContent=(correct?'Richtig. ':'Noch nicht richtig. ')+event.selectedOptions[0].textContent+': '+stat4Fraction(model.numerator,model.denominator)+' ≈ '+stat4Format(100*model.numerator/model.denominator)+' %. '+(correct?'Vergleiche deinen Rechenweg mit den Pfaden unten.':'Prüfe die zweiten Astwahrscheinlichkeiten und welche Pfade zum Ereignis gehören.');
        reveal();status.focus();
    };
    [red,replace,event].forEach(select=>select.addEventListener('change',render));answer.addEventListener('input',clear);answer.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();check();}});
    host.querySelector('[data-stat4-check]').addEventListener('click',check);
    host.querySelector('[data-stat4-show]').addEventListener('click',()=>{answer.removeAttribute('aria-invalid');status.textContent='Vergleichsrechnung eingeblendet. Vergleiche insbesondere die Bezugszahl beim zweiten Ziehen.';reveal();status.focus();});
    host.querySelector('[data-stat4-reset]').addEventListener('click',()=>{red.value='3';replace.value='yes';event.value='both';render();red.focus();});render();
}
function initStatisticsYear4() {
    const cross=document.querySelector('[data-stat4-cross]');
    if(cross&&!cross.dataset.bound){
        cross.dataset.bound='true';const data=cross.querySelector('#stat4-data'),base=cross.querySelector('#stat4-base');
        [data,base].forEach(select=>select.addEventListener('change',()=>stat4CrossRender(cross)));
        cross.querySelector('[data-stat4-cross-reset]').addEventListener('click',()=>{data.value='base';base.value='all';stat4CrossRender(cross);data.focus();});stat4CrossRender(cross);
        cross.querySelector('[data-stat4-cross-output]').after(stat4Element('p','Auf kleinen Bildschirmen kannst du die Tabelle seitlich verschieben, auch mit den Pfeiltasten, wenn sie fokussiert ist.'));
    }
    for(const table of document.querySelectorAll('[data-stat4-example]')){
        if(table.parentElement.classList.contains('stat4-scroll'))continue;
        const wrap=stat4Element('div',undefined,{class:'stat4-scroll',tabindex:0,role:'region','aria-label':'Beispiel einer Kreuztabelle, seitlich verschiebbar'});table.before(wrap);wrap.append(table);
        wrap.after(stat4Element('p','Die Tabelle lässt sich auf kleinen Bildschirmen seitlich verschieben, auch mit den Pfeiltasten, wenn sie fokussiert ist.'));
    }
    for(const figure of document.querySelectorAll('.stat4-tree-figure')){
        if(figure.querySelector('.stat4-scroll'))continue;
        const svg=figure.querySelector('svg'),wrap=stat4Element('div',undefined,{class:'stat4-scroll',tabindex:0,role:'region','aria-label':'Beispielbaum, seitlich verschiebbar'});svg.before(wrap);wrap.append(svg);
        figure.append(stat4Element('p','Auf kleinen Bildschirmen kannst du das Baumdiagramm seitlich verschieben, auch mit den Pfeiltasten, wenn es fokussiert ist.'));
    }
    const tree=document.querySelector('[data-stat4-tree]');if(tree)stat4TreeInit(tree);
}
