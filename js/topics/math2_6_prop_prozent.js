function updatePizzaCalculator() {
    const slider = document.getElementById('pizza_slider');
    const count = document.getElementById('pizza_count');
    const price = document.getElementById('pizza_price');
    if (!slider || !count || !price) return;

    const amount = Number(slider.value);
    const total = amount * 5;
    count.innerText = String(amount);
    price.innerText = String(total);
    slider.setAttribute('aria-valuetext', `${amount} Pizzen, ${total} Euro`);
}

function calculateRabatt() {
    const rabattInput = document.getElementById('rabatt_input');
    const rabattRes = document.getElementById('rabatt_res');
    if (!rabattInput || !rabattRes) return;

    const baseInput = document.getElementById('rabatt_base');
    const hundredths = raw => {
        const value = String(raw).trim().replace(',', '.');
        if (!/^\d+(?:\.\d{1,2})?$/.test(value)) return NaN;
        const [whole, fraction = ''] = value.split('.');
        return Number(whole) * 100 + Number(fraction.padEnd(2, '0'));
    };
    const base = hundredths(baseInput?.value);
    const rate = hundredths(rabattInput.value);
    if (!Number.isSafeInteger(base) || base < 0 || base > 99999999) {
        rabattRes.textContent = 'Gib einen ursprünglichen Preis von 0 bis 999999,99 € mit höchstens zwei Nachkommastellen ein.';
        return;
    }
    if (!Number.isSafeInteger(rate) || rate < 0 || rate > 10000) {
        rabattRes.textContent = 'Bitte gib einen Rabatt zwischen 0 und 100 ein, mit höchstens zwei Nachkommastellen.';
        return;
    }

    // Integer cents and hundredths of a percent keep monetary rounding consistent.
    const savingCents = Math.floor((base * rate + 5000) / 10000);
    const sparen = savingCents / 100;
    const neuerPreis = (base - savingCents) / 100;
    const euro = value => value.toLocaleString('de-AT', {style: 'currency', currency: 'EUR'});
    rabattRes.textContent = `Grundwert: ${euro(base / 100)}. Rabatt: ${(rate / 100).toLocaleString('de-AT')} %. Rechenweg: ${euro(base / 100)} × ${(rate / 100).toLocaleString('de-AT')} : 100. Du sparst: ${euro(sparen)}. Neuer Preis: ${euro(neuerPreis)}. Der Rabattbetrag ist auf Cent gerundet.`;
}

function updateInverseCalculator() {
    const input = document.getElementById('inverse_people'), result = document.getElementById('inverse_result');
    if (!input || !result) return;
    const people = Number(input.value);
    if (!Number.isInteger(people) || people < 1 || people > 12) {
        result.textContent = 'Wähle eine ganze Personenanzahl von 1 bis 12.';
        return;
    }
    const share = (60 / people).toLocaleString('de-AT', {style: 'currency', currency: 'EUR'});
    result.textContent = `${people} Personen: 60 € : ${people} = ${share} pro Person (auf Cent gerundet).`;
    input.setAttribute('aria-valuetext', `${people} Personen, ${share} pro Person`);
}

