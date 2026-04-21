
    (function() {
      const xInput = document.getElementById('x-val');
      const msg = document.getElementById('scale-msg');
      const beam = document.getElementById('beam');
      xInput.oninput = function() {
        const x = parseFloat(this.value);
        if (x === 5) {
          msg.textContent = 'Im Gleichgewicht!';
          msg.style.color = 'green';
          beam.setAttribute('transform', 'rotate(0 150 130)');
        } else if (x > 5) {
          msg.textContent = 'Links ist schwerer!';
          msg.style.color = 'red';
          beam.setAttribute('transform', 'rotate(-10 150 130)');
        } else {
          msg.textContent = 'Rechts ist schwerer!';
          msg.style.color = 'red';
          beam.setAttribute('transform', 'rotate(10 150 130)');
        }
      };
      xInput.oninput();
    })();
  


function topicInit() {
  // Init logic is handled inline, but function required by renderer
}
