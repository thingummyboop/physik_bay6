function circleFormat(n) { return n.toLocaleString('de-AT',{maximumFractionDigits:2}); }
function circlePiTerm(n,d) {
    let a=n,b=d;while(b){const rest=a%b;a=b;b=rest;}n/=a;d/=a;
    return (n===1?'':n)+'π'+(d===1?'':'/'+d);
}
function circleModel(radius,part) {
    const arc=2*Math.PI*radius/part,area=Math.PI*radius*radius/part;
    return {radius,part,angle:360/part,arc,perimeter:arc+(part===1?0:2*radius),area,
        exactArc:circlePiTerm(2*radius,part),exactArea:circlePiTerm(radius*radius,part),
        exactPerimeter:circlePiTerm(2*radius,part)+(part===1?'':' + '+(2*radius))};
}
function circleElement(tag,text,attrs={}) {
    const el=document.createElement(tag);if(text!==undefined)el.textContent=text;
    for(const [key,value]of Object.entries(attrs))el.setAttribute(key,value);return el;
}
function circleDraw(host,model) {
    const out=host.querySelector('[data-circle-drawing]');out.replaceChildren();out.scrollLeft=0;
    const ns='http://www.w3.org/2000/svg',svg=document.createElementNS(ns,'svg');svg.setAttribute('viewBox','0 0 360 280');svg.setAttribute('role','img');
    svg.setAttribute('aria-label',model.angle+' Grad Kreisteil mit Radius '+model.radius+' cm. '+(model.part===1?'Der Rand ist nur die Kreislinie.':'Der gesamte Rand besteht aus dem blauen Kreisbogen und zwei geraden orangefarbenen Radien.')+' Die Zeichnung ist kein Zentimetermaßstab.');
    const add=(tag,attrs,text)=>{const el=document.createElementNS(ns,tag);for(const [k,v]of Object.entries(attrs))el.setAttribute(k,v);if(text!==undefined)el.textContent=text;svg.append(el);return el;};
    const r=11*model.radius,cx=180,cy=140,startY=cy-r,theta=-Math.PI/2+2*Math.PI/model.part,endX=cx+r*Math.cos(theta),endY=cy+r*Math.sin(theta);
    if(model.part===1){add('circle',{cx,cy,r,fill:'#dbeafe',stroke:'#1d4ed8','stroke-width':3,'data-circle-full':''});}
    else{
        add('path',{d:`M ${cx} ${cy} L ${cx} ${startY} A ${r} ${r} 0 0 1 ${endX} ${endY} Z`,fill:'#dbeafe','data-circle-sector':''});
        add('path',{d:`M ${cx} ${startY} A ${r} ${r} 0 0 1 ${endX} ${endY}`,fill:'none',stroke:'#1d4ed8','stroke-width':3,'data-circle-arc':''});
        add('path',{d:`M ${cx} ${startY} L ${cx} ${cy} L ${endX} ${endY}`,fill:'none',stroke:'#b45309','stroke-width':3,'data-circle-radii':''});
    }
    add('circle',{cx,cy,r:2,fill:'#172033'});
    out.append(svg);out.scrollLeft=Math.max(0,(out.scrollWidth-out.clientWidth)/2);
    host.querySelector('[data-circle-drawing-caption]').textContent='Zeichnung: r = '+model.radius+' cm; Winkel = '+model.angle+'°. Die Bildschirmgröße ist kein Zentimetermaßstab.';
}
function topicInit() {
    for(const figure of document.querySelectorAll('.circle-figure')){
        if(figure.querySelector('.circle-scroll'))continue;
        const svg=figure.querySelector('svg'),wrap=circleElement('div',undefined,{class:'circle-scroll',tabindex:0,role:'region','aria-label':'Kreiszeichnung, seitlich verschiebbar'});svg.before(wrap);wrap.append(svg);wrap.scrollLeft=Math.max(0,(wrap.scrollWidth-wrap.clientWidth)/2);
        figure.append(circleElement('p','Auf kleinen Bildschirmen lässt sich die Zeichnung seitlich verschieben, auch mit den Pfeiltasten, wenn sie fokussiert ist.'));
    }
    for(const table of document.querySelectorAll('.circle-measurements')){
        if(table.parentElement.classList.contains('circle-scroll'))continue;
        const wrap=circleElement('div',undefined,{class:'circle-scroll',tabindex:0,role:'region','aria-label':'Messwerttabelle, seitlich verschiebbar'});table.before(wrap);wrap.append(table);
        wrap.after(circleElement('p','Die Tabelle lässt sich bei Bedarf seitlich verschieben, auch mit den Pfeiltasten, wenn sie fokussiert ist.'));
    }
    const host=document.querySelector('[data-circle-lab]');if(!host||host.dataset.bound)return;host.dataset.bound='true';
    host.querySelector('[data-circle-drawing]').after(circleElement('p',undefined,{'data-circle-drawing-caption':''}));
    const radius=host.querySelector('#circle-radius'),part=host.querySelector('#circle-part'),quantity=host.querySelector('#circle-quantity'),input=host.querySelector('#circle-answer'),status=host.querySelector('[data-circle-status]'),calculation=host.querySelector('[data-circle-calculation]');
    const names={arc:'Bogenlänge',perimeter:'Gesamter Rand',area:'Flächeninhalt'},unit=()=>quantity.value==='area'?'cm²':'cm';let model;
    const clear=()=>{status.textContent='';calculation.replaceChildren();input.removeAttribute('aria-invalid');};
    const render=()=>{
        clear();input.value='';model=circleModel(Number(radius.value),Number(part.value));
        host.querySelector('[data-circle-radius-text]').textContent='r = '+model.radius+' cm; d = '+(2*model.radius)+' cm.';
        radius.setAttribute('aria-valuetext',model.radius+' Zentimeter');
        input.setAttribute('aria-label','Mein Ergebnis für '+names[quantity.value]+' in '+unit());
        host.querySelector('[data-circle-help]').textContent='Gesucht: '+names[quantity.value]+' in '+unit()+'. Gib nur den Zahlenwert ohne Einheit ein, auf zwei Nachkommastellen gerundet. Komma oder Punkt sind möglich.';
        circleDraw(host,model);
    };
    const reveal=()=>{
        calculation.replaceChildren();const table=circleElement('table',undefined,{class:'circle-result-table'}),thead=circleElement('thead'),head=circleElement('tr'),tbody=circleElement('tbody');
        table.append(circleElement('caption','Bogen, gesamter Rand und Fläche bei r = '+model.radius+' cm und '+model.angle+'°'));
        ['Größe','Exakter Wert','Näherung'].forEach(label=>head.append(circleElement('th',label,{scope:'col'})));thead.append(head);table.append(thead);
        for(const [key,exact]of [['arc',model.exactArc],['perimeter',model.exactPerimeter],['area',model.exactArea]]){
            const units=key==='area'?'cm²':'cm',tr=circleElement('tr',undefined,{'data-circle-row':key});tr.append(circleElement('th',names[key],{scope:'row'}));
            tr.append(circleElement('td',exact+' '+units,{'data-label':'Exakter Wert'}));tr.append(circleElement('td','≈ '+circleFormat(model[key])+' '+units,{'data-label':'Näherung'}));tbody.append(tr);
        }table.append(tbody);calculation.append(table);
        calculation.append(circleElement('p','Bogen: 2π · '+model.radius+' / '+model.part+' cm. Fläche: π · '+model.radius+'² / '+model.part+' cm². '+(model.part===1?'Beim ganzen Kreis ist die Kreislinie der gesamte Rand.':'Gesamter Rand: Bogen + 2 · '+model.radius+' cm. Die beiden Radien gehören zum Rand, obwohl sie nicht zum Kreisbogen gehören.')));
    };
    const check=()=>{
        const raw=input.value.trim(),value=Number(raw.replace(',','.'));
        if(!/^\d+(?:[.,]\d+)?$/.test(raw)||!Number.isFinite(value)||value<0||value>10000){clear();input.setAttribute('aria-invalid','true');status.textContent='Bitte eine Zahl von 0 bis 10 000 ohne Einheit eingeben, mit Komma oder Punkt als Dezimalzeichen.';input.focus();return;}
        const correct=Math.abs(value-model[quantity.value])<=0.0050000001;
        input.removeAttribute('aria-invalid');status.textContent=(correct?'Richtig. ':'Noch nicht richtig. ')+names[quantity.value]+' ≈ '+circleFormat(model[quantity.value])+' '+unit()+'. '+(correct?'Vergleiche deinen Rechenweg mit den drei Größen unten.':'Prüfe Radius statt Durchmesser, den Anteil am Kreis und die geraden Randstücke.');reveal();status.focus();
    };
    radius.addEventListener('input',render);[part,quantity].forEach(e=>e.addEventListener('change',render));input.addEventListener('input',clear);input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();check();}});
    host.querySelector('[data-circle-check]').addEventListener('click',check);host.querySelector('[data-circle-show]').addEventListener('click',()=>{input.removeAttribute('aria-invalid');status.textContent='Vergleichsrechnung eingeblendet. Bogenlänge, gesamter Rand und Fläche sind getrennt angegeben.';reveal();status.focus();});
    host.querySelector('[data-circle-reset]').addEventListener('click',()=>{radius.value='4';part.value='4';quantity.value='arc';render();radius.focus();});render();
}
