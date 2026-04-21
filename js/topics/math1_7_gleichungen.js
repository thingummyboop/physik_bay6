
    function guessX(val) {
      const beam = document.getElementById('beam-group');
      if(val === 2) {
        document.getElementById('eq-feedback').innerText = 'Exzellent! x = 2 hält die Waage (2 + 1 = 3) im Gleichgewicht.';
        beam.setAttribute('transform', 'rotate(0, 150, 120)');
      } else if(val < 2) {
        document.getElementById('eq-feedback').innerText = 'Zu leicht! Die rechte Seite sinkt nach unten.';
        beam.setAttribute('transform', 'rotate(-10, 150, 120)');
      } else {
        document.getElementById('eq-feedback').innerText = 'Zu schwer! Die linke Seite sinkt nach unten.';
        beam.setAttribute('transform', 'rotate(10, 150, 120)');
      }
    }
    guessX(3);
  


function topicInit() {
  // Init logic is handled inline, but function required by renderer
}
