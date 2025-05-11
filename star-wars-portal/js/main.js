// Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Animação do menu toggle
menuToggle.addEventListener('click', () => {
    const bars = menuToggle.querySelectorAll('.bar');
    bars[0].classList.toggle('rotate-45');
    bars[1].classList.toggle('opacity-0');
    bars[2].classList.toggle('rotate-negative-45');
});

// Adicionar classe active ao link atual
const currentLocation = location.href;
const menuItems = document.querySelectorAll('.nav-links a');
menuItems.forEach(item => {
    if(item.href === currentLocation) {
        item.classList.add('active');
    }
});

// Efeito de parallax no hero
document.addEventListener('mousemove', (e) => {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    hero.style.backgroundPosition = `${mouseX * 50}px ${mouseY * 50}px`;
});

// Animação de entrada dos elementos
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate__animated', 'animate__fadeInUp');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar elementos do menu
document.querySelectorAll('.menu-item').forEach(item => {
    observer.observe(item);
});

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Adicionar classe ao navbar no scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Estrelas animadas no background estilo Star Wars
(function() {
    const canvas = document.querySelector('.stars-bg');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = window.innerWidth;
    let h = window.innerHeight;
    let stars = [];
    const numStars = 300; // Mais estrelas para um efeito mais denso
    const layers = 3; // Camadas de profundidade diferentes

    function resize() {
        w = window.innerWidth;
        h = window.innerHeight;
        canvas.width = w;
        canvas.height = h;
        createStars();
    }

    function createStars() {
        stars = [];
        // Criar estrelas em diferentes camadas de profundidade
        for (let layer = 0; layer < layers; layer++) {
            const layerStars = Math.floor(numStars / layers);
            for (let i = 0; i < layerStars; i++) {
                const depth = layer + 1; // Profundidade da camada (1, 2, 3)
                stars.push({
                    x: Math.random() * w,
                    y: Math.random() * h,
                    z: depth, // Profundidade da estrela
                    size: Math.random() * 1.5 + 0.5, // Tamanho base
                    speed: depth * 2, // Velocidade baseada na profundidade
                    brightness: Math.random() * 0.5 + 0.5, // Brilho variável
                    trail: Math.random() > 0.7 // Algumas estrelas terão rastros
                });
            }
        }
    }

    function drawStars() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'; // Traço suave para o efeito de movimento
        ctx.fillRect(0, 0, w, h);

        // Ordenar estrelas por profundidade para desenho correto
        stars.sort((a, b) => b.z - a.z);

        stars.forEach(star => {
            // Calcular posição baseada na profundidade
            const x = star.x - (w / 2);
            const y = star.y - (h / 2);
            const z = star.z;

            // Projeção perspectiva
            const scale = 1 / z;
            const projectedX = x * scale + w / 2;
            const projectedY = y * scale + h / 2;
            const projectedSize = star.size * scale;

            // Desenhar a estrela
            ctx.save();
            
            // Efeito de brilho
            const gradient = ctx.createRadialGradient(
                projectedX, projectedY, 0,
                projectedX, projectedY, projectedSize * 2
            );
            gradient.addColorStop(0, `rgba(255, 255, 255, ${star.brightness})`);
            gradient.addColorStop(0.4, `rgba(255, 255, 255, ${star.brightness * 0.6})`);
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

            // Desenhar rastro para algumas estrelas
            if (star.trail && projectedSize > 0.5) {
                const trailLength = projectedSize * 3;
                const trailGradient = ctx.createLinearGradient(
                    projectedX, projectedY - trailLength,
                    projectedX, projectedY
                );
                trailGradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
                trailGradient.addColorStop(1, `rgba(255, 255, 255, ${star.brightness * 0.3})`);
                
                ctx.beginPath();
                ctx.moveTo(projectedX, projectedY - trailLength);
                ctx.lineTo(projectedX, projectedY);
                ctx.strokeStyle = trailGradient;
                ctx.lineWidth = projectedSize * 0.5;
                ctx.stroke();
            }

            // Desenhar a estrela
            ctx.beginPath();
            ctx.arc(projectedX, projectedY, projectedSize, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();

            // Adicionar brilho extra para estrelas mais próximas
            if (z === 1) {
                ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
                ctx.shadowBlur = projectedSize * 2;
                ctx.fill();
            }

            ctx.restore();
        });
    }

    function animateStars() {
        stars.forEach(star => {
            // Mover estrelas em direção ao centro
            star.z -= star.speed * 0.01;

            // Resetar estrelas que passaram do ponto de vista
            if (star.z <= 0.1) {
                star.z = layers;
                star.x = Math.random() * w;
                star.y = Math.random() * h;
                star.brightness = Math.random() * 0.5 + 0.5;
            }
        });

        drawStars();
        requestAnimationFrame(animateStars);
    }

    // Inicializar
    window.addEventListener('resize', resize);
    resize();
    animateStars();
})();

