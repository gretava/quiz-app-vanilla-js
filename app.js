'strict mode';

const questions = [
  {
    question: 'What is the capital of Austria?',
    answers: [
      { text: 'Berlin', correct: false },
      { text: 'London', correct: false },
      { text: 'Madrid', correct: false },
      { text: 'Vienna', correct: true },
    ],
  },
  {
    question: 'What is the largest planet in our solar system?',
    answers: [
      { text: 'Earth', correct: false },
      { text: 'Mars', correct: false },
      { text: 'Jupiter ', correct: true },
      { text: 'Venus', correct: false },
    ],
  },
  {
    question: 'In which year did Christopher Columbus reach the Americas?',
    answers: [
      { text: '1400', correct: false },
      { text: '1492 ', correct: true },
      { text: '1600', correct: false },
      { text: '1776', correct: false },
    ],
  },
  {
    question:
      'Which gas do plants absorb from the atmosphere during photosynthesis?',
    answers: [
      { text: 'Oxygen', correct: false },
      { text: 'Nitrogen', correct: false },
      { text: 'Carbon Dioxide ', correct: true },
      { text: 'Hydrogen', correct: false },
    ],
  },
  {
    question: 'What is the main ingredient in guacamole?',
    answers: [
      { text: 'Tomato', correct: false },
      { text: 'Avocado ', correct: true },
      { text: 'Onion', correct: false },
      { text: 'Cilantro', correct: false },
    ],
  },
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = 'Next';
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNumber = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNumber + '. ' + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement('button');
    button.innerHTML = answer.text;
    button.classList.add('btn');
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = 'none';
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === 'true';
  if (isCorrect) {
    selectedBtn.classList.add('correct');
    score++;
  } else {
    selectedBtn.classList.add('incorrect');
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === 'true') {
      button.classList.add('correct');
    }
    button.disabled = true;
  });
  nextButton.style.display = 'block';
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = 'Play again';
  nextButton.style.display = 'block';
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener('click', () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