function topicInit() {
    bindProportionModels();
    const inverse = document.getElementById('inverse_people');
    if (inverse) {
        inverse.oninput = updateInverseCalculator;
        inverse.setAttribute('aria-describedby', 'inverse_result');
        updateInverseCalculator();
    }
    const pizzaSlider = document.getElementById('pizza_slider');
    const pizzaPrice = document.getElementById('pizza_price');
    if (pizzaSlider) {
        pizzaSlider.oninput = updatePizzaCalculator;
        pizzaSlider.setAttribute('aria-describedby', 'pizza_price');
        updatePizzaCalculator();
    }
    if (pizzaPrice) {
        pizzaPrice.setAttribute('role', 'status');
        pizzaPrice.setAttribute('aria-live', 'polite');
        pizzaPrice.setAttribute('aria-atomic', 'true');
    }

    const rabattInput = document.getElementById('rabatt_input');
    const rabattRes = document.getElementById('rabatt_res');
    if (rabattRes) {
        rabattRes.setAttribute('role', 'status');
        rabattRes.setAttribute('aria-live', 'polite');
        rabattRes.setAttribute('aria-atomic', 'true');
    }
    for (const field of [document.getElementById('rabatt_base'), rabattInput].filter(Boolean)) {
        field.setAttribute('aria-describedby', 'rabatt_res');
        if (field.dataset.enterBound !== 'true') {
            field.dataset.enterBound = 'true';
            field.addEventListener('input', () => { if (rabattRes) rabattRes.textContent = ''; });
            field.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    calculateRabatt();
                }
            });
        }

    }
    if (rabattInput) {
        const rabattButton = rabattInput.parentElement?.nextElementSibling;
        if (rabattButton?.tagName === 'BUTTON' && rabattButton.dataset.handlerBound !== 'true') {
            rabattButton.dataset.handlerBound = 'true';
            rabattButton.onclick = (event) => {
                event.preventDefault();
                calculateRabatt();
            };
        }
    }
}

function proportionNumber(value) {
    return value.toLocaleString('de-AT', {maximumFractionDigits:6});
}

function proportionModel(kind, x) {
    if (!['direct','inverse','fee'].includes(kind) || !Number.isFinite(x) || x < (kind==='inverse'?1:0) || x>6 || x*2!==Math.round(x*2)) return null;
    const value = n => kind==='inverse'?60/n:2*n+(kind==='fee'?5:0);
    return {kind,x,y:value(x),xUnit:kind==='inverse'?'L/min':'m',yUnit:kind==='inverse'?'min':'€',maxY:kind==='inverse'?60:20,
        rows:[1,2,3,6].map(n=>({x:n,y:value(n)})),
        explanation:kind==='direct'?'Der Quotient Preis : Länge ist bei positiver Länge immer 2 €/m. Bei 0 m ist der Preis 0 €; 0 : 0 wird nicht berechnet.':kind==='inverse'?'Das Produkt Zufluss · Zeit ist immer 60 L. Doppelter Zufluss bedeutet halbe Füllzeit. Nullzufluss füllt den Tank nicht.':'Der Quotient Preis : Länge ist nicht konstant. Wegen der Grundgebühr verläuft die Gerade nicht durch (0 | 0). Auch das Produkt ist nicht konstant.'};
}

function proportionGraphSvg(m, staticId) {
    const px=n=>50+n*260/6,py=n=>230-n*180/m.maxY;
    const title=staticId||'prop-live-title', inverse=m.kind==='inverse';
    const curve=Array.from({length:101},(_,i)=>{const x=inverse?1+5*i/100:6*i/100,y=inverse?60/x:2*x+(m.kind==='fee'?5:0);return px(x)+','+py(y);}).join(' ');
    const yTicks=inverse?[0,20,40,60]:[0,10,20];
    return '<svg class="proportion-svg" '+(staticId?'data-worksheet-static="true" ':'')+'viewBox="0 0 330 300" role="img" aria-labelledby="'+title+'"><title id="'+title+'">'+(inverse?'Indirekte Zuordnung: Zufluss und Füllzeit':'Preis und Stofflänge')+'. Markierung bei x = '+proportionNumber(m.x)+', y = '+proportionNumber(m.y)+'.</title><g fill="none" stroke="currentColor"><path d="M50 40 V230 H315"/>'+[0,2,4,6].map(n=>'<path d="M'+px(n)+' 230 v5"/>').join('')+yTicks.map(n=>'<path d="M45 '+py(n)+' h265" opacity=".25"/>').join('')+'</g><g fill="currentColor" font-size="22"><text x="50" y="25">'+(inverse?'Zeit in min':'Preis in €')+'</text>'+[0,2,4,6].map(n=>'<text x="'+px(n)+'" y="258" text-anchor="middle">'+n+'</text>').join('')+yTicks.map(n=>'<text x="38" y="'+(py(n)+7)+'" text-anchor="end">'+n+'</text>').join('')+'<text x="180" y="287" text-anchor="middle">'+(inverse?'Zufluss in L/min':'Stofflänge in m')+'</text></g><polyline data-proportion-curve points="'+curve+'" fill="none" stroke="#2563eb" stroke-width="3"/><circle data-proportion-point cx="'+px(m.x)+'" cy="'+py(m.y)+'" r="6" fill="#f59e0b" stroke="#111827" stroke-width="2"/></svg>';
}

