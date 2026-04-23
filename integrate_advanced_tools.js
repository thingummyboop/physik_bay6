const fs = require('fs');

const dePath = 'lang/de.json';
const de = JSON.parse(fs.readFileSync(dePath, 'utf8'));

function embedGeoGebra(topicId, secIdx, ggbId, appName, title, description) {
    if (de[topicId] && de[topicId].sections[secIdx]) {
        const html = `
        <div class="interactive-zone" style="background: #f8fafc; border: 2px solid #3b82f6; border-radius: 12px; padding: 15px;">
            <h3 style="color: #2563eb;">📐 Interaktives Labor: ${title}</h3>
            <p>${description}</p>
            <div id="${ggbId}" style="width: 100%; height: 500px; margin: 20px auto; border: 1px solid #cbd5e1; border-radius: 8px;"></div>
        </div>`;
        
        // Insert at the beginning of the section content
        de[topicId].sections[secIdx].content = html + '\n\n' + de[topicId].sections[secIdx].content;
        
        // Add JS logic to the topic JS file
        const jsPath = `js/topics/${topicId}.js`;
        let js = fs.readFileSync(jsPath, 'utf8');
        
        const ggbInit = `
        if (document.getElementById('${ggbId}')) {
            if (typeof GGBApplet !== 'undefined') {
                var params = {
                    "appName": "${appName}",
                    "width": document.getElementById('${ggbId}').offsetWidth,
                    "height": 500,
                    "showToolBar": true,
                    "showAlgebraInput": ${appName === 'graphing' ? 'true' : 'false'},
                    "showMenuBar": false
                };
                var applet = new GGBApplet(params, true);
                applet.inject('${ggbId}');
            } else {
                document.getElementById('${ggbId}').innerHTML = '<p style="padding: 20px; color: red;">GeoGebra konnte nicht geladen werden. Bitte lade die Seite neu.</p>';
            }
        }`;
        
        // Inject into topicInit
        js = js.replace('function topicInit() {', `function topicInit() {\n${ggbInit}\n`);
        fs.writeFileSync(jsPath, js, 'utf8');
        console.log(`Embedded GeoGebra in ${topicId}`);
    }
}

function embedManimVideo(topicId, secIdx, videoFile, title, description) {
    if (de[topicId] && de[topicId].sections[secIdx]) {
        // Only embed if not already there
        if (de[topicId].sections[secIdx].content.includes(videoFile)) return;

        const html = `
        <div class="interactive-zone" style="background: #1e293b; border: 2px solid #64748b; border-radius: 12px; padding: 15px; color: white;">
            <h3 style="color: #38bdf8;">🎥 High-Quality Animation: ${title}</h3>
            <p>${description}</p>
            <video autoplay loop muted playsinline style="width: 100%; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.3);">
                <source src="../assets/videos/${videoFile}" type="video/mp4">
                Dein Browser unterstützt keine Videos.
            </video>
        </div>`;
        
        de[topicId].sections[secIdx].content = html + '\n\n' + de[topicId].sections[secIdx].content;
        console.log(`Embedded Manim Video in ${topicId}`);
    }
}

// Embed GeoGebra
embedGeoGebra('math1_6_winkel', 0, 'ggb-winkel', 'geometry', 'Winkel selbst zeichnen', 'Nutze das GeoGebra Werkzeug, um eigene Punkte zu setzen und den Winkel dazwischen messen zu lassen! Wähle das Winkel-Werkzeug aus der Leiste.');
embedGeoGebra('math4_4_funktionen_sys', 0, 'ggb-funktionen', 'graphing', 'Funktions-Graphen', 'Gib links zwei Gleichungen (z.B. y=2x+1 und y=-x+4) ein und schau dir an, wo sie sich schneiden!');
embedGeoGebra('math4_6_koerper', 0, 'ggb-koerper', '3d', '3D Raumgeometrie', 'Drehe das Koordinatensystem mit der Maus. Nutze die Werkzeuge oben, um Zylinder oder Pyramiden in 3D zu zeichnen!');

// Embed Manim Videos
embedManimVideo('math3_8_pythagoras', 0, 'pythagoras.mp4', 'Der visuelle Beweis', 'Schau dir genau an, wie die Flächen der kleinen Quadrate ($a^2$ und $b^2$) perfekt die Fläche des großen Quadrats ($c^2$) ausfüllen.');
embedManimVideo('math4_7_statistik', 0, 'galton.mp4', 'Das Galton-Brett (Normalverteilung)', 'Fallen extrem viele Kugeln völlig zufällig durch ein Nagelbrett, entsteht immer die gleiche, perfekte Glockenkurve.');
embedManimVideo('waermelehre', 0, 'waermelehre_teilchen.mp4', 'Temperatur als Bewegung', 'Kalt bedeutet langsame Teilchen. Heiß bedeutet, sie flitzen wild umher und brauchen mehr Platz!');

fs.writeFileSync(dePath, JSON.stringify(de, null, 2), 'utf8');
console.log('Update complete.');