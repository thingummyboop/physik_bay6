function genPlus(){generateBasics('Plus',1,2,50,10);}
function genMal(){generateBasics('Mal',3,4,9,2);}
function generateBasics(name,first,second,range,offset){
 document.getElementById('num'+first).textContent=Math.floor(Math.random()*range)+offset;
 document.getElementById('num'+second).textContent=Math.floor(Math.random()*range)+offset;
 document.getElementById('ans'+name).value='';document.getElementById('res'+name).textContent='';
}
function checkBasics(name,first,second,multiply){
 const left=Number(document.getElementById('num'+first).textContent),right=Number(document.getElementById('num'+second).textContent),raw=document.getElementById('ans'+name).value.trim(),out=document.getElementById('res'+name);
 if(!/^\d+$/.test(raw)||!Number.isSafeInteger(Number(raw))){out.textContent='Gib eine ganze Zahl ab 0 ein, ohne Komma oder Exponent.';return;}
 const result=multiply?left*right:left+right;
 if(Number(raw)===result){out.textContent=multiply?'Richtig: '+left+' · '+right+' = '+result+'. Gegenprobe: '+result+' ÷ '+right+' = '+left+'.':'Richtig: '+left+' + '+right+' = '+result+'. Gegenprobe: '+result+' − '+right+' = '+left+'.';}
 else{out.textContent=multiply?'Denke an '+left+' Gruppen mit jeweils '+right+'. Nutze '+(left-1)+' · '+right+' und füge noch '+right+' hinzu.':'Zerlege '+right+' in '+(Math.floor(right/10)*10)+' und '+right%10+'. Addiere zuerst die Zehner zu '+left+', dann die übrigen Einer.';}
}
function checkPlus(){checkBasics('Plus',1,2,false);}
function checkMal(){checkBasics('Mal',3,4,true);}
function topicInit(){
 for(const [name,check,generate]of [['Plus',checkPlus,genPlus],['Mal',checkMal,genMal]]){
  const input=document.getElementById('ans'+name);if(!input||input.dataset.basicsBound)continue;
  input.dataset.basicsBound='true';input.addEventListener('input',()=>document.getElementById('res'+name).textContent='');input.addEventListener('keydown',event=>{if(event.key==='Enter'){event.preventDefault();check();}});generate();
 }
}
