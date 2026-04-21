
    function updateDec(val) {
      let v = val / 100;
      document.getElementById('dec-point').setAttribute('cx', 10 + v * 300);
      document.getElementById('dec-value').innerText = v.toFixed(2).replace('.', ',');
    }
    updateDec(50);
  


function topicInit() {
  // Init logic is handled inline, but function required by renderer
}
