
        function updateTemp() {
            const t = document.getElementById('tempSlider').value;
            const textEl = document.getElementById('tempText');
            let desc = "Warm!";
            let color = "#e53e3e";
            if(t < 0) { desc = "Eisig!"; color = "#3182ce"; }
            else if (t == 0) { desc = "Gefrierpunkt"; color = "#718096"; }
            textEl.innerHTML = `${t} °C (${desc})`;
            textEl.style.color = color;
        }
    


        function updateWalk() {
            const v = document.getElementById('walkSlider').value;
            const pct = 50 + (v * 8);
            document.getElementById('walker').style.left = pct + '%';
            document.getElementById('walkPos').innerText = `Position: ${v}`;
        }
    


        function updateMirror() {
            const v = parseInt(document.getElementById('mirrorNum').value) || 0;
            document.getElementById('gZahl').innerText = v * -1;
            document.getElementById('bZahl').innerText = Math.abs(v);
        }
    


function topicInit() {}