function percentChangeModel(base,rate,direction) {
    function hundredths(raw){if(!/^\d{1,5}(?:[.,]\d{1,2})?$/.test(String(raw).trim()))return null;const [a,b='']=String(raw).trim().replace(',','.').split('.');return Number(a)*100+Number(b.padEnd(2,'0'));}
    const g=hundredths(base),p=hundredths(rate);
    if(g===null||p===null||g<0||g>1000000||p>20000||!['up','down'].includes(direction)||direction==='down'&&p>10000)return null;
    const sign=direction==='up'?1:-1, factorNumerator=10000+sign*p;
    return {base:g/100,rate:p/100,direction,change:g*p/1000000,factor:factorNumerator/10000,result:g*factorNumerator/1000000,percent:factorNumerator/100};
}

function percentChangeSvg(m, staticId) {
    const max=Math.max(m.base,m.result),width=n=>max?280*n/max:0,title=staticId||'percent-change-live-title';
    return '<svg class="proportion-svg" '+(staticId?'data-worksheet-static="true" ':'')+'viewBox="0 0 330 160" role="img" aria-labelledby="'+title+'"><title id="'+title+'">Gleicher Maßstab: vorher '+proportionNumber(m.base)+' Liter, nachher '+proportionNumber(m.result)+' Liter.</title><g fill="currentColor" font-size="22"><text x="20" y="30">Vorher: 100 %</text><text x="20" y="100">Nachher: '+proportionNumber(m.percent)+' %</text></g><rect data-percent-before x="20" y="42" width="'+width(m.base)+'" height="24" fill="#94a3b8" stroke="#111827" stroke-width="2"/><rect data-percent-after x="20" y="112" width="'+width(m.result)+'" height="24" fill="#10b981" stroke="#111827" stroke-width="2"/></svg>';
}

