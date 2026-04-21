
    function updateAngle(val) {
      const rad = val * Math.PI / 180;
      const x = 100 + 80 * Math.cos(-rad);
      const y = 100 + 80 * Math.sin(-rad);
      document.getElementById('angle-line2').setAttribute('x2', x);
      document.getElementById('angle-line2').setAttribute('y2', y);
      let type = val < 90 ? 'Spitzer Winkel' : val == 90 ? 'Rechter Winkel' : val < 180 ? 'Stumpfer Winkel' : 'Gestreckter Winkel';
      document.getElementById('angle-feedback').innerText = type + ' (' + val + '°)';
      const arcSweep = val <= 180 ? '0' : '1';
      const ax = 100 + 30 * Math.cos(-rad);
      const ay = 100 + 30 * Math.sin(-rad);
      const d = `M 100 100 L 130 100 A 30 30 0 ${arcSweep} 0 ${ax} ${ay} Z`;
      document.getElementById('angle-arc').setAttribute('d', d);
    }
    updateAngle(45);
  


function topicInit() {
  // Init logic is handled inline, but function required by renderer
}
