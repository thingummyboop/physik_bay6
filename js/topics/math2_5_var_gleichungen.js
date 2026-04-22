const knob=document.getElementById('slider_knob');const box_text=document.getElementById('box_text');const result_text=document.getElementById('result_text');let isDragging=false;knob.addEventListener('mousedown',()=>isDragging=true);window.addEventListener('mouseup',()=>isDragging=false);window.addEventListener('mousemove',(e)=>{if(!isDragging)return;let rect=knob.parentElement.getBoundingClientRect();let x=e.clientX-rect.left;if(x<50)x=50;if(x>350)x=350;knob.setAttribute('cx',x);let val=Math.floor((x-50)/30);box_text.textContent=val;result_text.textContent=val+5;});

let left=3,right=8,x=5;function updateBalance(){let l_total=x+left;let r_total=right;let diff=r_total-l_total;let angle=diff*5;document.getElementById('beam').setAttribute('transform',`rotate(${angle} 200 180)`);document.getElementById('left_pan').setAttribute('transform',`translate(50,${180+Math.sin(angle*Math.PI/180)*150})`);document.getElementById('right_pan').setAttribute('transform',`translate(350,${180-Math.sin(angle*Math.PI/180)*150})`);}function addWeight(val,side){if(side==='left')left+=val;else right+=val;updateBalance();}updateBalance();


function topicInit() {}
