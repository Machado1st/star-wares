// Quiz Questions Database
const quizQuestions = {
    easy: [
        {
            question: "Quem é o pai de Luke Skywalker?",
            options: ["Obi-Wan Kenobi", "Darth Vader", "Han Solo", "Yoda"],
            correct: 1
        },
        {
            question: "Qual é o nome da princesa que Luke precisa resgatar?",
            options: ["Leia", "Padmé", "Rey", "Ahsoka"],
            correct: 0
        },
        {
            question: "Qual é o nome do robô dourado?",
            options: ["R2-D2", "C-3PO", "BB-8", "K-2SO"],
            correct: 1
        },
        {
            question: "Qual planeta é destruído pela Estrela da Morte?",
            options: ["Tatooine", "Alderaan", "Hoth", "Endor"],
            correct: 1
        },
        {
            question: "Quem é o melhor amigo de Han Solo?",
            options: ["Luke", "Chewbacca", "Leia", "Lando"],
            correct: 1
        },
        {
            question: "Qual é o nome do caçador de recompensas que captura Han Solo?",
            options: ["Greedo", "Boba Fett", "Jango Fett", "Bossk"],
            correct: 1
        },
        {
            question: "Quem treinou Anakin Skywalker?",
            options: ["Yoda", "Obi-Wan Kenobi", "Qui-Gon Jinn", "Mace Windu"],
            correct: 2
        },
        {
            question: "Qual é o nome do planeta natal de Chewbacca?",
            options: ["Kashyyyk", "Endor", "Dagobah", "Naboo"],
            correct: 0
        },
        {
            question: "Quem é o mestre de Obi-Wan Kenobi?",
            options: ["Qui-Gon Jinn", "Yoda", "Mace Windu", "Dooku"],
            correct: 0
        },
        {
            question: "Qual é o nome do sabre de luz de cor vermelha?",
            options: ["Sabre Sith", "Sabre Jedi", "Sabre Imperial", "Sabre Rebelde"],
            correct: 0
        }
    ],
    medium: [
        {
            question: "Em qual planeta Luke cresceu?",
            options: ["Coruscant", "Tatooine", "Naboo", "Alderaan"],
            correct: 1
        },
        {
            question: "Qual é o nome do mestre Jedi que treina Luke?",
            options: ["Mace Windu", "Qui-Gon Jinn", "Yoda", "Obi-Wan Kenobi"],
            correct: 2
        },
        {
            question: "Qual é a cor do sabre de luz de Luke?",
            options: ["Vermelho", "Azul", "Verde", "Roxo"],
            correct: 2
        },
        {
            question: "Quem matou Han Solo?",
            options: ["Kylo Ren", "Darth Vader", "Boba Fett", "Snoke"],
            correct: 0
        },
        {
            question: "Qual é o nome do planeta da base rebelde em O Império Contra-Ataca?",
            options: ["Hoth", "Endor", "Yavin IV", "Mustafar"],
            correct: 0
        },
        {
            question: "Quem é o Líder Supremo da Primeira Ordem?",
            options: ["Snoke", "Palpatine", "Kylo Ren", "Hux"],
            correct: 0
        },
        {
            question: "Qual é o nome do droide que acompanha Rey?",
            options: ["BB-8", "R2-D2", "C-3PO", "K-2SO"],
            correct: 0
        },
        {
            question: "Quem é o pai de Leia Organa?",
            options: ["Bail Organa", "Darth Vader", "Obi-Wan Kenobi", "Yoda"],
            correct: 1
        },
        {
            question: "Qual é o nome do planeta natal de Padmé Amidala?",
            options: ["Naboo", "Alderaan", "Tatooine", "Coruscant"],
            correct: 0
        },
        {
            question: "Quem é o criador de C-3PO?",
            options: ["Luke", "Anakin", "Leia", "Han Solo"],
            correct: 1
        }
    ],
    hard: [
        {
            question: "Qual é o nome do planeta natal dos Wookiees?",
            options: ["Kashyyyk", "Endor", "Dagobah", "Geonosis"],
            correct: 0
        },
        {
            question: "Qual é o nome do antigo mestre de Darth Vader?",
            options: ["Darth Sidious", "Darth Maul", "Darth Plagueis", "Darth Tyranus"],
            correct: 2
        },
        {
            question: "Qual é o nome do planeta onde fica o Templo Jedi?",
            options: ["Coruscant", "Ilum", "Jedha", "Ahch-To"],
            correct: 0
        },
        {
            question: "Quem matou Mace Windu?",
            options: ["Darth Vader", "Darth Sidious", "Darth Maul", "General Grievous"],
            correct: 1
        },
        {
            question: "Qual é o nome verdadeiro do Imperador Palpatine?",
            options: ["Sheev", "Dooku", "Plagueis", "Sidious"],
            correct: 0
        },
        {
            question: "Qual é o nome do planeta onde Anakin e Obi-Wan duelam no Episódio III?",
            options: ["Mustafar", "Geonosis", "Kamino", "Utapau"],
            correct: 0
        },
        {
            question: "Quem foi o mestre de Qui-Gon Jinn?",
            options: ["Yoda", "Dooku", "Mace Windu", "Obi-Wan"],
            correct: 1
        },
        {
            question: "Qual é o nome do caçador de recompensas que persegue Obi-Wan em Kamino?",
            options: ["Boba Fett", "Jango Fett", "Bossk", "Greedo"],
            correct: 1
        },
        {
            question: "Qual é o nome do planeta onde Rey encontra Luke?",
            options: ["Ahch-To", "Jakku", "Endor", "Dagobah"],
            correct: 0
        },
        {
            question: "Qual é o nome do droide médico que salva Luke em Hoth?",
            options: ["2-1B", "FX-7", "AZI-3", "T3-M4"],
            correct: 0
        }
    ]
};

