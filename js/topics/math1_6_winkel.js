
    (function(){
      const slider = document.getElementById('angle-slider');
      const arm = document.getElementById('angle-arm');
      const display = document.getElementById('angle-display');
      const arc = document.getElementById('angle-arc');
      function update() {
        const a = parseInt(slider.value);
        display.innerText = a;
        const rad = (a * Math.PI) / 180;
        const x = 100 + 80 * Math.cos(-rad);
        const y = 100 + 80 * Math.sin(-rad);
        arm.setAttribute('x2', x);
        arm.setAttribute('y2', y);
        const largeArc = a > 180 ? 1 : 0;
        if (a === 0) { arc.setAttribute('d', ''); }
        else if (a === 360) { arc.setAttribute('d', 'M 180 100 A 80 80 0 1 0 180 99.9 Z'); }
        else { arc.setAttribute('d', `M 180 100 A 80 80 0 ${largeArc} 0 ${x} ${y} L 100 100 Z`); }
      }
      slider.addEventListener('input', update);
      update();
    })();
  


    (function(){
      const arm = document.getElementById('type-arm');
      const display = document.getElementById('type-display');
      function setAngle(deg, name) {
        const rad = (deg * Math.PI) / 180;
        const x = 100 + 80 * Math.cos(-rad);
        const y = 100 + 80 * Math.sin(-rad);
        arm.setAttribute('x2', x);
        arm.setAttribute('y2', y);
        display.innerText = name + ' (' + deg + '°)';
      }
      document.getElementById('btn-spitz').onclick = () => setAngle(Math.floor(Math.random() * 88) + 1, 'Spitzer Winkel (< 90°)');
      document.getElementById('btn-recht').onclick = () => setAngle(90, 'Rechter Winkel (= 90°)');
      document.getElementById('btn-stumpf').onclick = () => setAngle(Math.floor(Math.random() * 88) + 91, 'Stumpfer Winkel (> 90° und < 180°)');
      setAngle(45, 'Spitzer Winkel (< 90°)');
    })();
  


function topicInit() {}
