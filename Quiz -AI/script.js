

const quizData = [
    {
        type: 'text',
        prompt: 'What is the capital of France?',
        options: ['Paris', 'Berlin', 'Madrid', 'Rome'],
        answer: 'Paris',
        explanation: 'Paris is the capital of France.'
    },
    {
        type: 'image',
        prompt: 'assets/eiffel-tower.jpg',
        options: ['France', 'Italy', 'Germany', 'Spain'],
        answer: 'France',
        explanation: 'The Eiffel Tower is located in Paris, France.'
    },
    {
        type: 'pdf',
        prompt: 'assets/sample.pdf',
        options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
        answer: 'Option 1',
        explanation: 'Read the PDF carefully to find the correct answer.'
    },
    
    {
        type: 'text',
        prompt: 'What is the largest planet in our solar system?',
        options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
        answer: 'Jupiter',
        explanation: 'Jupiter is the largest planet in our solar system.'
    },

    
];

let currentQuestionIndex = 0;
let score = 0;



function showElement(id) {
    document.getElementById(id).classList.remove('d-none');
}

function hideElement(id) {
    document.getElementById(id).classList.add('d-none');
}



function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    hideElement('welcome-screen');
    showElement('quiz-screen');
    loadQuestion();
}



function loadQuestion() {
    const question = quizData[currentQuestionIndex];
    const questionTitle = document.getElementById('question-title');
    const promptDiv = document.getElementById('quiz-prompt');
    const answerOptions = document.getElementById('answer-options');
    const progressBar = document.getElementById('progress-bar');


    
    questionTitle.textContent = `Question ${currentQuestionIndex + 1} of ${quizData.length}`;

   
    
    if (question.type === 'image') {
        promptDiv.innerHTML = `<img src="${question.prompt}" alt="Quiz Image" class="img-fluid rounded">`;
    } else if (question.type === 'pdf') {
        promptDiv.innerHTML = `<iframe src="${question.prompt}" class="w-100 rounded" style="height: 400px;"></iframe>`;
    } else {
        promptDiv.innerHTML = `<p>${question.prompt}</p>`;
    }

   
    
    answerOptions.innerHTML = '';
    question.options.forEach(option => {
        answerOptions.innerHTML += `
            <div class="form-check">
                <input class="form-check-input" type="radio" name="answer" value="${option}" id="${option}">
                <label class="form-check-label" for="${option}">${option}</label>
            </div>`;
    });

 
    
    const progressPercent = ((currentQuestionIndex + 1) / quizData.length) * 100;
    progressBar.style.width = `${progressPercent}%`;
    progressBar.setAttribute('aria-valuenow', progressPercent);
}



document.getElementById('answer-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (!selectedOption) {
        alert('Please select an answer before submitting!');
        return;
    }

    const question = quizData[currentQuestionIndex];
    const feedbackMessage = document.getElementById('feedback-message');
    const feedbackExplanation = document.getElementById('feedback-explanation');
    const feedbackIcon = document.getElementById('feedback-icon');

    if (selectedOption.value === question.answer) {
        feedbackMessage.textContent = 'Correct!';
        feedbackMessage.classList.add('text-success');
        feedbackMessage.classList.remove('text-danger');
        feedbackIcon.innerHTML = '✔️';
        feedbackIcon.classList.add('feedback-success');
        score++;
    } else {
        feedbackMessage.textContent = `Incorrect! The correct answer was: ${question.answer}`;
        feedbackMessage.classList.add('text-danger');
        feedbackMessage.classList.remove('text-success');
        feedbackIcon.innerHTML = '❌';
        feedbackIcon.classList.add('feedback-error');
    }

    feedbackExplanation.textContent = question.explanation;

    hideElement('quiz-screen');
    showElement('feedback-screen');
});



function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        hideElement('feedback-screen');
        showElement('quiz-screen');
        loadQuestion();
    } else {
        showCompletionScreen();
    }
}



function showCompletionScreen() {
    hideElement('feedback-screen');
    showElement('completion-screen');
    document.getElementById('final-score').textContent = `${score} / ${quizData.length}`;
}



function restartQuiz() {
    hideElement('completion-screen');
    startQuiz();
}



document.getElementById('theme-toggle').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    document.querySelector('header').classList.toggle('dark-mode');
    document.querySelector('footer').classList.toggle('dark-mode');
    document.querySelectorAll('.card').forEach(card => card.classList.toggle('dark-mode'));
});
