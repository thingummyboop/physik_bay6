// Wetter-Logik
function updateWeatherSim() {
    const val = document.getElementById('weatherRange').value;
    const sun = document.getElementById('sunSim');
    const cloud = document.getElementById('cloudSim');
    const rain = document.getElementById('rainSim');
    const bg = document.getElementById('weatherBg');

    // Simple weather transition
    if (val < 33) {
        // Sunny
        sun.setAttribute('opacity', '1');
        cloud.setAttribute('opacity', '0.2');
        rain.setAttribute('opacity', '0');
        bg.setAttribute('fill', '#87CEEB');
    } else if (val < 66) {
        // Cloudy
        sun.setAttribute('opacity', '0.3');
        cloud.setAttribute('opacity', '1');
        rain.setAttribute('opacity', '0');
        bg.setAttribute('fill', '#B0C4DE');
    } else {
        // Rainy
        sun.setAttribute('opacity', '0');
        cloud.setAttribute('opacity', '1');
        rain.setAttribute('opacity', '0.6');
        bg.setAttribute('fill', '#708090');
    }
}

function topicInit() {
    console.log("Wetter-Thema geladen.");
}
