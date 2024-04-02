
'use strict';

class Score {
    _date;
    _hits;
    _percentage;
    constructor(date = new Date().toDateString(), hits = 0, percentage = 0) {
        this._date = date;
        this._hits = hits;
        this._percentage = percentage;
    }
    set date(date) {
        this._date = date;
    }
    set hits(hits) {
        this._hits = hits;
    }
    set percentage(percentage) {
        this._percentage = percentage;
    }
    get date() {
        return this._date;
    }
    get hits() {
        return this._hits;
    }
    get percentage() {
        return this._percentage;
    }
}

function onEvent(event, selector, callback) {
    return selector.addEventListener(event, callback);
}

function select(selector, parent = document) {
    return parent.querySelector(selector);
}
function selectAll(selector, parent = document) {
    return [...parent.querySelectorAll(selector)];
}
function print(arg) {
    console.log(arg);
}

function create(element, parent = document) {
    return parent.createElement(element);
}

const inputWord = select('.type-word');
const time = select('.time');
const hit = select('.hit')
const btn = select('.btn');
const play = select('.play');
const input = select('.input');
const instruction = select('.information');
const icon = select('.icon');
const getScore = select('.score')
const leaderBoard = select('.leaderboard');
const list = select('.list');
const scores = localStorage.getItem("scores") ? JSON.parse(localStorage.getItem("scores")) : [];
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

const backgroundMusic = new Audio('./assets/audio/music.wav');
backgroundMusic.volume = 0.5;

let score = new Score();

let i = 0;
let hits = 0;
let seconds = 99;
input.value = '';
input.disabled = true;

function getRandomWord(letter) {
    i++;
    inputWord.innerHTML = '';
    letter.split('').forEach(character => {
        const characterSpan = create('span');
        characterSpan.innerText = character;
        inputWord.appendChild(characterSpan);
    });
}
function displayTime() {
    time.innerText = `${seconds.toString().padStart(2, 0)}s`;
    seconds--;
    if (seconds > 0) {
        setTimeout(function () {
            displayTime()
        }, 1000);
    }
    if (seconds <= 0 && play.innerText === 'END GAME') {
        endGame();
    }
}
function start() {
    list.innerHTML = '';
    btn.disabled = false;
    words.sort(() => (Math.random() > 0.5) ? 1 : -1);
    setTimeout(() => {
        backgroundMusic.play();
        seconds = 10;
        score.hits = 0;
        score.percentage = 0;
        getRandomWord(words[i]);
        input.disabled = false;
        input.focus();
        displayTime();
        play.innerText = 'END GAME';
    }, 1000);
}
function endGame() {
    getThisScore();
    play.innerText = 'PLAY AGAIN';
    seconds = 0;
    i = 0;
    hits = 0;
    hit.innerText = '00';
    input.disabled = true;
    inputWord.innerHTML = '';
    input.value = '';
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
    score = {};
}
onEvent('click', btn, function () {
    if (play.innerText === 'PLAY NOW' || play.innerText === 'PLAY AGAIN') {
        btn.disabled = true;
        play.innerText = 'READY';
        countDown(4);
    } else {
        endGame();
    }
})
function countDown(timeleft) {
    instruction.style.opacity = '0';
    return new Promise((resolve, reject) => {
        let countdownTimer = setInterval(() => {
            timeleft--;
            inputWord.textContent = timeleft;
            if (timeleft <= 0) {
                clearInterval(countdownTimer);
                resolve(true);
                start();
            }
        }, 1000);
    });
}
input.onkeyup = function () {
    const wordSpan = inputWord.querySelectorAll('span');
    const inputValue = input.value.toLowerCase().trim().split('');
    const tempInputValue = '';
    wordSpan.forEach((characterSpan, index) => {
        const character = inputValue[index];
        if (character === null) {
            characterSpan.classList.remove('incorrect');
            characterSpan.classList.remove('correct');
        } else if (input.value.toLowerCase().trim() === inputWord.innerText) {
            hits++;
            icon.classList.add('move-icon');
            setTimeout(() => {
                icon.classList.remove('move-icon');
            }, 1000);
            hit.innerText = `${hits.toString().padStart(2, '0')}`;
            getRandomWord(words[i]);
            input.value = '';
        } else {
            if (character != characterSpan.innerText) {
                characterSpan.classList.add('incorrect');
                characterSpan.classList.remove('correct');
                icon.classList.add('shake-icon');
                setTimeout(() => {
                    icon.classList.remove('shake-icon');
                }, 500);
            } else if (character === characterSpan.innerText) {
                characterSpan.classList.add('correct');
                characterSpan.classList.remove('incorrect');
            }
        }
    })
}
function getList(place, hits, date, percent) {
    let row = create('div');
    row.innerHTML =
        `<div># ${place}</div>
  <div>SCORE: ${hits}</div>
  <div>${date}</div>
  <div>${percent}%</div>`;
    list.append(row);
}
function sortNum(a, b) {
    return a - b;
}
function getThisScore() {
    score.date = new Date().toDateString();
    score.hits = hits;
    const tempPercentage = (hits / 90) * 100;
    score.percentage = tempPercentage.toFixed(1);
    scores.push(score);
    scores.sort((a, b) => (b.hits - a.hits));
    console.log(scores);
    for (let i = 0; i < scores.length; i++) {
        getList(i + 1, scores[i].hits, scores[i].date, scores[i].percentage);
    }
    localStorage.setItem('scores', JSON.stringify(scores));
    leaderBoard.showModal();
}
onEvent('click', leaderBoard, function (e) {
    const rect = this.getBoundingClientRect();
    if (e.clientY < rect.top || e.clientY > rect.bottom || e.clientX < rect.left || e.clientX > rect.right)
        leaderBoard.close();
})

// GO BACK
const goBackBtn = select('.go-back-btn');

onEvent('click', goBackBtn, function () {
    leaderBoard.close(); // 关闭对话框
});


