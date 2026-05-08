// Klima-Logik erweitert
function updateGreenhouseEffect() {
    const co2Range = document.getElementById('co2Range');
    const val = Number(co2Range?.value || 0);
    if(!co2Range) return;
    const ppm = Math.round(280 + val * 2);
    const temp = 15 + (val / 100) * 5;
    const heatRetention = Math.round(36 + val * 0.52);

    co2Range.setAttribute('aria-valuetext', `${ppm} ppm CO2-Modellwert`);
    const co2Dots = document.getElementById('co2Dots');
    const heatArrows = document.getElementById('heatArrows');
    const tempText = document.getElementById('tempVal');
    const co2Text = document.getElementById('co2LevelText');
    const retentionText = document.getElementById('heatRetentionText');
    const greenhouseBlanket = document.getElementById('greenhouseBlanket');
    const heatBackGroup = document.getElementById('heatBackGroup');
    const heatEscapeGroup = document.getElementById('heatEscapeGroup');
    const surfaceGlow = document.getElementById('surfaceGlow');
    const heatMeter = document.getElementById('greenhouseMeterFill');
    const status = document.getElementById('greenhouseStatus');

    if(co2Dots) {
        co2Dots.setAttribute('opacity', (0.18 + (val / 100) * 0.82).toFixed(2));
        co2Dots.setAttribute('transform', `translate(0 ${Math.round((100 - val) / 18)})`);
    }
    if(heatArrows) heatArrows.setAttribute('stroke-width', 2 + (val / 100) * 6);
    if(greenhouseBlanket) {
        greenhouseBlanket.setAttribute('stroke-width', String(18 + val * 0.28));
        greenhouseBlanket.setAttribute('opacity', String(0.18 + val / 130));
    }
    if(heatBackGroup) {
        heatBackGroup.setAttribute('opacity', String(0.28 + val / 110));
        heatBackGroup.setAttribute('stroke-width', String(3 + val / 28));
    }
    if(heatEscapeGroup) heatEscapeGroup.setAttribute('opacity', String(Math.max(0.18, 0.82 - val / 135)));
    if(surfaceGlow) {
        surfaceGlow.setAttribute('opacity', String(0.22 + val / 140));
        surfaceGlow.setAttribute('fill', val > 70 ? '#f97316' : val > 35 ? '#facc15' : '#86efac');
    }
    if(tempText) tempText.innerText = temp.toFixed(1) + " °C";
    if(co2Text) co2Text.innerText = `${ppm} ppm`;
    if(retentionText) retentionText.innerText = `${heatRetention}% Wärme bleibt`;
    if(heatMeter) heatMeter.style.width = `${heatRetention}%`;
    if(status) status.innerHTML = `<strong>Modell-Erklärung:</strong> Sonnenlicht kommt fast ungehindert zur Erde. Die Erde sendet Wärmestrahlung zurück. Je mehr Treibhausgase im Modell eingestellt sind, desto mehr Wärmestrahlung wird zurück zur Oberfläche gelenkt.`;
}

// 3. Klimaarchive
function showClimateArchive(type) {
    const text = document.getElementById('archiveText');
    if (!text) return;
    const data = {
        ice: "🧊 <strong>Eisbohrkerne:</strong> Forscher bohren tief ins Inlandeis der Antarktis oder Grönlands. Das Eis hat beim Gefrieren vor Jahrtausenden winzige Luftbläschen eingeschlossen. Daraus lässt sich der alte CO2-Gehalt und die Temperatur ablesen!",
        tree: "🌳 <strong>Baumringe:</strong> Bäume wachsen jedes Jahr ein Stück. Ein dicker Ring bedeutet, es war ein warmes, nasses Jahr (gute Wachstumsbedingungen). Ein sehr dünner Ring deutet auf Kälte oder Dürre hin.",
        sediment: "🪨 <strong>Seesedimente:</strong> Am Grund von Seen lagert sich jedes Jahr Schlamm, Staub und Blütenstaub (Pollen) ab. Forschende holen diese Schichten hoch und sehen an den Pollen, welche Pflanzen früher dort gewachsen sind (z.B. wärmeliebende Pflanzen)."
    };
    text.innerHTML = data[type] || "Wähle ein Archiv aus!";
}

