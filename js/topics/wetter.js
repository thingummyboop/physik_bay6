// Wetter-Logik V3: Detaillierte Wetterstation

function showInstrumentDetailed(type) {
    const animContainer = document.getElementById('instrumentAnimation');
    const textContainer = document.getElementById('instrumentText');
    
    if (!animContainer || !textContainer) return;

    let animHtml = '';
    let infoHtml = '';

    switch(type) {
        case 'thermometer':
            animHtml = `
                <svg width="200" height="150" viewBox="0 0 200 150">
                    <rect x="90" y="20" width="20" height="100" rx="10" fill="#e2e8f0" stroke="#94a3b8" />
                    <circle cx="100" cy="120" r="15" fill="#ef4444" />
                    <rect id="mercury" x="95" y="30" width="10" height="80" fill="#ef4444">
                        <animate attributeName="height" from="0" to="80" dur="2s" fill="freeze" />
                        <animate attributeName="y" from="110" to="30" dur="2s" fill="freeze" />
                    </rect>
                    <line x1="85" y1="110" x2="90" y2="110" stroke="#334155" /> <text x="45" y="115" font-size="10">0°C (Eis)</text>
                    <line x1="85" y1="30" x2="90" y2="30" stroke="#334155" /> <text x="35" y="35" font-size="10">100°C (Dampf)</text>
                </svg>
            `;
            infoHtml = `
                <strong>🌡️ Das Thermometer</strong><br>
                <strong>Einheit:</strong> Grad Celsius (°C)<br>
                <strong>Definition:</strong> Anders Celsius legte fest: Bei 0° gefriert Wasser, bei 100° kocht es. Die Skala dazwischen wurde in 100 gleiche Teile (Grade) unterteilt.
            `;
            break;
        
        case 'barometer':
            animHtml = `
                <svg width="200" height="150" viewBox="0 0 200 150">
                    <rect x="50" y="120" width="100" height="10" fill="#94a3b8" />
                    <g>
                        <path d="M100,20 L100,110" stroke="#3b82f6" stroke-width="4" marker-end="url(#arrowhead-blue)" />
                        <path d="M70,30 L70,110" stroke="#3b82f6" stroke-width="4" marker-end="url(#arrowhead-blue)" />
                        <path d="M130,30 L130,110" stroke="#3b82f6" stroke-width="4" marker-end="url(#arrowhead-blue)" />
                        <animateTransform attributeName="transform" type="translate" values="0,-5; 0,5; 0,-5" dur="3s" repeatCount="indefinite" />
                    </g>
                    <text x="100" y="140" text-anchor="middle" font-size="12" font-weight="bold">Luftgewicht drückt!</text>
                    <defs>
                        <marker id="arrowhead-blue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
                        </marker>
                    </defs>
                </svg>
            `;
            infoHtml = `
                <strong>⏲️ Das Barometer</strong><br>
                <strong>Einheit:</strong> Hektopascal (hPa)<br>
                <strong>Definition:</strong> 1 Pascal ist der Druck, den eine Kraft von 1 Newton auf 1 m² ausübt. Wir messen hier, wie schwer die kilometerhohe Luftschicht auf den Boden drückt.
            `;
            break;

        case 'anemometer':
            animHtml = `
                <svg width="200" height="150" viewBox="0 0 200 150">
                    <g transform="translate(100,60)">
                        <g id="cups">
                            <line x1="-40" y1="0" x2="40" y2="0" stroke="#334155" stroke-width="3" />
                            <line x1="0" y1="-40" x2="0" y2="40" stroke="#334155" stroke-width="3" />
                            <circle cx="40" cy="0" r="10" fill="#64748b" />
                            <circle cx="-40" cy="0" r="10" fill="#64748b" />
                            <circle cx="0" cy="40" r="10" fill="#64748b" />
                            <circle cx="0" cy="-40" r="10" fill="#64748b" />
                            <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="2s" repeatCount="indefinite" />
                        </g>
                    </g>
                    <rect x="20" y="120" width="160" height="2" fill="#cbd5e1" />
                    <rect x="20" y="110" width="20" height="10" fill="#ef4444">
                        <animate attributeName="x" from="20" to="160" dur="3s" repeatCount="indefinite" />
                    </rect>
                    <text x="100" y="140" text-anchor="middle" font-size="10">Weg pro Zeit (km pro h)</text>
                </svg>
            `;
            infoHtml = `
                <strong>🌀 Das Anemometer</strong><br>
                <strong>Einheit:</strong> Kilometer pro Stunde (km/h)<br>
                <strong>Definition:</strong> Geschwindigkeit = Weg durch Zeit. 10 km/h bedeutet, dass die Luft in einer Stunde eine Strecke von 10 Kilometern zurücklegt.
            `;
            break;

        case 'hygrometer':
            animHtml = `
                <svg width="200" height="150" viewBox="0 0 200 150">
                    <rect x="50" y="30" width="100" height="100" fill="none" stroke="#334155" stroke-dasharray="4" />
                    <g id="vapor">
                        <circle cx="70" cy="50" r="3" fill="#3b82f6" opacity="0.6"><animate attributeName="opacity" values="0.2;1;0.2" dur="2s" repeatCount="indefinite" /></circle>
                        <circle cx="130" cy="80" r="3" fill="#3b82f6" opacity="0.6"><animate attributeName="opacity" values="0.2;1;0.2" dur="2.5s" repeatCount="indefinite" /></circle>
                        <circle cx="90" cy="110" r="3" fill="#3b82f6" opacity="0.6"><animate attributeName="opacity" values="0.2;1;0.2" dur="1.8s" repeatCount="indefinite" /></circle>
                        <circle cx="110" cy="40" r="3" fill="#3b82f6" opacity="0.6"><animate attributeName="opacity" values="0.2;1;0.2" dur="3s" repeatCount="indefinite" /></circle>
                    </g>
                    <text x="100" y="145" text-anchor="middle" font-size="12">Feuchtigkeit (%)</text>
                </svg>
            `;
            infoHtml = `
                <strong>💧 Das Hygrometer</strong><br>
                <strong>Einheit:</strong> Prozent (%)<br>
                <strong>Definition:</strong> 100% bedeutet, die Luft ist komplett mit Wasserdampf gesättigt und kann nichts mehr aufnehmen. 0% wäre knochentrockene Luft.
            `;
            break;
    }

    animContainer.innerHTML = animHtml;
    textContainer.innerHTML = infoHtml;
}

