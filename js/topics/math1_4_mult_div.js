const writtenCases={multiply:[[286,34],[203,14],[407,26],[24,13],[108,205],[240,30],[999,99],[0,17]],divide:[[816,4],[936,4],[7344,24],[7350,24],[1005,8],[5,8],[1001,25],[0,6]]};
const writtenPlaces=['Einer','Zehner','Hunderter','Tausender','Zehntausender','Hunderttausender'];
function writtenMultiplication(a,b){
 if(!Number.isInteger(a)||!Number.isInteger(b)||a<0||b<0||a>9999||b>999)throw new RangeError('Invalid natural factors');
 const digits=String(a).split('').reverse().map(Number),factor=String(b).split('').reverse().map(Number),steps=[],partials=[];
 factor.forEach((f,row)=>{let carry=0,value=0;digits.forEach((digit,column)=>{
  const incoming=carry,total=digit*f+incoming,last=column===digits.length-1,write=last?total:total%10;carry=Math.floor(total/10);value+=write*10**column;
  const explanation=last?'An der linken Stelle schreibst du '+total+' vollständig hin.':'Schreibe '+(total%10)+' an dieser Stelle; übertrage '+carry+' zur nächsten Stelle.';
  steps.push({kind:'multiply',row,column,place:writtenPlaces[column],digit,factor:f,incoming,expected:total,write,carry,last,partial:value*10**row,prompt:digit+' · '+f+' + '+incoming+' = ?',explanation:digit+' · '+f+' + '+incoming+' = '+total+' '+writtenPlaces[column]+'. '+explanation+(last?' Das Teilprodukt für '+(f*10**row)+' lautet '+(value*10**row)+'.': '')});
 });partials.push(a*f*10**row);});
 steps.push({kind:'sum',expected:a*b,prompt:partials.join(' + ')+' = ?',explanation:'Addiere die stellenrichtig geschriebenen Teilprodukte: '+partials.join(' + ')+' = '+a*b+'.'});
 return {a,b,steps,partials,result:a*b,proof:b>0?(a*b)+' : '+b+' = '+a+'.':'Bei einem Faktor 0 ist das Produkt 0. Division durch 0 ist keine erlaubte Gegenprobe.'};
}
function writtenDivision(a,b){
 if(!Number.isInteger(a)||!Number.isInteger(b)||a<0||a>999999||b<1||b>99)throw new RangeError('Invalid natural division');
 const digits=String(a).split('').map(Number),steps=[];let rest=0,started=false,quotient=0;
 digits.forEach((digit,i)=>{const previous=rest,partial=10*rest+digit,place=digits.length-1-i;rest=partial;
  if(!started&&partial<b&&i<digits.length-1)return;
  started=true;const q=Math.floor(partial/b),product=q*b;rest=partial-product;quotient=10*quotient+q;
  steps.push({kind:'divide',place:writtenPlaces[place],partial,previous,brought:digit,expected:q,product,remainder:rest,quotient,placeIndex:place,prompt:'Wie oft passt '+b+' ganz in '+partial+'?',explanation:partial+' : '+b+' ergibt '+q+' an der '+writtenPlaces[place]+'stelle. '+partial+' − '+product+' = '+rest+' Rest an dieser Stelle.'+(place>0?' Für die nächste Stelle wird dieser Rest verzehnfacht und die nächste Ziffer dazugeholt.':' Das ist der Endrest.')});
 });
 return {a,b,steps,result:quotient,remainder:rest,proof:quotient+' · '+b+' + '+rest+' = '+a+'. Der Endrest '+rest+' ist kleiner als '+b+'.'};
}
function initWrittenCalculation(host){
 if(host.dataset.bound==='true')return;host.dataset.bound='true';
 const kind=host.dataset.writtenLab,select=host.querySelector('select'),input=host.querySelector('input'),prompt=host.querySelector('[data-written-prompt]'),status=host.querySelector('[data-written-status]'),history=host.querySelector('[data-written-history]'),work=host.querySelector('[data-written-progress]'),check=host.querySelector('[data-written-check]'),show=host.querySelector('[data-written-show]');
 let model,index=0,shown=0;
 function clear(){status.textContent='';input.removeAttribute('aria-invalid');}
 function render(){host.dataset.step=index;const done=index===model.steps.length;input.disabled=check.disabled=show.disabled=done;work.textContent='Schritt '+Math.min(index+1,model.steps.length)+' von '+model.steps.length+(done?' – abgeschlossen':'');
  const board=host.querySelector('[data-written-board]'),table=document.createElement('table');table.className='written-board-table';
  if(kind==='multiply'){
   const width=Math.max(String(model.a).length,String(model.result).length),labels=['E','Z','H','T','ZT','HT','M'].slice(0,width).reverse();
   table.innerHTML='<caption>Teilprodukte: E Einer, Z Zehner, H Hunderter, T Tausender, ZT Zehntausender. Punkte markieren noch offene Stellen.</caption><thead><tr><th>Für</th>'+labels.map(x=>'<th>'+x+'</th>').join('')+'</tr></thead><tbody></tbody>';
   for(let row=0;row<model.partials.length;row++){const last=model.steps.slice(0,index).filter(s=>s.kind==='multiply'&&s.row===row).at(-1),factor=Number(String(model.b).split('').reverse()[row])*10**row,tr=document.createElement('tr');tr.innerHTML='<th scope="row">× '+factor+'</th>';
    let chars=Array(width).fill('·');if(last){const known=String(last.partial).padStart(width,'0').split('');chars=last.last?String(last.partial).padStart(width,' ').split(''):known.map((x,i)=>i>=width-row-last.column-1?x:'·');}
    chars.forEach(x=>{const td=document.createElement('td');td.textContent=x;tr.append(td);});table.tBodies[0].append(tr);
   }
   if(done){const tr=document.createElement('tr');tr.innerHTML='<th scope="row">Summe</th>'+String(model.result).padStart(width,' ').split('').map(x=>'<td>'+x+'</td>').join('');table.tBodies[0].append(tr);}
  }else{
   table.innerHTML='<caption>Bearbeitete Stellen: E Einer, Z Zehner, H Hunderter, T Tausender.</caption><thead><tr><th>Stelle</th><th>Zahl</th><th>Ziffer</th><th>Rest</th></tr></thead><tbody></tbody>';
   for(const step of model.steps.slice(0,index)){const tr=document.createElement('tr');tr.innerHTML='<th scope="row">'+['E','Z','H','T','ZT','HT'][step.placeIndex]+'</th><td>'+step.partial+'</td><td>'+step.expected+'</td><td>'+step.remainder+'</td>';table.tBodies[0].append(tr);}
  }
  board.replaceChildren(table);
  if(done){prompt.textContent=kind==='multiply'?'Produkt: '+model.result:'Ganzzahliges Ergebnis: '+model.result+', Rest '+model.remainder;return;}
  const step=model.steps[index];prompt.textContent=(kind==='multiply'?(step.kind==='sum'?'Teilprodukte addieren. ':'Teilprodukt für '+step.factor*10**step.row+': '+model.a+' · '+step.factor+(step.row?', anschließend · '+10**step.row:'')+'. '+step.place+' des ersten Faktors. '):step.place+' des Ergebnisses. ')+step.prompt;
 }
 function reset(){const [a,b]=writtenCases[kind][Number(select.value)];model=kind==='multiply'?writtenMultiplication(a,b):writtenDivision(a,b);index=shown=0;history.replaceChildren();clear();input.value='';render();}
 function advance(revealed){const step=model.steps[index];if(!step)return;if(revealed)shown++;
  const li=document.createElement('li');li.textContent=(revealed?'Gezeigter Schritt: ':'Geprüfter Schritt: ')+step.explanation;history.append(li);index++;input.value='';input.removeAttribute('aria-invalid');render();
  status.textContent=(revealed?'Schritt gezeigt. ':'Richtig. ')+step.explanation;
  if(index===model.steps.length){status.textContent+=' Gegenprobe: '+model.proof+(shown?' '+shown+' Schritte wurden gezeigt. Rechne die Aufgabe anschließend selbst auf Papier.':' Alle Zwischenergebnisse sind richtig.');status.focus();}
  else if(document.activeElement===show)input.focus();
 }
 input.addEventListener('input',clear);
 function verify(){if(index===model.steps.length)return;const raw=input.value.trim(),step=model.steps[index];
  if(!/^\d+$/.test(raw)||!Number.isSafeInteger(Number(raw))){status.textContent='Gib eine ganze Zahl ab 0 ein. Komma, Rechenzeichen und Exponenten sind hier nicht vorgesehen.';input.setAttribute('aria-invalid','true');input.focus();return;}
  const n=Number(raw);if(n>(kind==='divide'?9:9999999)){status.textContent=kind==='divide'?'Gesucht ist genau eine Ergebnisziffer von 0 bis 9.':'Das Zwischenergebnis dieser Aufgaben liegt unter 10 Millionen.';input.setAttribute('aria-invalid','true');input.focus();return;}input.removeAttribute('aria-invalid');if(n===step.expected){advance(false);return;}
  if(kind==='divide')status.textContent=n*model.b>step.partial?'Zu groß: '+n+' · '+model.b+' = '+n*model.b+' ist mehr als '+step.partial+'. Suche das größte passende Vielfache.':'Noch zu klein: Nach '+n+' Gruppen bleiben '+(step.partial-n*model.b)+'. Daraus lässt sich noch eine Gruppe zu '+model.b+' bilden.';
  else status.textContent=step.kind==='sum'?'Prüfe die Stellenwerte beim Addieren. Die Teilprodukte sind '+model.partials.join(' und ')+'.':'Prüfe '+step.digit+' · '+step.factor+' und addiere den Übertrag '+step.incoming+'. Gib zunächst diese ganze Zwischensumme ein; erst danach wird gebündelt.';
 }
 check.addEventListener('click',verify);input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();verify();}});show.addEventListener('click',()=>advance(true));select.addEventListener('change',reset);host.querySelector('[data-written-reset]').addEventListener('click',()=>{reset();input.focus();});reset();
}
function topicInit(){document.querySelectorAll('[data-written-lab]').forEach(initWrittenCalculation);}
Object.assign(window,{writtenMultiplication,writtenDivision,topicInit});
