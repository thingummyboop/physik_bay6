function check_m311() {
 const input=document.getElementById('ans_m311_2'),out=document.getElementById('res_m311_2');if(!input||!out)return;
 const raw=input.value.trim().replace(',', '.');
 if(!/^\d+(?:\.\d+)?$/.test(raw)||!Number.isFinite(Number(raw))){out.textContent='Gib einen nicht negativen Zahlenwert ein. Komma oder Punkt sind als Dezimaltrennzeichen möglich.';return;}
 out.textContent=Number(raw)===3?'Richtig: (2 + 4) : 2 = 3 Bücher pro Tag. Insgesamt sind es 6 Bücher an zwei Tagen.':Number(raw)===6?'6 Bücher ist die Summe. Für den Mittelwert musst du noch durch die Anzahl der zwei Tage teilen.':'Noch nicht: Addiere die beiden Ausleihzahlen 2 und 4 und teile ihre Summe durch die Anzahl der zwei Tage.';
}
function topicInit() {
 const input=document.getElementById('ans_m311_2'),out=document.getElementById('res_m311_2');if(!input||!out||input.dataset.bound==='true')return;
 input.dataset.bound='true';input.setAttribute('aria-describedby','res_m311_2');out.setAttribute('role','status');out.setAttribute('aria-live','polite');out.setAttribute('aria-atomic','true');
 input.addEventListener('input',()=>{out.textContent='';});input.addEventListener('keydown',event=>{if(event.key==='Enter'){event.preventDefault();check_m311();}});input.closest('.interactive-zone').querySelector('button').onclick=check_m311;
}
