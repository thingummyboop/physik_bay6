console.log('Stellenwerttafel loaded');

document.getElementById('compare-sign').onclick = function() { alert('Kleiner als!'); };

console.log('Runden visualisiert');


function topicInit() {
  // Init logic is handled inline, but function required by renderer
}


function doRounding() {
    const val = parseInt(document.getElementById('round-input').value);
    const place = parseInt(document.getElementById('round-place').value);
    const resDiv = document.getElementById('round-result');
    
    if (isNaN(val)) return;
    
    const div = val / place;
    let rounded = 0;
    let rule = "";
    
    // Find the decision digit
    const strVal = val.toString();
    const targetDigitIndex = strVal.length - Math.log10(place);
    
    if (targetDigitIndex < 0) {
        resDiv.innerHTML = `<span style="color:red">Die Zahl ist zu klein, um sie auf ${place}er zu runden.</span>`;
        return;
    }
    
    const decisionDigit = parseInt(strVal[targetDigitIndex] || '0');
    
    if (decisionDigit < 5) {
        rounded = Math.floor(div) * place;
        rule = `Die Stelle rechts daneben ist eine <strong>${decisionDigit}</strong>. Deshalb runden wir <strong>ab</strong> (📉).`;
    } else {
        rounded = Math.ceil(div) * place;
        rule = `Die Stelle rechts daneben ist eine <strong>${decisionDigit}</strong>. Deshalb runden wir <strong>auf</strong> (📈).`;
    }
    
    resDiv.innerHTML = `
        Ursprüngliche Zahl: <strong>${val}</strong><br>
        ${rule}<br>
        Das Ergebnis ist: <strong style="color: #e11d48; font-size: 1.3em;">${rounded}</strong>
    `;
}
