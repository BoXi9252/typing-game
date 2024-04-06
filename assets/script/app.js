// 'use strict';

let score = 0, timeLeft = 15, gameCount = 0, currentWord = '';
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
let timer;

// 准备开始游戏的倒计时
function startCountdownBeforeGame() {
    let countdown = 3;
    playButton.style.visibility = 'hidden'; // 隐藏按钮避免重复点击
    countdownTimer.innerText = countdown;
    const countdownInterval = setInterval(() => {
        countdown -= 1;
        countdownTimer.innerText = countdown;
        if (countdown <= 0) {
            clearInterval(countdownInterval);
            countdownTimer.innerText = ''; // 清空倒计时显示
            startGame();
        }
    }, 1000);
}

// 开始游戏
function startGame() {
    bgMusic.play();
    gameCount++;
    initGame();
    playButton.innerText = 'End'; // 更改按钮文案为"End"
    playButton.style.visibility = 'visible'; // 显示按钮
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

// 结束游戏
function endGame() {
    clearInterval(timer);
    bgMusic.pause();
    bgMusic.currentTime = 0;
    wordInput.disabled = true;
    playButton.innerText = 'Play Again';
    wordInput.value = '';


    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    document.getElementById('gameScore').innerHTML = `Score: <span>${score}</span>`;
    document.getElementById('gameDuration').innerHTML = `Date: <span>${formattedDate}</span>`;
    document.getElementById('gameCount').innerHTML = `# <span>${gameCount}</span>`;

    document.getElementById('wordDisplay').innerText = ''; // 清空单词显示



    updateScoreboard();
    resetGame();
    document.getElementById('gameInfoModal').style.display = 'block';
}



// 重置游戏状态
function resetGame() {
    score = 0;
    timeLeft = 15;
    currentWord = getRandomWord();
    document.getElementById('wordDisplay').innerText = currentWord;
    document.getElementById('scoreValue').innerText = score;
    document.getElementById('time').innerText = timeLeft;
}

// 获取随机单词
function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
}

// 输入框事件监听
wordInput.addEventListener('input', () => {
    if (wordInput.value.trim().toLowerCase() === currentWord.toLowerCase()) {
        score++;
        currentWord = getRandomWord();
        document.getElementById('wordDisplay').innerText = currentWord;
        document.getElementById('scoreValue').innerText = score;
        wordInput.value = '';
    }
});

// 初始化游戏
function initGame() {
    wordInput.disabled = false;
    currentWord = getRandomWord();
    document.getElementById('wordDisplay').innerText = currentWord;
    document.getElementById('scoreValue').innerText = score;
    document.getElementById('time').innerText = timeLeft;
    wordInput.focus();
}

// 更新记分板
function updateScoreboard() {
    const scoresArray = getScores();
    scoresArray.push(createGameScore(score));
    const updatedScores = sortAndTrimScores(scoresArray);
    saveScores(updatedScores);
    displayScores(updatedScores);
}

// 创建游戏得分对象
function createGameScore(score) {
    return {
        score: score,
        date: new Date().toLocaleDateString()
    };
}

// 存储得分数组
function saveScores(scoresArray) {
    localStorage.setItem('gameScores', JSON.stringify(scoresArray));
}

// 获取得分数组
function getScores() {
    const scores = localStorage.getItem('gameScores');
    return scores ? JSON.parse(scores) : [];
}

// 对得分进行排序并裁剪
function sortAndTrimScores(scoresArray) {
    return scoresArray.sort((a, b) => b.score - a.score).slice(0, 10);
}

// // 显示得分
// function displayScores(scoresArray) {
//     const scoreboardElement = document.getElementById('scoreboard');
//     if (scoresArray.length === 0) {
//         scoreboardElement.innerHTML = '没有玩过任何游戏。';
//     } else {
//         scoreboardElement.innerHTML = scoresArray.map((score, index) =>
//             `<div>Rank ${index + 1}: ${score.score} - ${score.date}</div>`
//         ).join('');
//     }
// }
function displayScores(scoresArray) {
    const scoreboardElement = document.getElementById('scoreboardContainer'); // 注意更改为新容器的 ID
    if (scoresArray.length === 0) {
        scoreboardElement.innerHTML = '<p>没有玩过任何游戏。</p>';
    } else {
        scoreboardElement.innerHTML = '<h3>历史分数：</h3>' + scoresArray.map((score, index) =>
            `<div>Rank ${index + 1}: ${score.score} - ${score.date}</div>`
        ).join('');
    }
}

// 切换游戏开始/结束状态
playButton.addEventListener('click', function () {
    if (playButton.innerText === 'Play Now' || playButton.innerText === 'Play Again') {
        startCountdownBeforeGame();
    } else if (playButton.innerText === 'End') {
        endGame();
    }
});

