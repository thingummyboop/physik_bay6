const sK=document.getElementById('slider-k'),vK=document.getElementById('val-k'),p2=document.getElementById('poly2');sK.oninput=()=>{let k=parseFloat(sK.value);vK.innerText=k; let x1=50+(150-50)*k;let y1=150+(100-150)*k;let x2=50+(150-50)*k;let y2=150+(200-150)*k;let x3=50+(200-50)*k;let y3=150+(200-150)*k;p2.setAttribute('points', `${x1},${y1} ${x2},${y2} ${x3},${y3}`);};sK.oninput();


function topicInit() {}
