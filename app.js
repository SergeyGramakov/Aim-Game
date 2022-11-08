const startBrn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
const leaderBoard = document.querySelector('.leader-board');
const colors = ['#ff0000', '#bb00ff', '#0040ff'];
let time = 0;
let currentScore = 0;
let timeMode = 0;
let players = [
    { name: "Vasyan", score: 58 },
    { name: "Silver", score: 23 },
];

startBrn.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add('up');
});

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'));
        timeMode = time;
        screens[1].classList.add('up');
        startGame();
    }
});

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        currentScore++;
        event.target.remove();
        createRandomCircle();
    }
})

function startGame() {
    setInterval(decreaseTime, 1000);
    createRandomCircle();
    setTime(time);
}

function decreaseTime() {
    if (time === 0) {
        finishGame();
    } else {
        let current = --time;
        if (current < 10 && current.length <= 4) {
            current = `0${current}`;
        }
        setTime(current);
    }
}

function setTime(value) {
    if (value < 10) {
        timeEl.innerHTML = `00:0${value}`;
    } else {
        timeEl.innerHTML = `00:${value}`;
    }
}

function createRandomCircle() {
    const circle = document.createElement('div');
    const size = getRandomNumber(10, 60);
    const {width, height} = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);

    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    circle.style.background = getRandomColor()

    board.append(circle);
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length);

    return colors[index];
}

function addCurrentScore() {
    players.push( { name: 'You', score: currentScore } );
}

function showScore() {
    board.innerHTML = `<h1 class="color-black">Your score:<br><span class="primary bigger">${currentScore}</span></h1>`;
}

function showLeaderBoard() {
    leaderBoard.style.opacity = '1';
    leaderBoard.innerHTML = `Leaderboard for ${timeMode} seconds mode:<br>
    ${players[0].name}: <span>${players[0].score}</span><br>
    ${players[1].name}: <span>${players[1].score}</span><br>
    ${players[2].name}: <span>${players[2].score}</span><br>`;
}

function finishGame() {
    timeEl.parentNode.classList.add('hide');
    addCurrentScore()
    showScore();
    showLeaderBoard();
}

// CHEAT
function winTheGame() {
    function kill() {
        const circle = document.querySelector('.circle');

        if (circle) {
            circle.click();
        }
    }

    setInterval(kill, 5);
}