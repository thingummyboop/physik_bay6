// Logic for elektrizitaet topic
function topicInit() {}

function checkExercise(btn, isCorrect, message, points) {
    handleAnswer(btn, isCorrect, points, message);
}

function answerQuiz(btn, isCorrect) {
    handleAnswer(btn, isCorrect, 10);
}

function answerFinalQuiz(btn, isCorrect) {
    handleAnswer(btn, isCorrect, 20);
}
