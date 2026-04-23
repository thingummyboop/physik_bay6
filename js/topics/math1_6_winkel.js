document.getElementById('pizza-slider').addEventListener('input', function() { document.getElementById('pizza-angle-text').innerText = this.value + '°'; const angle = this.value * Math.PI / 180; const x = 50 + 50 * Math.cos(-angle); const y = 50 + 50 * Math.sin(-angle); const largeArc = this.value > 180 ? 1 : 0; document.getElementById('pizza-path').setAttribute('d', 'M 50 50 L 100 50 A 50 50 0 ' + largeArc + ' 0 ' + x + ' ' + y + ' Z'); });

function checkWinkelArt() { const val = document.getElementById('winkel-art-input').value.toLowerCase().trim(); const res = document.getElementById('winkel-art-res'); if(val === 'spitz') { res.innerText = 'Korrekt! 45° ist kleiner als 90°, also spitz!'; res.style.color = 'green'; } else { res.innerText = 'Falsch! Denk nochmal nach. Ist 45 kleiner oder größer als 90?'; res.style.color = 'red'; } }


function topicInit() {}
