
  function drawZins() {
    const r = parseFloat(document.getElementById('zins-slider').value) / 100;
    document.getElementById('zins-val').innerText = document.getElementById('zins-slider').value;
    let dLin = 'M 40,180 ';
    let dComp = 'M 40,180 ';
    const K0 = 100;
    for(let t=0; t<=20; t++) {
      let x = 40 + t * 16;
      let yLin = 180 - (K0 * (1 + r * t) - K0) * 0.4;
      let yComp = 180 - (K0 * Math.pow(1 + r, t) - K0) * 0.4;
      dLin += `L ${x},${yLin} `;
      dComp += `L ${x},${yComp} `;
    }
    document.getElementById('linear-path').setAttribute('d', dLin);
    document.getElementById('compound-path').setAttribute('d', dComp);
  }
  document.getElementById('zins-slider').oninput = drawZins;
  drawZins();



function topicInit() {
  // Init logic is handled inline, but function required by renderer
}
