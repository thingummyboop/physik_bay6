let rolls = 0; let sixes = 0; function rollDice() { let result = Math.floor(Math.random() * 6) + 1; rolls++; if(result === 6) sixes++; document.getElementById('rollCount').innerText = rolls; document.getElementById('sixCount').innerText = sixes; let freq = Math.round((sixes/rolls)*100); document.getElementById('relFreq').innerText = freq; document.getElementById('diceVis').innerText = '🎲 ' + result; if(rolls >= 10) { document.getElementById('statResult').innerHTML = 'Bei wenigen Würfen schwankt die Häufigkeit stark. Je öfter du wirfst, desto näher kommt sie an ca. 17% (1/6) heran.'; document.getElementById('statResult').style.color = '#2196f3'; } }


function topicInit() {
  // Init logic is handled inline, but function required by renderer
}
