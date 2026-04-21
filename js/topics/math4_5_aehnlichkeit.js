
  document.getElementById('k-slider').oninput = function() {
    const k = parseFloat(this.value);
    document.getElementById('k-value').innerText = k.toFixed(1);
    const newW = 100 * k;
    const newH = 100 * k;
    document.getElementById('scaled-tri').setAttribute('points', `200,150 ${200+newW},150 200,${150-newH}`);
  };



function topicInit() {
  // Init logic is handled inline, but function required by renderer
}
