function updateScale() { let k = parseFloat(document.getElementById('scaleSlider').value); document.getElementById('scaleVal').innerText = k.toFixed(1); let bx = 50 + 100 * k; let cx = 50 + 50 * k; let cy = 150 - 100 * k; document.getElementById('tri2').setAttribute('points', '50,150 ' + bx + ',150 ' + cx + ',' + cy); } updateScale();


function topicInit() {
  // Init logic is handled inline, but function required by renderer
}
