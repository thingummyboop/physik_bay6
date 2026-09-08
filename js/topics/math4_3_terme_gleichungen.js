function checkTerm1(){
 const raw=document.getElementById('term1').value.trim().replace(/−/g,'-'),out=document.getElementById('fb_term1');
 const value=/^[+-]?(?:\d+(?:[.,]\d+)?|[.,]\d+)$/.test(raw)?Number(raw.replace(',','.')):NaN;
 out.textContent=!Number.isFinite(value)?'Gib eine ganze Zahl oder Dezimalzahl ein, zum Beispiel 1,5.':value===6?"Richtig! 2 · 3 = 6.":"Setze für die Variable 3 ein und multipliziere mit 2: 3 + 3 = 6.";
}


const equationPracticeTasks = [
 {states:['3x + 4 = 2x + 9','x + 4 = 9','x = 5'],steps:[
  [['Auf beiden Seiten 2x subtrahieren.',true,'So bleibt links x und rechts kein x-Term.'],['Nur rechts 2x subtrahieren.',false,'Du musst denselben Term auf beiden Seiten subtrahieren.'],['3x + 4 zu 7x zusammenfassen.',false,'3x und die Konstante 4 sind nicht gleichartig.']],
  [['Auf beiden Seiten 4 subtrahieren.',true,'x steht nun allein; 9 − 4 = 5.'],['Nur links 4 subtrahieren.',false,'Auch rechts muss 4 subtrahiert werden.'],['x + 4 als 4x schreiben.',false,'Addition und Multiplikation sind verschiedene Operationen.']]],probe:'Probe: 3 · 5 + 4 = 19 und 2 · 5 + 9 = 19.'},
 {states:['2(x − 3) = x + 4','2x − 6 = x + 4','x − 6 = 4','x = 10'],steps:[
  [['Links zu 2x − 6 ausmultiplizieren.',true,'Die 2 wird mit beiden Termen in der Klammer multipliziert.'],['Links zu 2x − 3 ausmultiplizieren.',false,'Auch die −3 muss mit 2 multipliziert werden.'],['Links zu 2x + 6 ausmultiplizieren.',false,'2 · (−3) = −6. Das Vorzeichen bleibt negativ.']],
  [['Auf beiden Seiten x subtrahieren.',true,'2x − x = x und rechts fällt x weg.'],['Nur links x subtrahieren.',false,'Subtrahiere x auch auf der rechten Seite.'],['Auf beiden Seiten durch 0 dividieren.',false,'Division durch 0 ist nicht definiert.']],
  [['Auf beiden Seiten 6 addieren.',true,'Links hebt +6 die −6 auf; rechts gilt 4 + 6 = 10.'],['Nur links 6 addieren.',false,'Die rechte Seite muss ebenfalls um 6 erhöht werden.'],['x − 6 als −6x schreiben.',false,'Die Differenz aus x und 6 ist kein Produkt.']]],probe:'Probe: 2 · (10 − 3) = 14 und 10 + 4 = 14.'},
 {states:['(x + 2) : 3 = 4','x + 2 = 12','x = 10'],steps:[
  [['Beide Seiten mit 3 multiplizieren.',true,'Links hebt die Multiplikation die Division auf, rechts gilt 4 · 3 = 12.'],['Nur links mit 3 multiplizieren.',false,'Multipliziere auch die rechte Seite mit 3.'],['Links als x + 2 : 3 schreiben.',false,'Die Klammer zeigt: Die gesamte Summe wird durch 3 geteilt.']],
  [['Auf beiden Seiten 2 subtrahieren.',true,'12 − 2 = 10; links steht x allein.'],['Nur rechts 2 subtrahieren.',false,'Auf beiden Seiten muss dieselbe Zahl subtrahiert werden.'],['x + 2 als 2x zusammenfassen.',false,'x und 2 sind nicht gleichartig.']]],probe:'Probe: (10 + 2) : 3 = 4.'}
];

function bindEquationPractice() {
 const host=document.querySelector('[data-equation-practice]');if(!host)return;
 const select=host.querySelector('#equation_task'),current=host.querySelector('[data-equation-current]'),options=host.querySelector('[data-equation-options]'),feedback=host.querySelector('[data-equation-feedback]'),history=host.querySelector('[data-equation-history]');
 let step=0;
 const render=()=>{
  const task=equationPracticeTasks[Number(select.value)];current.textContent=task.states[step];options.replaceChildren();
  if(step===task.steps.length){feedback.textContent='Gelöst. '+task.probe;return;}
  // Rotate options by step/task so the right operation is not always in the same place.
  const rows=task.steps[step],offset=(step+Number(select.value))%rows.length;
  for(let n=0;n<rows.length;n++){
   const [label,correct,explanation]=rows[(n+offset)%rows.length],button=document.createElement('button');button.type='button';button.textContent=label;
   button.onclick=()=>{
    if(!correct){feedback.textContent=explanation;return;}
    const li=document.createElement('li');li.textContent=task.states[step]+' → '+label;history.append(li);step++;feedback.textContent=explanation;render();
    (options.querySelector('button')||host.querySelector('[data-equation-reset]')).focus();
   };options.append(button);
  }
 };
 const reset=()=>{step=0;history.replaceChildren();feedback.textContent='Wähle einen zulässigen Schritt, der die Gleichung vereinfacht.';render();};
 select.onchange=reset;host.querySelector('[data-equation-reset]').onclick=reset;reset();
}

function topicInit() { bindQuickDecimalAnswer();
 bindEquationPractice();
 const input=document.getElementById('term1'),feedback=document.getElementById('fb_term1');
 if(input&&feedback){input.setAttribute('aria-label','Wert von 2 mal 3 in Euro');feedback.setAttribute('role','status');input.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();checkTerm1();}};}
}

function bindQuickDecimalAnswer(){const input=document.getElementById('term1'),out=document.getElementById('fb_term1');if(!input||!out)return;input.type='text';input.setAttribute('inputmode','decimal');input.setAttribute('aria-label',"Wert von 2 mal 3 in Euro");input.setAttribute('aria-describedby','fb_term1');out.setAttribute('role','status');out.setAttribute('aria-live','polite');out.setAttribute('aria-atomic','true');input.oninput=()=>out.textContent='';input.onkeydown=event=>{if(event.key==='Enter'){event.preventDefault();checkTerm1();}};}
