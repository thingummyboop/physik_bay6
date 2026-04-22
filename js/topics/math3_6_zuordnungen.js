const sProp=document.getElementById('slider-prop'),vProp=document.getElementById('val-prop'),pProp=document.getElementById('price-prop'),b1=document.getElementById('bar1'),b2=document.getElementById('bar2');sProp.oninput=()=>{vProp.innerText=sProp.value;pProp.innerText=sProp.value*2;b1.setAttribute('y',150-sProp.value*10);b1.setAttribute('height',sProp.value*10);b2.setAttribute('y',150-sProp.value*20);b2.setAttribute('height',sProp.value*20);};sProp.oninput();

const sAnti=document.getElementById('slider-antiprop'),vAnti=document.getElementById('val-antiprop'),tAnti=document.getElementById('time-antiprop'),b3=document.getElementById('bar3'),b4=document.getElementById('bar4');sAnti.oninput=()=>{let x=sAnti.value; let y=12/x; vAnti.innerText=x;tAnti.innerText=y.toFixed(1);b3.setAttribute('y',150-x*10);b3.setAttribute('height',x*10);b4.setAttribute('y',150-y*10);b4.setAttribute('height',y*10);};sAnti.oninput();


function topicInit() {}