// Marcar filmes como assistidos
function getProgress() {
    return JSON.parse(localStorage.getItem('sw_progress') || '{"quizzes":0,"acertos":0,"acertos_dificeis":0,"conquistas":{},"filmes":[],"series":[],"livros":[]}');
}

function setProgress(data) {
    localStorage.setItem('sw_progress', JSON.stringify(data));
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.mark-movie').forEach(btn => {
        btn.addEventListener('click', function() {
            const card = btn.closest('.movie-card');
            const id = card.getAttribute('data-movie');
            let progress = getProgress();
            if (!progress.filmes.includes(id)) {
                progress.filmes.push(id);
                setProgress(progress);
                btn.textContent = 'Assistido!';
                btn.disabled = true;
            }
        });
    });
    document.querySelectorAll('.mark-series').forEach(btn => {
        btn.addEventListener('click', function() {
            const card = btn.closest('.series-card');
            const id = card.getAttribute('data-series');
            let progress = getProgress();
            if (!progress.series.includes(id)) {
                progress.series.push(id);
                setProgress(progress);
                btn.textContent = 'Assistido!';
                btn.disabled = true;
            }
        });
    });
    document.querySelectorAll('.mark-book').forEach(btn => {
        btn.addEventListener('click', function() {
            const card = btn.closest('.book-card');
            const id = card.getAttribute('data-book');
            let progress = getProgress();
            if (!progress.livros.includes(id)) {
                progress.livros.push(id);
                setProgress(progress);
                btn.textContent = 'Lido!';
                btn.disabled = true;
            }
        });
    });
    // Marcar botões já assistidos ao carregar
    let progress = getProgress();
    document.querySelectorAll('.movie-card').forEach(card => {
        const id = card.getAttribute('data-movie');
        if(progress.filmes && progress.filmes.includes(id)) {
            const btn = card.querySelector('.mark-movie');
            btn.textContent = 'Assistido!';
            btn.disabled = true;
        }
    });
    document.querySelectorAll('.series-card').forEach(card => {
        const id = card.getAttribute('data-series');
        if(progress.series && progress.series.includes(id)) {
            const btn = card.querySelector('.mark-series');
            btn.textContent = 'Assistido!';
            btn.disabled = true;
        }
    });
    document.querySelectorAll('.book-card').forEach(card => {
        const id = card.getAttribute('data-book');
        if(progress.livros && progress.livros.includes(id)) {
            const btn = card.querySelector('.mark-book');
            btn.textContent = 'Lido!';
            btn.disabled = true;
        }
    });
});

// User Profile Management
const userProfile = {
    name: localStorage.getItem('userName') || 'Jedi Anônimo',
    avatar: localStorage.getItem('userAvatar') || '1',
    points: parseInt(localStorage.getItem('userPoints')) || 0,
    level: localStorage.getItem('userLevel') || 'Padawan',
    xp: parseInt(localStorage.getItem('userXp')) || 0,
    watchedMovies: JSON.parse(localStorage.getItem('watchedMovies')) || [],
    watchedSeries: JSON.parse(localStorage.getItem('watchedSeries')) || [],
    readBooks: JSON.parse(localStorage.getItem('readBooks')) || [],
    quizStats: JSON.parse(localStorage.getItem('quizStats')) || {
        played: 0,
        correct: 0,
        total: 0
    }
};

// Level thresholds and names
const LEVELS = {
    0: 'Padawan',
    1000: 'Aprendiz Jedi',
    2500: 'Cavaleiro Jedi',
    5000: 'Mestre Jedi',
    10000: 'Grão-Mestre Jedi'
};

