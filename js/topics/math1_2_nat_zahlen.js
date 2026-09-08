
    function checkZ() {
      let val = document.getElementById('inputZehner').value;
      if(val == 8) {
        document.getElementById('feedZ').textContent = '✅ Richtig! Die Ziffer 8 steht an der Zehnerstelle. Ihr Wert ist 80.';
      } else {
        document.getElementById('feedZ').textContent = 'Schau auf die mittlere Ziffer in 182: Links stehen Hunderter, in der Mitte Zehner und rechts Einer.';
      }
    }
  


function topicInit() {}