function updateWeatherSim() {
    const val = document.getElementById('weatherRange')?.value;
    if (!val) return;
    const sun = document.getElementById('sunSim');
    const cloud = document.getElementById('cloudSim');
    const rain = document.getElementById('rainSim');
    const bg = document.getElementById('weatherBg');
    if(!sun || !bg) return;
    if (val < 33) {
        sun.setAttribute('opacity', '1'); cloud.setAttribute('opacity', '0.2'); rain.setAttribute('opacity', '0'); bg.setAttribute('fill', '#87CEEB');
    } else if (val < 66) {
        sun.setAttribute('opacity', '0.3'); cloud.setAttribute('opacity', '1'); rain.setAttribute('opacity', '0'); bg.setAttribute('fill', '#B0C4DE');
    } else {
        sun.setAttribute('opacity', '0'); cloud.setAttribute('opacity', '1'); rain.setAttribute('opacity', '0.6'); bg.setAttribute('fill', '#708090');
    }
}

function startWindSim() {
    const svg = document.getElementById('windSvg');
    if (!svg) return;
    svg.innerHTML = '';
    for(let i=0; i<15; i++) {
        setTimeout(() => {
            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("r", "3");
            circle.setAttribute("fill", "#3b82f6");
            circle.setAttribute("opacity", "0.6");
            svg.appendChild(circle);
            let x = 20; let y = Math.random() * 100;
            const anim = setInterval(() => {
                x += 4; circle.setAttribute("cx", x); circle.setAttribute("cy", y + "%");
                if (x > 400) { clearInterval(anim); if (circle.parentNode) circle.parentNode.removeChild(circle); }
            }, 30);
        }, i * 300);
    }
}

let cloudCharge = 0;
function chargeCloud() {
    const chargeText = document.getElementById('chargeLevel');
    const lightning = document.getElementById('lightning');
    const cloud = document.getElementById('stormCloud');
    if (!chargeText || !lightning || !cloud) return;
    if (cloudCharge < 100) {
        cloudCharge += 20;
        chargeText.textContent = cloudCharge + "% geladen";
        const gray = 75 - (cloudCharge / 2);
        cloud.setAttribute('fill', `rgb(${gray},${gray},${gray})`);
    } else {
        lightning.setAttribute('opacity', '1');
        chargeText.textContent = "ENTLADUNG! ⚡";
        setTimeout(() => {
            lightning.setAttribute('opacity', '0');
            cloudCharge = 0;
            chargeText.textContent = "0% geladen";
            cloud.setAttribute('fill', '#4b5563');
        }, 200);
    }
}

function topicInit() {
    console.log("Wetter-Thema V3 geladen.");
    cloudCharge = 0;
    setTimeout(() => {
        if(document.getElementById('instrumentAnimation')) showInstrumentDetailed('thermometer');
    }, 200);
}