// DOM Elements
const profileBtn = document.getElementById('profile-btn');
const profileModal = document.getElementById('profile-modal');
const closeProfile = document.querySelector('.close-profile');
const profileName = document.getElementById('profile-name');
const profilePoints = document.getElementById('profile-points');
const profileLevel = document.getElementById('profile-level');
const profileXpBar = document.getElementById('profile-xp-bar-inner');
const saveProfileBtn = document.getElementById('save-profile');
const avatarOptions = document.querySelectorAll('.avatar-option');

// Initialize profile
function initProfile() {
    if (profileName) profileName.value = userProfile.name;
    if (profilePoints) profilePoints.textContent = userProfile.points;
    if (profileLevel) profileLevel.textContent = userProfile.level;
    updateXpBar();
    updateAvatarSelection();
}

// Update XP bar
function updateXpBar() {
    const nextLevel = getNextLevel();
    const currentLevelXp = getCurrentLevelXp();
    const xpForNextLevel = nextLevel - currentLevelXp;
    const currentXp = userProfile.xp - currentLevelXp;
    const percentage = (currentXp / xpForNextLevel) * 100;
    if (profileXpBar) profileXpBar.style.width = `${percentage}%`;
}

// Get next level threshold
function getNextLevel() {
    const thresholds = Object.keys(LEVELS).map(Number).sort((a, b) => a - b);
    for (let threshold of thresholds) {
        if (threshold > userProfile.xp) {
            return threshold;
        }
    }
    return thresholds[thresholds.length - 1];
}

// Get current level XP threshold
function getCurrentLevelXp() {
    const thresholds = Object.keys(LEVELS).map(Number).sort((a, b) => a - b);
    let currentLevel = 0;
    for (let threshold of thresholds) {
        if (threshold > userProfile.xp) {
            break;
        }
        currentLevel = threshold;
    }
    return currentLevel;
}

// Update user level
function updateLevel() {
    const thresholds = Object.keys(LEVELS).map(Number).sort((a, b) => a - b);
    for (let i = thresholds.length - 1; i >= 0; i--) {
        if (userProfile.xp >= thresholds[i]) {
            userProfile.level = LEVELS[thresholds[i]];
            break;
        }
    }
    localStorage.setItem('userLevel', userProfile.level);
    if (profileLevel) profileLevel.textContent = userProfile.level;
}

// Add points and XP
function addPoints(points) {
    userProfile.points += points;
    userProfile.xp += points;
    localStorage.setItem('userPoints', userProfile.points);
    localStorage.setItem('userXp', userProfile.xp);
    if (typeof profilePoints !== 'undefined' && profilePoints) profilePoints.textContent = userProfile.points;
    updateLevel();
    updateXpBar();
}

// Update avatar selection
function updateAvatarSelection() {
    avatarOptions.forEach(option => {
        if (option.dataset.avatar === userProfile.avatar) {
            option.classList.add('selected');
        } else {
            option.classList.remove('selected');
        }
    });
}

// Event Listeners
if (profileBtn) {
    profileBtn.addEventListener('click', () => {
        if (profileModal) profileModal.style.display = 'block';
        initProfile();
    });
}

if (closeProfile) {
    closeProfile.addEventListener('click', () => {
        if (profileModal) profileModal.style.display = 'none';
    });
}

if (saveProfileBtn) {
    saveProfileBtn.addEventListener('click', () => {
        if (profileName) userProfile.name = profileName.value;
        localStorage.setItem('userName', userProfile.name);
        if (profileModal) profileModal.style.display = 'none';
    });
}

if (avatarOptions && avatarOptions.length) {
    avatarOptions.forEach(option => {
        option.addEventListener('click', () => {
            userProfile.avatar = option.dataset.avatar;
            localStorage.setItem('userAvatar', userProfile.avatar);
            updateAvatarSelection();
        });
    });
}

// Close modal when clicking outside
if (profileModal) {
    window.addEventListener('click', (e) => {
        if (e.target === profileModal) {
            profileModal.style.display = 'none';
        }
    });
}

// Content Management
function markAsWatched(type, id) {
    const key = `${type}Watched`;
    if (!userProfile[key].includes(id)) {
        userProfile[key].push(id);
        localStorage.setItem(key, JSON.stringify(userProfile[key]));
        addPoints(100); // Points for watching/reading content
        checkAchievements();
    }
}