// 4. Klimadiagramm
function renderClimateChart() {
    const area = document.getElementById('climateChartArea');
    if (!area) return;
    area.innerHTML = ''; 
    
    // Data for Rome
    const months = ['J','F','M','A','M','J','J','A','S','O','N','D'];
    const temp = [7.5, 8.2, 10.2, 12.6, 17.2, 21.1, 23.8, 24.1, 20.3, 16.4, 11.4, 8.4]; 
    const prec = [83, 73, 70, 62, 53, 33, 15, 23, 72, 106, 114, 97]; 
    
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.setAttribute("viewBox", "0 0 400 250");
    
    // Axes and grid
    const leftAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
    leftAxis.setAttribute("x1", "40"); leftAxis.setAttribute("y1", "20"); leftAxis.setAttribute("x2", "40"); leftAxis.setAttribute("y2", "220"); leftAxis.setAttribute("stroke", "#334155");
    const rightAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
    rightAxis.setAttribute("x1", "360"); rightAxis.setAttribute("y1", "20"); rightAxis.setAttribute("x2", "360"); rightAxis.setAttribute("y2", "220"); rightAxis.setAttribute("stroke", "#334155");
    const bottomAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
    bottomAxis.setAttribute("x1", "40"); bottomAxis.setAttribute("y1", "220"); bottomAxis.setAttribute("x2", "360"); bottomAxis.setAttribute("y2", "220"); bottomAxis.setAttribute("stroke", "#334155");
    
    svg.appendChild(leftAxis); svg.appendChild(rightAxis); svg.appendChild(bottomAxis);
    
    // Labels
    const tLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
    tLabel.setAttribute("x", "10"); tLabel.setAttribute("y", "15"); tLabel.setAttribute("fill", "#ef4444"); tLabel.setAttribute("font-size", "12"); tLabel.textContent = "°C";
    const pLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
    pLabel.setAttribute("x", "365"); pLabel.setAttribute("y", "15"); pLabel.setAttribute("fill", "#3b82f6"); pLabel.setAttribute("font-size", "12"); pLabel.textContent = "mm";
    svg.appendChild(tLabel); svg.appendChild(pLabel);
    
    let pathD = "";
    
    for (let i = 0; i < 12; i++) {
        const xCenter = 40 + 13 + i * 26;
        
        // P Bar (1mm = 1.5px, base 220)
        const pHeight = prec[i] * 1.5;
        const pY = 220 - pHeight;
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", xCenter - 10);
        rect.setAttribute("y", pY);
        rect.setAttribute("width", "20");
        rect.setAttribute("height", pHeight);
        rect.setAttribute("fill", "#60a5fa");
        rect.setAttribute("opacity", "0.8");
        svg.appendChild(rect);
        
        // T Path (1°C = 3px) - corresponding to 10°C = 20mm scale visually
        const tY = 220 - (temp[i] * 3); 
        if (i === 0) pathD += `M${xCenter},${tY} `;
        else pathD += `L${xCenter},${tY} `;
        
        const tCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        tCircle.setAttribute("cx", xCenter);
        tCircle.setAttribute("cy", tY);
        tCircle.setAttribute("r", "3");
        tCircle.setAttribute("fill", "#ef4444");
        svg.appendChild(tCircle);
        
        const mText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        mText.setAttribute("x", xCenter);
        mText.setAttribute("y", "235");
        mText.setAttribute("text-anchor", "middle");
        mText.setAttribute("font-size", "10");
        mText.textContent = months[i];
        svg.appendChild(mText);
        
        const hoverRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        hoverRect.setAttribute("x", xCenter - 13);
        hoverRect.setAttribute("y", "20");
        hoverRect.setAttribute("width", "26");
        hoverRect.setAttribute("height", "200");
        hoverRect.setAttribute("fill", "transparent");
        hoverRect.style.cursor = "pointer";
        
        const monthNames = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
        hoverRect.onmouseover = () => {
            const tooltip = document.getElementById('chartTooltip');
            if (tooltip) {
                tooltip.innerHTML = `${monthNames[i]}: <span style="color:#ef4444">${temp[i]}°C</span> | <span style="color:#3b82f6">${prec[i]} mm</span>`;
            }
            rect.setAttribute("fill", "#2563eb");
        };
        hoverRect.onmouseout = () => {
            rect.setAttribute("fill", "#60a5fa");
        };
        svg.appendChild(hoverRect);
    }
    
    const tPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    tPath.setAttribute("d", pathD);
    tPath.setAttribute("fill", "none");
    tPath.setAttribute("stroke", "#ef4444");
    tPath.setAttribute("stroke-width", "2");
    
    svg.appendChild(tPath);
    
    area.appendChild(svg);
}

function topicInit() {
    enhanceKlimaAccessibility();
    updateGreenhouseEffect();
    setTimeout(() => {
        if(document.getElementById('climateChartArea')) renderClimateChart();
    }, 200);
}

function enhanceKlimaAccessibility() {
    const co2Range = document.getElementById('co2Range');
    if (co2Range) {
        if (document.getElementById('tempVal')) co2Range.setAttribute('aria-describedby', 'tempVal');
        co2Range.setAttribute('aria-valuetext', `${Number(co2Range.value || 0)} Prozent CO2-Modellwert`);
    }

    ['tempVal', 'co2LevelText', 'heatRetentionText', 'greenhouseStatus'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.setAttribute('role', 'status');
            el.setAttribute('aria-live', 'polite');
            el.setAttribute('aria-atomic', 'true');
        }
    });

    const archiveText = document.getElementById('archiveText');
    if (archiveText) {
        archiveText.setAttribute('role', 'status');
        archiveText.setAttribute('aria-live', 'polite');
        archiveText.setAttribute('aria-atomic', 'true');
    }
}
