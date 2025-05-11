// Sample Rankings Data (In a real app, this would come from a backend)
const sampleRankings = {
    global: [
        { name: "Luke Skywalker", points: 2534.7, level: "Mestre Jedi", avatar: "1" },
        { name: "Obi-Wan Kenobi", points: 2312.3, level: "Mestre Jedi", avatar: "4" },
        { name: "Yoda", points: 2108.9, level: "Mestre Jedi", avatar: "20" },
        { name: "Anakin Skywalker", points: 1987.6, level: "Cavaleiro Jedi", avatar: "13" },
        { name: "Mace Windu", points: 1876.5, level: "Cavaleiro Jedi", avatar: "12" }
    ],
    quiz: [
        { name: "Luke Skywalker", correct: 45, total: 50, avatar: "1" },
        { name: "Obi-Wan Kenobi", correct: 42, total: 50, avatar: "4" },
        { name: "Yoda", correct: 40, total: 50, avatar: "20" },
        { name: "Anakin Skywalker", correct: 38, total: 50, avatar: "13" },
        { name: "Mace Windu", correct: 35, total: 50, avatar: "12" }
    ],
    achievements: [
        { name: "Luke Skywalker", achievements: 4, total: 4, avatar: "1" },
        { name: "Obi-Wan Kenobi", achievements: 3, total: 4, avatar: "4" },
        { name: "Yoda", achievements: 3, total: 4, avatar: "20" },
        { name: "Anakin Skywalker", achievements: 2, total: 4, avatar: "13" },
        { name: "Mace Windu", achievements: 2, total: 4, avatar: "12" }
    ]
};

// DOM Elements
const tabButtons = document.querySelectorAll('.tab-btn');
const rankingTabs = document.querySelectorAll('.ranking-tab');
const globalRankingsBody = document.getElementById('global-rankings-body');
const quizRankingsBody = document.getElementById('quiz-rankings-body');
const achievementsRankingsBody = document.getElementById('achievements-rankings-body');

// Update Rankings
function updateRankings() {
    const rankings = rankingSystem.getRankings();
    const userRanking = rankingSystem.getUserRanking();

    // Update Global Rankings
    displayGlobalRankings(rankings.global);

    // Update Quiz Rankings
    displayQuizRankings(rankings.quiz);

    // Update Achievements Rankings
    displayAchievementRankings(rankings.achievements);

    // Update user's ranking position display
    updateUserRankingDisplay(userRanking);
}

// Display Global Rankings
function displayGlobalRankings(rankings) {
    globalRankingsBody.innerHTML = rankings.map((user, index) => `
        <tr class="${user.name === userProfile.name ? 'current-user' : ''}">
            <td>#${index + 1}</td>
            <td>
                <div class="user-info">
                    <img src="https://starwars-visualguide.com/assets/img/characters/${user.avatar}.jpg" 
                         alt="${user.name}" class="user-avatar">
                    <span>${user.name}</span>
                </div>
            </td>
            <td>${user.points.toFixed(1)}</td>
            <td>${user.level}</td>
            <td>${new Date(user.lastUpdated).toLocaleDateString()}</td>
        </tr>
    `).join('');
}

// Display Quiz Rankings
function displayQuizRankings(rankings) {
    quizRankingsBody.innerHTML = rankings.map((user, index) => `
        <tr class="${user.name === userProfile.name ? 'current-user' : ''}">
            <td>#${index + 1}</td>
            <td>
                <div class="user-info">
                    <img src="https://starwars-visualguide.com/assets/img/characters/${user.avatar}.jpg" 
                         alt="${user.name}" class="user-avatar">
                    <span>${user.name}</span>
                </div>
            </td>
            <td>${user.correct}/${user.total}</td>
            <td>${Math.round((user.correct / user.total) * 100)}%</td>
            <td>${new Date(user.lastUpdated).toLocaleDateString()}</td>
        </tr>
    `).join('');
}

// Display Achievement Rankings
function displayAchievementRankings(rankings) {
    achievementsRankingsBody.innerHTML = rankings.map((user, index) => `
        <tr class="${user.name === userProfile.name ? 'current-user' : ''}">
            <td>#${index + 1}</td>
            <td>
                <div class="user-info">
                    <img src="https://starwars-visualguide.com/assets/img/characters/${user.avatar}.jpg" 
                         alt="${user.name}" class="user-avatar">
                    <span>${user.name}</span>
                </div>
            </td>
            <td>${user.achievements}/${user.total}</td>
            <td>
                <div class="progress-bar-container">
                    <div class="progress-bar" style="width: ${(user.achievements / user.total) * 100}%"></div>
                </div>
            </td>
            <td>${new Date(user.lastUpdated).toLocaleDateString()}</td>
        </tr>
    `).join('');
}

// Update User Ranking Display
function updateUserRankingDisplay(userRanking) {
    const userRankingElement = document.getElementById('user-ranking');
    if (userRankingElement) {
        userRankingElement.innerHTML = `
            <div class="user-ranking-info">
                <h3>Seu Ranking</h3>
                <div class="ranking-position">
                    <span>Global: #${userRanking.global}</span>
                    <span>Quiz: #${userRanking.quiz}</span>
                    <span>Conquistas: #${userRanking.achievements}</span>
                </div>
            </div>
        `;
    }
}

// Tab Switching
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and tabs
        tabButtons.forEach(btn => btn.classList.remove('active'));
        rankingTabs.forEach(tab => tab.classList.remove('active'));
        
        // Add active class to clicked button and corresponding tab
        button.classList.add('active');
        document.getElementById(`${button.dataset.tab}-rankings`).classList.add('active');
    });
});

// Initialize rankings on page load
document.addEventListener('DOMContentLoaded', () => {
    updateRankings();
    // Update rankings every 5 minutes
    setInterval(updateRankings, 300000);
}); 