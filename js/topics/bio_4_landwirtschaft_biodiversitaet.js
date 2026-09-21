'use strict';
function topicInit() {
    document.querySelectorAll('[data-farm-lab]').forEach(zone => {
        if (zone.dataset.initialized) return;
        zone.dataset.initialized = 'true';
        const year = zone.querySelector('[data-farm-year]');
        const basis = zone.querySelector('[data-farm-basis]');
        const reference = zone.querySelector('[data-farm-reference]');
        const result = zone.querySelector('[data-farm-result]');
        const data = { '1': { a:1000,b:920,sa:3,sb:7 }, '2': { a:1100,b:1060,sa:4,sb:6 }, '3': { a:900,b:880,sa:2,sb:5 } };
        const format = number => number.toLocaleString('de-AT', {minimumFractionDigits:1,maximumFractionDigits:1});
        function clear() { result.replaceChildren(); delete result.dataset.invalid; }
        for (const input of [year,basis,reference]) input.addEventListener('change',clear);
        zone.querySelector('[data-farm-check]').addEventListener('click', () => {
            clear();
            const row=data[year.value];
            const invalid=!row?[year,'year','Wähle ein Jahr.']:!['whole','crop'].includes(basis.value)?[basis,'basis','Wähle die Bezugsfläche.']:!['A','B'].includes(reference.value)?[reference,'reference','Wähle die Vergleichsrichtung.']:null;
            if (invalid) { result.dataset.invalid=invalid[1]; result.textContent=invalid[2]; invalid[0].focus(); return; }
            const areaA=1000,areaB=basis.value==='whole'?1000:900;
            const valueA=row.a/areaA*100,valueB=row.b/areaB*100;
            const start=reference.value==='A'?valueA:valueB,other=reference.value==='A'?valueB:valueA;
            const percent=(other-start)/start*100,otherName=reference.value==='A'?'B':'A';
            const areaName=basis.value==='whole'?'Gesamtfläche':'Kulturfläche';
            const first=document.createElement('p');
            first.textContent=`Jahr ${year.value}: Bezugsfläche ${areaName}. A: ${areaA} m²; B: ${areaB} m². Ernte je 100 m²: `;
            for (const [name,value] of [['A',valueA],['B',valueB]]) {
                const span=document.createElement('span'); span.dataset.farmValue=name; span.textContent=`${name}: ${format(value)} kg`; first.append(span, name==='A'?'; ':'.');
            }
            result.append(first);
            const second=document.createElement('p'),number=document.createElement('strong');
            number.dataset.farmPercent=''; number.textContent=(percent>0?'+':'')+format(percent)+' %';
            second.append(`${otherName} gegenüber ${reference.value} bei dieser Bezugsfläche: `,number,`. Ausgangswert im Nenner ist ${reference.value}. Gerechnet wird (Vergleichswert − Ausgangswert) ÷ Ausgangswert × 100, mit ungerundeten Werten. Ein anderer Nenner ergibt einen anderen Prozentwert.`);
            result.append(second);
            for (const text of [
                `Gesamternte unabhängig von der Bezugsfläche: A ${row.a} kg, B ${row.b} kg; B liefert ${row.a-row.b} kg weniger. Gefundene Wildbienenarten: A ${row.sa}, B ${row.sb}, also ${row.sb-row.sa} Arten mehr auf B. Artenzahl ist nicht Individuenzahl oder gesamte Biodiversität.`,
                basis.value==='crop'?'Die Kulturfläche von B ist kleiner. Ihr höherer Ertrag je Kulturfläche bedeutet deshalb keine höhere Gesamternte. Der Streifen ist aus diesem Nenner ausgeschlossen.':'Hier zählt die ganze Fläche einschließlich des Blühstreifens. Der Vergleich beschreibt den Ertrag je gesamter Fläche; er beantwortet nicht allein die Frage nach Artenvielfalt.',
                'Die Zahlen sind erfunden. Drei Jahre auf denselben zwei Flächen beweisen keine allgemeine Ursache; Standort, Witterung und Erfassung können mitwirken. Dieser Datensatz vergleicht nicht Bio mit konventioneller Landwirtschaft.'
            ]) { const p=document.createElement('p');p.textContent=text;result.append(p); }
            result.focus();
        });
        zone.querySelector('[data-farm-reset]').addEventListener('click', () => { year.value='1';basis.value='whole';reference.value='A';clear();year.focus(); });
    });
}
window.topicInit=topicInit;
