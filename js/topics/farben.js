// Logic for farben topic
function topicInit() {}

function simulateJump() {
    const el = document.getElementById('electron');
    const phot = document.getElementById('photon-path');
    if(!el || !phot) return;
    
    el.setAttribute('cy', '20'); 
    
    setTimeout(() => {
        el.setAttribute('cy', '50');
        phot.style.opacity = "1";
        setTimeout(() => { phot.style.opacity = "0"; }, 500);
    }, 500);
}

function setWave(freq, color, text) {
    const wave = document.getElementById('lightWave');
    const desc = document.getElementById('waveDesc');
    if(!wave) return;

    let d = "M 0 50 ";
    for(let i=0; i<=400; i+=freq) {
        d += `Q ${i + freq/2} ${i%(freq*2)===0 ? 10 : 90} ${i + freq} 50 `;
    }
    wave.setAttribute('d', d);
    wave.setAttribute('stroke', color);
    if(desc) {
        desc.innerText = text;
        desc.style.color = color;
    }
}
