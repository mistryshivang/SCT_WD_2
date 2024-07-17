let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapTimes = [];
let display = document.getElementById('display');
let startButton = document.getElementById('start');
let pauseButton = document.getElementById('pause');
let resetButton = document.getElementById('reset');
let lapButton = document.getElementById('lap');
let lapsContainer = document.getElementById('laps');

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLap);

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 10);
        running = true;
    }
}

function pauseTimer() {
    if (running) {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        running = false;
    }
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    display.innerHTML = "00:00:00.00";
    lapTimes = [];
    lapsContainer.innerHTML = '';
}

function updateTime() {
    updatedTime = new Date().getTime() - startTime;
    let formattedTime = formatTime(updatedTime);
    display.innerHTML = formattedTime;
}

function formatTime(time) {
    let milliseconds = parseInt((time % 1000) / 10);
    let seconds = parseInt((time / 1000) % 60);
    let minutes = parseInt((time / (1000 * 60)) % 60);
    let hours = parseInt((time / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}

function recordLap() {
    if (running) {
        let lapTime = formatTime(updatedTime);
        lapTimes.push(lapTime);
        let lapItem = document.createElement('li');
        lapItem.textContent = lapTime;
        lapsContainer.appendChild(lapItem);
    }
}
