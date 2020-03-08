var startButton = document.querySelector(".start-button");
var start = document.getElementById("start");
var quiz = document.getElementById("quiz");
var question = document.getElementById("question");
var qImg = document.getElementById("qImg");
var choiceA = document.getElementById("A");
var choiceB = document.getElementById("B");
var choiceC = document.getElementById("C");
var counter = document.querySelector(".counter");
var timeGauge = document.getElementById("timeGauge");
var progress = document.getElementById("progress");
var scoreDiv = document.getElementById("scoreContainer");
var quiz2 = document.getElementById("quiz-part2");
var scoreCard = document.getElementById("scoreCard");
var highScoreBox = document.getElementById("highscoreBox");
var initialsInput = document.getElementById("initials");
var scoreBillboard = document.getElementById("score-billboard");
var scoreList = document.getElementById("scoreList");
var submitButton = document.getElementById("score-submit");
var restartButton = document.getElementById("restartButton");

var questions = [
    {
        question: "Which of these is a CSS Library?",
        choiceA: "Bootstrap",
        choiceB: "Belt-Buckle",
        choiceC: "Knee Brace",
        correct: "A"
    }, {
        question: "What does HTML stand for?",
        choiceA: "Hot Tomato Making Lemonade",
        choiceB: "Hypertext Markup Language",
        choiceC: "Hard Text Madeup Language",
        correct: "B"
    }, {
        question: "What's a programmers favorite animal?",
        choiceA: "Gorilla",
        choiceB: "Otter",
        choiceC: "Python",
        correct: "C"
    }, {
        question: "Which of these is a Javascript Library?",
        choiceA: "C++",
        choiceB: "jQuery",
        choiceC: "Godot",
        correct: "B"
    }, {
        question: "What is the average weight of a swallow?",
        choiceA: "10 lbs",
        choiceB: "8 oz.",
        choiceC: "African or European?",
        correct: "C"
    }
];

// render a question
function renderQuestion(){
    var q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

startButton.addEventListener("click", startQuiz);

function startQuiz() {
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    quiz2.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter, 1000); // 1000ms = 1s
}

var lastQuestion = questions.length - 1;
var runningQuestion = 0;
var count = 60;
var questionTime = 60; // 60s
var gaugeWidth = 150; // 150px
var gaugeUnit = gaugeWidth / questionTime;
var TIMER;
var score = 0;

// render progress
function renderProgress() {
    for (var qIndex = 0; qIndex <= lastQuestion; qIndex++) {
        progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
    }
};

function renderCounter() {
    if (count >= 0) {
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count--;
    } else {
        // change progress color to red
        answerIsWrong();
        if (runningQuestion < lastQuestion) {
            runningQuestion++;
            renderQuestion();
        } else {
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
};

function checkAnswer(answer) {
    if (answer == questions[runningQuestion].correct) {
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    } else {
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    // count = 0;
    if (runningQuestion < lastQuestion) {
        runningQuestion++;
        renderQuestion();
    } else {
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
};

// answer is correct
function answerIsCorrect() {
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong() {
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// percent right
var scorePerCent;

// render score
function scoreRender() {
    scoreDiv.style.display = "block";
    scoreCard.style.display = "block";

    // percent right
    scorePerCent = Math.round(100 * score / questions.length);

    scoreDiv.innerHTML += "<p>" + scorePerCent + "%</p>";
};

submitButton.addEventListener("click", function() {
    event.preventDefault();
    quiz.style.display = "none";
    quiz2.style.display = "none";
    scoreDiv.style.display = "none";
    scoreCard.style.display = "none";
    scoreBillboard.style.display = "block";

    submitScore();
});

function submitScore() {
    event.preventDefault();
    var scoreListCreater = document.createElement("li")
    scoreListCreater.textContent = initialsInput.value.toUpperCase() + " " + scorePerCent + "%";
    scoreList.appendChild(scoreListCreater);
};
