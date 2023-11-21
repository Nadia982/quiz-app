const startBtn = document.querySelector(".start-btn");
const popupInfo = document.querySelector(".popup-info");
const exitBtn = document.querySelector(".exit-btn");
const main = document.querySelector(".main");
const continueBtn = document.querySelector(".continue-btn");
const quizSection = document.querySelector(".quiz-section");
const quizBox = document.querySelector(".quiz-box");

startBtn.onclick = () => {
  popupInfo.classList.add("active");
  main.classList.add("active");
};

exitBtn.onclick = () => {
  popupInfo.classList.remove("active");
  main.classList.remove("active");
};

continueBtn.onclick = () => {
  quizSection.classList.add("active");
  popupInfo.classList.remove("active");
  main.classList.remove("active");
  quizBox.classList.add("active");
  showQuestions(0);
  questionCounter(1);
};

let questionCount = 0;
let questionNumb = 1;

const nextBtn = document.querySelector(".next-btn");

nextBtn.onclick = () => {
  //  console.log(questions);
  if (questionCount < questions.length - 1) {
    questionCount++;
    showQuestions(questionCount);

    questionNumb++;
    questionCounter(questionNumb);
  } else {
    console.log("Quiz completed");
  }
};

const backBtn = document.querySelector(".back-btn");
backBtn.onclick = () => {
  if (questionCount > 0 && questionCount < questions.length) {
    questionCount--;
    showQuestions(questionCount);

    questionNumb--;
    questionCounter(questionNumb);
  } else {
    console.log("Quiz completed");
  }
};

const optionList = document.querySelector(".option-list");

function showQuestions(index) {
  const questionText = document.querySelector(".question-text");
  questionText.textContent = `${questions[index].id}. ${questions[index].question}`;

  let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
  <div class="option"><span>${questions[index].options[1]}</span></div>
  <div class="option"><span>${questions[index].options[2]}</span></div>
  `;
  optionList.innerHTML = optionTag;

  const option = document.querySelectorAll(".option");
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}

function optionSelected(answer) {
  let userAnswer = answer.textContent;
  console.log("The user's answer is " + userAnswer);
  let correctAnswer = questions[questionCount].answer;
  console.log("The correct answer is " + correctAnswer);

  let allOptions = optionList.children.length;

  if (userAnswer == correctAnswer) {
    console.log("Answer is correct");
    answer.classList.add("correct");
  } else {
    console.log("Answer is not correct");
    answer.classList.add("incorrect");

    //if wrong answer is selected, show user the correct answer
    for (let i = 0; i < allOptions; i++) {
      if (optionList.children[i].textContent == correctAnswer) {
        optionList.children[i].setAttribute("class", "option correct");
      }
    }
  }
  //disable other buttons once user has made a selection
  for (let i = 0; i < allOptions; i++) {
    optionList.children[i].classList.add("disabled");
  }
}

const questionCounter = (index) => {
  const questionTotal = document.querySelector(".question-total");
  questionTotal.textContent = `${index} of ${questions.length} questions`;
};
