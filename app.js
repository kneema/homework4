//select HTML elements and store references to them in variables
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const ChA = document.getElementById("A");
const ChB = document.getElementById("B");
const ChC = document.getElementById("C");
const counter = document.getElementById("counter");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");
const submitButton = document.getElementById('submit');
const resultsContainer = document.getElementById('results');

let questions = [
    {
      question: "Who invented JavaScript?",
      answers: {
        ChA: "Douglas Crockford",
        ChB: "Sheryl Sandberg",
        ChC: "Brendan Eich"
      },
      correct: "C"
    },
    {
      question: "Which one of these is a JavaScript package manager?",
      answers: {
        ChA: "Node.js",
        ChB: "TypeScript",
        ChC: "npm"
      },
      correct: "C"
    },
    {
      question: "Which tool can you use to ensure code quality?",
      answers: {
        ChA: "Angular",
        ChB: "jQuery",
        ChC: "ESLint"
      },
      correct: "C"
    },
    {
      question: "What are variables used for in JavaScript?",
      answers: {
          ChA: "For changing language settings",
          ChB: "For storing or holding data",
          ChC: "For changing a value's data type"
      },
      correct: "B"
    },
    {
      question: "What is the correct way to call the random method on the Math global object?",
      answers: {
          ChA: "random.Math()",
          ChB: "Math(randon)",
          ChC: "Math.random()"
      },
      correct: "C"
    } 
    
  ];

// creating some variables

const lastQuestion = (questions.length - 1);
let runningQuestion = 0;
let timerSeconds = 10;
const questionTime = 10; // 10s
let TIMER;
let score = 0;

// for each question...
questions.forEach(
(currentQuestion, questionNumber) => {

      // variable to store the list of possible answers
      const answers = [];

      // and for each available answer
      for(letter in currentQuestion.answers){

        // add HTML radio button
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      // add question and its answers to the output
      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join('')} </div>`
      );
    });

  // Combine our output list into one string of HTML and put it on the page
  quiz.innerHTML = output.join('');

//render question
function renderQuestion(){
    question.innerHTML = "<p>"+ q.question +"</p>";
    ChA.innerHTML = q.ChA;
    ChB.innerHTML = q.ChB;
    ChC.innerHTML = q.ChC;
}

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}
start.addEventListener("click",startQuiz);

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnswer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// if answer is correct
if(userAnswer === currentQuestion.correct){
    // add to the number of correct answers
    numCorrect++;

    // color the answers green
    answerContainers[questionNumber].style.color = 'lightgreen';
  }
  // if answer is wrong or blank
  else{
    // color the answers red
    answerContainers[questionNumber].style.color = 'red';
  }
//Show results of the quiz
function showResults(){
    // gather answer containers from our quiz
  const answerContainers = quizContainer.querySelectorAll('.answers');

  // keep track of user's answers
  let numCorrect = 0;

  // for each question...
  questions.forEach( (currentQuestion, questionNumber) => {

    // find selected answer
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

}  
// on submit, show results
 submitButton.addEventListener('click', showResults);

// show number of correct answers out of total
resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    
    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "img/5.png" :
              (scorePerCent >= 60) ? "img/4.png" :
              (scorePerCent >= 40) ? "img/3.png" :
              (scorePerCent >= 20) ? "img/2.png" :
              "img/1.png";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
});