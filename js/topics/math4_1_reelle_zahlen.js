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
 bindRootRounding();
}

function rootRoundingModel(area,digits){
 const side=Math.sqrt(area),scale=10**digits,roundedSide=Math.round(side*scale)/scale;
 return {area,digits,side,roundedSide,early:4*roundedSide,late:4*side,reconstructed:roundedSide**2,error:Math.abs(roundedSide**2-area)};
}
function bindRootRounding(){
 const lab=document.querySelector('[data-root-rounding]');if(!lab||lab.dataset.bound==='true')return;lab.dataset.bound='true';
 const area=lab.querySelector('#root-area'),digits=lab.querySelector('#root-digits'),method=lab.querySelector('#root-method'),input=lab.querySelector('#root-answer'),status=lab.querySelector('#root-round-status'),comparison=lab.querySelector('[data-root-comparison]');
 const format=(value,places)=>value.toLocaleString('de-AT',{minimumFractionDigits:places,maximumFractionDigits:places});
 const model=()=>rootRoundingModel(Number(area.value),Number(digits.value));
 const clear=()=>{status.textContent='';comparison.replaceChildren();input.removeAttribute('aria-invalid');};
 const show=m=>{
  comparison.replaceChildren();
  const heading=document.createElement('h4');heading.textContent='Vergleich für A = '+format(m.area,0)+' m²';comparison.append(heading);
  const table=document.createElement('table'),caption=table.createCaption();caption.textContent='Umfang auf zwei Nachkommastellen; Flächenabweichung auf acht Nachkommastellen';
  const head=table.createTHead().insertRow(),labels=['Rechenweg','Verwendete Seite','Umfang','Zurückgerechnete Fläche'];for(const label of labels){const th=document.createElement('th');th.scope='col';th.textContent=label;head.append(th);}
  const rows=[['Seite zuerst gerundet',format(m.roundedSide,m.digits)+' m','≈ '+format(m.early,2)+' m',format(m.reconstructed,8)+' m²'],['Ohne Zwischenrundung','√'+m.area+' m (≈ '+format(m.side,8)+' m)','4√'+m.area+' m ≈ '+format(m.late,2)+' m',m.area+' m² (exakt: (√'+m.area+')²)']];
  const body=table.createTBody();for(const values of rows){const row=body.insertRow();row.dataset.rootRow='';values.forEach((value,i)=>{const cell=document.createElement(i===0?'th':'td');if(i===0)cell.scope='row';cell.dataset.label=labels[i];cell.textContent=value;row.append(cell);});}comparison.append(table);
  const note=document.createElement('p'),sign=m.reconstructed<m.area?'kleiner':'größer';note.textContent='Mit gerundeter Seite ist die zurückgerechnete Fläche um '+format(m.error,8)+' m² '+sign+' als die vorgegebene Fläche. '+(Math.round(m.early*100)===Math.round(m.late*100)?'Die Umfänge sehen auf zwei Nachkommastellen gleich aus. Die Seitenlänge bleibt trotzdem eine Näherung.':'Die vorzeitige Rundung verändert hier auch den auf zwei Nachkommastellen gerundeten Umfang.')+' Die angezeigten acht Stellen der ungerundeten Wurzel sind nur eine Anzeige; die Vergleichsrechnung verwendet intern mehr Stellen.';comparison.append(note);
 };
 const check=()=>{
  const raw=input.value.trim().replace(/−/g,'-'),value=/^\d+(?:[.,]\d+)?$/.test(raw)?Number(raw.replace(',','.')):NaN;
  clear();if(!Number.isFinite(value)||value<0||value>100){input.setAttribute('aria-invalid','true');status.textContent='Gib einen Umfang von 0 bis 100 Metern als Zahl ein, etwa 5,64. Schreibe die Einheit nicht ins Eingabefeld.';input.focus();return;}
  const m=model(),expected=Math.round(m[method.value]*100)/100,right=Math.abs(value-expected)<0.005;
  status.textContent=(right?'Richtig. ':'Noch nicht richtig. ')+(method.value==='early'?'Runde √'+m.area+' zuerst auf '+m.digits+' Nachkommastellen und multipliziere diese Seite mit 4.':'Berechne 4 · √'+m.area+' ohne zusätzliche Rundung der Seite.')+' Der gesuchte Umfang ist ungefähr '+format(expected,2)+' m.';show(m);status.focus();
 };
 for(const control of [area,digits,method])control.addEventListener('change',()=>{input.value='';clear();});input.addEventListener('input',clear);input.addEventListener('keydown',event=>{if(event.key==='Enter'){event.preventDefault();check();}});
 lab.querySelector('[data-root-check]').addEventListener('click',check);
 lab.querySelector('[data-root-show]').addEventListener('click',()=>{clear();show(model());status.textContent='Vergleiche die beiden Rechenwege und erkläre die Flächenabweichung.';status.focus();});
 lab.querySelector('[data-root-reset]').addEventListener('click',()=>{area.value='2';digits.value='2';method.value='early';input.value='';clear();area.focus();});
}

function bindQuickDecimalAnswer(){const input=document.getElementById('root1'),out=document.getElementById('feedback1');if(!input||!out)return;input.type='text';input.setAttribute('inputmode','decimal');input.setAttribute('aria-label',"Seitenlänge in Metern");input.setAttribute('aria-describedby','feedback1');out.setAttribute('role','status');out.setAttribute('aria-live','polite');out.setAttribute('aria-atomic','true');input.oninput=()=>out.textContent='';input.onkeydown=event=>{if(event.key==='Enter'){event.preventDefault();checkRoot1();}};}
