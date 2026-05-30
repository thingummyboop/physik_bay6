// Logic for farben topic
function topicInit() {
    enhanceColorAccessibility();
    initPrismDispersion();
    showColorObject('red');
}

function enhanceColorAccessibility() {
    ['waveDesc', 'dispersionAngleLabel', 'dispersionText', 'colorObjectText'].forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.setAttribute('role', 'status');
        el.setAttribute('aria-live', 'polite');
        el.setAttribute('aria-atomic', 'true');
    });

    const slider = document.getElementById("dispersionAngle");
    if (slider) {
        slider.setAttribute("aria-describedby", "dispersionAngleLabel dispersionText");
        slider.setAttribute("aria-valuetext", `${slider.value} Grad Einfallsrichtung`);
    }
}

function showColorObject(kind) {
    const object = document.getElementById('colorObject');
    const label = document.getElementById('colorObjectLabel');
    const text = document.getElementById('colorObjectText');
    const eye = document.getElementById('colorEye');
    const reflectedRays = document.getElementById('reflectedRayGroup');
    const absorbedRays = document.getElementById('absorbedRays');
    
    if (!object) return;

    const states = {
        red: {
            fill: '#ef4444',
            shape: 'M -30 -30 Q -15 -40 0 -40 Q 15 -40 30 -30 L 50 -10 L 35 5 L 25 -5 L 25 40 Q 0 45 -25 40 L -25 -5 L -35 5 Z', // T-Shirt
            reflected: [{c: '#ef4444', w: 8, off: 0}],
            absorbed: ['#22c55e', '#3b82f6'],
            eye: '#ef4444',
            label: 'Roter Pulli',
            text: 'Der rote Pulli wirft (reflektiert) das rote Licht zurück in dein Auge. Das grüne und blaue Licht wird geschluckt (absorbiert).'
        },
        green: {
            fill: '#22c55e',
            shape: 'M 0 -45 C 30 -45 45 -15 0 45 C -45 -15 -30 -45 0 -45 Z', // Leaf shape
            reflected: [{c: '#22c55e', w: 8, off: 0}],
            absorbed: ['#ef4444', '#3b82f6'],
            eye: '#22c55e',
            label: 'Grünes Blatt',
            text: 'Das grüne Blatt reflektiert vor allem grünes Licht. Rot und Blau werden vom Blatt absorbiert.'
        },
        black: {
            fill: '#111827',
            shape: 'M -30 -20 L -10 -40 L 20 -35 L 40 -10 L 35 20 L 10 40 L -25 30 Z', // Rock/Cloth shape
            reflected: [], // None
            absorbed: ['#ef4444', '#22c55e', '#3b82f6'],
            eye: '#111827',
            label: 'Schwarzer Stoff',
            text: 'Schwarzer Stoff schluckt (absorbiert) fast das gesamte Licht. Es kommt kaum Licht am Auge an – deshalb sehen wir Schwarz!'
        },
        white: {
            fill: '#f8fafc',
            shape: 'M -30 -35 L 30 -35 L 30 35 L -30 35 Z', // Paper sheet shape
            reflected: [
                {c: '#ef4444', w: 4, off: -8}, 
                {c: '#22c55e', w: 4, off: 0}, 
                {c: '#3b82f6', w: 4, off: 8}
            ],
            absorbed: [], // None
            eye: '#f8fafc',
            label: 'Weißes Papier',
            text: 'Weißes Papier reflektiert alle Farben des Lichts gleichermaßen. Wenn alle Lichtfarben zusammen in unser Auge treffen, sehen wir Weiß.'
        }
    };

    const state = states[kind] || states.red;
    object.setAttribute('fill', state.fill);
    object.setAttribute('d', state.shape);
    eye.setAttribute('fill', state.eye);
    label.textContent = state.label;
    text.textContent = state.text;

    // Build Reflected Rays
    let reflHtml = '';
    state.reflected.forEach(r => {
        const yBase = 90 + r.off;
        reflHtml += `<path d="M 280 ${yBase} Q 330 ${yBase - 20} 380 ${yBase}" fill="none" stroke="${r.c}" stroke-width="${r.w}" stroke-dasharray="10,5" stroke-linecap="round" filter="url(#glow)">
            <animate attributeName="stroke-dashoffset" values="15;0" dur="0.5s" repeatCount="indefinite" />
        </path>`;
    });
    reflectedRays.innerHTML = reflHtml;

    // Build Absorbed Rays
    let absHtml = '';
    if (state.absorbed.length > 0) {
        state.absorbed.forEach((c, i) => {
            const x = 210 + i * 20;
            absHtml += `<path d="M ${x} 150 L ${x} 200" stroke="${c}" stroke-width="4" stroke-dasharray="4,4">
                <animate attributeName="stroke-dashoffset" values="8;0" dur="0.6s" repeatCount="indefinite" />
            </path>`;
        });
        absHtml += `<text x="230" y="225" text-anchor="middle" fill="#94a3b8" font-size="11">absorbiert</text>`;
    }
    absorbedRays.innerHTML = absHtml;
}

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

