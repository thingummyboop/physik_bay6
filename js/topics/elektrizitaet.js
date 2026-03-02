// Logic for elektrizitaet topic
function topicInit() {}

function answerFinalQuiz(btn, isCorrect) {
    handleAnswer(btn, isCorrect, 20);
}

function answerQuiz(btn, isCorrect) {
    handleAnswer(btn, isCorrect, 10);
}

function handleChargeExercise(btn, isCorrect) {
    handleAnswer(btn, isCorrect, 10, isCorrect ? "Richtig! Ungleiche Ladungen ziehen sich an." : "Falsch. Denk an Magnete: Gegensätze ziehen sich an!");
}
