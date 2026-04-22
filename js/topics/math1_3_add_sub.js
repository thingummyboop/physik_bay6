
    let a1, a2;
    function newA() {
      a1 = Math.floor(Math.random() * 40) + 10;
      a2 = Math.floor(Math.random() * 40) + 10;
      document.getElementById('addA').innerHTML = 'Rechne: ' + a1 + ' + ' + a2 + ' = ?';
      document.getElementById('addI').value = '';
      document.getElementById('addF').innerHTML = '';
    }
    function chkA() {
      let ans = parseInt(document.getElementById('addI').value);
      if(ans === (a1 + a2)) {
        document.getElementById('addF').innerHTML = '✅ Stark! Richtig!';
      } else {
        document.getElementById('addF').innerHTML = '❌ Leider falsch. Versuch es nochmal!';
      }
    }
    setTimeout(newA, 100);
  


    let s1, s2;
    function newS() {
      s1 = Math.floor(Math.random() * 50) + 50; 
      s2 = Math.floor(Math.random() * 40) + 10; 
      document.getElementById('subA').innerHTML = 'Rechne: ' + s1 + ' - ' + s2 + ' = ?';
      document.getElementById('subI').value = '';
      document.getElementById('subF').innerHTML = '';
    }
    function chkS() {
      let ans = parseInt(document.getElementById('subI').value);
      if(ans === (s1 - s2)) {
        document.getElementById('subF').innerHTML = '✅ Boom! Richtig!';
      } else {
        document.getElementById('subF').innerHTML = '❌ Falsch. Probier noch mal!';
      }
    }
    setTimeout(newS, 100);
  


function topicInit() {}
