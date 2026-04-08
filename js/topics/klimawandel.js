// Klimawandel-Logik (Gletscher-Schmelze & CO2-Fußabdruck)
function updateGlacier() {
    const year = document.getElementById('yearRange').value;
    const glacier = document.getElementById('glacierArea');
    const sea = document.getElementById('seaLevel');
    const label = document.getElementById('yearLabel');

    // Melting logic
    const iceWidth = 200 - (year - 1900) * 1.5;
    glacier.setAttribute('width', Math.max(0, iceWidth));
    
    const waterRise = (year - 1900) * 0.4;
    sea.setAttribute('y', 150 - waterRise);
    sea.setAttribute('height', 50 + waterRise);
    
    label.innerText = year;
}

function topicInit() {
    console.log("Klimawandel-Thema geladen.");
}
