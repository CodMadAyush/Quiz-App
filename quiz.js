// Define quiz data with categories
const quizData = [
    {
        category: "General Knowledge",
        questions: [
            {
                question: "What is the capital of France?",
                options: ["Paris", "London", "Rome", "Berlin"],
                correctAnswer: "Paris"
            },
            // Add more questions for General Knowledge category
            {
                question: "Which planet is known as the Red Planet?",
                options: ["Mars", "Venus", "Jupiter", "Saturn"],
                correctAnswer: "Mars"
            },
            // Add more questions for General Knowledge category
            {
                question: "Who wrote 'To Kill a Mockingbird'?",
                options: ["Harper Lee", "Mark Twain", "William Shakespeare", "J.K. Rowling"],
                correctAnswer: "Harper Lee"
            },
            {
                question: "What is the largest mammal in the world?",
                options: ["Blue whale", "Elephant", "Giraffe", "Hippopotamus"],
                correctAnswer: "Blue whale"
            },
            {
                question: "Which country is home to the kangaroo?",
                options: ["Australia", "Canada", "Brazil", "India"],
                correctAnswer: "Australia"
            },
            {
                question: "Which Shakespeare play features the character Hamlet?",
                options: ["Hamlet", "Macbeth", "Romeo and Juliet", "Othello"],
                correctAnswer: "Hamlet"
            },
            {
                question: "Who painted the Mona Lisa?",
                options: ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Michelangelo"],
                correctAnswer: "Leonardo da Vinci"
            },
            {
                question: "Who wrote the famous play 'Romeo and Juliet'?",
                options: ["William Shakespeare", "Charles Dickens", "Jane Austen", "Leo Tolstoy"],
                correctAnswer: "William Shakespeare"
            },
            {
             question: "What is the largest planet in our solar system?",
             options: ["Venus", "Mars", "Jupiter", "Saturn"],
             correctAnswer: "Jupiter"
            },
            {
                question: "What is the capital of Brazil?",
                options: ["Rio de Janeiro", "São Paulo", "Brasília", "Salvador"],
                 correctAnswer: "Brasília"
            },
        ]
    },
    {
        category: "Science",
        questions: [
            {
                question: "What is the chemical symbol for water?",
                options: ["H2O", "CO2", "O2", "NaCl"],
                correctAnswer: "H2O"
            },
            // Add more questions for Science category
            {
                question: "Which gas is most abundant in Earth's atmosphere?",
                options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Helium"],
                correctAnswer: "Nitrogen"
            },
            // Add more questions for Science category
            {
                question: "What is the chemical symbol for gold?",
                options: ["Au", "Ag", "Fe", "Cu"],
                correctAnswer: "Au"
            },
            {
                question: "Which element is said to keep bones strong?",
                options: ["Calcium", "Iron", "Sodium", "Potassium"],
                correctAnswer: "Calcium"
            },
            {
            question: "What is the powerhouse of the cell?",
            options: ["Mitochondria", "Nucleus", "Ribosome", "Endoplasmic reticulum"],
            correctAnswer: "Mitochondria"
            },
            {
            question: "What is the process by which plants make their food?",
            options: ["Respiration", "Photosynthesis", "Fermentation", "Transpiration"],
            correctAnswer: "Photosynthesis"
            },
            {
            question: "What is the boiling point of water in Celsius?",
            options: ["100°C", "0°C", "-100°C", "50°C"],
            correctAnswer: "100°C"
            },
            {
            question: "Which element is essential for human bones and teeth?",
            options: ["Iron", "Calcium", "Sodium", "Magnesium"],
            correctAnswer: "Calcium"
            },
            {
            question: "What is the unit of measurement for electric current?",
            options: ["Volts", "Watts", "Amperes", "Ohms"],
            correctAnswer: "Amperes"            
            },
            {
                question: "What is the hardest natural substance on Earth?",
                options: ["Iron", "Diamond", "Gold", "Silver"],
                correctAnswer: "Diamond"
            },

        ]
    },
    // Add more categories here
];

// Get HTML elements
const categorySelect = document.getElementById('categorySelect');
const startButton = document.getElementById('startButton');
const quizContainer = document.getElementById('quizContainer');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextButton = document.getElementById('nextButton');
const resultElement = document.getElementById('result');
const particleContainer = document.getElementById('particleContainer');
const scoreboardElement = document.getElementById('scoreboard');
const goBackButton = document.getElementById('goBackButton');

