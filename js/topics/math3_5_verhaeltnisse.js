
    function mixDrink(val) {
      const syrHeight = val * 20;
      const watHeight = 100 - syrHeight;
      document.getElementById('syrup').setAttribute('height', syrHeight);
      document.getElementById('syrup').setAttribute('y', 120 - syrHeight);
      document.getElementById('water').setAttribute('height', watHeight);
    }
  


function topicInit() {}
