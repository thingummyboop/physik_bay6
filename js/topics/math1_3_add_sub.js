let a1,a2,s1,s2;
function newA(){a1=Math.floor(Math.random()*40)+10;a2=Math.floor(Math.random()*40)+10;showArithmetic('add',a1+' + '+a2);}
function newS(){s1=Math.floor(Math.random()*50)+50;s2=Math.floor(Math.random()*40)+10;showArithmetic('sub',s1+' − '+s2);}
function showArithmetic(prefix,expression){document.getElementById(prefix+'A').textContent='Rechne: '+expression+' = ?';document.getElementById(prefix+'I').value='';document.getElementById(prefix+'F').textContent='';}
function checkArithmetic(prefix,left,right,add){
 const input=document.getElementById(prefix+'I'),feedback=document.getElementById(prefix+'F'),raw=input.value.trim();
 if(!/^\d+$/.test(raw)||!Number.isSafeInteger(Number(raw))){feedback.textContent='Gib eine ganze Zahl ab 0 ein, ohne Komma, Rechenzeichen oder Exponent.';return;}
 const expected=add?left+right:left-right;
 if(Number(raw)===expected){feedback.textContent=add?'Richtig. Gegenprobe: '+expected+' − '+right+' = '+left+'.':'Richtig. Gegenprobe: '+expected+' + '+right+' = '+left+'.';return;}
 if(add){const ones=left%10+right%10;feedback.textContent=ones>=10?'Prüfe die Einer: '+left%10+' + '+right%10+' = '+ones+'. Bündle 10 Einer zu einem Zehner und rechne ihn bei den Zehnern mit.':'Prüfe die Stellenwerte: Addiere zuerst '+left%10+' und '+right%10+' Einer, dann die Zehner. Kontrolliere mit einer Subtraktion.';}
 else{feedback.textContent=left%10<right%10?'Die Einer reichen noch nicht. Stelle '+left+' als '+(Math.floor(left/10)-1)+' Zehner und '+(10+left%10)+' Einer dar. Ziehe dann stellenweise ab und kontrolliere durch Addition.':'Ziehe Einer von Einern und Zehner von Zehnern ab. Kontrolliere: Dein Ergebnis plus '+right+' muss '+left+' ergeben.';}
}
function chkA(){checkArithmetic('add',a1,a2,true);}
function chkS(){checkArithmetic('sub',s1,s2,false);}
function topicInit(){
 for(const [prefix,check,create]of [['add',chkA,newA],['sub',chkS,newS]]){
  const input=document.getElementById(prefix+'I');if(!input||input.dataset.arithmeticBound)continue;
  input.dataset.arithmeticBound='true';input.addEventListener('input',()=>document.getElementById(prefix+'F').textContent='');
  input.addEventListener('keydown',event=>{if(event.key==='Enter'){event.preventDefault();check();}});create();
 }
}
