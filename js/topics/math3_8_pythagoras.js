function checkPyth(){let val=document.getElementById('pyth_in').value; if(val==5) document.getElementById('pyth_feedback').innerHTML="<span style='color:green'>Super! 3² + 4² = 9 + 16 = 25. Wurzel 25 ist 5!</span>"; else document.getElementById('pyth_feedback').innerHTML="<span style='color:red'>Nicht ganz. Rechne: 3 mal 3 plus 4 mal 4.</span>";}


function topicInit() {
    initPythPuzzle();
}


let pythFilled = 0;
const pythTargets = [];

function initPythPuzzle() {
    const c2Grid = document.getElementById('pyth-c2-grid');
    const a2Grid = document.getElementById('pyth-a2-grid');
    const b2Grid = document.getElementById('pyth-b2-grid');
    if (!c2Grid || !a2Grid || !b2Grid) return;
    
    c2Grid.innerHTML = '';
    a2Grid.innerHTML = '';
    b2Grid.innerHTML = '';
    pythTargets.length = 0;
    pythFilled = 0;
    document.getElementById('pyth-success-msg').style.opacity = 0;

    // A = (200, 110), B = (320, 200)
    // Vector u = (120, 90) / 5 = (24, 18)
    // Vector v = (-90, 120) / 5 = (-18, 24)
    
    // Generate c² target slots
    for(let i=0; i<5; i++) {
        for(let j=0; j<5; j++) {
            const p1 = { x: 200 + i*24 + j*(-18), y: 110 + i*18 + j*24 };
            const p2 = { x: p1.x + 24, y: p1.y + 18 };
            const p3 = { x: p2.x - 18, y: p2.y + 24 };
            const p4 = { x: p1.x - 18, y: p1.y + 24 };
            
            const poly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
            poly.setAttribute("points", `${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y} ${p4.x},${p4.y}`);
            c2Grid.appendChild(poly);
            
            pythTargets.push({ p1, p2, p3, p4 });
        }
    }
    
    // Shuffle targets so they fill randomly
    for (let k = pythTargets.length - 1; k > 0; k--) {
        const j = Math.floor(Math.random() * (k + 1));
        [pythTargets[k], pythTargets[j]] = [pythTargets[j], pythTargets[k]];
    }

    // Generate a² squares (3x3 grid going left and up from (200, 200) to (200, 110))
    // Wait, side a is vertical (200,110) to (200,200). Length is 90. So 3 squares of 30x30.
    // They extend to the left: X from 110 to 200, Y from 110 to 200.
    for(let i=0; i<3; i++) {
        for(let j=0; j<3; j++) {
            const x = 110 + i*30;
            const y = 110 + j*30;
            createDraggableSquare(a2Grid, x, y, 30, '#3b82f6');
        }
    }

    // Generate b² squares (4x4 grid going right and down from (200, 200) to (320, 200))
    // Side b is horizontal (200,200) to (320,200). Length is 120. So 4 squares of 30x30.
    // They extend down: X from 200 to 320, Y from 200 to 320.
    for(let i=0; i<4; i++) {
        for(let j=0; j<4; j++) {
            const x = 200 + i*30;
            const y = 200 + j*30;
            createDraggableSquare(b2Grid, x, y, 30, '#ef4444');
        }
    }
}

function createDraggableSquare(parent, x, y, size, color) {
    const poly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    // Standard square points
    const pts = `${x},${y} ${x+size},${y} ${x+size},${y+size} ${x},${y+size}`;
    poly.setAttribute("points", pts);
    poly.setAttribute("fill", color);
    poly.style.cursor = "pointer";
    poly.style.transition = "all 0.5s ease-in-out";
    
    poly.onclick = function() {
        if (poly.getAttribute("data-moved") === "true") return;
        poly.setAttribute("data-moved", "true");
        
        const target = pythTargets[pythFilled];
        if (!target) return;
        
        const newPts = `${target.p1.x},${target.p1.y} ${target.p2.x},${target.p2.y} ${target.p3.x},${target.p3.y} ${target.p4.x},${target.p4.y}`;
        
        poly.setAttribute("points", newPts);
        pythFilled++;
        
        if (pythFilled === 25) {
            setTimeout(() => {
                document.getElementById('pyth-success-msg').style.opacity = 1;
            }, 500);
        }
    };
    parent.appendChild(poly);
}

function resetPythPuzzle() {
    initPythPuzzle();
}
