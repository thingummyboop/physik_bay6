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
 initRatioEquations();
 const feedback=document.getElementById('mix_feedback');
 for(const id of ['sirup_in','wasser_in']) {
  const input=document.getElementById(id);if(!input||!feedback||input.dataset.bound==='true')continue;
  input.dataset.bound='true';input.setAttribute('aria-describedby','mix_feedback');
  input.addEventListener('input',()=>{feedback.textContent='';});
  input.addEventListener('keydown',event=>{if(event.key==='Enter'){event.preventDefault();checkMix();}});
  input.closest('.interactive-zone').querySelector('button').onclick=checkMix;
 }
}

function ratioEquationModel(index) {
 const cases=[[null,5,3,2],[4,null,2,3],[3,4,null,20],[2,5,6,null],[null,8,3,4],[5,null,2,3],[2,3,null,12],[3,4,9,null]];
 if(!Number.isInteger(index)||index<0||index>=cases.length)throw new RangeError('Unknown ratio case');
 const values=cases[index].slice(),slot=values.indexOf(null),coefficient=values[[3,2,1,0][slot]],product=slot===0||slot===3?values[1]*values[2]:values[0]*values[3],answer=product/coefficient;
 const shown=n=>n===null?'x':n.toLocaleString('de-AT'),equation=shown(values[0])+' : '+shown(values[1])+' = '+shown(values[2])+' : '+shown(values[3]);
 const cross=shown(values[0])+' · '+shown(values[3])+' = '+shown(values[2])+' · '+shown(values[1]);
 const filled=values.map(n=>n===null?answer:n),probe=shown(filled[0])+' / '+shown(filled[1])+' = '+shown(filled[2])+' / '+shown(filled[3]);
 return {values,slot,coefficient,product,answer,equation,cross,probe,denominator:slot===1||slot===3};
}

function initRatioEquations() {
 const host=document.querySelector('[data-ratio-equation-lab]');if(!host||host.dataset.bound==='true')return;host.dataset.bound='true';
 const task=host.querySelector('#ratio-case'),input=host.querySelector('#ratio-answer'),status=host.querySelector('#ratio-result'),work=host.querySelector('#ratio-work'),reveal=host.querySelector('[data-ratio-reveal]');
 const show=n=>n.toLocaleString('de-AT');
 function clear(){status.textContent='';input.removeAttribute('aria-invalid');}
 function render(){const model=ratioEquationModel(Number(task.value));host.querySelector('[data-ratio-equation]').textContent=model.equation+(model.denominator?' (x ≠ 0)':'');input.value='';clear();work.hidden=true;reveal.setAttribute('aria-expanded','false');reveal.textContent='Rechenweg zeigen';work.replaceChildren();for(const text of [model.cross,model.coefficient+' · x = '+show(model.product)+' → x = '+show(model.product)+' : '+model.coefficient+' = '+show(model.answer),'Probe: '+model.probe+'. Beide Quotienten stimmen überein.'+(model.denominator?' Der Nenner x ist nicht null.':'')]){const p=document.createElement('p');p.textContent=text;work.append(p);}}
 function check(){const model=ratioEquationModel(Number(task.value)),raw=input.value.trim().replace(',','.');
  if(!/^\d+(?:\.\d{1,2})?$/.test(raw)||!Number.isFinite(Number(raw))||Number(raw)>1000000){status.textContent='Gib eine nicht negative Zahl mit höchstens zwei Nachkommastellen ein (bis 1 000 000).';input.setAttribute('aria-invalid','true');input.focus();return;}
  const value=Number(raw);input.removeAttribute('aria-invalid');
  if(model.denominator&&value===0){status.textContent='x steht im Nenner. Durch null darfst du nicht teilen; x = 0 ist hier ausgeschlossen.';input.setAttribute('aria-invalid','true');input.focus();return;}
  const values=model.values.map(n=>n===null?value:n),left=values[0]*values[3],right=values[2]*values[1];
  if(Math.abs(value-model.answer)<1e-9)status.textContent='Richtig: x = '+show(value)+'. Probe: '+model.probe+'.';
  else status.textContent='Noch nicht: Mit x = '+show(value)+' ergeben die Kreuzprodukte '+show(left)+' und '+show(right)+'. Sie müssen gleich sein. Stelle '+model.cross+' auf und isoliere x.';
 }
 task.addEventListener('change',render);input.addEventListener('input',clear);input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();check();}});host.querySelector('[data-ratio-check]').addEventListener('click',check);
 reveal.addEventListener('click',()=>{work.hidden=!work.hidden;reveal.setAttribute('aria-expanded',String(!work.hidden));reveal.textContent=work.hidden?'Rechenweg zeigen':'Rechenweg ausblenden';});
 host.querySelector('[data-ratio-reset]').addEventListener('click',()=>{render();input.focus();});render();
}
Object.assign(window,{ratioEquationModel,initRatioEquations});