function initPrismDispersion() {
    const slider = document.getElementById("dispersionAngle");
    if (!slider) return;

    if (!slider.dataset.dispersionBound) {
        slider.addEventListener("input", () => updatePrismDispersion(Number(slider.value)));
        slider.dataset.dispersionBound = "true";
    }
    updatePrismDispersion(Number(slider.value));
}

function updatePrismDispersion(angleDeg) {
    const source = { x: 65, y: 195 };
    const prismTop = { x: 320, y: 70 };
    const prismLeft = { x: 210, y: 290 };
    const prismRight = { x: 470, y: 290 };
    const prismPoints = [prismTop, prismRight, prismLeft];
    const entryFace = subtract(prismLeft, prismTop);
    const inwardNormal = normalize({ x: entryFace.y, y: -entryFace.x });
    const incidentDir = normalize({
        x: Math.cos(angleDeg * Math.PI / 180),
        y: Math.sin(angleDeg * Math.PI / 180)
    });
    const entryHit = raySegmentIntersection(source, incidentDir, prismTop, prismLeft);
    if (!entryHit) return;

    const entry = entryHit.point;
    const actualIncidence = angleBetween(incidentDir, inwardNormal);
    setSvgLine("dispersionIncidentRay", source, entry);
    makeIncidentRayVisible();
    setSvgCircle("dispersionEntryPoint", entry);

    setSvgLine("dispersionNormal", add(entry, multiply(inwardNormal, -44)), add(entry, multiply(inwardNormal, 44)));

    const label = document.getElementById("dispersionAngleLabel");
    if (label) label.textContent = `${actualIncidence.toFixed(0)}°`;
    document.getElementById("dispersionAngle")?.setAttribute("aria-valuetext", `${actualIncidence.toFixed(0)} Grad Einfallswinkel zum Lot`);

    drawSpectrum(entry, incidentDir, multiply(inwardNormal, -1), prismPoints);
    updateDispersionText(entry, actualIncidence);
}

function drawSpectrum(entry, incidentDir, entryNormal, prismPoints) {
    const insideRays = document.getElementById("dispersionInsideColorRays");
    const exitPoints = document.getElementById("dispersionExitPoints");
    const rays = document.getElementById("dispersionSpectrumRays");
    const hits = document.getElementById("dispersionScreenHits");
    if (!insideRays || !exitPoints || !rays || !hits) return;

    insideRays.innerHTML = "";
    exitPoints.innerHTML = "";
    rays.innerHTML = "";
    hits.innerHTML = "";

    const colors = [
        { name: "Rot", color: "#ef4444", n: 1.10, width: 5 },
        { name: "Orange", color: "#f97316", n: 1.12, width: 4 },
        { name: "Gelb", color: "#facc15", n: 1.14, width: 4 },
        { name: "Grün", color: "#22c55e", n: 1.16, width: 4 },
        { name: "Blau", color: "#3b82f6", n: 1.18, width: 4 },
        { name: "Violett", color: "#8b5cf6", n: 1.20, width: 5 }
    ];
    const screenX = 635;

    colors.forEach((item) => {
        const innerDir = refractRay(incidentDir, entryNormal, 1, item.n);
        if (!innerDir) return;

        const exitHit = rayPolygonIntersection(add(entry, multiply(innerDir, 0.5)), innerDir, prismPoints, 2);
        if (!exitHit) return;

        const exit = exitHit.point;
        insideRays.appendChild(svgEl("line", {
            x1: entry.x,
            y1: entry.y,
            x2: exit.x,
            y2: exit.y,
            stroke: item.color,
            "stroke-width": item.width,
            "stroke-linecap": "round",
            opacity: "0.72"
        }));
        exitPoints.appendChild(svgEl("circle", {
            cx: exit.x,
            cy: exit.y,
            r: item.width + 1,
            fill: item.color,
            stroke: "#f8fafc",
            "stroke-width": "1.5",
            opacity: "0.95"
        }));

        const exitNormal = normalOpposingDirection(subtract(exitHit.b, exitHit.a), innerDir);
        const dir = refractRay(innerDir, exitNormal, item.n, 1);
        if (!dir || dir.x <= 0.05) return;

        const end = {
            x: screenX,
            y: exit.y + dir.y / dir.x * (screenX - exit.x)
        };
        const line = svgEl("line", {
            x1: exit.x,
            y1: exit.y,
            x2: end.x,
            y2: end.y,
            stroke: item.color,
            "stroke-width": item.width,
            "stroke-linecap": "round",
            opacity: "0.95"
        });
        rays.appendChild(line);

        const dot = svgEl("circle", {
            cx: end.x,
            cy: end.y,
            r: item.width + 2,
            fill: item.color,
            opacity: "0.95"
        });
        hits.appendChild(dot);

        if (item.name === "Rot" || item.name === "Violett") {
            const text = svgEl("text", {
                x: screenX + 12,
                y: end.y + 5,
                class: "dispersion-svg-label"
            });
            text.textContent = item.name;
            hits.appendChild(text);
        }
    });
}

