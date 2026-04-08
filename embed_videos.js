const fs = require('fs');

const dePath = 'lang/de.json';
const de = JSON.parse(fs.readFileSync(dePath, 'utf8'));

function appendVideo(topic, secId, videoFile, title) {
    if (!de[topic]) return;
    const sec = de[topic].sections.find(s => s.id === secId);
    if (!sec) return;
    
    // Check if video is already there
    if (sec.content.includes(videoFile)) return;

    const videoHtml = `
        <div class="interactive-zone" style="background: #1e293b; border: 2px solid #64748b; border-radius: 12px; padding: 15px; color: white;">
            <h3 style="color: #38bdf8;">🎥 High-Quality Animation: ${title}</h3>
            <p>Schau dir diese präzise, mit Python (Manim) generierte Animation an, um den physikalischen Vorgang genau zu verstehen:</p>
            <video autoplay loop muted playsinline style="width: 100%; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.3);">
                <source src="assets/videos/${videoFile}" type="video/webm">
                <source src="assets/videos/${videoFile.replace('.webm', '.mp4')}" type="video/mp4">
                Dein Browser unterstützt keine Videos.
            </video>
        </div>
    `;
    
    // Append before the quiz placeholder if it exists, otherwise at the end
    if (sec.content.includes('{{QUIZ_')) {
        sec.content = sec.content.replace(/(\{\{QUIZ_[a-zA-Z0-9_]+\}\})/, videoHtml + '\n        $1');
    } else {
        sec.content += '\n' + videoHtml;
    }
}

appendVideo('elektromagnetismus', 'sec3', 'lorentz_kraft.webm', 'Die Lorentzkraft (Rechte-Hand-Regel)');
appendVideo('linsen_spiegel', 'sec4', 'linsen_brechung.webm', 'Brechung an einer Sammellinse');
appendVideo('kraft_und_bewegung', 'sec4', 'vektor_addition.webm', 'Addition von Kräften (Vektor-Parallelogramm)');
appendVideo('akustik', 'sec0', 'schallwelle.webm', 'Transversal- vs. Longitudinalwelle');
appendVideo('astronomie', 'sec2', 'gravitation_kepler.webm', 'Das 2. Keplersche Gesetz (Flächensatz)');

fs.writeFileSync(dePath, JSON.stringify(de, null, 2), 'utf8');
console.log('Videos successfully embedded in de.json');
