function checkMix(){let s=document.getElementById('sirup_in').value; let w=document.getElementById('wasser_in').value; if(s==2 && w==10) document.getElementById('mix_feedback').innerHTML="<span style='color:green'>Korrekt! 2 Becher Sirup + 10 Becher Wasser = 12 Becher!</span>"; else document.getElementById('mix_feedback').innerHTML="<span style='color:red'>Nö. Rechne: 1 Teil Sirup + 5 Teile Wasser = 6 Teile. Für 12 Becher brauchst du das Doppelte!</span>";}


function topicInit() {}
