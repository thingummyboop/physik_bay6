
    let pieces = 1;
    let pieTotal = 4;
    function drawPie() {
      const svg = document.getElementById('pie-svg');
      svg.innerHTML = '';
      for(let i=0; i<pieTotal; i++) {
        let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        let a1 = (i * 2 * Math.PI) / pieTotal;
        let a2 = ((i+1) * 2 * Math.PI) / pieTotal;
        let x1 = Math.cos(a1), y1 = Math.sin(a1);
        let x2 = Math.cos(a2), y2 = Math.sin(a2);
        path.setAttribute('d', `M 0 0 L ${x1} ${y1} A 1 1 0 0 1 ${x2} ${y2} Z`);
        path.setAttribute('fill', i < pieces ? '#4CAF50' : '#e0e0e0');
        path.setAttribute('stroke', '#fff');
        path.setAttribute('stroke-width', '0.05');
        svg.appendChild(path);
      }
      document.getElementById('frac-text').innerText = pieces + '/' + pieTotal;
    }
    function changePieces(d) {
      pieces = Math.max(0, Math.min(pieTotal, pieces + d));
      drawPie();
    }
    drawPie();
  


function topicInit() {
  // Init logic is handled inline, but function required by renderer
}
