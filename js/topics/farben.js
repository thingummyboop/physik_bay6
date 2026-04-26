// Logic for farben topic
function topicInit() {
    initPrismDispersion();
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

    slider.addEventListener("input", () => updatePrismDispersion(Number(slider.value)));
    updatePrismDispersion(Number(slider.value));
}

function updatePrismDispersion(angleDeg) {
    const source = { x: 60, y: 195 };
    const prismTop = { x: 320, y: 70 };
    const prismLeft = { x: 210, y: 290 };
    const prismRight = { x: 470, y: 290 };
    const angleRad = angleDeg * Math.PI / 180;
    const incidentDir = normalize({ x: Math.cos(angleRad), y: Math.sin(angleRad) });
    const entryHit = raySegmentIntersection(source, incidentDir, prismTop, prismLeft);
    if (!entryHit) return;

    const entry = entryHit.point;
    const insideAngle = angleDeg * 0.32 + 4;
    const insideDir = normalize({
        x: Math.cos(insideAngle * Math.PI / 180),
        y: Math.sin(insideAngle * Math.PI / 180)
    });
    const insideStart = add(entry, multiply(insideDir, 0.5));
    const exitHit = raySegmentIntersection(insideStart, insideDir, prismTop, prismRight);
    if (!exitHit) return;
    const exit = exitHit.point;

    setSvgLine("dispersionIncidentRay", source, entry);
    setSvgLine("dispersionInsideRay", entry, exit);
    setSvgCircle("dispersionEntryPoint", entry);
    setSvgCircle("dispersionExitPoint", exit);

    const face = subtract(prismLeft, prismTop);
    const normal = normalize({ x: -face.y, y: face.x });
    setSvgLine("dispersionNormal", add(entry, multiply(normal, -44)), add(entry, multiply(normal, 44)));

    const label = document.getElementById("dispersionAngleLabel");
    if (label) label.textContent = `${angleDeg}°`;

    drawSpectrum(exit, insideAngle, angleDeg);
    updateDispersionText(angleDeg);
}

function drawSpectrum(exit, insideAngle, angleDeg) {
    const rays = document.getElementById("dispersionSpectrumRays");
    const hits = document.getElementById("dispersionScreenHits");
    if (!rays || !hits) return;

    rays.innerHTML = "";
    hits.innerHTML = "";

    const colors = [
        { name: "Rot", color: "#ef4444", offset: -7, width: 5 },
        { name: "Orange", color: "#f97316", offset: -4, width: 4 },
        { name: "Gelb", color: "#facc15", offset: -1, width: 4 },
        { name: "Grün", color: "#22c55e", offset: 2, width: 4 },
        { name: "Blau", color: "#3b82f6", offset: 5, width: 4 },
        { name: "Violett", color: "#8b5cf6", offset: 8, width: 5 }
    ];
    const screenX = 635;
    const baseOutAngle = insideAngle + 16 + angleDeg * 0.35;

    colors.forEach((item) => {
        const outAngle = (baseOutAngle + item.offset) * Math.PI / 180;
        const dir = normalize({ x: Math.cos(outAngle), y: Math.sin(outAngle) });
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

function updateDispersionText(angleDeg) {
    const text = document.getElementById("dispersionText");
    if (!text) return;
    let position = "ungefähr in der Mitte";
    if (angleDeg < -9) position = "weiter oben";
    if (angleDeg > 1) position = "weiter unten";
    text.innerHTML = `Der weiße Strahl trifft ${position} auf das Prisma. Im Glas wird er gebrochen. Beim Herauskommen fächert er auf: Rot wird weniger stark gebrochen, Violett stärker.`;
}

function setSvgLine(id, start, end) {
    const line = document.getElementById(id);
    if (!line) return;
    line.setAttribute("x1", start.x.toFixed(1));
    line.setAttribute("y1", start.y.toFixed(1));
    line.setAttribute("x2", end.x.toFixed(1));
    line.setAttribute("y2", end.y.toFixed(1));
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
        u
    };
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

function normalize(a) {
    const length = Math.hypot(a.x, a.y) || 1;
    return { x: a.x / length, y: a.y / length };
}
