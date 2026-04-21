const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. We need to replace the static buttons in the sidebar.
const sidebarStartRegex = /(<button class="nav-btn" data-page="topics\/start\.html"[\s\S]*?)<div id="content-area">/;

const newSidebarContent = `        <div style="padding: 10px 20px;">
            <select id="subject-select" onchange="renderNav()" style="width: 100%; padding: 8px; border-radius: 6px; background: var(--main-bg); color: var(--text-color); border: 1px solid var(--nav-btn-active-border); outline: none; margin-bottom: 10px; font-weight: bold; cursor: pointer;">
                <option value="physik">🚀 Physik</option>
                <option value="geographie">🌍 Geographie & Umwelt</option>
                <option value="dgb">💻 Digitale Grundbildung</option>
                <option value="chemie">🧪 Chemie</option>
                <option value="biologie">🧬 Biologie</option>
                <option value="mathematik">📐 Mathematik</option>
            </select>
            <div style="display: flex; gap: 5px; margin-bottom: 10px;">
                <button id="sort-grade-btn" onclick="setSortMode('grade')" style="flex: 1; padding: 6px; border-radius: 4px; border: none; background: var(--nav-btn-active-border); color: white; cursor: pointer; font-size: 0.85em;">Nach Schuljahr</button>
                <button id="sort-topic-btn" onclick="setSortMode('topic')" style="flex: 1; padding: 6px; border-radius: 4px; border: none; background: var(--nav-btn-active-bg); color: var(--nav-btn-color); cursor: pointer; font-size: 0.85em;">Nach Thema</button>
            </div>
        </div>

        <button class="nav-btn" data-page="topics/start.html" onclick="loadPage('topics/start.html', this)" style="font-weight: bold; color: var(--nav-btn-active-text);">🏠 Startseite</button>
        <button class="nav-btn" data-page="topics/glossar.html" onclick="loadPage('topics/glossar.html', this)" style="margin-bottom: 10px;">📖 Glossar</button>
        
        <div id="dynamic-nav-container"></div>
    </div>
    <div id="content-area">`;

html = html.replace(sidebarStartRegex, newSidebarContent);

// 2. We need to add the curriculum object and functions to the <script> block.
const scriptInsertionPoint = `function loadPage(page, button, fromHash = false) {`;