let currentQuestionIndex = 0;
let score = 0;
let quizDataToDisplay = [];

// Populate category selection dropdown
quizData.forEach(category => {
    const option = document.createElement('option');
    option.value = category.category;
    option.textContent = category.category;
    categorySelect.appendChild(option);
});

// Function to display questions based on selected category
function displayQuestionByCategory(category) {
    const categoryData = quizData.find(item => item.category === category);
    if (categoryData) {
        quizDataToDisplay = categoryData.questions;
        shuffle(quizDataToDisplay);
        currentQuestionIndex = 0;
        displayQuestion();
    }
}

// Function to shuffle the array (Fisher-Yates shuffle algorithm)
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Function to display current question and options
function displayQuestion() {
    const currentQuestion = quizDataToDisplay[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = '';

    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', () => checkAnswer(option === currentQuestion.correctAnswer));
        optionsElement.appendChild(button);
    });

    quizContainer.style.display = 'block';
}

// Rest of your JavaScript code...

// Event listener for category selection
categorySelect.addEventListener('change', () => {
    const selectedCategory = categorySelect.value;
    if (selectedCategory) {
        startButton.disabled = false;
    }
});

// Event listener for "Start Quiz" button
startButton.addEventListener('click', () => {
    const selectedCategory = categorySelect.value;
    if (selectedCategory) {
        startButton.disabled = true;
        displayQuestionByCategory(selectedCategory);
    }
});

// Event listener for the next button
nextButton.addEventListener('click', nextQuestion);

// Event listener for the "Go Back" button
goBackButton.addEventListener('click', goBack);

// Function to check the selected answer
function checkAnswer(isCorrect) {
    const currentQuestion = quizDataToDisplay[currentQuestionIndex];
    const optionButtons = optionsElement.getElementsByTagName('button');

    for (let i = 0; i < optionButtons.length; i++) {
        optionButtons[i].disabled = true;
    }

    if (isCorrect) {
        resultElement.textContent = "Correct!";
        score++;
        displayResult(true);
    } else {
        resultElement.textContent = "Incorrect! The correct answer is: " + currentQuestion.correctAnswer;
        displayResult(false);
    }
    nextButton.style.display = 'block';
}

// Function to move to the next question
function nextQuestion() {
    resultElement.textContent = '';
    nextButton.style.display = 'none';
    currentQuestionIndex++;
    if (currentQuestionIndex < quizDataToDisplay.length) {
        displayQuestion();
    } else {
        displayScoreboard();
    }
}

// Function to display the scoreboard
function displayScoreboard() {
    questionElement.textContent = "Quiz completed!";
    optionsElement.innerHTML = '';
    scoreboardElement.textContent = "Your score: " + score + " out of " + quizDataToDisplay.length;
    goBackButton.style.display = 'block';
}

// Function to go back to the start of the quiz
function goBack() {
    currentQuestionIndex = 0;
    score = 0;
    displayQuestion();
    scoreboardElement.textContent = '';
    goBackButton.style.display = 'none';
}

// Function to display the result with animation
function displayResult(isCorrect) {
    const particleColor = isCorrect ? 'rgba(0, 255, 0, 0.7)' : 'rgba(255, 0, 0, 0.7)';

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.backgroundColor = particleColor;
        particleContainer.appendChild(particle);
    }
}
// Function to retrieve high scores from local storage
function getHighScores() {
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    return highScores;
}

// Function to update and save high scores to local storage
function updateHighScores(score) {
    const highScores = getHighScores();
    highScores.push(score);
    highScores.sort((a, b) => b - a); // Sort scores in descending order
    if (highScores.length > 3) {
        highScores.splice(3); // Keep only the top 3 high scores
    }
    localStorage.setItem('highScores', JSON.stringify(highScores));
}

// Function to display high scores
function displayHighScores() {
    const highScoresList = document.getElementById('highScoresList');
    highScoresList.innerHTML = '';
    const highScores = getHighScores();
    highScores.forEach((score, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `#${index + 1}: ${score}`;
        highScoresList.appendChild(listItem);
    });
}

// Function to display the scoreboard and high scores
function displayScoreboard() {
    questionElement.textContent = "Quiz completed!";
    optionsElement.innerHTML = '';
    scoreboardElement.textContent = "Your score: " + score + " out of " + quizDataToDisplay.length;
    updateHighScores(score); // Update high scores with the current score
    goBackButton.style.display = 'block';
    displayHighScores(); // Display the updated high scores
}
