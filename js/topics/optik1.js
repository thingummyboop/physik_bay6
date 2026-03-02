// Logic for optik1 topic
function topicInit() {
    updateReflection();
}

function updateReflection() {
    const angle = parseInt(document.getElementById('reflectRange')?.value || 45);
    const incident = document.getElementById('incidentRay');
    const reflected = document.getElementById('reflectedRay');
    const angleVal = document.getElementById('angleValue');
    if (!incident || !reflected) return;

    if (angleVal) angleVal.innerText = angle;

    // Center is 200, 170
    const length = 150;
    const rad = (90 - angle) * Math.PI / 180;
    
    const xIn = 200 - Math.cos(rad) * length;
    const yIn = 170 - Math.sin(rad) * length;
    incident.setAttribute('x1', xIn);
    incident.setAttribute('y1', yIn);

    const xRef = 200 + Math.cos(rad) * length;
    const yRef = 170 - Math.sin(rad) * length;
    reflected.setAttribute('x1', 200);
    reflected.setAttribute('y1', 170);
    reflected.setAttribute('x2', xRef);
    reflected.setAttribute('y2', yRef);
}
