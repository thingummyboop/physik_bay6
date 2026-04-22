
    function checkZ() {
      let val = document.getElementById('inputZehner').value;
      if(val == 8) {
        document.getElementById('feedZ').innerHTML = '✅ Richtig! Es sind 8 Zehner.';
      } else {
        document.getElementById('feedZ').innerHTML = '❌ Falsch. Schau auf die <span style="color:red">rote</span> Stelle in der Mitte.';
      }
    }
  


function topicInit() {}
