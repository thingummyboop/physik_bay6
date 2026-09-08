function check_m310(){
 const raw=document.getElementById('ans_m310_1').value.trim().replace(/−/g,'-'),out=document.getElementById('res_m310_1');
 const value=/^[+-]?(?:\d+(?:[.,]\d+)?|[.,]\d+)$/.test(raw)?Number(raw.replace(',','.')):NaN;
 out.textContent=!Number.isFinite(value)?'Gib eine ganze Zahl oder Dezimalzahl ein, zum Beispiel 1,5.':value===10?"Richtig! 20 % von 50 € sind 10 €. Der Preis nach dem Rabatt ist 40 €.":"Berechne erst 10 % von 50 €: Das sind 5 €. Verdopple für 20 %. Gefragt ist die Ersparnis, nicht der neue Preis.";
}


function topicInit() { bindQuickDecimalAnswer();}

function bindQuickDecimalAnswer(){const input=document.getElementById('ans_m310_1'),out=document.getElementById('res_m310_1');if(!input||!out)return;input.type='text';input.setAttribute('inputmode','decimal');input.setAttribute('aria-label',"Ersparnis in Euro");input.setAttribute('aria-describedby','res_m310_1');out.setAttribute('role','status');out.setAttribute('aria-live','polite');out.setAttribute('aria-atomic','true');input.oninput=()=>out.textContent='';input.onkeydown=event=>{if(event.key==='Enter'){event.preventDefault();check_m310();}};}
