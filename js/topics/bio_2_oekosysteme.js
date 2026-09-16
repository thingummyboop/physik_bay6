'use strict';
function topicInit(){
 const samples=[[[18,2,0,0,0],[2,2,2,2,2]],[[10,5,0,0,0],[2,0,3,1,0]],[[5,4,2,0,0],[3,0,2,0,4]]];
 document.querySelectorAll('[data-habitat-sampling]').forEach(zone=>{
  if(zone.dataset.initialized)return;zone.dataset.initialized='true';
  const select=zone.querySelector('[data-sampling-round]'),body=zone.querySelector('[data-sampling-rows]'),result=zone.querySelector('[data-sampling-result]'),chart=zone.querySelector('[data-sampling-chart]'),show=zone.querySelector('[data-sampling-show]'),reset=zone.querySelector('[data-sampling-reset]');
  const update=()=>{
   const [a,b]=samples[Number(select.value)];body.replaceChildren();
   a.forEach((count,i)=>{
    const row=document.createElement('tr');
    ['Art '+(i+1),count,b[i]].forEach((value,index)=>{const cell=document.createElement(index===0?'th':'td');if(index===0)cell.scope='row';cell.textContent=String(value);row.append(cell);});body.append(row);
   });
   const total=counts=>counts.reduce((sum,n)=>sum+n,0),richness=counts=>counts.filter(n=>n>0).length;
   result.textContent=`Fläche A: ${total(a)} Individuen, ${richness(a)} nachgewiesene Arten. Fläche B: ${total(b)} Individuen, ${richness(b)} nachgewiesene Arten. `+(richness(a)===richness(b)?'Beide Flächen haben in dieser Erhebung dieselbe Artenzahl.':'Fläche B hat in dieser Erhebung weniger Individuen, aber mehr nachgewiesene Arten.');
   if(show){result.hidden=true;show.setAttribute('aria-expanded','false');show.textContent='Auswertung anzeigen';}
   if(chart){
    const ns='http://www.w3.org/2000/svg',add=(tag,attrs,text)=>{const node=document.createElementNS(ns,tag);for(const [k,v]of Object.entries(attrs))node.setAttribute(k,String(v));if(text!==undefined)node.textContent=text;chart.append(node);};
    chart.replaceChildren();chart.setAttribute('font-family','sans-serif');add('rect',{width:500,height:350,fill:'#fff'});
    [0,5,10,15,20].forEach(n=>{const x=150+12*n;add('line',{x1:x,y1:28,x2:x,y2:326,stroke:'#c6ced8'});add('text',{x,y:23,'text-anchor':'middle','font-size':26,fill:'#243447'},n);});
    a.forEach((count,i)=>{const y=48+i*57;add('text',{x:8,y:y+23,'font-size':28,fill:'#243447'},'Art '+(i+1));[count,b[i]].forEach((n,col)=>{add('text',{x:120,y:y+col*25+12,'font-size':26,fill:'#243447'},col?'B':'A');add('rect',{x:150,y:y+col*25-5,width:n*12,height:19,fill:col?'#9b4d13':'#176a9a','data-sampling-bar':`${i}-${col}`});add('text',{x:420,y:y+col*25+12,'font-size':26,fill:'#243447'},n);});});
    chart.setAttribute('aria-label','Gezählte Pflanzen in Erhebung '+(Number(select.value)+1)+'. Gemeinsame Skala von 0 bis 20; A blau, B braun. Die genauen Werte stehen auch in der Tabelle.');
   }
  };
  select.addEventListener('change',update);update();
  if(show){result.id='forest-sampling-result';show.setAttribute('aria-controls',result.id);show.addEventListener('click',()=>{result.hidden=!result.hidden;show.setAttribute('aria-expanded',String(!result.hidden));show.textContent=result.hidden?'Auswertung anzeigen':'Auswertung ausblenden';});}
  if(reset)reset.addEventListener('click',()=>{select.value='0';update();select.focus();});
 });
}
window.topicInit=topicInit;
