'use strict';
window.topicInit = function () {
    initFrequencyTree();
    document.querySelectorAll('[data-share-diagrams]').forEach((lab,index) => {
        if (lab.dataset.ready) return;
        lab.dataset.ready = 'true';
        const input=lab.querySelector('[data-share-count]');
        const rows=[...lab.querySelectorAll('[data-share-row]')];
        const format=value=>value.toLocaleString(lab.dataset.locale,{maximumFractionDigits:1});
        const update=()=>{
            const n=Number(input.value),part=n/20,angle=part*360;
            const descriptions=rows.map((row,i)=>{
                const count=i?20-n:n,percent=count*5,degrees=count*18;
                const values=[format(count),format(percent)+' %',format(degrees)+'°'];
                [...row.querySelectorAll('td')].forEach((cell,j)=>{
                    const bdi=document.createElement('bdi');bdi.dir='ltr';bdi.textContent=values[j];cell.replaceChildren(bdi);
                });
                return row.querySelector('th').textContent+': \u2066'+format(count)+'/20 = '+format(percent)+' %; '+format(degrees)+'°\u2069';
            });
            input.setAttribute('aria-valuetext',descriptions[0]);
            lab.querySelector('[data-share-status]').textContent=descriptions.join('. ');
            const radians=angle*Math.PI/180,endX=160+90*Math.sin(radians),endY=125-90*Math.cos(radians);
            const pattern='share-hatch-'+index;
            const slice=n===0?'':n===20?'<circle data-share-sector cx="160" cy="125" r="90" fill="#1d4ed8"/>':`<path data-share-sector d="M160 125 L160 35 A90 90 0 ${angle>180?1:0} 1 ${endX} ${endY} Z" fill="#1d4ed8"/>`;
            const labels=[part,1-part].map((p,i)=>{
                if(p===0)return '';
                const middle=(i?part+(1-part)/2:part/2)*2*Math.PI;
                return `<text x="${160+55*Math.sin(middle)}" y="${131-55*Math.cos(middle)}" text-anchor="middle" font-size="18" fill="${i?'#172554':'white'}">${i?'B':'A'}</text>`;
            }).join('');
            const picture=lab.querySelector('[data-share-picture]');
            picture.innerHTML=`<svg viewBox="0 0 320 295" role="img" style="width:100%;max-width:420px;background:white" direction="ltr"><defs><pattern id="${pattern}" width="8" height="8" patternUnits="userSpaceOnUse"><rect width="8" height="8" fill="#fef3c7"/><path d="M0 0 L8 8" stroke="#92400e" stroke-width="1"/></pattern></defs><circle cx="160" cy="125" r="90" fill="url(#${pattern})"/>${slice}<circle cx="160" cy="125" r="90" fill="none" stroke="#172554"/>${labels}<rect x="20" y="240" width="280" height="28" fill="url(#${pattern})"/><rect data-share-strip x="20" y="240" width="${280*part}" height="28" fill="#1d4ed8"/><rect x="20" y="240" width="280" height="28" fill="none" stroke="#172554"/>${n?`<text x="${20+140*part}" y="260" text-anchor="middle" fill="white">A</text>`:''}${n<20?`<text x="${20+280*part+140*(1-part)}" y="260" text-anchor="middle" fill="#172554">B</text>`:''}</svg>`;
            picture.querySelector('svg').setAttribute('aria-label',lab.dataset.chartDescription+' '+descriptions.join('. '));
            const sector=picture.querySelector('[data-share-sector]');if(sector)sector.dataset.angle=String(angle);
        };
        input.addEventListener('input',update);
        lab.querySelector('[data-share-reset]').addEventListener('click',()=>{input.value='5';update();});
        update();
    });
}

function initFrequencyTree() {
 document.querySelectorAll('[data-frequency-tree]').forEach(lab=>{
  if(lab.dataset.ready)return;lab.dataset.ready='true';
  const inputs=[...lab.querySelectorAll('[data-tree-input]')];
  const format=n=>n.toLocaleString(lab.dataset.locale,{maximumFractionDigits:1});
  const ratio=(n,total)=>{const percent=n/total*100;return format(n)+'/'+format(total)+(Math.abs(percent*10-Math.round(percent*10))<1e-9?' = ':' ≈ ')+format(percent)+' %';};
  const update=()=>{
   const counts=inputs.map(input=>Number(input.value)),leaves=[counts[0],12-counts[0],counts[1],8-counts[1]];
   lab.querySelectorAll('[data-tree-leaf]').forEach((node,i)=>node.textContent=format(leaves[i]));
   lab.querySelectorAll('[data-tree-within]').forEach((node,i)=>node.textContent=ratio(counts[i],i?8:12));
   lab.querySelectorAll('[data-tree-whole]').forEach((node,i)=>node.textContent=ratio(counts[i],20));
   lab.querySelector('[data-tree-total]').textContent=ratio(counts[0]+counts[1],20);
   inputs.forEach((input,i)=>input.setAttribute('aria-valuetext',ratio(counts[i],i?8:12)));
  };
  inputs.forEach(input=>input.addEventListener('input',update));
  lab.querySelector('[data-tree-reset]').addEventListener('click',()=>{inputs[0].value=6;inputs[1].value=2;update();});update();
 });
}
