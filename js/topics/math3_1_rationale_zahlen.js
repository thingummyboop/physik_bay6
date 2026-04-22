
    function updateFraction(val) {
      const bar = document.getElementById('fractionBar');
      const txt = document.getElementById('fractionText');
      bar.setAttribute('width', val * 70);
      txt.textContent = val + '/4';
    }
  


function topicInit() {}
