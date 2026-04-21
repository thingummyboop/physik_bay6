
    (function() {
      const rs = document.getElementById('red-slider');
      const bs = document.getElementById('blue-slider');
      const rt = document.getElementById('ratio-text');
      const cb = document.getElementById('color-box');
      function updateRatio() {
        const r = parseInt(rs.value);
        const b = parseInt(bs.value);
        rt.textContent = r + ' : ' + b;
        const total = r + b;
        const rColor = Math.round((r/total)*255);
        const bColor = Math.round((b/total)*255);
        cb.style.backgroundColor = `rgb(${rColor}, 0, ${bColor})`;
      }
      rs.oninput = updateRatio; bs.oninput = updateRatio; updateRatio();
    })();
  


function topicInit() {
  // Init logic is handled inline, but function required by renderer
}
