function updateZins() { let p = parseFloat(document.getElementById('rateSlider').value); document.getElementById('rateVal').innerText = p; let K0 = 1000; let q = 1 + p/100; let points = ""; let dots = ""; let maxK = 1000 * Math.pow(1.10, 20); for(let i=0; i<=20; i++) { let K = K0 * Math.pow(q, i); let x = i * (400 / 20); let y = 200 - (K / maxK) * 180; points += x + ',' + y + ' '; if (i % 5 === 0) dots += '<circle cx="' + x + '" cy="' + y + '" r="4" fill="#047857"/>'; if(i === 20) document.getElementById('endZinsVal').innerText = Math.round(K); } document.getElementById('zinsLine').setAttribute('points', points); document.getElementById('zinsPoints').innerHTML = dots; } updateZins();


function topicInit() {
  // Init logic is handled inline, but function required by renderer
}
