const startButton=document.getElementById('start-btn');
const nextButton=document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const result=document.getElementById('result');
const comment=document.getElementById('comment')
const scoreContainer = document.getElementById('score');
const commentContainer=document.getElementById('com');
let shuffledQuestion,currentQuestionIndex;
let score=0;
let verify;
startButton.addEventListener('click',startGame);
nextButton.addEventListener('click',()=> {
    currentQuestionIndex++
    
    setNextQuestion()
})
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
        answerButtonsElement.appendChild(button);
        
        button.addEventListener('click',selectAnswer)
    });  
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
    Array.from(answerButtonsElement.children).forEach(button=>{
        setStatusClass1(button, button.dataset.correct)
    })
}
    if (5> currentQuestionIndex 
        + 1){
            nextButton.classList.remove('hide')
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
            if(y==0){
                commentContainer.innerHTML="Better luck next time";
            }
            comment.classList.remove('hide');
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

function clearStatusClass(element){   
    element.classList.remove('correct')
    element.classList.remove('wrong')
    result.classList.add('hide')
    comment.classList.add('hide')
}

const questions=[
    {
        question:'Who invented the telephone? ',
        answers:[
            {text:'Alexander Graham Bell',correct:true},
            {text:'Thomas Edison',wrong:false},
            {text:'Nikola Tesla',wrong:false},
            {text:'Samuel Morse',wrong:false}
        ]
    },
    {
        question:'Who painted the Mona Lisa? ',
        answers:[ 
            {text:'Vincent van Gogh',wrong:false},
            {text:'Leonardo da Vinci',correct:true},
            {text:'Michelangelo',wrong:false},
            {text:'Pablo Picasso',wrong:false}
        ]
    },
    {
        question:'Which planet is known as the "Red Planet"? ',
        answers:[
            {text:'Venus',wrong:false},
            {text:'Saturn',wrong:false},
            {text:'Jupiter',wrong:false},
            {text:'Mars',correct:true}
        ]
        },
    {
        question:'What is the largest organ in the human body? ',
        answers:[
            {text:'Skin',correct:true},
            {text:'Heart',wrong:false},
            {text:'Liver',wrong:false},
            {text:'Brain',wrong:false}
        ]
    },
    {
        question:'Which country is home to the kangaroo? ',
        answers:[
            {text:'New Zealand',wrong:false},
            {text:'South Africa',wrong:false},
            {text:'Australia',correct:true},
            {text:'Brazil',wrong:false}
        ]

    },
    {
        question:'What is the smallest country in the world? ',
        answers:[
            {text:'Vatican City',correct:true},
            {text:'Monaco',wrong:false},
            {text:'Liechtenstein',wrong:false},
            {text:'San Marino',wrong:false}
        ]
    },
    {
        question:'Who wrote the play Romeo and Juliet?',
        answers:[
            {text:'Harold Pinter',wrong:false},
            {text:'Oscar Wilde',wrong:false},
            {text:'Samuel Beckett',wrong:false},
            {text:'William Shakespeare',correct:true},
        ]
    },
    {
        question:'What is the name of the currency used in Japan?',
        answers:[ 
            {text:'Dollar',wrong:false},
            {text:'Yen',correct:true},
            {text:'Euro',wrong:false},
            {text:'Pound',wrong:false},
            ]
    },
    {
        question:'Which country is home to the Great Barrier Reef?',
        answers:[
            {text:'Canada',wrong:false},
            {text:'Australia',correct:true},
            {text:'Brazil',wrong:false},
            {text:'Indonesia',wrong:false},
            ]
    },
    {
        question:'Who discovered penicillin?',
        answers:[
            {text:'Louis Pasteur',wrong:false},
            {text:'Alexander Fleming',correct:true},
            {text:'Marie Curie',wrong:false},
            {text:'Albert Einstein',wrong:false},
            ]
    },
]
