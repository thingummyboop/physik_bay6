// Wetter-Logik erweitert

// 1. Messgeräte
function showInstrument(type) {
    const info = document.getElementById('instrumentInfo');
    const data = {
        thermometer: "🌡️ <strong>Thermometer:</strong> Misst die Temperatur in Grad Celsius (°C).",
        barometer: "⏲️ <strong>Barometer:</strong> Misst den Luftdruck in Hektopascal (hPa). Hoher Druck = oft schönes Wetter.",
        anemometer: "🌀 <strong>Anemometer:</strong> Misst die Windgeschwindigkeit (z.B. in km/h oder m/s).",
        hygrometer: "💧 <strong>Hygrometer:</strong> Misst die Luftfeuchtigkeit in Prozent (%)."
    };
    info.innerHTML = data[type] || "Wähle ein Gerät aus!";
}

// 2. Wind-Simulation
let windInterval;
function startWindSim() {
    const svg = document.getElementById('windSvg');
    if (!svg) return;
    svg.innerHTML = ''; // Clear old particles
    clearInterval(windInterval);

    windInterval = setInterval(() => {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        const y = Math.random() * 100;
        circle.setAttribute("cx", "20");
        circle.setAttribute("cy", y + "%");
        circle.setAttribute("r", "3");
        circle.setAttribute("fill", "#3b82f6");
        circle.setAttribute("opacity", "0.6");
        svg.appendChild(circle);

        // Simple animation
        let x = 20;
        const anim = setInterval(() => {
            x += 5;
            circle.setAttribute("cx", x);
            if (x > 400) {
                clearInterval(anim);
                if (circle.parentNode) circle.parentNode.removeChild(circle);
            }
        }, 30);
    }, 200);

    setTimeout(() => clearInterval(windInterval), 5000); // Stop after 5s
}

// 3. Gewitter-Labor
let cloudCharge = 0;
function chargeCloud() {
    const chargeText = document.getElementById('chargeLevel');
    const lightning = document.getElementById('lightning');
    const cloud = document.getElementById('stormCloud');

    if (cloudCharge < 100) {
        cloudCharge += 20;
        chargeText.innerText = cloudCharge + "% geladen";
        // Make cloud darker
        const gray = 75 - (cloudCharge / 2);
        cloud.setAttribute('fill', `rgb(${gray},${gray},${gray})`);
    } else {
        // ZAP!
        lightning.setAttribute('opacity', '1');
        chargeText.innerText = "ENTLADUNG! ⚡";
        setTimeout(() => {
            lightning.setAttribute('opacity', '0');
            cloudCharge = 0;
            chargeText.innerText = "0% geladen";
            cloud.setAttribute('fill', '#4b5563');
        }, 200);
    }
}

function topicInit() {
    console.log("Wetter-Thema mit Erweiterungen geladen.");
    cloudCharge = 0;
}
