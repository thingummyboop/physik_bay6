'use strict';
function topicInit(){
 const samples=[[[18,2,0,0,0],[2,2,2,2,2]],[[10,5,0,0,0],[2,0,3,1,0]],[[5,4,2,0,0],[3,0,2,0,4]]];
 document.querySelectorAll('[data-habitat-sampling]').forEach(zone=>{
  if(zone.dataset.initialized)return;zone.dataset.initialized='true';
  const select=zone.querySelector('[data-sampling-round]'),body=zone.querySelector('[data-sampling-rows]'),result=zone.querySelector('[data-sampling-result]');
  const update=()=>{
   const [a,b]=samples[Number(select.value)];body.replaceChildren();
   a.forEach((count,i)=>{
    const row=document.createElement('tr');
    ['Art '+(i+1),count,b[i]].forEach((value,index)=>{const cell=document.createElement(index===0?'th':'td');if(index===0)cell.scope='row';cell.textContent=String(value);row.append(cell);});body.append(row);
   });
   const total=counts=>counts.reduce((sum,n)=>sum+n,0),richness=counts=>counts.filter(n=>n>0).length;
   result.textContent=`Fläche A: ${total(a)} Individuen, ${richness(a)} nachgewiesene Arten. Fläche B: ${total(b)} Individuen, ${richness(b)} nachgewiesene Arten. `+(richness(a)===richness(b)?'Beide Flächen haben in dieser Erhebung dieselbe Artenzahl.':'Fläche B hat in dieser Erhebung weniger Individuen, aber mehr nachgewiesene Arten.');
  };
  select.addEventListener('change',update);update();
 });
}
window.topicInit=topicInit;
