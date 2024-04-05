
'use strict';

let score = 0, timeLeft = 15, gameCount = 0, currentWord = '', timer;
const words = ['dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building',
    'population', 'weather', 'bottle', 'history', 'dream', 'character', 'money',
    'absolute', 'discipline', 'machine', 'accurate', 'connection', 'rainbow', 'bicycle',
    'eclipse', 'calculator', 'trouble', 'watermelon', 'developer', 'philosophy',
    'database', 'periodic', 'capitalism', 'abominable', 'component', 'future',
    'pasta', 'microwave', 'jungle', 'wallet', 'canada', 'coffee', 'beauty', 'agency',
    'chocolate', 'eleven', 'technology', 'alphabet', 'knowledge', 'magician',
    'professor', 'triangle', 'earthquake', 'baseball', 'beyond', 'evolution',
    'banana', 'perfumer', 'computer', 'management', 'discovery', 'ambition', 'music',
    'eagle', 'crown', 'chess', 'laptop', 'bedroom', 'delivery', 'enemy', 'button',
    'superman', 'library', 'unboxing', 'bookstore', 'language', 'homework',
    'fantastic', 'economy', 'interview', 'awesome', 'challenge', 'science', 'mystery',
    'famous', 'league', 'memory', 'leather', 'planet', 'software', 'update', 'yellow',
    'keyboard', 'window']; 
const bgMusic = document.getElementById('bgMusic');
const playButton = document.getElementById('playButton');
const wordInput = document.getElementById('wordInput');
const countdownTimer = document.getElementById('countdownTimer');

playButton.addEventListener('click', function () {
    // 根据按钮的文案判断是开始游戏还是结束游戏
    if (playButton.innerText === 'Play Now' || playButton.innerText === 'Play Again') {
        startCountdownBeforeGame();
    } else if (playButton.innerText === 'End') {
        endGame();
    }
});

function startCountdownBeforeGame() {
    let countdown = 3;
    playButton.style.visibility = 'hidden'; 
    countdownTimer.innerText = countdown;
    const countdownInterval = setInterval(() => {
        countdown -= 1;
        countdownTimer.innerText = countdown;
        if (countdown <= 0) {
            clearInterval(countdownInterval);
            countdownTimer.innerText = '';
            startGame();
        }
    }, 1000);
}

function startGame() {
    bgMusic.play();
    gameCount++;
    initGame();
    playButton.innerText = 'End'; //  "End"
    playButton.style.visibility = 'visible'; 
    timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame();
        } else {
            timeLeft -= 1;
            document.getElementById('time').innerText = timeLeft;
        }
    }, 1000);
}

function endGame() {
    clearInterval(timer); // 清除计时器clear timer
    bgMusic.pause();
    bgMusic.currentTime = 0;
    wordInput.disabled = true;
    playButton.innerText = 'Play Again'; // 改变按钮文案为 "Play Again"

    // 更新游戏信息显示
    document.getElementById('gameScore').innerHTML = `Score: <span>${score}</span>`;
    document.getElementById('gameDuration').innerHTML = `Game duration: <span>${15 - timeLeft}s</span>`;
    document.getElementById('gameCount').innerHTML = `Game count: <span>${gameCount}</span>`;
    document.getElementById('wordDisplay').innerText = ''; // 清空单词显示

    // 重置游戏状态
    score = 0;
    timeLeft = 15; // 重置时间
    currentWord = '';

    document.getElementById('time').innerText = timeLeft; // 更新页面上显示的时间
}


function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
}

function checkInput() {
    if (wordInput.value.trim().toLowerCase() === currentWord.toLowerCase()) {
        currentWord = getRandomWord(); // get next random word
        document.getElementById('wordDisplay').innerText = currentWord;
        score++;
        document.getElementById('scoreValue').innerText = score;
        wordInput.value = "";
    }
}

function initGame() {
    score = 0;
    timeLeft = 15;
    wordInput.disabled = false;
    currentWord = getRandomWord(); // 初始化随机单词intial the random word
    document.getElementById('wordDisplay').innerText = currentWord;
    document.getElementById('scoreValue').innerText = score;
    document.getElementById('time').innerText = timeLeft;
    wordInput.focus();
}


