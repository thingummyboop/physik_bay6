const sR=document.getElementById('slider-r'),sH=document.getElementById('slider-h');const zTop=document.getElementById('zyl-top'),zBody=document.getElementById('zyl-body');const aG=document.getElementById('area-g'),vZ=document.getElementById('vol-z');function updateZ(){let r=parseInt(sR.value);let h=parseInt(sH.value);let topY=250-h;zTop.setAttribute('rx',r);zTop.setAttribute('ry',r*0.4);zTop.setAttribute('cy',topY);let d=`M ${150-r} ${topY} L ${150-r} 250 A ${r} ${r*0.4} 0 0 0 ${150+r} 250 L ${150+r} ${topY} A ${r} ${r*0.4} 0 0 1 ${150-r} ${topY} Z`;zBody.setAttribute('d',d);let g=Math.PI*r*r;aG.innerText=(g/100).toFixed(2);vZ.innerText=((g*h)/1000).toFixed(2);}sR.oninput=updateZ;sH.oninput=updateZ;updateZ();


function topicInit() {}
