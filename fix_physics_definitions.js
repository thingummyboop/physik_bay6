const fs = require('fs');

const dePath = 'lang/de.json';
const de = JSON.parse(fs.readFileSync(dePath, 'utf8'));

function injectBox(topicId, secId, contentToInject) {
    if (de[topicId] && de[topicId].sections) {
        const sec = de[topicId].sections.find(s => s.id === secId || s.title.includes(secId));
        if (sec && !sec.content.includes('Was wird gemessen')) {
            sec.content = sec.content.replace('</p>', '</p>\n' + contentToInject);
            console.log(`Injected into ${topicId} -> ${secId}`);
        }
    }
}

// 1. SI-Einheiten
if (de.sieinheiten && de.sieinheiten.sections[1]) {
    const oldBox = `<div class="lexikon-box">\n            📖 <strong>Das komplette 7er-Team:</strong><br>\n            1. Länge (Meter) | 2. Masse (Kilogramm) | 3. Zeit (Sekunde) <br>\n            4. Stromstärke (Ampere) | 5. Temperatur (Kelvin) <br>\n            6. Stoffmenge (Mol) | 7. Lichtstärke (Candela)\n        </div>`;
    const newBox = `<div class="lexikon-box" style="line-height: 1.6;">
            📖 <strong>Das komplette 7er-Team & ihre Messgeräte:</strong><br>
            <ul>
                <li>📏 <strong>1. Länge:</strong> Meter (m) – <em>Misst: Abstand (Maßband, Lineal)</em></li>
                <li>⚖️ <strong>2. Masse:</strong> Kilogramm (kg) – <em>Misst: Schwere/Menge (Waage)</em></li>
                <li>⏱️ <strong>3. Zeit:</strong> Sekunde (s) – <em>Misst: Dauer (Stoppuhr, Uhr)</em></li>
                <li>⚡ <strong>4. Stromstärke:</strong> Ampere (A) – <em>Misst: Stromfluss (Amperemeter)</em></li>
                <li>🌡️ <strong>5. Temperatur:</strong> Kelvin (K) – <em>Misst: Wärme (Thermometer)</em></li>
                <li>🔬 <strong>6. Stoffmenge:</strong> Mol (mol) – <em>(Für Chemiker)</em></li>
                <li>💡 <strong>7. Lichtstärke:</strong> Candela (cd) – <em>Misst: Helligkeit (Luxmeter)</em></li>
            </ul>
        </div>`;
    if (de.sieinheiten.sections[1].content.includes(oldBox)) {
        de.sieinheiten.sections[1].content = de.sieinheiten.sections[1].content.replace(oldBox, newBox);
        console.log('Updated SI-Einheiten.');
    }
}

// 2. Elektrizität (Spannung, Stromstärke, Widerstand)
const elekBox = `
        <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6; margin-top: 15px; margin-bottom: 15px;">
            <h4>⚡ Messgeräte der Elektrizität:</h4>
            <ul>
                <li><strong>Das Voltmeter:</strong> Misst die <strong>Spannung (U)</strong> in Volt (V). Es misst den "Druck" oder "Schubs", der die Elektronen antreibt.</li>
                <li><strong>Das Amperemeter:</strong> Misst die <strong>Stromstärke (I)</strong> in Ampere (A). Es zählt, wie viele Elektronen pro Sekunde durch das Kabel fließen.</li>
                <li><strong>Das Ohmmeter:</strong> Misst den <strong>Widerstand (R)</strong> in Ohm (Ω). Es misst, wie stark das Kabel die Elektronen abbremst.</li>
                <li><em>Profis nutzen ein <strong>Multimeter</strong>, das alle drei Dinge auf einmal messen kann!</em></li>
            </ul>
        </div>
`;
injectBox('elektrizitaet', 'Ohmsche Gesetz', elekBox);

// 3. Kraft und Bewegung (Kraft, Masse, Beschleunigung)
const kraftBox = `
        <div style="background-color: #fdf2f8; padding: 15px; border-radius: 8px; border-left: 4px solid #db2777; margin-top: 15px; margin-bottom: 15px;">
            <h4>🏋️ Messgeräte der Mechanik:</h4>
            <ul>
                <li><strong>Der Kraftmesser (Federwaage):</strong> Misst die <strong>Kraft (F)</strong> in Newton (N). Er funktioniert mit einer Feder, die sich dehnt, wenn man daran zieht.</li>
                <li><strong>Die Waage:</strong> Misst die <strong>Masse (m)</strong> in Kilogramm (kg). Sie misst, wie schwer / wie träge ein Körper ist.</li>
                <li><strong>Der Tachometer:</strong> Misst die <strong>Geschwindigkeit (v)</strong> (z.B. im Auto in km/h).</li>
            </ul>
        </div>
`;
injectBox('kraft_und_bewegung', 'Newton', kraftBox);

// 4. Akustik (Lautstärke & Tonhöhe)
const akustikBox = `
        <div style="background-color: #f0fdf4; padding: 15px; border-radius: 8px; border-left: 4px solid #16a34a; margin-top: 15px; margin-bottom: 15px;">
            <h4>🎶 Messgeräte der Akustik:</h4>
            <ul>
                <li><strong>Das Oszilloskop:</strong> Ein Bildschirm, der die unsichtbaren Schallwellen als zackige Linien sichtbar macht. Man kann daran Tonhöhe und Lautstärke ablesen.</li>
                <li><strong>Der Schallpegelmesser:</strong> Misst die <strong>Lautstärke</strong> in Dezibel (dB). Ein Flüstern hat etwa 30 dB, ein Presslufthammer 100 dB (Schmerzgrenze!).</li>
                <li><strong>Frequenzmesser:</strong> Misst die <strong>Tonhöhe (Frequenz)</strong> in Hertz (Hz). Er zählt, wie oft die Luft pro Sekunde hin und her zittert.</li>
            </ul>
        </div>
`;
injectBox('akustik', 'Das Oszilloskop', akustikBox);

// 5. Wärmelehre (Temperatur)
const waermeBox = `
        <div style="background-color: #fffbeb; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b; margin-top: 15px; margin-bottom: 15px;">
            <h4>🌡️ Das Messgerät:</h4>
            <ul>
                <li><strong>Das Thermometer:</strong> Misst die <strong>Temperatur</strong> (die Heftigkeit des "Zitterns" der Teilchen) in Grad Celsius (°C).</li>
                <li><em>Wie es funktioniert:</em> In alten Thermometern ist eine rote Flüssigkeit (Alkohol). Wenn es wärmer wird, brauchen die Alkohol-Teilchen mehr Platz (dehnen sich aus) und steigen im Glasröhrchen nach oben!</li>
            </ul>
        </div>
`;
injectBox('waermelehre', 'Was ist Wärme?', waermeBox);

fs.writeFileSync(dePath, JSON.stringify(de, null, 2), 'utf8');
console.log('Physics definitions updated.');