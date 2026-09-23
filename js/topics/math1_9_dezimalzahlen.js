const decimalCases={
 add:[['4,35','2,7'],['0,75','0,125'],['12,6','0,45'],['9,99','0,01'],['3,09','12,7'],['0','0,08']],
 subtract:[['5,3','1,75'],['8','3,47'],['10','0,025'],['7,04','2,9'],['1,01','0,909'],['0,5','0,50']],
 multiply:[['1,2','0,3'],['0,3','0,2'],['4,8','2,1'],['2,05','6'],['0,04','0,09'],['0','1,7']],
 divide:[['6,4','2'],['3,6','4'],['1','8'],['10,05','5'],['0,75','3'],['0','6']]
};
function decimalParts(text){
 if(typeof text!=='string'||!/^\d{1,4}(?:,\d{1,3})?$/.test(text))throw new RangeError('Nichtnegative Dezimalzahl mit höchstens drei Nachkommastellen erwartet.');
 const[whole,fraction='']=text.split(',');return {units:Number(whole+fraction),scale:fraction.length};
}
function decimalFormat(units,scale){const s=String(units).padStart(scale+1,'0');return scale?s.slice(0,-scale)+','+s.slice(-scale):s;}
function decimalPlace(power){return ({'-3':'Tausendstel','-2':'Hundertstel','-1':'Zehntel',0:'Einer',1:'Zehner',2:'Hunderter',3:'Tausender',4:'Zehntausender',5:'Hunderttausender',6:'Millionen'})[power]||'10^'+power;}
function decimalCalculation(a,b,kind){
 const A=decimalParts(a),B=decimalParts(b),steps=[];let scale=Math.max(A.scale,B.scale),resultUnits,resultScale,board;
 const push=(type,expected,prompt,explanation,extra={})=>steps.push({type,expected,prompt,explanation,...extra});
 if(kind==='add'||kind==='subtract'){
  const x=A.units*10**(scale-A.scale),y=B.units*10**(scale-B.scale);if(kind==='subtract'&&x<y)throw new RangeError('Negatives Ergebnis gehört nicht zu dieser Werkstatt.');
  resultUnits=kind==='add'?x+y:x-y;resultScale=scale;
  const width=Math.max(String(x).length,String(y).length,String(resultUnits).length,scale+1),left=Array.from({length:width},(_,i)=>Math.floor(x/10**i)%10),right=Array.from({length:width},(_,i)=>Math.floor(y/10**i)%10),working=left.slice();let carry=0;
  board={width,scale,left,right};
  push('align',scale,'Wie viele Nachkommastellen brauchst du mindestens, damit beide Zahlen gleich viele haben?',a+' = '+decimalFormat(x,scale)+' und '+b+' = '+decimalFormat(y,scale)+'. Endnullen ändern den Wert nicht. Gleiche Stellenwerte stehen untereinander.');
  for(let column=0;column<width;column++){
   const place=decimalPlace(column-scale);
   if(kind==='add'){const incoming=carry,total=left[column]+right[column]+incoming;carry=Math.floor(total/10);push('add',total,place+': '+left[column]+' + '+right[column]+' + '+incoming+' Übertrag = ?',total+' '+place+': Schreibe '+total%10+'; '+(carry?'tausche 10 davon gegen 1 an der nächstgrößeren Stelle.':'kein neuer Übertrag.'),{column,digit:total%10,incoming,carry});}
   else{
    if(working[column]<right[column]){let source=column+1;while(working[source]===0)source++;for(let k=source;k>column;k--){const before=working.slice();working[k]--;working[k-1]+=10;push('exchange',working[k-1],'Tausche 1 '+decimalPlace(k-scale)+' in '+decimalPlace(k-1-scale)+'. Wie viele liegen danach an der kleineren Stelle?',before[k-1]+' + 10 = '+working[k-1]+' '+decimalPlace(k-1-scale)+'. An der größeren Stelle bleibt '+working[k]+'. Der Wert bleibt '+a+'.',{column:k-1,source:k,before,after:working.slice()});}}
    const digit=working[column]-right[column];push('subtract',digit,place+': '+working[column]+' − '+right[column]+' = ?',working[column]+' − '+right[column]+' = '+digit+' '+place+'.',{column,digit,after:working.slice()});
   }
  }
 }else if(kind==='multiply'){
  resultUnits=A.units*B.units;resultScale=A.scale+B.scale;const partials=[],digits=String(A.units).split('').reverse().map(Number);
  push('scale',resultScale,'Wie viele Nachkommastellen ergeben sich zusammen aus den beiden Faktoren?',A.scale+' + '+B.scale+' = '+resultScale+'. Wir rechnen zunächst '+A.units+' · '+B.units+' und teilen das Produkt danach durch '+10**resultScale+'.');
  String(B.units).split('').reverse().map(Number).forEach((f,row)=>{let carry=0;digits.forEach((digit,column)=>{const incoming=carry,total=digit*f+incoming,last=column===digits.length-1;carry=Math.floor(total/10);push('multiply',total,'Hilfsrechnung für '+A.units+' · '+(f*10**row)+': '+digit+' · '+f+' + '+incoming+' = ?',digit+' · '+f+' + '+incoming+' = '+total+'. '+(last?'Schreibe links '+total+' vollständig.':'Schreibe '+total%10+'; übertrage '+carry+'.')+(last?' Teilprodukt mit Stellenwert: '+A.units*f*10**row+'.':''),{row,column,incoming,factor:f,digit,last,partial:A.units*f*10**row});});partials.push(A.units*f*10**row);});
  push('sum',resultUnits,'Addiere die Teilprodukte: '+partials.join(' + ')+' = ?',partials.join(' + ')+' = '+resultUnits+'. Dies ist das Ergebnis der Hilfsrechnung ohne Komma.');board={partials};
 }else if(kind==='divide'){
  if(B.scale||B.units<1||B.units>99)throw new RangeError('Natürlicher Divisor von 1 bis 99 erwartet.');
  const digits=String(A.units).padStart(A.scale+1,'0').split('').map(Number),integerPlaces=digits.length-A.scale,divisor=B.units;let remainder=0,q=0,i=0;
  do{if(i>=digits.length+8)throw new RangeError('Diese Division endet hier nicht; periodische Ergebnisse gehören zum späteren Lernweg.');const digit=digits[i]||0,previous=remainder,partial=previous*10+digit,quotient=Math.floor(partial/divisor),power=integerPlaces-1-i;remainder=partial%divisor;q=q*10+quotient;
   push('divide',quotient,decimalPlace(power)+': Wie oft passt '+divisor+' ganz in '+partial+'?',partial+' : '+divisor+' ergibt '+quotient+' an dieser Stelle; '+partial+' − '+quotient*divisor+' = '+remainder+' Rest.'+(remainder?' Der Rest wird an der nächsten kleineren Stelle zu zehnmal so vielen Einheiten.':''),{power,previous,brought:digit,partial,quotient,remainder,appended:i>=digits.length});i++;
  }while(i<digits.length||remainder);
  resultUnits=q;resultScale=Math.max(0,i-integerPlaces);board={divisor};
 }else throw new RangeError('Unbekannte Rechenart.');
 const result=decimalFormat(resultUnits,resultScale);
 push('result',result,'Schreibe jetzt das vollständige Ergebnis mit passendem Komma.',kind==='multiply'?resultUnits+' : '+10**resultScale+' = '+result+'. Endnullen dürfen entfallen.':'Die Stellenwerte ergeben '+result+'. Endnullen dürfen entfallen.',{decimal:true});
 const proof=kind==='add'?result+' − '+b+' = '+a:kind==='subtract'?result+' + '+b+' = '+a:kind==='divide'?result+' · '+b+' = '+a:B.units?result+' : '+b+' = '+a:'Mit einem Faktor 0 ist das Produkt 0. Durch 0 darfst du nicht dividieren.';
 return {a,b,kind,A,B,steps,result,resultUnits,resultScale,board,proof};
}
function decimalAnswerMatches(raw,step){
 if(step.decimal){if(!/^\d+(?:[,.]\d+)?$/.test(raw)||raw.length>24)return false;const parsed=raw.replace('.',',').split(','),expected=step.expected.split(','),n=Math.max((parsed[1]||'').length,(expected[1]||'').length);return BigInt(parsed[0]+(parsed[1]||'').padEnd(n,'0'))===BigInt(expected[0]+(expected[1]||'').padEnd(n,'0'));}
 return /^\d+$/.test(raw)&&Number.isSafeInteger(Number(raw))&&Number(raw)===step.expected;
}
function initDecimalCalculation(host){
 if(host.dataset.bound)return;host.dataset.bound='true';const kind=host.dataset.decimalLab,select=host.querySelector('select'),input=host.querySelector('input'),status=host.querySelector('[data-decimal-status]'),history=host.querySelector('[data-decimal-history]'),check=host.querySelector('[data-decimal-check]'),show=host.querySelector('[data-decimal-show]');let model,index=0,shown=0;
 function clear(){status.textContent='';input.removeAttribute('aria-invalid');}
 function render(){const done=index===model.steps.length,completed=model.steps.slice(0,index);host.dataset.step=index;input.disabled=check.disabled=show.disabled=done;input.inputMode=!done&&model.steps[index].decimal?'decimal':'numeric';host.querySelector('[data-decimal-progress]').textContent='Schritt '+Math.min(index+1,model.steps.length)+' von '+model.steps.length+(done?' – abgeschlossen':'');host.querySelector('[data-decimal-prompt]').textContent=done?'Ergebnis: '+model.result:model.steps[index].prompt;
  const target=host.querySelector('[data-decimal-board]');target.replaceChildren();
  if(kind==='add'||kind==='subtract'){
   const{width,scale,left,right}=model.board,table=document.createElement('table');table.className='written-board-table decimal-place-board';const powers=Array.from({length:width},(_,i)=>width-1-i-scale),abbr={'-3':'t','-2':'h','-1':'z',0:'E',1:'Z',2:'H',3:'T',4:'ZT',5:'HT'};
   table.innerHTML='<caption>E Einer; Z Zehner; H Hunderter; T Tausender; z Zehntel; h Hundertstel; t Tausendstel. Die dicke Linie trennt Einer und Zehntel. · bedeutet noch offen.</caption><thead><tr><th>Zeile</th>'+powers.map(p=>'<th'+(p===-1?' class="decimal-separator"':'')+'>'+abbr[p]+'</th>').join('')+'</tr></thead><tbody></tbody>';
   function row(title,values){const tr=document.createElement('tr');tr.innerHTML='<th scope="row">'+title+'</th>';powers.forEach(p=>{const td=document.createElement('td');if(p===-1)td.className='decimal-separator';td.textContent=values[p+scale]??'';tr.append(td);});table.tBodies[0].append(tr);}
   row('oben',left);row(kind==='add'?'+':'−',right);if(kind==='subtract')row('Tausch',completed.filter(s=>s.after).at(-1)?.after||left);else{const carries=Array(width).fill('');completed.filter(s=>s.carry).forEach(s=>carries[s.column+1]=s.carry);row('Übertr.',carries);}const digits=Array(width).fill('·');completed.filter(s=>['add','subtract'].includes(s.type)).forEach(s=>digits[s.column]=s.digit);row('Ergebnis',digits);target.append(table);
  }else{const list=document.createElement('dl');list.className='decimal-work';const add=(term,value)=>{const dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=term;dd.textContent=value;list.append(dt,dd);};
   if(kind==='multiply'){add('Hilfsrechnung',model.A.units+' · '+model.B.units);for(const s of completed.filter(s=>s.type==='multiply'&&s.last))add('Teilprodukt für '+s.factor*10**s.row,String(s.partial));const sum=completed.find(s=>s.type==='sum');if(sum)add('Summe ohne Komma',String(sum.expected));}
   else{const steps=completed.filter(s=>s.type==='divide');for(const s of steps)add(decimalPlace(s.power),s.partial+' : '+model.board.divisor+' → Ziffer '+s.quotient+', Rest '+s.remainder+(s.appended?' (Endnull ergänzt)':''));if(!steps.length)add('Beginn','Teile von links nach rechts. Das Komma trennt Einer und Zehntel.');}
   target.append(list);
  }
 }
 function reset(){const[a,b]=decimalCases[kind][+select.value];model=decimalCalculation(a,b,kind);index=shown=0;history.replaceChildren();input.value='';clear();render();}
 function advance(reveal){const s=model.steps[index];if(!s)return;if(reveal)shown++;const li=document.createElement('li');li.textContent=(reveal?'Gezeigt: ':'Geprüft: ')+s.explanation;history.append(li);index++;input.value='';clear();render();status.textContent=(reveal?'Schritt gezeigt. ':'Richtig. ')+s.explanation;if(index===model.steps.length){status.textContent+=' Gegenprobe: '+model.proof+'. '+(shown?shown+' Schritte wurden gezeigt. Rechne die Aufgabe anschließend selbst.':'Alle Rechenschritte sind richtig.');status.focus();}else if(document.activeElement===show)input.focus();}
 function verify(){if(index===model.steps.length)return;const raw=input.value.trim(),s=model.steps[index],syntax=s.decimal?/^\d+(?:[,.]\d+)?$/:/^\d+$/;if(!syntax.test(raw)||raw.length>24){input.setAttribute('aria-invalid','true');status.textContent=s.decimal?'Gib eine nichtnegative Zahl ein; Komma oder Dezimalpunkt sind möglich.':'Gib für diesen Rechenschritt eine ganze Zahl ab 0 ein.';input.focus();return;}input.removeAttribute('aria-invalid');if(decimalAnswerMatches(raw,s)){advance(false);return;}status.textContent=s.type==='align'?'Vergleiche die Anzahl der Nachkommastellen beider Zahlen. Ergänze rechts Endnullen.':s.type==='exchange'?'Tausche eine größere Einheit gegen zehn kleinere. Addiere diese zu den schon vorhandenen.':s.type==='scale'?'Zähle die Nachkommastellen in beiden Faktoren zusammen.':s.type==='result'?'Kontrolliere die Stellenwerte und die Lage des Kommas. Prüfe mit der Umkehroperation.':s.type==='divide'?'Wähle die größte Ziffer, deren Produkt mit dem Divisor die Teilmenge nicht überschreitet.':'Rechne die angegebene Teilrechnung nochmals. Beachte den Übertrag und den Stellenwert.';}
 input.addEventListener('input',clear);input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();verify();}});check.addEventListener('click',verify);show.addEventListener('click',()=>advance(true));select.addEventListener('change',reset);host.querySelector('[data-decimal-reset]').addEventListener('click',()=>{reset();input.focus();});reset();
}
function topicInit(){document.querySelectorAll('[data-decimal-lab]').forEach(initDecimalCalculation);}
Object.assign(window,{decimalCalculation,decimalAnswerMatches,decimalFormat});
