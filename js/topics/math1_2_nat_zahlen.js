
    function checkPosition(e) {
      const rect = e.target.closest('svg').getBoundingClientRect();
      const x = (e.clientX - rect.left) * (400 / rect.width);
      const marker = document.getElementById('guess-marker');
      marker.setAttribute('cx', x);
      
      const targetX = 20 + (360 * 0.75);
      const correctMarker = document.getElementById('correct-marker');
      correctMarker.setAttribute('opacity', '0.7');
      correctMarker.setAttribute('cx', targetX);
      
      const diff = Math.abs(x - targetX);
      const feedback = document.getElementById('guess-feedback');
      if(diff < 15) { feedback.style.color = '#4caf50'; feedback.innerHTML = "Brillant! Fast exakt getroffen."; }
      else { feedback.style.color = '#ff9800'; feedback.innerHTML = "Guter Versuch! Grün zeigt die exakte Position (3/4 der Strecke)."; }
    }
  


function topicInit() {
  // Init logic is handled inline, but function required by renderer
}
