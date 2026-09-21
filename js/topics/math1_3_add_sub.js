let a1,a2,s1,s2;
function newA(){a1=Math.floor(Math.random()*40)+10;a2=Math.floor(Math.random()*40)+10;showArithmetic('add',a1+' + '+a2);}
function newS(){s1=Math.floor(Math.random()*50)+50;s2=Math.floor(Math.random()*40)+10;showArithmetic('sub',s1+' − '+s2);}
function showArithmetic(prefix,expression){document.getElementById(prefix+'A').textContent='Rechne: '+expression+' = ?';document.getElementById(prefix+'I').value='';document.getElementById(prefix+'I').removeAttribute('aria-invalid');document.getElementById(prefix+'F').textContent='';}
function checkArithmetic(prefix,left,right,add){
 const input=document.getElementById(prefix+'I'),feedback=document.getElementById(prefix+'F'),raw=input.value.trim();
 if(!/^\d+$/.test(raw)||!Number.isSafeInteger(Number(raw))){feedback.textContent='Gib eine ganze Zahl ab 0 ein, ohne Komma, Rechenzeichen oder Exponent.';input.setAttribute('aria-invalid','true');input.focus();return;}
 input.removeAttribute('aria-invalid');
 const expected=add?left+right:left-right;
 if(Number(raw)===expected){feedback.textContent=add?'Richtig. Gegenprobe: '+expected+' − '+right+' = '+left+'.':'Richtig. Gegenprobe: '+expected+' + '+right+' = '+left+'.';return;}
 if(add){const ones=left%10+right%10;feedback.textContent=ones>=10?'Prüfe die Einer: '+left%10+' + '+right%10+' = '+ones+'. Bündle 10 Einer zu einem Zehner und rechne ihn bei den Zehnern mit.':'Prüfe die Stellenwerte: Addiere zuerst '+left%10+' und '+right%10+' Einer, dann die Zehner. Kontrolliere mit einer Subtraktion.';}
 else{feedback.textContent=left%10<right%10?'Die Einer reichen noch nicht. Stelle '+left+' als '+(Math.floor(left/10)-1)+' Zehner und '+(10+left%10)+' Einer dar. Ziehe dann stellenweise ab und kontrolliere durch Addition.':'Ziehe Einer von Einern und Zehner von Zehnern ab. Kontrolliere: Dein Ergebnis plus '+right+' muss '+left+' ergeben.';}
}
function chkA(){checkArithmetic('add',a1,a2,true);}
function chkS(){checkArithmetic('sub',s1,s2,false);}
function topicInit(){
 document.querySelectorAll('[data-column-lab]').forEach(initColumnArithmetic);
 for(const [prefix,check,create]of [['add',chkA,newA],['sub',chkS,newS]]){
  const input=document.getElementById(prefix+'I');if(!input||input.dataset.arithmeticBound)continue;
  input.dataset.arithmeticBound='true';input.addEventListener('input',()=>{document.getElementById(prefix+'F').textContent='';input.removeAttribute('aria-invalid');});
  input.addEventListener('keydown',event=>{if(event.key==='Enter'){event.preventDefault();check();}});create();
 }
}

