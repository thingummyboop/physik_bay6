
    function updateBalance(val) {
      const sum = 5 + parseInt(val || 0);
      const beam = document.getElementById('scale-beam');
      const feedback = document.getElementById('balance-feedback');
      let angle = (12 - sum) * 3; 
      if(angle > 20) angle = 20;
      if(angle < -20) angle = -20;
      beam.setAttribute('transform', 'rotate('+angle+' 100 40)');
      
      if(sum === 12) {
        feedback.style.color = '#4caf50';
        feedback.innerHTML = "Im Gleichgewicht! 12 - 5 = 7.";
      } else {
        feedback.style.color = '#ff9800';
        feedback.innerHTML = "Die Waage kippt!";
      }
    }
    updateBalance(0);
  


function topicInit() {
  // Init logic is handled inline, but function required by renderer
}
