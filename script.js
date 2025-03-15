// Sélection des éléments HTML
const startScreen = document.getElementById('start-screen');

const startBtn = document.getElementById('start-btn');

const gameContainer = document.getElementById('game-container');

const scoreDisplay = document.getElementById('score');

const timerDisplay = document.getElementById('timer');

const highScoreDisplay = document.getElementById('high-score');

const gameOverScreen = document.getElementById('game-over');

const finalScoreDisplay = document.getElementById('final-score');

const messageDisplay = document.getElementById('message');

const themeToggle = document.getElementById('theme-toggle');

const popSound = document.getElementById('pop-sound');

const bgMusic = document.getElementById('background-music');

let score = 0;

let timeLeft = 60;

let highScore = localStorage.getItem('highScore') || 0;

let gameRunning = false;  // Variable pour empêcher la création infinie de ballons

let balloonInterval;  // Stocke l'intervalle de création des ballons

highScoreDisplay.textContent = highScore;

// Fonction pour démarrer le jeu

function startGame() {

    gameRunning = true;

    startScreen.style.display = 'none';

    gameContainer.style.display = 'block';

    score = 0;

    timeLeft = 60;

    scoreDisplay.textContent = score;

    timerDisplay.textContent = timeLeft;

    gameOverScreen.style.display = 'none';

    bgMusic.play();

    startTimer();

   balloonInterval = setInterval (createBalloons, 500);

}

// Fonction pour créer des ballons

function createBalloons() {


        if (!gameRunning) return; // Empêche la création de ballons après la fin du jeu

        const balloon = document.createElement('div');

        balloon.className = `balloon balloon${Math.floor(Math.random() * 5) + 1}`;

        balloon.style.left = `${Math.random() * 90}vw`;

        balloon.onclick = () => popBalloon(balloon);

        document.body.appendChild(balloon);

      // Supprimer les ballons après un certain temps

      setTimeout(() => {

        if (balloon.parentNode) {

            balloon.remove();

        }

    }, 12000);

    

}

// Fonction pour éclater un ballon

function popBalloon(balloon) {

    if (!gameRunning) return;

    score++;

    scoreDisplay.textContent = score;

    popSound.play();

    balloon.remove();

    showMessage(score);

}

// Fonction pour afficher des messages motivants

function showMessage(score) {

    if (score % 10 === 0) {

        messageDisplay.textContent = '🔥 Continue comme ça !';

        messageDisplay.style.display = 'block';

        setTimeout(() => messageDisplay.style.display = 'none', 1000);

    }

}

// Fonction pour gérer le chronomètre

function startTimer() {

    const interval = setInterval(() => {

        if (!gameRunning) {

            clearInterval(interval);

            return;

        }

        timeLeft--;

        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {

            clearInterval(interval);

            endGame();

        }

    }, 1000);

}

// Fonction pour terminer le jeu

function endGame() {

    gameRunning = false;

    clearInterval(balloonInterval);  // Arrêter la création de ballons

    document.querySelectorAll('.balloon').forEach(balloon => balloon.remove());

    gameOverScreen.style.display = 'block';

    finalScoreDisplay.textContent = score;

    bgMusic.pause();

    if (score > highScore) {

        highScore = score;

        localStorage.setItem('highScore', highScore);

        highScoreDisplay.textContent = highScore;

    }

}

// Fonction pour redémarrer le jeu

function restartGame() {

    window.location.reload();

}

// Changer le mode Jour/Nuit

themeToggle.onclick = () => {

    document.body.classList.toggle('night');

};

// Associer le bouton "Jouer" à la fonction `startGame`

document.addEventListener("DOMContentLoaded", function() {

    let startBtn = document.getElementById("start-btn"); // Correction ici

    startBtn.onclick = startGame;

});

