function checkZ(){const raw=document.getElementById('inputZehner').value.trim(),out=document.getElementById('feedZ');if(!/^[0-9]$/.test(raw)){out.textContent='Gib genau eine Ziffer von 0 bis 9 ein. Gesucht ist die mittlere Ziffer in 182.';return;}out.textContent=raw==='8'?'Richtig! Die Ziffer 8 steht an der Zehnerstelle. Ihr Wert ist 80.':'Schau auf die mittlere Ziffer in 182: Links stehen Hunderter, in der Mitte Zehner und rechts Einer.';}
function romanReadingModel(index) {
 const cases=['I','IV','VI','IX','XII','XIV','XIX','XXIV','XXXIX','XL','XLIV','XLIX','LVIII','XC','XCIV','XCIX','CD','CDXLIV','CM','CMXLIV','MCDXCII','MDCCCXLVIII','MCMLXXXVIII','MCMXCIX','MMXXVI','MMMCMXCIX','IIII'];
 if(!Number.isInteger(index)||index<0||index>=cases.length)return null;
 const roman=cases[index],values={I:1,V:5,X:10,L:50,C:100,D:500,M:1000},pairs={IV:4,IX:9,XL:40,XC:90,CD:400,CM:900},groups=[];
 for(let i=0;i<roman.length;i++) {
  const pair=roman.slice(i,i+2);
  if(pairs[pair]){groups.push({text:pair,value:pairs[pair],calculation:values[pair[1]]+' − '+values[pair[0]]});i++;}
  else groups.push({text:roman[i],value:values[roman[i]],calculation:String(values[roman[i]])});
 }
 return {roman,groups,value:groups.reduce((sum,g)=>sum+g.value,0),clock:index===cases.length-1};
}
function bindRomanReading() {
 const host=document.querySelector('[data-roman-lab]');if(!host||host.dataset.bound)return;
 host.dataset.bound='true';const get=s=>host.querySelector(s),select=get('#roman-case'),input=get('#roman-answer'),status=get('#roman-status'),steps=get('[data-roman-steps]');
 for(let i=0;romanReadingModel(i);i++){const m=romanReadingModel(i),option=document.createElement('option');option.value=String(i);option.textContent=m.roman+(m.clock?' (Zifferblatt)':'');select.append(option);}
 const clear=()=>{status.textContent='';};
 function update(){const m=romanReadingModel(Number(select.value));get('[data-roman-question]').textContent='Lies '+m.roman+(m.clock?' auf dem Zifferblatt.':'.');input.value='';clear();steps.hidden=true;steps.replaceChildren();}
 function check(){const raw=input.value.trim(),m=romanReadingModel(Number(select.value));if(!/^\d{1,4}$/.test(raw)||Number(raw)<1){status.textContent='Gib eine ganze Zahl von 1 bis 3999 mit Dezimalziffern ein.';return;}if(Number(raw)>3999){status.textContent='Gib eine ganze Zahl von 1 bis 3999 mit Dezimalziffern ein.';return;}status.textContent=Number(raw)===m.value?'Richtig: '+m.roman+' = '+m.value+'.':'Noch nicht. Prüfe zuerst die Subtraktionspaare und addiere dann die Gruppen. „Leseweg anzeigen“ hilft dir weiter.';}
 select.addEventListener('change',update);input.addEventListener('input',clear);input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();check();}});get('[data-roman-check]').addEventListener('click',check);
 get('[data-roman-show]').addEventListener('click',()=>{const m=romanReadingModel(Number(select.value));steps.hidden=false;steps.innerHTML='<table class="natural-table"><caption>Leseweg für '+m.roman+'</caption><thead><tr><th scope="col">Teil</th><th scope="col">Rechnung</th><th scope="col">Wert</th></tr></thead><tbody>'+m.groups.map(g=>'<tr><th scope="row">'+g.text+'</th><td>'+g.calculation+'</td><td>'+g.value+'</td></tr>').join('')+'</tbody></table><p>'+m.groups.map(g=>g.value).join(' + ')+' = '+m.value+'</p>'+(m.clock?'<p>IIII wird auf manchen Zifferblättern für 4 verwendet. Im Kurzschreibschema der übrigen Beispiele steht IV.</p>':'');status.textContent='Leseweg angezeigt: '+m.roman+' = '+m.value+'.';});
 get('[data-roman-reset]').addEventListener('click',()=>{select.value='11';update();select.focus();});select.value='11';update();
}
function topicInit(){bindRomanReading();const input=document.getElementById('inputZehner'),out=document.getElementById('feedZ');if(!input||input.dataset.digitBound)return;input.dataset.digitBound='true';out.setAttribute('role','status');out.setAttribute('aria-live','polite');out.setAttribute('aria-atomic','true');input.addEventListener('input',()=>out.textContent='');input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();checkZ();}});}
