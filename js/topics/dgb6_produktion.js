function topicInit() {
 const root=document.querySelector('[data-counter-debug]');
 if(!root||root.dataset.bound==='true')return;
 root.dataset.bound='true';
 const inputs=[...root.querySelectorAll('[data-counter-answer]')],version=root.querySelector('[data-counter-version]'),step=root.querySelector('[data-counter-step]'),reset=root.querySelector('[data-counter-reset]'),status=root.querySelector('[data-counter-status]'),trace=root.querySelector('[data-counter-trace]'),code=root.querySelector('[data-counter-code]');
 let index=0,points=0;
 function restart(){
  index=0;points=0;trace.replaceChildren();step.disabled=false;
  code.textContent=version.value==='bug'?'Für jede der drei Antworten:\n  Setze Punkte auf 0\n  Wenn die Antwort richtig ist:\n    Erhöhe Punkte um 2\n  Zeige Punkte':'Setze Punkte auf 0\nFür jede der drei Antworten:\n  Wenn die Antwort richtig ist:\n    Erhöhe Punkte um 2\n  Zeige Punkte';
  status.textContent='Start: 0 Punkte. Noch keine Antwort ausgeführt.';
 }
 step.addEventListener('click',()=>{
  if(index>=inputs.length)return;
  const before=points;
  if(version.value==='bug')points=0;
  const afterReset=points,correct=inputs[index].value==='yes';
  if(correct)points+=2;
  const row=document.createElement('tr');
  for(const value of [(index+1)+': '+(correct?'richtig':'falsch'),before,afterReset,points]){const cell=document.createElement('td');cell.textContent=String(value);row.append(cell);}
  trace.append(row);index++;
  status.textContent='Antwort '+index+' von 3: '+(correct?'richtig':'falsch')+'. Vorher '+before+', nach dem Zurücksetzen/Beibehalten '+afterReset+', danach '+points+' Punkte.';
  if(index===inputs.length){
   const expected=inputs.filter(input=>input.value==='yes').length*2;
   status.textContent+=' Ende. Spielregel erwartet '+expected+' Punkte; Programm zeigt '+points+'.';
   step.disabled=true;if(document.activeElement===step)reset.focus();
  }
 });
 reset.addEventListener('click',restart);
 for(const input of [...inputs,version])input.addEventListener('change',restart);
 restart();
}