// Achievement System
const achievements = {
    movieMaster: {
        title: 'Mestre do Cinema',
        description: 'Assista todos os filmes',
        check: () => userProfile.watchedMovies.length >= 9,
        reward: 500
    },
    seriesMaster: {
        title: 'Mestre das Séries',
        description: 'Assista todas as séries',
        check: () => userProfile.watchedSeries.length >= 5,
        reward: 500
    },
    bookMaster: {
        title: 'Mestre dos Livros',
        description: 'Leia todos os livros',
        check: () => userProfile.readBooks.length >= 10,
        reward: 500
    },
    quizMaster: {
        title: 'Mestre do Quiz',
        description: 'Complete 10 quizzes com mais de 80% de acerto',
        check: () => userProfile.quizStats.played >= 10 && 
               (userProfile.quizStats.correct / userProfile.quizStats.total) >= 0.8,
        reward: 1000
    }
};

function checkAchievements() {
    for (const [key, achievement] of Object.entries(achievements)) {
        if (achievement.check() && !localStorage.getItem(`achievement_${key}`)) {
            localStorage.setItem(`achievement_${key}`, 'true');
            addPoints(achievement.reward);
            showNotification(`Conquista Desbloqueada: ${achievement.title}!`);
        }
    }
}

// Notification System
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification animate__animated animate__fadeInRight';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.remove('animate__fadeInRight');
        notification.classList.add('animate__fadeOutRight');
        setTimeout(() => notification.remove(), 1000);
    }, 3000);
}

// Enhanced Ranking System
const rankingSystem = {
    // Get all rankings from localStorage
    getRankings: function() {
        const rankings = JSON.parse(localStorage.getItem('sw_rankings')) || {
            global: [],
            quiz: [],
            achievements: []
        };
        return rankings;
    },

    // Save rankings to localStorage
    saveRankings: function(rankings) {
        localStorage.setItem('sw_rankings', JSON.stringify(rankings));
    },

    // Update user's ranking
    updateUserRanking: function() {
        const rankings = this.getRankings();
        const userData = {
            name: userProfile.name,
            points: userProfile.points,
            level: userProfile.level,
            avatar: userProfile.avatar,
            quizStats: userProfile.quizStats,
            achievements: Object.keys(achievements).filter(key => 
                localStorage.getItem(`achievement_${key}`) === 'true'
            ).length,
            lastUpdated: new Date().toISOString()
        };

        // Update global rankings
        const globalIndex = rankings.global.findIndex(r => r.name === userData.name);
        if (globalIndex !== -1) {
            rankings.global[globalIndex] = userData;
        } else {
            rankings.global.push(userData);
        }
        rankings.global.sort((a, b) => b.points - a.points);

        // Update quiz rankings
        const quizData = {
            name: userData.name,
            correct: userData.quizStats.correct,
            total: userData.quizStats.total,
            avatar: userData.avatar,
            lastUpdated: userData.lastUpdated
        };
        const quizIndex = rankings.quiz.findIndex(r => r.name === quizData.name);
        if (quizIndex !== -1) {
            rankings.quiz[quizIndex] = quizData;
        } else {
            rankings.quiz.push(quizData);
        }
        rankings.quiz.sort((a, b) => (b.correct / b.total) - (a.correct / a.total));

        // Update achievements rankings
        const achievementData = {
            name: userData.name,
            achievements: userData.achievements,
            total: Object.keys(achievements).length,
            avatar: userData.avatar,
            lastUpdated: userData.lastUpdated
        };
        const achievementIndex = rankings.achievements.findIndex(r => r.name === achievementData.name);
        if (achievementIndex !== -1) {
            rankings.achievements[achievementIndex] = achievementData;
        } else {
            rankings.achievements.push(achievementData);
        }
        rankings.achievements.sort((a, b) => b.achievements - a.achievements);

        this.saveRankings(rankings);
        return rankings;
    },

    // Get user's ranking position
    getUserRanking: function() {
        const rankings = this.getRankings();
        const globalPosition = rankings.global.findIndex(r => r.name === userProfile.name) + 1;
        const quizPosition = rankings.quiz.findIndex(r => r.name === userProfile.name) + 1;
        const achievementPosition = rankings.achievements.findIndex(r => r.name === userProfile.name) + 1;

        return {
            global: globalPosition,
            quiz: quizPosition,
            achievements: achievementPosition
        };
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initProfile();
    checkAchievements();
    rankingSystem.updateUserRanking();
}); 