function bindProportionModels() {
    const lab=document.querySelector('[data-proportion-lab]');
    if(lab&&!lab.dataset.bound){
        lab.dataset.bound='true';const kind=lab.querySelector('#proportion-case'),x=lab.querySelector('#proportion-x'),answer=lab.querySelector('#proportion-answer'),out=lab.querySelector('[data-proportion-status]'),view=lab.querySelector('[data-proportion-view]'),description=lab.querySelector('[data-proportion-description]');
        function change(){x.min=kind.value==='inverse'?'1':'0';if(Number(x.value)<Number(x.min))x.value=x.min;out.textContent='';view.replaceChildren();answer.value='';description.textContent=kind.value==='direct'?'Modell: Stoff kostet 2 € je Meter, ohne Grundgebühr. x ist die Länge in m, y der Preis in €.':kind.value==='inverse'?'Modell: Ein leerer Tank fasst 60 L. Der Zufluss x in L/min bleibt konstant, y ist die Füllzeit in min. Der Graph zeigt Zuflüsse von 1 bis 6 L/min.':'Modell: Eine Stoffbestellung kostet 5 € Grundgebühr plus 2 € je Meter. x ist die Länge in m, y der Gesamtpreis in €. Auch x = 0 ist hier ein mathematischer Modellwert.';lab.querySelector('[data-proportion-x-label]').textContent=(kind.value==='inverse'?'Zufluss in L/min: ':'Stofflänge in m: ')+proportionNumber(Number(x.value));x.setAttribute('aria-valuetext',proportionNumber(Number(x.value))+(kind.value==='inverse'?' Liter pro Minute':' Meter'));}
        function show(check){const m=proportionModel(kind.value,Number(x.value));if(!m)return;let prefix='';if(check){const raw=answer.value.trim();if(!/^\d{1,5}(?:[.,]\d{1,2})?$/.test(raw)){out.textContent='Gib eine nichtnegative Zahl mit höchstens zwei Nachkommastellen ein.';return;}const actual=Number(raw.replace(',','.')),expected=Math.round(m.y*100)/100;prefix=Math.abs(actual-expected)<1e-9?'Richtig. ':'Noch nicht. ';}out.textContent=prefix+'Bei x = '+proportionNumber(m.x)+' '+m.xUnit+' ist y '+(Number.isInteger(m.y*100)?'= ':'≈ ')+m.y.toLocaleString('de-AT',{maximumFractionDigits:2})+' '+m.yUnit+'. '+m.explanation;view.innerHTML=proportionGraphSvg(m)+'<table class="proportion-table"><caption>Wertetabelle desselben Modells</caption><thead><tr><th scope="col">x in '+m.xUnit+'</th><th scope="col">y in '+m.yUnit+'</th></tr></thead><tbody>'+m.rows.map(row=>'<tr><td>'+row.x+'</td><td>'+proportionNumber(row.y)+'</td></tr>').join('')+'</tbody></table><p>Die Achsen sind gleichmäßig eingeteilt. Die Höhenachse reicht '+(kind.value==='inverse'?'bis 60 min':'bis 20 €')+'. Vergleiche Steilheit nur bei denselben Einheiten und Skalen. Alle Kurvenpunkte folgen der erklärten Formel; Zwischenwerte sind in diesen Modellen sinnvoll.</p>';}
        kind.addEventListener('change',change);x.addEventListener('input',change);answer.addEventListener('input',()=>{out.textContent='';});answer.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();show(true);}});lab.querySelector('[data-proportion-check]').addEventListener('click',()=>show(true));lab.querySelector('[data-proportion-show]').addEventListener('click',()=>show(false));lab.querySelector('[data-proportion-reset]').addEventListener('click',()=>{kind.value='direct';x.value='3';change();kind.focus();});change();
    }
    const host=document.querySelector('[data-percent-change]');
    if(host&&!host.dataset.bound){host.dataset.bound='true';const base=host.querySelector('#percent-change-base'),rate=host.querySelector('#percent-change-rate'),direction=host.querySelector('#percent-change-direction'),out=host.querySelector('[data-percent-change-status]'),view=host.querySelector('[data-percent-change-view]');
        function clear(){out.textContent='';view.replaceChildren();}
        function run(){clear();const m=percentChangeModel(base.value,rate.value,direction.value);if(!m){out.textContent='Gib 0 bis 10000 L und höchstens zwei Nachkommastellen ein. Erhöhungen: 0 bis 200 %. Verringerungen: 0 bis 100 %.';return;}const op=m.direction==='up'?'+':'−';out.textContent='Änderungsbetrag: '+proportionNumber(m.base)+' L · '+proportionNumber(m.rate)+' : 100 = '+proportionNumber(m.change)+' L. Additiv: '+proportionNumber(m.base)+' L '+op+' '+proportionNumber(m.change)+' L = '+proportionNumber(m.result)+' L. Faktor: 1 '+op+' '+proportionNumber(m.rate)+' : 100 = '+proportionNumber(m.factor)+'. Multiplikativ: '+proportionNumber(m.base)+' L · '+proportionNumber(m.factor)+' = '+proportionNumber(m.result)+' L. Das sind '+proportionNumber(m.percent)+' % des Ausgangswerts.';view.innerHTML=percentChangeSvg(m);}
        for(const field of [base,rate,direction]){field.addEventListener(field.tagName==='SELECT'?'change':'input',clear);field.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();run();}});}host.querySelector('[data-percent-change-run]').addEventListener('click',run);host.querySelector('[data-percent-change-reset]').addEventListener('click',()=>{base.value='80';rate.value='20';direction.value='up';clear();base.focus();});
    }
}
