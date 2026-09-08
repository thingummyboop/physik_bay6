function checkMix() {
 const first=document.getElementById('sirup_in'), second=document.getElementById('wasser_in'), feedback=document.getElementById('mix_feedback');
 if (!first || !second || !feedback) return;
 const parse=raw=>{const value=raw.trim().replace(',', '.');if(!/^\d+(?:\.\d{1,2})?$/.test(value))return NaN;const [whole,part='']=value.split('.');return Number(whole)*100+Number(part.padEnd(2,'0'));};
 const a=parse(first.value),b=parse(second.value);
 if (![a,b].every(n=>Number.isSafeInteger(n)&&n>=0&&n<=1200)) {feedback.textContent='Gib für beide Mengen eine Zahl von 0 bis 12 mit höchstens zwei Nachkommastellen ein.';return;}
 const total=a+b, ratio=a>0&&b===5*a, sum=total===1200;
 const amount=(total/100).toLocaleString('de-AT');
 if (ratio&&sum) feedback.textContent='Richtig: 2 + 10 = 12 Becher und 2 : 10 = 1 : 5. Beide Bedingungen stimmen.';
 else if (ratio) feedback.textContent='Das Verhältnis 1 : 5 stimmt. Die Gesamtmenge ist aber '+amount+' statt 12 Becher. Verändere beide Mengen mit demselben Faktor.';
 else if (sum) feedback.textContent='Die Gesamtmenge 12 stimmt. Das Verhältnis passt noch nicht: Wasser muss fünfmal so viel sein wie Sirup. Teile die 12 Becher zuerst in sechs gleiche Teile.';
 else feedback.textContent='Prüfe beide Bedingungen: Die Gesamtmenge ist '+amount+' statt 12 Becher; außerdem muss Wasser fünfmal so viel sein wie Sirup. Insgesamt gibt es sechs gleich große Teile.';
}
function topicInit() {
 const feedback=document.getElementById('mix_feedback');
 for(const id of ['sirup_in','wasser_in']) {
  const input=document.getElementById(id);if(!input||!feedback||input.dataset.bound==='true')continue;
  input.dataset.bound='true';input.setAttribute('aria-describedby','mix_feedback');
  input.addEventListener('input',()=>{feedback.textContent='';});
  input.addEventListener('keydown',event=>{if(event.key==='Enter'){event.preventDefault();checkMix();}});
  input.closest('.interactive-zone').querySelector('button').onclick=checkMix;
 }
}
