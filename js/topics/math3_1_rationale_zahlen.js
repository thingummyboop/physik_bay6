
    (function() {
      const slider = document.getElementById('num-slider');
      const display = document.getElementById('num-display');
      const circle = document.getElementById('val-circle');
      slider.oninput = function() {
        display.textContent = this.value;
        circle.setAttribute('cx', 200 + this.value * 18);
      };
    })();
  


function topicInit() {
  // Init logic is handled inline, but function required by renderer
}
