// timer.js
const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('start-timer-btn');
const pauseBtn = document.getElementById('pause-timer-btn');
const resetBtn = document.getElementById('reset-timer-btn');
const fullTime = 25 * 60; // Total time for the Pomodoro in seconds
const timerProgress = document.querySelector('.timer-progress');

let timerDuration = 25 * 60; // Default 25 minutes
let timerId = null;
let isPaused = true;

function updateTimerDisplay(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    timerDisplay.textContent = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;

    const circumference = 2 * Math.PI * 90; // The circumference of the circle
    const offset = circumference - (seconds / fullTime) * circumference;
    timerProgress.style.strokeDashoffset = offset;
}

function startTimer() {
    if (!isPaused) return;
    isPaused = false;
    pauseBtn.style.display = 'block';

    timerId = setInterval(() => {
        if (timerDuration <= 0) {
            clearInterval(timerId);
            alert('Pomodoro finished!');
            resetTimer();
            return;
        }
        timerDuration--;
        updateTimerDisplay(timerDuration);
    }, 1000);

    const progressCircle = document.querySelector('.timer-progress');
    progressCircle.style.stroke = "#4CCD99"; // Change to green when the timer starts

}

function pauseTimer() {
    if (isPaused) return;
    clearInterval(timerId);
    isPaused = true;
    pauseBtn.style.display = 'none';
}

function resetTimer() {
    clearInterval(timerId);
    timerDuration = 25 * 60;
    isPaused = true;
    pauseBtn.style.display = 'none';
    updateTimerDisplay(timerDuration);

    timerProgress.style.strokeDashoffset = 2 * Math.PI * 90; // The circumference of the circle
}

document.addEventListener('DOMContentLoaded', () => {
    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', resetTimer);
    updateTimerDisplay(timerDuration);
});
