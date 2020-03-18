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
const list = document.getElementById("list");
const startcontainer = document.getElementById("startcard");

let questions = [
    {
      question: "Who invented JavaScript?",
      answers: {
        ChA: "A. Douglas Crockford",
        ChB: "B. Sheryl Sandberg",
        ChC: "C. Brendan Eich"
      },
      correct: "C"
    },
    {
      question: "Which one of these is a JavaScript package manager?",
      answers: {
        ChA: "A. Node.js",
        ChB: "B. TypeScript",
        ChC: "C. npm"
      },
      correct: "C"
    },
    {
      question: "Which tool can you use to ensure code quality?",
      answers: {
        ChA: "A. Angular",
        ChB: "B. jQuery",
        ChC: "C. ESLint"
      },
      correct: "C"
    },
    {
      question: "What are variables used for in JavaScript?",
      answers: {
          ChA: "A. For changing language settings",
          ChB: "B. For storing or holding data",
          ChC: "C. For changing a value's data type"
      },
      correct: "B"
    },
    {
      question: "What is the correct way to call the random method on the Math global object?",
      answers: {
          ChA: "A. random.Math()",
          ChB: "B. Math(randon)",
          ChC: "C. Math.random()"
      },
      correct: "C"
    } 
    
  ];

// creating some variables

const lastQuestion = (questions.length);
let runningQuestion = 0;
let timerSeconds = 50;
const questionTime = 10; // 10s
let TIMER;
let score = 0;
let currentquestion;

// counter render function
function renderCounter(){
  timerSeconds--;
  console.log(timerSeconds);
  counter.innerText= timerSeconds;
if (timerSeconds<=0){
  endGame();
}
  
}

// creating a function for start button and to reveal quiz and hide start button
start.addEventListener("click",function(){
console.log(quiz);
fillnextfunction();
quiz.classList.remove("hidden");
start.classList.add("hidden");
startcard.classList.add("hidden");
TIMER = setInterval(renderCounter,1000); // 1000ms = 1s

});

//Filling in questions from the array (objects) above to the Question and answers index
function fillnextfunction(){
  //Seeing if questions are at end
  if (runningQuestion>=lastQuestion){
   endGame()
  }else{
  currentquestion = questions[runningQuestion];
  console.log(currentquestion)
  //Changing innerHTML of question and answers- obtaining from the array of objects above.
  question.innerHTML = "<p>"+ currentquestion.question +"</p>";
  ChA.innerHTML = currentquestion.answers.ChA;
  ChB.innerHTML = currentquestion.answers.ChB;
  ChC.innerHTML = currentquestion.answers.ChC;
  }


};

//Create function to check answers
function checkAnswers(event){
var selectedChoice = event.currentTarget.id;
console.log(event.currentTarget.id);
// Determining if selected choice is equal to correct answer
if (selectedChoice===currentquestion.correct){
  console.log("Correct");
  //Add 10 point to score for being correct
  score+=10;
  scoreDiv.innerText = score;

//If incorrect

}else {
//Subtract time from timer
timerSeconds-=5;
}
//Go to next question
runningQuestion++;
fillnextfunction();
}

//End the Game function
function endGame(){
clearInterval(TIMER);
quiz.classList.add("hidden")
resultsContainer.classList.remove("hidden")
var playerName = prompt("Type in your first name!")
var scoreboard ={
  name: playerName,
  score: score
}
//get item current "score" and historical scores
var loadScores = localStorage.getItem("score")
//check for storage
if (loadScores) {
loadScores = JSON.parse(loadScores);

}else{
  loadScores = []
}
//push adds on to the existing array
loadScores.push(scoreboard);
console.log(loadScores);
//change to string
var loadScoresstring = JSON.stringify(loadScores);
console.log(loadScoresstring);
//send array back to local storage
localStorage.setItem("score",loadScoresstring);
//append list

loadScores.forEach(function(entry){
  //to construct html input for list 
  var listhtml = "<li>"+entry.name+"  -  "+entry.score+"</li>";
  //+ = appends to the end 
  list.innerHTML += listhtml;
  });
}


//create click events for answers
ChA.addEventListener("click",checkAnswers);
ChB.addEventListener("click",checkAnswers);
ChC.addEventListener("click",checkAnswers);

