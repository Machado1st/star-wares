// Achievement Progress Tracking
function updateAchievementProgress() {
    // Movie Master Achievement
    const movieProgress = document.getElementById('movie-progress');
    const movieText = document.querySelector('#movie-master .progress-text');
    const movieCount = userProfile.watchedMovies.length;
    const moviePercentage = (movieCount / 9) * 100;
    movieProgress.style.width = `${moviePercentage}%`;
    movieText.textContent = `${movieCount}/9`;
    if (movieCount === 9) {
        document.getElementById('movie-master').classList.add('achievement-unlocked');
    }

    // Series Master Achievement
    const seriesProgress = document.getElementById('series-progress');
    const seriesText = document.querySelector('#series-master .progress-text');
    const seriesCount = userProfile.watchedSeries.length;
    const seriesPercentage = (seriesCount / 5) * 100;
    seriesProgress.style.width = `${seriesPercentage}%`;
    seriesText.textContent = `${seriesCount}/5`;
    if (seriesCount === 5) {
        document.getElementById('series-master').classList.add('achievement-unlocked');
    }

    // Book Master Achievement
    const bookProgress = document.getElementById('book-progress');
    const bookText = document.querySelector('#book-master .progress-text');
    const bookCount = userProfile.readBooks.length;
    const bookPercentage = (bookCount / 10) * 100;
    bookProgress.style.width = `${bookPercentage}%`;
    bookText.textContent = `${bookCount}/10`;
    if (bookCount === 10) {
        document.getElementById('book-master').classList.add('achievement-unlocked');
    }

    // Quiz Master Achievement
    const quizProgress = document.getElementById('quiz-progress');
    const quizText = document.querySelector('#quiz-master .progress-text');
    const quizCount = userProfile.quizStats.played;
    const quizPercentage = (quizCount / 10) * 100;
    quizProgress.style.width = `${quizPercentage}%`;
    quizText.textContent = `${quizCount}/10`;
    if (quizCount >= 10 && (userProfile.quizStats.correct / userProfile.quizStats.total) >= 0.8) {
        document.getElementById('quiz-master').classList.add('achievement-unlocked');
    }
}

// Initialize achievements on page load
document.addEventListener('DOMContentLoaded', () => {
    updateAchievementProgress();
}); 