const columnCases={add:[[134,25],[58,36],[597,268],[999,1],[4095,708],[8709,1384],[9999,999],[0,407]],subtract:[[73,48],[302,178],[400,156],[1000,1],[1000,578],[1010,909],[507,507],[0,0]]};
const columnNames=['Einer','Zehner','Hunderter','Tausender','Zehntausender','Hunderttausender'];
function columnArithmeticModel(a,b,operation){
 if(!Number.isInteger(a)||!Number.isInteger(b)||a<0||b<0||a>99999||b>99999||!['add','subtract'].includes(operation)||operation==='subtract'&&b>a)throw new RangeError('Invalid natural arithmetic');
 const width=Math.max(String(a).length,String(b).length),left=Array.from({length:width},(_,i)=>Math.floor(a/10**i)%10),right=Array.from({length:width},(_,i)=>Math.floor(b/10**i)%10),steps=[],working=left.slice();let carry=0,result=0;
 for(let column=0;column<width||(operation==='add'&&carry);column++){
  if(operation==='add'){
   const x=left[column]||0,y=right[column]||0,incoming=carry,total=x+y+carry,digit=total%10;carry=Math.floor(total/10);result+=digit*10**column;
   steps.push({kind:'add',column,x,y,incoming,expected:total,digit,carry,prompt:columnNames[column]+': '+x+' + '+y+' + '+incoming+' Übertrag = ?',explanation:x+' + '+y+' + '+incoming+' = '+total+' '+columnNames[column]+'. Schreibe '+digit+'; '+(carry?'bündle 10 davon zur nächsten Stelle und übertrage 1.':'es entsteht kein neuer Übertrag.')});
  }else{
   if(working[column]<right[column]){let source=column+1;while(working[source]===0)source++;
    for(let k=source;k>column;k--){const before=working.slice(),old=working[k-1];working[k]--;working[k-1]+=10;
     steps.push({kind:'exchange',column:k-1,source:k,before,after:working.slice(),expected:working[k-1],prompt:'Tausche 1 '+columnNames[k]+' in '+columnNames[k-1]+'. Dort liegen bisher '+old+'. Wie viele sind es danach?',explanation:'1 '+columnNames[k]+' entspricht 10 '+columnNames[k-1]+'. '+old+' + 10 = '+working[k-1]+'. An der '+columnNames[k]+'stelle bleibt '+working[k]+'. Der dargestellte Wert bleibt '+a+'.'});
    }
   }
   const digit=working[column]-right[column];result+=digit*10**column;
   steps.push({kind:'subtract',column,x:working[column],y:right[column],after:working.slice(),expected:digit,digit,prompt:columnNames[column]+': '+working[column]+' − '+right[column]+' = ?',explanation:working[column]+' − '+right[column]+' = '+digit+' '+columnNames[column]+'. Schreibe '+digit+' an die Ergebnisstelle.'});
  }
 }
 return {a,b,operation,width:Math.max(width,String(result).length),left,right,steps,result,proof:operation==='add'?result+' − '+b+' = '+a:result+' + '+b+' = '+a};
}
function initColumnArithmetic(host){
 if(host.dataset.bound==='true')return;host.dataset.bound='true';const operation=host.dataset.columnLab,select=host.querySelector('select'),input=host.querySelector('input'),status=host.querySelector('[data-column-status]'),check=host.querySelector('[data-column-check]'),show=host.querySelector('[data-column-show]'),history=host.querySelector('[data-column-history]');let model,index=0,shown=0;
 function render(){const done=index===model.steps.length;host.dataset.step=index;input.disabled=check.disabled=show.disabled=done;host.querySelector('[data-column-progress]').textContent='Schritt '+Math.min(index+1,model.steps.length)+' von '+model.steps.length+(done?' – abgeschlossen':'');host.querySelector('[data-column-prompt]').textContent=done?'Ergebnis: '+model.result:model.steps[index].prompt;
  const table=document.createElement('table');table.className='written-board-table column-board';const labels=['E','Z','H','T','ZT','HT'].slice(0,model.width).reverse();table.innerHTML='<caption>E Einer, Z Zehner, H Hunderter, T Tausender, ZT Zehntausender. Punkte sind noch offene Ergebnisstellen.</caption><thead><tr><th>Zeile</th>'+labels.map(x=>'<th>'+x+'</th>').join('')+'</tr></thead><tbody></tbody>';
  const completed=model.steps.slice(0,index),results=Array(model.width).fill('·');completed.filter(s=>s.kind!=='exchange').forEach(s=>results[s.column]=s.digit);
  const row=(title,values)=>{const tr=document.createElement('tr');tr.innerHTML='<th scope="row">'+title+'</th>';for(let i=model.width-1;i>=0;i--){const td=document.createElement('td');td.textContent=values[i]??'';tr.append(td);}table.tBodies[0].append(tr);};
  row('oben',model.left);row(operation==='add'?'+':'−',model.right);
  if(operation==='add'){const carries=Array(model.width).fill('');for(const s of completed)if(s.carry)carries[s.column+1]=s.carry;row('Übertr.',carries);}else{const latest=completed.filter(s=>s.after).at(-1);row('getauscht',latest?latest.after:model.left);}
  row('Ergebnis',results);host.querySelector('[data-column-board]').replaceChildren(table);
 }
 function clear(){status.textContent='';input.removeAttribute('aria-invalid');}
 function reset(){const[a,b]=columnCases[operation][Number(select.value)];model=columnArithmeticModel(a,b,operation);index=shown=0;history.replaceChildren();input.value='';clear();render();}
 function advance(revealed){const step=model.steps[index];if(!step)return;if(revealed)shown++;const li=document.createElement('li');li.textContent=(revealed?'Gezeigt: ':'Geprüft: ')+step.explanation;history.append(li);index++;input.value='';input.removeAttribute('aria-invalid');render();status.textContent=(revealed?'Schritt gezeigt. ':'Richtig. ')+step.explanation;
  if(index===model.steps.length){status.textContent+=' Gegenprobe: '+model.proof+'. '+(shown?shown+' Schritte wurden gezeigt. Rechne anschließend selbst auf Papier.':'Alle Zwischenergebnisse sind richtig.');status.focus();}else if(document.activeElement===show)input.focus();
 }
 function verify(){if(index===model.steps.length)return;const raw=input.value.trim(),step=model.steps[index];if(!/^\d+$/.test(raw)||Number(raw)>99){status.textContent='Gib eine ganze Zahl von 0 bis 99 ein. Hier ist nur der aktuelle Stellenschritt gefragt.';input.setAttribute('aria-invalid','true');input.focus();return;}input.removeAttribute('aria-invalid');if(Number(raw)===step.expected){advance(false);return;}
  status.textContent=step.kind==='exchange'?'Beim Tauschen kommen 10 Einheiten zur kleineren Stelle dazu. Gleichzeitig wird die größere Stelle um 1 vermindert.':step.kind==='add'?'Addiere beide Ziffern und den eingehenden Übertrag '+step.incoming+'. Gib die ganze Summe ein, bevor sie gebündelt wird.':'Ziehe '+step.y+' von den jetzt vorhandenen '+step.x+' ab. Verwende die getauschte Darstellung und vertausche die Zahlen nicht.';
 }
 input.addEventListener('input',clear);input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();verify();}});check.addEventListener('click',verify);show.addEventListener('click',()=>advance(true));select.addEventListener('change',reset);host.querySelector('[data-column-reset]').addEventListener('click',()=>{reset();input.focus();});reset();
}
Object.assign(window,{columnArithmeticModel,initColumnArithmetic});