// Quiz State
let currentQuestion = 0;
let score = 0;
let currentDifficulty = 'easy';
let questions = [];

// DOM Elements
const quizContainer = document.getElementById('quiz-container');
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options');
const nextButton = document.getElementById('next-btn');
const difficultySelect = document.getElementById('difficulty');
const scoreElement = document.getElementById('score');
const progressBar = document.getElementById('progress-bar');
const resultDiv = document.getElementById('quiz-result');

// Adiciona elemento para feedback visual
let feedbackMsg = document.createElement('div');
feedbackMsg.id = 'feedback-msg';
feedbackMsg.style.textAlign = 'center';
feedbackMsg.style.fontSize = '1.2rem';
feedbackMsg.style.margin = '1rem 0 0.5rem 0';
feedbackMsg.style.fontWeight = 'bold';
feedbackMsg.style.minHeight = '2rem';
feedbackMsg.style.transition = 'color 0.3s';

if (optionsContainer && !document.getElementById('feedback-msg')) {
    optionsContainer.parentNode.insertBefore(feedbackMsg, optionsContainer.nextSibling);
}

if (
  quizContainer &&
  questionElement &&
  optionsContainer &&
  nextButton &&
  difficultySelect &&
  scoreElement &&
  progressBar &&
  resultDiv
) {
    // Initialize Quiz
    function initQuiz() {
        currentQuestion = 0;
        score = 0;
        currentDifficulty = difficultySelect.value;
        questions = [...quizQuestions[currentDifficulty]];
        shuffleArray(questions);

        // Reset visual
        quizContainer.style.display = 'block';
        resultDiv.style.display = 'none';
        scoreElement.textContent = 'Pontuação: 0';
        progressBar.style.width = '0%';
        nextButton.style.display = 'none';

        showQuestion();
    }

    // Add restart function
    function restartQuiz() {
        initQuiz();
    }

    // Add event listener for restart button
    const restartButton = document.getElementById('restart-btn');
    if (restartButton) {
        restartButton.addEventListener('click', restartQuiz);
    }

    // Show Question
    function showQuestion() {
        const question = questions[currentQuestion];
        questionElement.textContent = question.question;
        
        optionsContainer.innerHTML = '';
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.textContent = option;
            button.addEventListener('click', () => selectOption(index));
            optionsContainer.appendChild(button);
        });

        feedbackMsg.textContent = '';
        feedbackMsg.style.color = '#fff';
    }

    // Select Option
    function selectOption(index) {
        const question = questions[currentQuestion];
        const options = optionsContainer.querySelectorAll('.option');
        // Desabilita todas as opções
        options.forEach(opt => {
            opt.style.pointerEvents = 'none';
        });
        // Verifica se acertou
        if (index === question.correct) {
            options[index].classList.add('correct');
            feedbackMsg.textContent = 'Acertou!';
            feedbackMsg.style.color = '#00ff00';
            score += getPointsForDifficulty();
            updateScore();
        } else {
            options[index].classList.add('incorrect');
            options[question.correct].classList.add('correct');
            feedbackMsg.textContent = 'Errou!';
            feedbackMsg.style.color = '#ff3333';
        }
        nextButton.style.display = 'block';
    }

    // Next Question
    function nextQuestion() {
        currentQuestion++;
        nextButton.style.display = 'none';
        
        if (currentQuestion < questions.length) {
            showQuestion();
            updateProgress();
        } else {
            endQuiz();
        }
    }

    // End Quiz
    function endQuiz() {
        const percentage = (score / questions.length) * 100;
        const points = getPointsForDifficulty() * score;
        
        resultDiv.innerHTML = `
            <h2>Quiz Finalizado!</h2>
            <p>Sua pontuação: ${score}/${questions.length}</p>
            <p>Porcentagem de acerto: ${percentage.toFixed(1)}%</p>
            <p>Pontos ganhos: ${points}</p>
            <button id="restart-btn" class="btn-animated">Jogar Novamente</button>
        `;
        
        resultDiv.style.display = 'block';
        quizContainer.style.display = 'none';
        
        // Add event listener to the newly created restart button
        const newRestartButton = document.getElementById('restart-btn');
        if (newRestartButton) {
            newRestartButton.addEventListener('click', restartQuiz);
        }
        
        updateUserStats(percentage);
    }

    // Update Progress
    function updateProgress() {
        const progress = ((currentQuestion + 1) / questions.length) * 100;
        progressBar.style.width = `${progress}%`;
    }

    // Update Score
    function updateScore() {
        scoreElement.textContent = `Pontuação: ${score}`;
    }

    // Get Points for Difficulty
    function getPointsForDifficulty() {
        switch(currentDifficulty) {
            case 'easy': return 10;
            case 'medium': return 20;
            case 'hard': return 30;
            default: return 10;
        }
    }

    // Update User Stats
    function updateUserStats(percentage) {
        userProfile.quizStats.played++;
        userProfile.quizStats.total += questions.length;
        if (percentage >= 80) {
            userProfile.quizStats.correct += questions.length;
        }
        localStorage.setItem('quizStats', JSON.stringify(userProfile.quizStats));
        addPoints(score);
        checkAchievements();
    }

    // Utility Functions
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Event Listeners
    difficultySelect.addEventListener('change', initQuiz);
    nextButton.addEventListener('click', nextQuestion);

    // Initialize on load
    document.addEventListener('DOMContentLoaded', initQuiz);

    // Ao carregar a página, garanta que o resultado esteja oculto
    window.addEventListener('DOMContentLoaded', () => {
        if (resultDiv) resultDiv.style.display = 'none';
    });
} 