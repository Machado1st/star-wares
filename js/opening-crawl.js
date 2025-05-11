// Opening Crawl Component
class OpeningCrawl {
    constructor() {
        this.crawlElement = document.getElementById('opening-crawl');
        this.crawlContent = this.crawlElement ? this.crawlElement.querySelector('.crawl-content') : null;
        this.replayButton = null;
        this.isPlaying = false;
    }

    init() {
        if (!this.crawlElement || !this.crawlContent) return;

        // Add event listener for animation end
        this.crawlContent.addEventListener('animationend', () => {
            this.onAnimationEnd();
        });

        // Start the animation
        this.play();
    }

    play() {
        if (this.isPlaying) return;
        this.isPlaying = true;
        document.body.classList.add('opening-crawl-active');
        this.crawlElement.style.display = 'block';
        // Forçar a animação manualmente para teste
        this.crawlContent.style.animation = 'crawl 8s linear forwards';
        // Hide navbar during animation
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.style.opacity = '0';
        }
    }

    onAnimationEnd() {
        this.isPlaying = false;
        document.body.classList.remove('opening-crawl-active');
        this.crawlElement.style.display = 'none';
        // Limpar a animação para permitir replay
        this.crawlContent.style.animation = '';
        // Show navbar after animation
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.style.opacity = '1';
        }
        // Show replay button
        this.showReplayButton();
    }

    showReplayButton() {
        if (this.replayButton) return;

        this.replayButton = document.createElement('button');
        this.replayButton.className = 'replay-crawl-btn btn-animated';
        this.replayButton.innerHTML = '<i class="fas fa-redo"></i> Replay';
        this.replayButton.style.position = 'fixed';
        this.replayButton.style.bottom = '20px';
        this.replayButton.style.right = '20px';
        this.replayButton.style.zIndex = '1000';

        this.replayButton.addEventListener('click', () => {
            this.crawlElement.classList.remove('opening-crawl-hidden');
            this.play();
        });

        document.body.appendChild(this.replayButton);
    }
}

// Initialize the opening crawl when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const openingCrawl = new OpeningCrawl();
    openingCrawl.init();
}); 