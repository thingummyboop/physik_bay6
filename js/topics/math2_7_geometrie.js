const prismViews = {
    box: {
        title: "Schuhkarton als Prisma",
        desc: "Ein Quader mit markierter Grundfläche, Deckfläche, Seitenfläche und Höhe.",
        feedback: "Schuhkarton: vorne und hinten sind gleiche Rechtecke. Die Seitenflächen verbinden diese beiden Flächen."
    },
    tri: {
        title: "Dreiecksprisma",
        desc: "Ein Dreiecksprisma mit zwei gleichen Dreiecken und drei Seitenflächen.",
        feedback: "Dreiecksprisma: vorne und hinten sind gleiche Dreiecke. So kann zum Beispiel eine dreieckige Verpackung aufgebaut sein."
    },
    pent: {
        title: "Fünfeckprisma",
        desc: "Ein Fünfeckprisma mit zwei kongruenten Fünfecken und fünf Seitenflächen.",
        feedback: "Fünfeckprisma: Auch ein Fünfeck kann Grundfläche und Deckfläche sein. Wichtig ist: beide Flächen sind gleich und parallel."
    },
    net: {
        title: "Netz eines Dreiecksprismas",
        desc: "Das Netz zeigt zwei gleichseitige Dreiecke und drei gleich breite Rechtecke.",
        feedback: "Netz: Zwei gleichseitige Dreiecke und drei Rechtecke bilden die fünf Flächen dieses Beispiels. Jede Rechteckbreite entspricht einer Dreiecksseite. Die gemeinsame Rechteckhöhe ist die Körperhöhe."
    }
};

function topicInit() {
    initPrismExplorer();
    initTriangleExplorer();
    initReflectionExplorer();
    initTranslationExplorer();
}

function initTranslationExplorer() {
    document.querySelectorAll('[data-translation-lab]').forEach(lab=>{
        if(lab.dataset.ready)return;lab.dataset.ready='true';
        const xi=lab.querySelector('[data-shift-x]'),yi=lab.querySelector('[data-shift-y]');
        const original=[[-2,-1],[1,-1],[-2,1]];
        const update=()=>{
            const dx=Number(xi.value),dy=Number(yi.value),shifted=original.map(([x,y])=>[x+dx,y+dy]);
            const status=lab.querySelector('[data-translation-status]');
            status.textContent=`Verschiebung: waagrecht ${dx}, senkrecht ${dy}. `+shifted.map(([x,y],i)=>`${['A','B','C'][i]}′(${x}|${y})`).join(', ')+'. '+(dx===0&&dy===0?'Die Figuren liegen genau aufeinander.':'Form und Größe bleiben gleich.');
            xi.setAttribute('aria-valuetext',dx+' waagrechte Schritte');yi.setAttribute('aria-valuetext',dy+' senkrechte Schritte');
            const project=points=>points.map(([x,y])=>[180+26*x,180-26*y]);
            const grid=Array.from({length:11},(_,i)=>i-5).map(n=>`<path d="M${180+26*n} 50 V310 M50 ${180-26*n} H310" stroke="#cbd5e1"/>${n?`<text x="${180+26*n}" y="198" text-anchor="middle">${n}</text><text x="170" y="${184-26*n}" text-anchor="end">${n}</text>`:''}`).join('');
            const points=project(shifted);
            lab.querySelector('[data-translation-drawing]').innerHTML=`<svg viewBox="0 0 360 360" role="img" aria-label="${status.textContent}" style="width:100%;max-width:480px;background:white"><g fill="#172554" font-size="12">${grid}<path d="M40 180 H325 M180 325 V35" stroke="#172554" stroke-width="2"/><text x="330" y="176">x</text><text x="188" y="30">y</text><text x="185" y="196">0</text><polygon data-shift-original points="${project(original).map(p=>p.join(',')).join(' ')}" fill="#bfdbfe" fill-opacity="0.6" stroke="#1d4ed8" stroke-width="2"/><polygon data-shift-image points="${points.map(p=>p.join(',')).join(' ')}" fill="none" stroke="#92400e" stroke-width="3" stroke-dasharray="6 4"/>${points.map(([x,y],i)=>`<text x="${x+8}" y="${y-8}">${['A','B','C'][i]}′</text>`).join('')}</g></svg>`;
        };
        [xi,yi].forEach(input=>input.addEventListener('input',update));
        lab.querySelector('[data-shift-reset]').addEventListener('click',()=>{xi.value=0;yi.value=0;update();});update();
    });
}

