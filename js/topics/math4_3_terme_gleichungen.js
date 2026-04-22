
    const btn = document.getElementById('solve-btn');
    const beam = document.getElementById('beam');
    btn.addEventListener('click', () => {
      alert('Wenn du auf beiden Seiten 5 wegnimmst, bleibt die Waage im Gleichgewicht. Was ist x?');
      beam.setAttribute('transform', 'rotate(5 150 100)');
      setTimeout(() => beam.setAttribute('transform', 'rotate(0 150 100)'), 500);
    });
  


function topicInit() {}
