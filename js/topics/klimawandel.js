// Klimawandel-Logik erweitert

function updateGlacier() {
    const yearRange = document.getElementById('yearRange');
    const year = Number(yearRange?.value || 1900);
    const glacier = document.getElementById('glacierArea');
    const sea = document.getElementById('seaLevel');
    const label = document.getElementById('yearLabel');

    if(!glacier || !yearRange) return;
    yearRange.setAttribute('aria-valuetext', `${year}`);

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
    enhanceClimateChangeAccessibility();
    updateGlacier();
}

function enhanceClimateChangeAccessibility() {
    const yearRange = document.getElementById('yearRange');
    if (yearRange) {
        if (document.getElementById('yearLabel')) yearRange.setAttribute('aria-describedby', 'yearLabel');
        yearRange.setAttribute('aria-valuetext', `${Number(yearRange.value || 1900)}`);
    }

    const yearLabel = document.getElementById('yearLabel');
    if (yearLabel) {
        yearLabel.setAttribute('role', 'status');
        yearLabel.setAttribute('aria-live', 'polite');
        yearLabel.setAttribute('aria-atomic', 'true');
    }

    const dominoResult = document.getElementById('dominoResult');
    if (dominoResult) {
        dominoResult.setAttribute('role', 'status');
        dominoResult.setAttribute('aria-live', 'polite');
        dominoResult.setAttribute('aria-atomic', 'true');
    }
}