const newScriptLogic = `
        const curriculum = {
            physik: {
                topics: [
                    { id: "optik1", title: "🌑 1. Licht & Schatten", grade: "6. Schulstufe (2. Kl.)", category: "Optik" },
                    { id: "farben", title: "🎨 2. Farben & Sehen", grade: "6. Schulstufe (2. Kl.)", category: "Optik" },
                    { id: "waermelehre", title: "🌡️ 3. Wärmelehre", grade: "6. Schulstufe (2. Kl.)", category: "Wärmelehre" },
                    { id: "elektrizitaet", title: "⚡ 4. Elektrizität 1", grade: "6. Schulstufe (2. Kl.)", category: "Elektrizitätslehre" },
                    { id: "kraft_und_bewegung", title: "🚀 6. Kraft & Bewegung", grade: "7. Schulstufe (3. Kl.)", category: "Mechanik" },
                    { id: "drehundstatik", title: "🎡 7. Statik & Hebel", grade: "7. Schulstufe (3. Kl.)", category: "Mechanik" },
                    { id: "arbeit", title: "🏗 8. Mechanische Arbeit", grade: "7. Schulstufe (3. Kl.)", category: "Mechanik" },
                    { id: "energie", title: "🔋 9. Energieformen", grade: "7. Schulstufe (3. Kl.)", category: "Mechanik" },
                    { id: "akustik", title: "🎶 10. Akustik", grade: "7. Schulstufe (3. Kl.)", category: "Akustik" },
                    { id: "elektromagnetismus", title: "🧲 11. Elektromagnetismus", grade: "8. Schulstufe (4. Kl.)", category: "Elektrizitätslehre" },
                    { id: "linsen_spiegel", title: "🔍 12. Linsen & Spiegel", grade: "8. Schulstufe (4. Kl.)", category: "Optik" },
                    { id: "astronomie", title: "🌌 13. Astronomie", grade: "8. Schulstufe (4. Kl.)", category: "Astronomie" },
                    { id: "sieinheiten", title: "📏 SI-Einheiten", grade: "Grundlagen", category: "Grundlagen" },
                    { id: "rechenbeispiele", title: "🧮 Rechenbeispiele", grade: "Grundlagen", category: "Grundlagen" }
                ]
            },
            dgb: {
                topics: [
                    { id: "dgb5", title: "🖥️ 5. Klasse DGB", grade: "5. Schulstufe (1. Kl.)", category: "Informatik Grundlagen" }
                ]
            },
            geographie: {
                topics: [
                    { id: "wetter", title: "🌤️ Wetter", grade: "Allgemein", category: "Klima & Umwelt" },
                    { id: "klima", title: "🌡️ Klima", grade: "Allgemein", category: "Klima & Umwelt" },
                    { id: "klimawandel", title: "🆘 Klimawandel", grade: "Allgemein", category: "Klima & Umwelt" }
                ]
            },
            chemie: { topics: [] },
            biologie: { topics: [] },
            mathematik: { topics: [] }
        };

        let currentSortMode = 'grade';

        function setSortMode(mode) {
            currentSortMode = mode;
            document.getElementById('sort-grade-btn').style.background = mode === 'grade' ? 'var(--nav-btn-active-border)' : 'var(--nav-btn-active-bg)';
            document.getElementById('sort-grade-btn').style.color = mode === 'grade' ? 'white' : 'var(--nav-btn-color)';
            document.getElementById('sort-topic-btn').style.background = mode === 'topic' ? 'var(--nav-btn-active-border)' : 'var(--nav-btn-active-bg)';
            document.getElementById('sort-topic-btn').style.color = mode === 'topic' ? 'white' : 'var(--nav-btn-color)';
            renderNav();
        }

        function renderNav() {
            const subject = document.getElementById('subject-select').value;
            const container = document.getElementById('dynamic-nav-container');
            container.innerHTML = '';
            
            const items = curriculum[subject].topics;
            
            if (items.length === 0) {
                container.innerHTML = '<div style="padding: 20px; color: #94a3b8; text-align: center; font-style: italic; font-size: 0.9em;">Inhalte für dieses Fach folgen in Kürze! 🚧</div>';
                return;
            }

            const groups = {};
            items.forEach(item => {
                const key = currentSortMode === 'grade' ? item.grade : item.category;
                if (!groups[key]) groups[key] = [];
                groups[key].push(item);
            });

            for (const [groupName, groupItems] of Object.entries(groups)) {
                const header = document.createElement('div');
                header.className = 'grade-section';
                header.innerText = currentSortMode === 'grade' ? '📚 ' + groupName : '📂 ' + groupName;
                container.appendChild(header);

                groupItems.forEach(item => {
                    const btn = document.createElement('button');
                    btn.className = 'nav-btn';
                    btn.setAttribute('data-page', item.id);
                    btn.onclick = function() { loadPage(item.id, this); };
                    btn.innerText = item.title;
                    container.appendChild(btn);
                });
            }

            const currentPage = localStorage.getItem('physik_current_page');
            document.querySelectorAll('.nav-btn').forEach(btn => {
                if (btn.getAttribute('data-page') === currentPage) {
                    btn.classList.add('active');
                }
            });
        }

        function loadPage(page, button, fromHash = false) {`;

html = html.replace(scriptInsertionPoint, newScriptLogic);

// 3. Make sure renderNav is called in DOMContentLoaded
html = html.replace("loadPage(savedPage, null);", "renderNav();\n            loadPage(savedPage, null);");

fs.writeFileSync('index.html', html, 'utf8');
console.log('index.html refactored to support subjects and dynamic sorting!');
