function checkAehn() {
 const input=document.getElementById('aehn_sel'),feedback=document.getElementById('aehn_feedback');if(!input||!feedback)return;
 feedback.textContent=input.value==='green'?'Richtig: Bei B gilt 8 : 4 = 2 und 4 : 2 = 2. Beide Seiten haben denselben Faktor 2.':input.value==='red'?'Noch nicht: Bei C wären die Faktoren 3 : 4 = 0,75 und 3 : 2 = 1,5. Sie sind verschieden; C ist nicht ähnlich zu A.':'Wähle zuerst Figur B oder Figur C.';
}
function topicInit() {
 const input=document.getElementById('aehn_sel'),feedback=document.getElementById('aehn_feedback');if(!input||!feedback||input.dataset.bound==='true')return;
 input.dataset.bound='true';input.setAttribute('aria-describedby','aehn_feedback');
 input.addEventListener('change',()=>{feedback.textContent='';});
 input.addEventListener('keydown',event=>{if(event.key==='Enter'){event.preventDefault();checkAehn();}});
 input.closest('.interactive-zone').querySelector('button').onclick=checkAehn;
}
