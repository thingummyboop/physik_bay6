function updatePct() { var val = document.getElementById('pctSlider').value; document.getElementById('pctVal').innerText = val; document.getElementById('pctBar').setAttribute('width', val + '%'); if (val == 40) { document.getElementById('pctResult').innerHTML = 'Perfekt! 40% sind 40 von 100, oder auch 2/5.'; document.getElementById('pctResult').style.color = 'green'; } else { document.getElementById('pctResult').innerHTML = ''; } }


function topicInit() {
  // Init logic is handled inline, but function required by renderer
}
