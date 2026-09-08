function checkKonto(){let v=document.getElementById('kontostand1').value; document.getElementById('kontoFb').innerHTML=(v==2)?"<span style='color:green'>Richtig! 2 Punkte</span>":"<span style='color:red'>Falsch. Denk nach: -3 + 5 = ?</span>";}

function checkMult(){let v=document.getElementById('mult1').value; document.getElementById('multFb').innerHTML=(v==12)?"<span style='color:green'>Stark! 12 ist korrekt.</span>":"<span style='color:red'>Nein. Minus mal Minus ist Plus!</span>";}


function updateSignedLine() {
 const host=document.querySelector('[data-signed-line]');if(!host)return;
 const start=Number(host.querySelector('#signed_start').value),number=Number(host.querySelector('#signed_change').value),subtract=host.querySelector('#signed_operation').value==='subtract',delta=subtract?-number:number,result=start+delta;
 const f=n=>n.toLocaleString('de-AT'),out=host.querySelector('[data-signed-result]'),svg=host.querySelector('svg'),x=n=>40+(n+10)*26;
 const text=f(start)+(subtract?' − (':' + (')+f(number)+') = '+f(result)+'. '+(delta===0?'Keine Bewegung.':Math.abs(delta).toLocaleString('de-AT')+' nach '+(delta>0?'rechts.':'links.'));
 out.textContent=text;svg.setAttribute('aria-label',text);svg.replaceChildren();
 const ns='http://www.w3.org/2000/svg',add=(tag,attrs)=>{const el=document.createElementNS(ns,tag);for(const[k,v]of Object.entries(attrs))el.setAttribute(k,v);svg.append(el);return el;};
 add('line',{x1:40,x2:560,y1:85,y2:85,stroke:'currentColor'});
 for(let n=-10;n<=10;n++){add('line',{x1:x(n),x2:x(n),y1:80,y2:90,stroke:'currentColor'});if(n%2===0){const label=add('text',{x:x(n),y:112,'text-anchor':'middle',fill:'currentColor','font-size':13});label.textContent=n;}}
 if(delta!==0){add('line',{x1:x(start),x2:x(result),y1:45,y2:45,stroke:'#1d4ed8','stroke-width':3});const tip=x(result),back=tip+(delta>0?-8:8);add('polyline',{points:back+',39 '+tip+',45 '+back+',51',fill:'none',stroke:'#1d4ed8','stroke-width':3});}
 add('circle',{cx:x(start),cy:85,r:7,fill:'#1d4ed8','data-start':start});add('rect',{x:x(result)-5,y:70,width:10,height:10,fill:'#a21caf','data-result':result});
}

function topicInit() {
 const host=document.querySelector('[data-signed-line]');if(host){host.querySelectorAll('input,select').forEach(el=>{el.oninput=updateSignedLine;el.onchange=updateSignedLine;});updateSignedLine();}
 for(const [id,feedbackId,check]of [['kontostand1','kontoFb',checkKonto],['mult1','multFb',checkMult]]){
  const input=document.getElementById(id),fb=document.getElementById(feedbackId);if(!input||!fb)continue;
  fb.setAttribute('role','status');fb.setAttribute('aria-live','polite');fb.setAttribute('aria-atomic','true');input.setAttribute('aria-describedby',feedbackId);input.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();check();}};
 }
}
