
        function drawGeo(type) {
            const svg = document.getElementById('geoSvg');
            let content = '<circle cx="100" cy="50" r="4" fill="black" />';
            if(type === 'strecke') {
                content += '<circle cx="300" cy="50" r="4" fill="black" /><line x1="100" y1="50" x2="300" y2="50" stroke="#2b6cb0" stroke-width="4" />';
            } else if(type === 'strahl') {
                content += '<line x1="100" y1="50" x2="380" y2="50" stroke="#c53030" stroke-width="4" /><polygon points="380,45 390,50 380,55" fill="#c53030" />';
            } else if(type === 'gerade') {
                content += '<line x1="20" y1="50" x2="380" y2="50" stroke="#2f855a" stroke-width="4" /><polygon points="380,45 390,50 380,55" fill="#2f855a" /><polygon points="20,45 10,50 20,55" fill="#2f855a" />';
            }
            svg.innerHTML = content;
        }
        drawGeo('strecke');
    


        function updateAngle() {
            const val = document.getElementById('angleSlider').value;
            let type = "Spitzer Winkel";
            if (val == 90) type = "Rechter Winkel";
            else if (val > 90 && val < 180) type = "Stumpfer Winkel";
            else if (val == 180) type = "Gestreckter Winkel";
            else if (val == 0) type = "Nullwinkel";
            document.getElementById('angleText').innerText = val + '° (' + type + ')';
            const rad = val * Math.PI / 180;
            const x = 100 * Math.cos(rad);
            const y = -100 * Math.sin(rad);
            document.getElementById('angleArm').setAttribute('x2', x);
            document.getElementById('angleArm').setAttribute('y2', y);
            const arcX = 30 * Math.cos(rad);
            const arcY = -30 * Math.sin(rad);
            let largeArcFlag = val > 180 ? 1 : 0;
            document.getElementById('angleArc').setAttribute('d', `M 30 0 A 30 30 0 ${largeArcFlag} 0 ${arcX} ${arcY}`);
        }
        updateAngle();
    


        function morphShape(type) {
            const poly = document.getElementById('morphPoly');
            if (type === 'triangle') poly.setAttribute('points', '50,10 90,90 10,90');
            else if (type === 'square') poly.setAttribute('points', '10,10 90,10 90,90 10,90');
            else if (type === 'parallelogram') poly.setAttribute('points', '30,10 90,10 70,90 10,90');
        }
    


        function updateCircle() {
            const r = document.getElementById('radiusSlider').value;
            document.getElementById('radVal').innerText = r;
            document.getElementById('diaVal').innerText = r * 2;
            document.getElementById('theCircle').setAttribute('r', r);
            document.getElementById('radLine').setAttribute('x2', 100 + Number(r));
        }
    


        let rx = -20, ry = 30;
        function spinCube() {
            rx += 90;
            ry += 90;
            document.getElementById('cube').style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
        }
    


function topicInit() {}
