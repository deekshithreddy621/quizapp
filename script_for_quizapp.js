const startButton=document.getElementById('start-btn');
const nextButton=document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const result=document.getElementById('result');
const scoreContainer = document.getElementById('score');
let shuffledQuestion,currentQuestionIndex;
let score=0;
let verify;
startButton.addEventListener('click',startGame);
nextButton.addEventListener('click',()=> {
    currentQuestionIndex++
    
    setNextQuestion()
})
/*var button1=document.getElementById("xyz");
var clickBtn = document.getElementsByClassName('click');
button1.disabled=false*/
let i=0
function startGame(){
    console.log('Started');
    score=0;
    
    startButton.classList.add('hide');
    shuffledQuestion = questions.sort(()=>Math.random() - .5)
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion(){
    resetState()
    showQuestion(shuffledQuestion[currentQuestionIndex]);
}

function showQuestion(question){
    questionElement.innerText = question.question
    verify =true
    question.answers.forEach(answer => {
        
        const button = document.createElement('button');
        button.innerText = answer.text ;
        button.classList.add('btn');
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        //console.log(i)
        
        answerButtonsElement.appendChild(button);
        
        button.addEventListener('click',selectAnswer)
        
        
    });
    
    
  
}
function checkcorrect()
{
    
}

function disable(){
    document.getElementById("xyz").disabled=true;
}

function resetState(){
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while(answerButtonsElement.firstChild){
        answerButtonsElement.removeChild
        (answerButtonsElement.firstChild)
    }
}

function selectAnswer(e){
    let x;
    if(verify==true){
    let selectedButton = e.target
   
    
    selectedButton.style.borderWidth="thick";
    const correct = selectedButton.dataset.correct
    x=setStatusClass(document.body, correct)
    verify=false
    
    //
    Array.from(answerButtonsElement.children).forEach(button=>{
        setStatusClass1(button, button.dataset.correct)
    })
}
    if (shuffledQuestion.length> currentQuestionIndex 
        + 1){
            
            nextButton.classList.remove('hide')
            //
            
            
        }
        else{
            result.classList.remove('hide');
            startButton.innerText = 'Restart'
            startButton.classList.remove('hide')
            
            if(x<=5){
                scoreContainer.innerHTML = x+"/5";
                let y=x;
            }
            if(x==undefined)
            {
                scoreContainer.innerHTML = y+"/5";
            }
            
            document.getElementsByClassName("btn").disabled=true;


        }
}


function setStatusClass(element, correct){
    clearStatusClass(element)
    if(correct){
        element.classList.add('correct')
        score=score+1;
    }
    else{
        element.classList.add('wrong')
    }
    return score;
}

function setStatusClass1(element, correct){
    clearStatusClass(element)
    
    if(correct){
        element.classList.add('correct')
        
    }
    else{
        element.classList.add('wrong')
    }
    
    
}
//let myButton=document.getElementById("xyz");
   // myButton.disabled=true

function clearStatusClass(element){
    
    element.classList.remove('correct')
    element.classList.remove('wrong')
    result.classList.add('hide')
    
}

const questions=[
    {
        question:'What is 6+3? ',
        answers:[
            {text:'9',correct:true},
            {text:'63',wrong:false}
        ]
    },
    {
        question:'What is the capital of India? ',
        answers:[
            {text:'Mumbai',wrong:false},
            {text:'Delhi',correct:true},
            {text:'Hyderabad',wrong:false},
            {text:'Chennai',wrong:false}
        ]
    },
    {
        question:'Which of these is an outdoor game? ',
        answers:[
            {text:'Chess',wrong:false},
            {text:'Ludo',wrong:false},
            {text:'Table tennis',wrong:false},
            {text:'Football',correct:true}
        ]
        
    },
    {
        question:'Which of these is an indoor game? ',
        answers:[
            {text:'Chess',correct:true},
            {text:'Football',wrong:false}
        ]
    },
    {
        question:'What is 4*2?  ',
        answers:[
            {text:'8',correct:true},
            {text:'42',wrong:false}
        ]

    }
]



/*function startTimer() {
  timerInterval = setInterval(function() {
    time++;
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const milliseconds = time % 1000;
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(3, '0')}`;
    document.getElementById('timer').textContent = formattedTime;
  }, 10);
}
*/