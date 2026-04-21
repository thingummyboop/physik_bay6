function checkTri(id) { var res = document.getElementById('triResult'); if(id === 2) { res.innerHTML = 'Korrekt! Das orange Dreieck hat unten links einen 90° Winkel.'; res.style.color = 'green'; } else { res.innerHTML = 'Das ist leider nicht rechtwinklig. Versuch es noch einmal!'; res.style.color = 'red'; } }


function topicInit() {
  // Init logic is handled inline, but function required by renderer
}
