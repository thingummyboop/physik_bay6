// Logic for rechenbeispiele topic
function topicInit() {}

function checkInput(inputId, expectedValue, points, btn) {
    let val = parseFloat(document.getElementById(inputId).value);
    let feedback = btn.nextElementSibling;

    if (btn.disabled) return;

    if (val === expectedValue) {
        handleAnswer(btn, true, points, "Exakt richtig!");
        document.getElementById(inputId).disabled = true; 
    } else {
        btn.style.background = "var(--wrong)";
        if(feedback) {
            feedback.innerText = "❌ Das stimmt noch nicht ganz. Rechne noch einmal nach!";
            feedback.style.color = "var(--wrong)";
        }
        
        setTimeout(() => {
            btn.style.background = "#0097A7";
        }, 1500);
    }
}
