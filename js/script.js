const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('start-timer-btn');
const pauseBtn = document.getElementById('pause-timer-btn');
const resetBtn = document.getElementById('reset-timer-btn');

document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    loadSettings();

});


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

function addTask(taskText) {
    // Determine if taskText is an event or a string
    if (!taskText || typeof taskText !== 'string') {
        taskText = newTaskInput.value.trim();
    }
    
    if (!taskText) {
        alert('Please enter a task.');
        return;
    }

    const taskItem = document.createElement('li');
    const taskContent = document.createTextNode(taskText);
    taskItem.appendChild(taskContent);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', function() {
        taskItem.remove();
    });

    taskItem.appendChild(deleteBtn);
    taskList.appendChild(taskItem);
    newTaskInput.value = ''; // Clear input field after adding task
    taskItem.addEventListener('click', toggleTaskCompletion);
}

addTaskBtn.addEventListener('click', function() { addTask(); });



// Additional functionality for task description next to the timer
const currentTaskInput = document.getElementById('current-task-input');
const startTaskTimerBtn = document.getElementById('start-task-timer-btn');

startTaskTimerBtn.addEventListener('click', function() {
    const currentTask = currentTaskInput.value.trim();
    if (!currentTask) {
        alert('Please enter the current task.');
        return;
    }

    // Check if the task already exists in the task list
    let taskExists = Array.from(taskList.children).some(
        taskItem => taskItem.textContent.replace('Delete', '').trim() === currentTask
    );

    // If the task does not exist, add it to the list
    if (!taskExists) {
        addTask(currentTask);
    }

    // Set the timer for the specified task and start it
    startTimer();
});

// Existing saveNote function remains unchanged...

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

document.getElementById('start-task-timer-btn').addEventListener('click', function() {
    const taskInput = document.getElementById('current-task-input');
    const task = taskInput.value.trim();
    if (!task) {
        alert('Please enter a task.');
        return;
    }

    let taskExists = Array.from(document.querySelectorAll('#task-list li')).some(taskItem => taskItem.textContent.includes(task));
    if (!taskExists) {
        addTask(task);
    }

    startTimer();
});

function loadTasks() {
    const tasks = Storage.loadTasks();
    tasks.forEach(taskText => addTask(taskText));
}

function loadSettings() {
    const settings = Storage.loadSettings();
    if (settings.timerDuration) {
        timerDuration = settings.timerDuration;
        updateTimerDisplay(timerDuration);
    }
    // Apply other settings as needed
}

function saveTasks() {
    const tasks = Array.from(document.querySelectorAll('#task-list li')).map(taskItem => {
        return taskItem.textContent.replace('Delete', '').trim();
    });
    Storage.saveTasks(tasks);
}

function saveSettings() {
    const settings = {
        timerDuration: timerDuration
        // Save other settings as needed
    };
    Storage.saveSettings(settings);
}
