function checkWaage() { const val = document.getElementById('waage-input').value; const res = document.getElementById('waage-result'); if(val == 5) { res.innerText = 'Bingo! 5 + 3 = 8. Die Waage ist perfekt ausbalanciert!'; res.style.color = 'green'; } else { res.innerText = 'Oh nein! Die Waage kippt um. Versuch eine andere Zahl!'; res.style.color = 'red'; } }

function checkUmkehr() { const val = document.getElementById('umkehr-input').value.replace(/ /g, ''); const res = document.getElementById('umkehr-res'); if(val === '-7') { res.innerText = 'Super! -7 ist richtig!'; res.style.color = 'green'; } else { res.innerText = 'Nicht ganz. Das Gegenteil von Plus ist Minus...'; res.style.color = 'red'; } }


function topicInit() {}
