'use strict';
function topicInit() {
    document.querySelectorAll('[data-city-lab]').forEach(zone => {
        if (zone.dataset.initialized) return;
        zone.dataset.initialized = 'true';
        const plan = zone.querySelector('[data-city-plan]');
        const rain = zone.querySelector('[data-city-rain]');
        const capacity = zone.querySelector('[data-city-capacity]');
        const result = zone.querySelector('[data-city-result]');
        const plans = { A: {green:0,movement:300}, B: {green:150,movement:150}, C: {green:250,movement:50} };
        function clear() { result.replaceChildren(); delete result.dataset.invalid; }
        for (const input of [plan,rain,capacity]) input.addEventListener('change',clear);
        zone.querySelector('[data-city-check]').addEventListener('click', () => {
            clear();
            const invalid = !['A','B','C'].includes(plan.value) ? [plan,'plan','Wähle einen Schulhofplan.'] : !['10','30','50'].includes(rain.value) ? [rain,'rain','Wähle die Regenmenge.'] : !['20','5'].includes(capacity.value) ? [capacity,'capacity','Wähle die freie Speicherkapazität.'] : null;
            if (invalid) { result.dataset.invalid=invalid[1]; result.textContent=invalid[2]; invalid[0].focus(); return; }
            const selected=plans[plan.value],mm=Number(rain.value),free=Number(capacity.value);
            const total=400*mm,retained=selected.green*Math.min(mm,free),runoff=total-retained;
            const first=document.createElement('p');
            first.textContent=`Plan ${plan.value}: 100 m² Weg, ${selected.movement} m² Bewegung, ${selected.green} m² Grünfläche; zusammen 400 m². Regen: ${mm} mm. Freier Speicher auf Grünfläche: ${free} L/m².`;
            result.append(first);
            const values=document.createElement('p');
            for (const [key,label,value] of [['total','Regenmenge',total],['retained','Rückhalt',retained],['runoff','Modellabfluss',runoff]]) {
                const strong=document.createElement('strong'); strong.dataset.cityValue=key;strong.textContent=value.toLocaleString('de-AT')+' L';
                values.append(label+': ',strong,key==='runoff'?'.':'; ');
            }
            result.append(values);
            const calculation=document.createElement('p');
            calculation.textContent=`Rechnung: 400 × ${mm} = ${total} L Regen. Rückhalt: ${selected.green} × ${Math.min(mm,free)} = ${retained} L; pro m² zählt der kleinere Wert aus ${mm} L Regen und ${free} L freiem Speicher. Bilanz: ${total} = ${retained} + ${runoff} L. Auf Grünfläche bleiben ${selected.green*Math.max(0,free-mm)} L der anfangs freien Kapazität ungenutzt.`;
            result.append(calculation);
            const use=document.createElement('p');use.dataset.cityFit=selected.movement>=150?'yes':'no';
            use.textContent=selected.movement>=150?`Weg und Bewegungsfläche erfüllen die beiden Mindestflächen der Aufgabe.${selected.green===0?' A enthält aber keine Grünfläche.':' B verbindet die Mindestflächen mit 150 m² Grünfläche.'}`:'C verfehlt die geforderte Bewegungsfläche: 50 statt mindestens 150 m². Mehr Rückhalt allein erfüllt nicht alle Nutzungsziele.';
            result.append(use);
            const limit=document.createElement('p');
            limit.textContent='Dies ist ein erfundenes Speichermodell. Es lässt Wasserumleitung, weitere Versickerung während des Regens, Verdunstung und Aufnahmegeschwindigkeit weg. Modellabfluss ist keine Vorhersage einer Abflussspitze oder Kanalbelastung. Artenvielfalt, Beschattung, Pflege und tatsächliche Zugänglichkeit müssen gesondert geprüft werden.';
            result.append(limit); result.focus();
        });
        zone.querySelector('[data-city-reset]').addEventListener('click', () => { plan.value='A';rain.value='10';capacity.value='20';clear();plan.focus(); });
    });
}
window.topicInit=topicInit;
