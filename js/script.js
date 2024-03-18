const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('start-timer-btn');
const pauseBtn = document.getElementById('pause-timer-btn');
const resetBtn = document.getElementById('reset-timer-btn');

let timerDuration = 25 * 60; // 25 minutes in seconds
let timerId = null;
let isPaused = true;

function updateTimerDisplay(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    timerDisplay.textContent = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

updateTimerDisplay(timerDuration);

function startTimer() {
    if (!isPaused) return; // Prevent multiple intervals if already running
    isPaused = false;
    pauseBtn.style.display = 'inline-block'; // Show pause button

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
}

startBtn.addEventListener('click', startTimer);


function pauseTimer() {
    if (isPaused) return;
    clearInterval(timerId);
    isPaused = true;
    pauseBtn.style.display = 'none'; // Hide pause button
}

pauseBtn.addEventListener('click', pauseTimer);

function resetTimer() {
    clearInterval(timerId);
    timerDuration = 25 * 60; // Reset to 25 minutes
    isPaused = true;
    pauseBtn.style.display = 'none'; // Hide pause button
    updateTimerDisplay(timerDuration);
}

resetBtn.addEventListener('click', resetTimer);




const addTaskBtn = document.getElementById('add-task-btn');
const newTaskInput = document.getElementById('new-task-input');
const taskList = document.getElementById('task-list');

function addTask() {
    const taskText = newTaskInput.value.trim();
    if (!taskText) {
        alert('Please enter a task.');
        return;
    }

    const taskItem = document.createElement('li');
    taskItem.textContent = taskText;
    taskItem.addEventListener('click', toggleTaskCompletion);

    taskList.appendChild(taskItem);
    newTaskInput.value = ''; // Clear input field after adding task
}

addTaskBtn.addEventListener('click', addTask);

function toggleTaskCompletion(event) {
    event.target.classList.toggle('completed');
}


const saveNoteBtn = document.getElementById('save-note-btn');
const noteInput = document.getElementById('note-input');
const noteList = document.getElementById('note-list');

function saveNote() {
    const noteText = noteInput.value.trim();
    if (!noteText) {
        alert('Please enter a note.');
        return;
    }

    const noteItem = document.createElement('li');
    noteItem.textContent = noteText;

    noteList.appendChild(noteItem);
    noteInput.value = ''; // Clear textarea after saving note
}

saveNoteBtn.addEventListener('click', saveNote);
