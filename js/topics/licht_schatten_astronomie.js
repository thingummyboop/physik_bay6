// Logic for licht_schatten_astronomie topic
function topicInit() {}

function showOrbital(type) {
    const moon = document.getElementById('moonOrbit');
    const earth = document.getElementById('earthOrbit');
    const txt = document.getElementById('orbitalText');
    if(!moon || !earth) return;

    if(type === 'moon') {
        moon.style.display = 'block';
        earth.style.display = 'none';
        if(txt) txt.innerText = "Der Mond kreist in ca. 27 Tagen einmal um die Erde.";
    } else {
        moon.style.display = 'none';
        earth.style.display = 'block';
        if(txt) txt.innerText = "Die Erde kreist in einem Jahr einmal um die Sonne.";
    }
}

function setPhase(phase) {
    const moon = document.getElementById('moonPhase');
    const txt = document.getElementById('phaseText');
    if(!moon) return;

    if(phase === 'new') {
        moon.setAttribute('fill', '#333');
        if(txt) txt.innerText = "Neumond: Die beleuchtete Seite zeigt von uns weg.";
    } else if(phase === 'full') {
        moon.setAttribute('fill', '#fff176');
        if(txt) txt.innerText = "Vollmond: Wir sehen die komplette beleuchtete Seite.";
    } else {
        moon.setAttribute('fill', 'url(#halfMoonGrad)');
        if(txt) txt.innerText = "Halbmond: Wir sehen nur einen Teil der beleuchteten Seite.";
    }
}
