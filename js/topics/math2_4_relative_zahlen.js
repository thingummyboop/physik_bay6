
    let tempStates = [0, -3, 2, -5];
    let tempIndex = 0;
    function moveDot() {
      tempIndex = (tempIndex + 1) % tempStates.length;
      let val = tempStates[tempIndex];
      let cx = 150 + val * 20;
      document.getElementById('tempDot').setAttribute('cx', cx);
      document.getElementById('tempLabel').setAttribute('x', cx);
      document.getElementById('tempLabel').innerText = val + '°C';
    }
  


function topicInit() {
  // Init logic is handled inline, but function required by renderer
}
