const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const result = document.getElementById('result');
const comment = document.getElementById('comment');
const scoreContainer = document.getElementById('score');
const commentContainer = document.getElementById('com');

let shuffledQuestions, currentQuestionIndex;
let score = 0;
let verify;
let questions = [];

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

function startGame() {
    console.log('Started');
    score = 0;
    startButton.classList.add('hide');
    fetchQuestions();
}

function fetchQuestions() {
    $.ajax({
        url: 'connection.php',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            console.log('Data received:', data); 
            if (Array.isArray(data)) {
                questions = data;
                shuffledQuestions = questions.sort(() => Math.random() - 0.5).slice(0, 5);
                currentQuestionIndex = 0;
                questionContainerElement.classList.remove('hide');
                setNextQuestion();
            } else {
                console.error('Received data is not an array:', data);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Error fetching questions:', textStatus, errorThrown);
            console.error('Response Text:', jqXHR.responseText);
        }
    });
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    verify = true;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        answerButtonsElement.appendChild(button);
        button.addEventListener('click', selectAnswer);
    });
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    if (!verify) return; 

    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';
    const buttons = Array.from(answerButtonsElement.children);

    // Set background color for the selected button
    if (correct) {
        selectedButton.classList.add('correct');
        score += 1;
    } else {
        selectedButton.classList.add('wrong');
        // Find and highlight the correct button
        const correctButton = buttons.find(button => button.dataset.correct === 'true');
        if (correctButton) {
            correctButton.classList.add('correct');
        }
    }

    
    buttons.forEach(button => {
        button.disabled = true;
    });

    
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        result.classList.remove('hide');
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
        scoreContainer.innerHTML = `${score}/5`;
        if (score<5 && score>2) {
            commentContainer.innerHTML = "Good Work";
        }
        else if(score === 5){
            commentContainer.innerHTML = "Excellent Work";
        }
        else if(score>0 && score<3){
            commentContainer.innerHTML = "You can do better";
        }
        else{
            commentContainer.innerHTML = "Better luck next time";
        }
        comment.classList.remove('hide');
    }

    verify = false;
}

function clearStatusClass() {
    Array.from(answerButtonsElement.children).forEach(button => {
        button.classList.remove('correct');
        button.classList.remove('wrong');
    });
    result.classList.add('hide');
    comment.classList.add('hide');
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function setStatusClass1(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}
