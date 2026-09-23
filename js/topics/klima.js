// Klima-Logik erweitert
function updateGreenhouseEffect() {
    const co2Range = document.getElementById('co2Range');
    if(!co2Range) return;
    const raw = Number(co2Range.value);
    const val = Number.isFinite(raw) ? Math.max(0, Math.min(2, Math.round(raw))) : 1;
    co2Range.value = String(val);
    const labels = ['weniger Treibhausgase', 'mittlere Einstellung', 'mehr Treibhausgase'];
    co2Range.setAttribute('aria-valuetext', labels[val]);
    const co2Dots = document.getElementById('co2Dots');
    const co2Text = document.getElementById('co2LevelText');
    const heatBackGroup = document.getElementById('heatBackGroup');
    const heatEscapeGroup = document.getElementById('heatEscapeGroup');
    const status = document.getElementById('greenhouseStatus');

    if(co2Dots) {
        co2Dots.setAttribute('opacity', String([0.35, 0.65, 1][val]));
    }
    // These display strengths encode an ordering only, never measured energy shares.
    if(heatBackGroup) heatBackGroup.setAttribute('opacity', String([0.4, 0.7, 1][val]));
    if(heatEscapeGroup) heatEscapeGroup.setAttribute('opacity', String([1, 0.7, 0.4][val]));
    if(co2Text) co2Text.textContent = labels[val];
    if(status) status.textContent = labels[val] + ': Bei zunächst gleichen Temperaturen vermindern mehr Treibhausgase die Abgabe ins All und verstärken die Abstrahlung zur Oberfläche. Die Erde strahlt weiterhin Energie ins All ab. Ein späteres Strahlungsgleichgewicht und seine Temperatur werden hier nicht berechnet.';
}

// 3. Klimaarchive
function showClimateArchive(type) {
    const text = document.getElementById('archiveText');
    if (!text) return;
    const data = {
        ice: "🧊 <strong>Eisbohrkerne:</strong> Eingeschlossene Luftblasen bewahren frühere Luftzusammensetzung. Das Verhältnis verschiedener Wasserisotope im Eis liefert indirekte Hinweise auf frühere Temperaturen. Luft und umgebendes Eis müssen nicht gleich alt sein; Datierung und Vergleichsdaten gehören zur Auswertung.",
        tree: "🌳 <strong>Baumringe:</strong> Breite und Dichte der Ringe hängen unter anderem von Wasser, Temperatur, Standort und Wachstum ab. Erst Vergleiche vieler Bäume und weiterer Daten helfen, Klimaeinflüsse zu unterscheiden. Ein breiter Ring ist keine genaue Temperaturanzeige.",
        sediment: "🪨 <strong>Seesedimente:</strong> Pollen und andere Reste in abgelagerten Schichten liefern Hinweise auf frühere Pflanzen und Umweltbedingungen. Forschende datieren und vergleichen die Schichten. Nicht jede sichtbare Schicht entspricht genau einem Jahr; verschiedene Ursachen können ähnliche Befunde erzeugen."
    };
    text.innerHTML = data[type] || "Wähle ein Archiv aus!";
}

// 4. Klimadiagramm
function renderClimateChart() {
    const area = document.getElementById('climateChartArea');
    if (!area) return;
    area.innerHTML = ''; 
    
    // Illustrative monthly series, not an attributed station normal.
    const months = ['J','F','M','A','M','J','J','A','S','O','N','D'];
    const temp = [7.5, 8.2, 10.2, 12.6, 17.2, 21.1, 23.8, 24.1, 20.3, 16.4, 11.4, 8.4]; 
    const prec = [83, 73, 70, 62, 53, 33, 15, 23, 72, 106, 114, 97]; 
    
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.setAttribute("viewBox", "0 0 400 250");
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", "Modell-Klimadiagramm: Temperaturkurve und Niederschlagsbalken. Gleiche Höhe entspricht 10 Grad Celsius beziehungsweise 20 Millimeter. Vollständige Werte stehen in der Tabelle.");
    
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
    
    for(let t=0;t<=60;t+=10){
        const y=220-t*3;
        const line=document.createElementNS(svg.namespaceURI,'line');
        for(const[k,v]of Object.entries({x1:40,x2:360,y1:y,y2:y,stroke:'#cbd5e1'}))line.setAttribute(k,v);
        svg.appendChild(line);
        for(const[x,value,anchor]of [[35,t,'end'],[365,t*2,'start']]){
            const text=document.createElementNS(svg.namespaceURI,'text');
            text.setAttribute('x',x);text.setAttribute('y',y+3);text.setAttribute('font-size','10');text.setAttribute('text-anchor',anchor);text.setAttribute('fill','#334155');text.textContent=value;svg.appendChild(text);
        }
    }
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
    document.getElementById('climateChartData')?.remove();
    const data=document.createElement('div');data.id='climateChartData';
    const label=document.createElement('label');label.textContent='Monat auswählen: ';const select=document.createElement('select');select.setAttribute('aria-label','Monat im Klimadiagramm');select.style.minHeight='44px';select.style.font='inherit';
    const fullMonths=['Jänner','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'];
    const fmt=n=>n.toLocaleString('de-AT');
    const describe=i=>fullMonths[i]+': '+fmt(temp[i])+' °C; '+prec[i]+' mm. '+prec[i]+(prec[i]<2*temp[i]?' < ':' ≥ ')+fmt(2*temp[i])+' mm (= 2 · T): '+(prec[i]<2*temp[i]?'nach der Modellregel arider Monat.':'nach der Modellregel kein arider Monat.');
    const tooltip=document.getElementById('chartTooltip');if(tooltip){tooltip.setAttribute('role','status');tooltip.setAttribute('aria-live','polite');tooltip.setAttribute('aria-atomic','true');}
    const update=()=>{if(tooltip)tooltip.textContent=describe(Number(select.value));};
    fullMonths.forEach((name,i)=>{const option=document.createElement('option');option.value=i;option.textContent=name;select.append(option);});select.addEventListener('change',update);label.append(select);data.append(label);
    const details=document.createElement('details'),summary=document.createElement('summary');summary.textContent='Alle Monatswerte und Vergleiche';details.append(summary);
    const table=document.createElement('table');table.style.width='100%';const caption=document.createElement('caption');caption.textContent='Modellreihe: keine amtlichen Stationsdaten';table.append(caption);
    const head=document.createElement('thead'),hr=document.createElement('tr');['Monat','T (°C)','P (mm)','P < 2 · T?'].forEach(title=>{const th=document.createElement('th');th.scope='col';th.textContent=title;hr.append(th);});head.append(hr);table.append(head);
    const body=document.createElement('tbody');fullMonths.forEach((name,i)=>{const tr=document.createElement('tr');[name,fmt(temp[i]),prec[i],prec[i]<2*temp[i]?'Ja':'Nein'].forEach((value,j)=>{const cell=document.createElement(j===0?'th':'td');if(j===0)cell.scope='row';cell.textContent=value;tr.append(cell);});body.append(tr);});table.append(body);details.append(table);data.append(details);area.after(data);update();
    // Mouse/touch and keyboard selection now share exactly the same explanation.
    [...svg.querySelectorAll('rect[fill="transparent"]')].forEach((hit,i)=>{const choose=()=>{select.value=i;update();};hit.onmouseover=choose;hit.onclick=choose;});
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
        co2Range.setAttribute('aria-describedby', 'greenhouseStatus');
    }

    ['greenhouseStatus'].forEach(id => {
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
