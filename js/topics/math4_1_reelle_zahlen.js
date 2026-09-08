function checkRoot1() {
 const input=document.getElementById('root1'),fb=document.getElementById('feedback1');
 const raw=input.value.trim();
 fb.textContent=raw!==''&&Number(raw)===5?'Richtig! 5 m · 5 m = 25 m².':'Welche nichtnegative Zahl ergibt mit sich selbst multipliziert 25?';
}
function updateRootEstimate(){
 const input=document.getElementById('root_estimate'),out=document.getElementById('root_estimate_result');
 if(!input||!out)return;
 const value=Number(input.value),square=value*value;
 const format=(n,d)=>n.toLocaleString('de-AT',{minimumFractionDigits:d,maximumFractionDigits:d});
 out.textContent=format(value,3)+'² = '+format(square,6)+'. Das ist '+(square<2?'kleiner':'größer')+' als 2. Deine Näherung liegt '+(square<2?'unter':'über')+' √2.';
 input.setAttribute('aria-valuetext',format(value,3));
}
function topicInit(){
 const input=document.getElementById('root1'),fb=document.getElementById('feedback1');
 if(input&&fb){fb.setAttribute('role','status');fb.setAttribute('aria-live','polite');fb.setAttribute('aria-atomic','true');input.setAttribute('aria-describedby','feedback1');input.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();checkRoot1();}};}
 const slider=document.getElementById('root_estimate');if(slider){slider.oninput=updateRootEstimate;updateRootEstimate();}
}
