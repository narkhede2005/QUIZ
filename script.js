const quizData = [
  {
    question: '1. Which of the following best describes the phenomenon of electromagnetic induction?',
    options: ['A)The generation of electric current due to thermal energy.',
      'B) The induction of a voltage due to a changing magnetic field.',
      'C) The production of electric current due to mechanical motion.',
      'D) The creation of a magnetic field by passing current through a conductor.'
    ],
    answer: 'B) The induction of a voltage due to a changing magnetic field.',
  },
  {
    question: '2. Which of the following laws explains why the induced EMF opposes the change in magnetic flux?',
    options: ['A) Faraday’s Law', 'B) Coulomb’s Law', 'C) Lenz’s Law', 'D) Ampere’s Law'],
    answer: 'C) Lenz’s Law',
  },
  {
    question: '3. What happens to the induced EMF if the number of turns in a coil is doubled, while the rate of change of magnetic flux remains constant?',
    options: ['A) The induced EMF is halved.', 'B) The induced EMF is doubled.', 'C) The induced EMF remains the same.',
      'D) The induced EMF becomes zero.'
    ],
    answer: 'B) The induced EMF is doubled.',
  },
  {
    question: '4. Which of the following is a unit of EMF?',
    options: ['A) Ampere', 'B) Ohm', 'C) Volt', 'D) Tesla'],
    answer: 'C) Volt',
  },
  {
    question: '5. If a magnetic field through a coil changes direction, what will be the effect on the induced EMF?',
    options: ['A) The induced EMF will increase.',
      'B) The induced EMF will decrease.',
      'C) The direction of the induced EMF will reverse.',
      'D) There will be no change in the induced EMF.'
    ],
    answer: 'C) The direction of the induced EMF will reverse.',
  },
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');
let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  const questionData = quizData[currentQuestion];
  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';
  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('label');
    option.className = 'option';
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.value = shuffledOptions[i];
    const optionText = document.createTextNode(shuffledOptions[i]);
    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  // Corrected the innerHTML to append the question and options
  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;

    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  // Fixed result display string (missing template literals)
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';
  let incorrectAnswersHtml = '';
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
      </p>
    `;
  }
  resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

// Initialize quiz display
displayQuestion();
