// Klima-Logik (Treibhauseffekt)
function updateGreenhouseEffect() {
    const val = document.getElementById('co2Range').value;
    const co2Dots = document.getElementById('co2Dots');
    const heatArrows = document.getElementById('heatArrows');
    const tempText = document.getElementById('tempVal');

    // Update opacity and visual "heat"
    co2Dots.setAttribute('opacity', 0.2 + (val / 100) * 0.8);
    heatArrows.setAttribute('stroke-width', 2 + (val / 100) * 6);
    
    // A simplified temperature increase calculation
    const temp = 15 + (val / 100) * 5;
    tempText.innerText = temp.toFixed(1) + " °C";
}

function topicInit() {
    console.log("Klima-Thema geladen.");
}
