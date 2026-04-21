
  function updateZyl() {
    const r = parseInt(document.getElementById('r-slider').value);
    const h = parseInt(document.getElementById('h-slider').value);
    const zTop = document.getElementById('zyl-top');
    const zBody = document.getElementById('zyl-body');
    zTop.setAttribute('rx', r);
    zTop.setAttribute('ry', r * 0.375);
    zTop.setAttribute('cy', 200 - h);
    zBody.setAttribute('d', `M ${150-r},${200-h} L ${150-r},200 A ${r} ${r*0.375} 0 0 0 ${150+r},200 L ${150+r},${200-h}`);
    document.getElementById('v-value').innerText = Math.round(Math.PI * (r/10) * (r/10) * (h/10));
  }
  document.getElementById('r-slider').oninput = updateZyl;
  document.getElementById('h-slider').oninput = updateZyl;



function topicInit() {
  // Init logic is handled inline, but function required by renderer
}
