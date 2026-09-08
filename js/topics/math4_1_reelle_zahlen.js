function checkRoot1(){
 const raw=document.getElementById('root1').value.trim().replace(/−/g,'-'),out=document.getElementById('feedback1');
 const value=/^[+-]?(?:\d+(?:[.,]\d+)?|[.,]\d+)$/.test(raw)?Number(raw.replace(',','.')):NaN;
 out.textContent=!Number.isFinite(value)?'Gib eine ganze Zahl oder Dezimalzahl ein, zum Beispiel 1,5.':value===5?"Richtig! 5 m · 5 m = 25 m².":"Gesucht ist die nichtnegative Seitenlänge: Welche Zahl ergibt mit sich selbst multipliziert 25?";
}
function updateRootEstimate(){
 const input=document.getElementById('root_estimate'),out=document.getElementById('root_estimate_result');
 if(!input||!out)return;
 const value=Number(input.value),square=value*value;
 const format=(n,d)=>n.toLocaleString('de-AT',{minimumFractionDigits:d,maximumFractionDigits:d});
 out.textContent=format(value,3)+'² = '+format(square,6)+'. Das ist '+(square<2?'kleiner':'größer')+' als 2. Deine Näherung liegt '+(square<2?'unter':'über')+' √2.';
 input.setAttribute('aria-valuetext',format(value,3));
}
function topicInit() { bindQuickDecimalAnswer();
 const input=document.getElementById('root1'),fb=document.getElementById('feedback1');
 if(input&&fb){fb.setAttribute('role','status');fb.setAttribute('aria-live','polite');fb.setAttribute('aria-atomic','true');input.setAttribute('aria-describedby','feedback1');input.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();checkRoot1();}};}
 const slider=document.getElementById('root_estimate');if(slider){slider.oninput=updateRootEstimate;updateRootEstimate();}
}

function bindQuickDecimalAnswer(){const input=document.getElementById('root1'),out=document.getElementById('feedback1');if(!input||!out)return;input.type='text';input.setAttribute('inputmode','decimal');input.setAttribute('aria-label',"Seitenlänge in Metern");input.setAttribute('aria-describedby','feedback1');out.setAttribute('role','status');out.setAttribute('aria-live','polite');out.setAttribute('aria-atomic','true');input.oninput=()=>out.textContent='';input.onkeydown=event=>{if(event.key==='Enter'){event.preventDefault();checkRoot1();}};}