function initReflectionExplorer() {
    document.querySelectorAll('[data-reflection-lab]').forEach(lab=>{
        if(lab.dataset.ready)return;lab.dataset.ready='true';
        const xInput=lab.querySelector('[data-reflect-x]'),yInput=lab.querySelector('[data-reflect-y]'),axis=lab.querySelector('[data-reflect-axis]');
        const update=()=>{
            const x=Number(xInput.value),y=Number(yInput.value),rx=axis.value==='y'?-x:x,ry=axis.value==='x'?-y:y;
            const same=x===rx&&y===ry,status=lab.querySelector('[data-reflection-status]');
            status.textContent=`P(${x}|${y}) → P′(${rx}|${ry}), gespiegelt an der ${axis.value}-Achse. `+(same?'P liegt auf der Achse und bleibt fest.':'Beide Punkte haben denselben senkrechten Abstand zur Spiegelachse.');
            xInput.setAttribute('aria-valuetext','x = '+x);yInput.setAttribute('aria-valuetext','y = '+y);
            const px=180+26*x,py=180-26*y,qx=180+26*rx,qy=180-26*ry;
            const grid=Array.from({length:11},(_,i)=>i-5).map(n=>`<path d="M${180+26*n} 50 V310 M50 ${180-26*n} H310" stroke="#cbd5e1"/>${n?`<text x="${180+26*n}" y="198" text-anchor="middle">${n}</text><text x="170" y="${184-26*n}" text-anchor="end">${n}</text>`:''}`).join('');
            lab.querySelector('[data-reflection-drawing]').innerHTML=`<svg viewBox="0 0 360 360" role="img" aria-label="${status.textContent}" style="width:100%;max-width:480px;background:white"><g fill="#172554" font-size="12">${grid}<path d="M40 180 H325 M180 325 V35" stroke="#172554" stroke-width="2"/><path data-mirror-axis d="${axis.value==='y'?'M180 40 V320':'M40 180 H320'}" stroke="#7c3aed" stroke-width="4"/><text x="330" y="176">x</text><text x="188" y="30">y</text><text x="185" y="196">0</text><line x1="${px}" y1="${py}" x2="${qx}" y2="${qy}" stroke="#334155" stroke-dasharray="5 4"/><circle data-original cx="${px}" cy="${py}" r="6" fill="#1d4ed8"/><circle data-image cx="${qx}" cy="${qy}" r="9" fill="none" stroke="#b45309" stroke-width="3"/><text x="${px+12}" y="${py-12}">${same?'P = P′':'P'}</text>${same?'':`<text x="${qx+12}" y="${qy-12}">P′</text>`}</g></svg>`;
        };
        [xInput,yInput].forEach(input=>input.addEventListener('input',update));axis.addEventListener('change',update);update();
    });
}

