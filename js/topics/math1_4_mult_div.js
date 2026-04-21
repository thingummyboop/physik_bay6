
    function drawGrid() {
      const w = parseInt(document.getElementById('w-slider').value);
      const h = parseInt(document.getElementById('h-slider').value);
      const svg = document.getElementById('grid-svg');
      let html = '';
      for(let r=0; r<h; r++) {
        for(let c=0; c<w; c++) {
          html += '<rect x="'+(c*21 + 5)+'" y="'+(r*21 + 5)+'" width="20" height="20" fill="#9c27b0" rx="3"/>';
        }
      }
      svg.innerHTML = html;
      const text = document.getElementById('area-text');
      const area = h * w;
      text.innerText = h + ' × ' + w + ' = ' + area;
      if(area === 12) {
          text.style.color = '#4caf50';
          text.innerText += ' 🎉 Ziel erreicht!';
      } else {
          text.style.color = '#333';
      }
    }
    drawGrid();
  


function topicInit() {
  // Init logic is handled inline, but function required by renderer
}
