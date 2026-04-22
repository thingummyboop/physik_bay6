
    const slider = document.getElementById('guess-slider');
    const valDisplay = document.getElementById('guess-val');
    const diagText = document.getElementById('diag-text');
    slider.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value).toFixed(2);
      valDisplay.textContent = val;
      const sq = (val * val).toFixed(2);
      diagText.textContent = `d² ≈ ${sq}`;
      if (Math.abs(val * val - 2) < 0.05) {
        diagText.style.fill = '#2ecc71';
      } else {
        diagText.style.fill = '#e74c3c';
      }
    });
  


function topicInit() {}
