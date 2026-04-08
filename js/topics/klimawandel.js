// Klimawandel-Logik erweitert

function updateGlacier() {
    const year = document.getElementById('yearRange')?.value;
    const glacier = document.getElementById('glacierArea');
    const sea = document.getElementById('seaLevel');
    const label = document.getElementById('yearLabel');

    if(!glacier || !year) return;

    // Melting logic
    const iceWidth = 200 - (year - 1900) * 1.5;
    glacier.setAttribute('width', Math.max(0, iceWidth));
    
    const waterRise = (year - 1900) * 0.4;
    sea.setAttribute('y', 150 - waterRise);
    sea.setAttribute('height', 50 + waterRise);
    
    label.innerText = year;
}

function startDomino() {
    const btn = document.getElementById('dominoBtn');
    if(btn) btn.disabled = true;
    
    const dominos = [
        document.getElementById('dom1'),
        document.getElementById('dom2'),
        document.getElementById('dom3'),
        document.getElementById('dom4')
    ];
    
    dominos.forEach((dom, idx) => {
        if(dom) {
            setTimeout(() => {
                dom.style.transform = "rotate(15deg) translateX(20px)";
                dom.style.borderColor = "#ef4444";
                dom.style.backgroundColor = "#fee2e2";
            }, idx * 1000);
        }
    });
    
    setTimeout(() => {
        const res = document.getElementById('dominoResult');
        if(res) res.style.opacity = 1;
    }, 4000);
}

function topicInit() {
    console.log("Klimawandel-Thema geladen.");
}
