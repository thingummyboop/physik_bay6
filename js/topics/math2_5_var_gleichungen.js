function checkScale() { var val = document.getElementById('xInput').value; var res = document.getElementById('scaleResult'); if(val == 3) { res.innerHTML = 'Richtig! x = 3. Die Waage ist im Gleichgewicht (3 + 2 = 5).'; res.style.color = 'green'; } else { res.innerHTML = 'Noch nicht ganz. Überlege: Welche Zahl plus 2 ergibt 5?'; res.style.color = 'red'; } }


function topicInit() {
  // Init logic is handled inline, but function required by renderer
}