function updateDispersionText(entry, actualIncidence) {
    const text = document.getElementById("dispersionText");
    if (!text) return;
    let position = "ungefähr in der Mitte";
    if (entry.y < 175) position = "weiter oben";
    if (entry.y > 215) position = "weiter unten";
    text.innerHTML = `Der weiße Strahl trifft ${position} auf das Prisma. Der echte Einfallswinkel zum Lot ist etwa ${actualIncidence.toFixed(0)}°. Die Farben werden mit Snellius unterschiedlich gebrochen.`;
}

function setSvgLine(id, start, end) {
    const line = document.getElementById(id);
    if (!line) return;
    line.setAttribute("x1", start.x.toFixed(1));
    line.setAttribute("y1", start.y.toFixed(1));
    line.setAttribute("x2", end.x.toFixed(1));
    line.setAttribute("y2", end.y.toFixed(1));
}

function makeIncidentRayVisible() {
    const line = document.getElementById("dispersionIncidentRay");
    if (!line) return;
    line.setAttribute("stroke", "#ffffff");
    line.setAttribute("stroke-width", "8");
    line.setAttribute("opacity", "0.98");
    line.removeAttribute("filter");
}

function setSvgCircle(id, point) {
    const circle = document.getElementById(id);
    if (!circle) return;
    circle.setAttribute("cx", point.x.toFixed(1));
    circle.setAttribute("cy", point.y.toFixed(1));
}

function raySegmentIntersection(origin, direction, a, b) {
    const segment = subtract(b, a);
    const denominator = cross(direction, segment);
    if (Math.abs(denominator) < 0.0001) return null;

    const offset = subtract(a, origin);
    const t = cross(offset, segment) / denominator;
    const u = cross(offset, direction) / denominator;
    if (t < 0 || u < 0 || u > 1) return null;

    return {
        point: add(origin, multiply(direction, t)),
        t,
        u,
        a,
        b
    };
}

function rayPolygonIntersection(origin, direction, points, skipEdge) {
    let closest = null;
    for (let i = 0; i < points.length; i++) {
        if (i === skipEdge) continue;
        const hit = raySegmentIntersection(origin, direction, points[i], points[(i + 1) % points.length]);
        if (hit && (!closest || hit.t < closest.t)) {
            closest = { ...hit, edge: i };
        }
    }
    return closest;
}

function refractRay(incident, normal, n1, n2) {
    const i = normalize(incident);
    let n = normalize(normal);
    if (dot(i, n) > 0) n = multiply(n, -1);
    const eta = n1 / n2;
    const cosI = -dot(n, i);
    const k = 1 - eta * eta * (1 - cosI * cosI);
    if (k < 0) return null;
    return normalize(add(multiply(i, eta), multiply(n, eta * cosI - Math.sqrt(k))));
}

function normalOpposingDirection(edge, direction) {
    let normal = normalize({ x: edge.y, y: -edge.x });
    if (dot(normal, direction) > 0) normal = multiply(normal, -1);
    return normal;
}

function svgEl(name, attrs) {
    const el = document.createElementNS("http://www.w3.org/2000/svg", name);
    Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
    return el;
}

function add(a, b) {
    return { x: a.x + b.x, y: a.y + b.y };
}

function subtract(a, b) {
    return { x: a.x - b.x, y: a.y - b.y };
}

function multiply(a, factor) {
    return { x: a.x * factor, y: a.y * factor };
}

function cross(a, b) {
    return a.x * b.y - a.y * b.x;
}

function dot(a, b) {
    return a.x * b.x + a.y * b.y;
}

function angleBetween(a, b) {
    const value = Math.max(-1, Math.min(1, dot(normalize(a), normalize(b))));
    return Math.acos(value) * 180 / Math.PI;
}

function normalize(a) {
    const length = Math.hypot(a.x, a.y) || 1;
    return { x: a.x / length, y: a.y / length };
}