function initTriangleExplorer() {
    document.querySelectorAll('[data-triangle-lab]').forEach(lab => {
        if (lab.dataset.ready) return;
        lab.dataset.ready = 'true';
        const inputs = [...lab.querySelectorAll('[data-triangle-side]')];
        const result = lab.querySelector('[data-triangle-result]');
        const drawing = lab.querySelector('[data-triangle-drawing]');
        const update = () => {
            const [a,b,c] = inputs.map(input => Number(input.value));
            inputs.forEach(input => input.setAttribute('aria-valuetext', input.value + ' Zentimeter'));
            const sorted = [a,b,c].sort((x,y) => x-y);
            const sum = sorted[0] + sorted[1], longest = sorted[2];
            const prefix = `a = ${a} cm, b = ${b} cm, c = ${c} cm. `;
            result.dataset.valid = String(sum > longest);
            if (sum <= longest) {
                drawing.replaceChildren();
                result.textContent = prefix + (sum === longest
                    ? `${sorted[0]} + ${sorted[1]} = ${longest}. Die Strecken liegen gestreckt auf einer Geraden und schließen keine Dreiecksfläche ein.`
                    : `${sorted[0]} + ${sorted[1]} < ${longest}. Die beiden kürzeren Seiten reichen nicht, um die längste Seite zu verbinden.`);
                return;
            }
            // AB=c, AC=b, BC=a. Project C onto AB, then derive its altitude.
            const x = (b*b+c*c-a*a)/(2*c), y = Math.sqrt(Math.max(0,b*b-x*x));
            const points = [[0,0],[c,0],[x,y]].map(([px,py]) => [250+20*px,250-20*py]);
            const sideType = a===b&&b===c ? 'gleichseitig' : a===b||a===c||b===c ? 'gleichschenklig' : 'ungleichseitig';
            const squareSum = sorted[0]**2 + sorted[1]**2;
            const angleType = squareSum===longest**2 ? 'rechtwinklig' : squareSum>longest**2 ? 'spitzwinklig' : 'stumpfwinklig';
            result.textContent = prefix + `${sorted[0]} + ${sorted[1]} > ${longest}. Ein Dreieck ist möglich: ${sideType} und ${angleType}.`;
            drawing.innerHTML = `<svg viewBox="0 0 500 290" role="img" aria-label="${result.textContent}" style="width:100%;max-width:600px;background:white"><polygon points="${points.map(p=>p.join(',')).join(' ')}" fill="#dbeafe" stroke="#172554" stroke-width="3"/><g fill="#172554" font-size="15"><text x="238" y="270">A</text><text x="${points[1][0]}" y="270">B</text><text x="${points[2][0]}" y="${points[2][1]-10}">C</text></g></svg>`;
        };
        inputs.forEach(input => input.addEventListener('input', update));
        lab.querySelector('[data-triangle-reset]').addEventListener('click', () => {
            inputs.forEach((input,i) => input.value = [3,4,5][i]);
            update();
        });
        update();
    });
}

function initPrismExplorer() {
    const lab = document.querySelector("[data-prism-lab]");
    if (!lab) return;

    const buttons = lab.querySelectorAll("[data-prism-view]");
    const scenes = lab.querySelectorAll("[data-prism-scene]");
    const title = document.getElementById("prismSceneTitle");
    const desc = document.getElementById("prismSceneDesc");
    const feedback = document.getElementById("prismFeedback");

    if (feedback) {
        feedback.setAttribute("role", "status");
        feedback.setAttribute("aria-live", "polite");
        feedback.setAttribute("aria-atomic", "true");
    }

    function setView(view) {
        const data = prismViews[view] || prismViews.box;

        buttons.forEach((button) => {
            const active = button.dataset.prismView === view;
            button.classList.toggle("selected", active);
            button.setAttribute("aria-pressed", active ? "true" : "false");
        });

        scenes.forEach((scene) => {
            const active = scene.dataset.prismScene === view;
            scene.style.display = active ? "" : "none";
            scene.setAttribute("aria-hidden", active ? "false" : "true");
        });

        if (title) title.textContent = data.title;
        if (desc) desc.textContent = data.desc;
        if (feedback) feedback.textContent = data.feedback;
    }

    buttons.forEach((button) => {
        if (!button.dataset.prismViewA11yBound) {
            button.addEventListener("keydown", (event) => {
                if (event.key !== "Enter" && event.key !== " " && event.code !== "Space") return;
                event.preventDefault();
                setView(button.dataset.prismView);
            });
            button.addEventListener("click", () => setView(button.dataset.prismView));
            button.dataset.prismViewA11yBound = "true";
        }

        button.setAttribute("role", "button");
        button.setAttribute("tabindex", "0");
    });

    setView("box");
}
