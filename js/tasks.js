// tasks.js
const addTaskBtn = document.getElementById('add-task-btn');
const newTaskInput = document.getElementById('new-task-input');
const taskList = document.getElementById('task-list');
const deleteAllTasksBtn = document.getElementById('delete-all-tasks');

function addTask(taskText) {
    taskText = taskText || newTaskInput.value.trim(); // Ensure we're using the passed `taskText` or getting it from the input.
    if (!taskText) {
        alert('Please enter a task.');
        return;
    }

    const taskItem = document.createElement('li');
    taskItem.className = 'task-item'; // Added class for styling
    taskItem.textContent = taskText;

    // Create and append the delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.onclick = function() {
        taskItem.remove();
        Storage.saveTasks([...taskList.children].map(li => li.textContent.replace('Delete', '').trim())); // Update localStorage
    };

    taskItem.appendChild(deleteBtn); // Append delete button to the task item
    taskList.appendChild(taskItem); // Append the task item to the task list
    newTaskInput.value = ''; // Clears the input field after adding the task
    Storage.saveTasks([...taskList.children].map(li => li.textContent.replace('Delete', '').trim())); // Update localStorage with the new list
}



// Additional functionality for task description next to the timer
const currentTaskInput = document.getElementById('current-task-input');
const startTaskTimerBtn = document.getElementById('start-task-timer-btn');

function handleStartTask() {
    const currentTask = currentTaskInput.value.trim();
    if (!currentTask) {
        alert('Please enter the current task.');
        return;
    }

    // Check if the task is already in the list
    const taskExists = Array.from(taskList.children).some(taskItem => taskItem.textContent === currentTask);
    if (!taskExists) {
        addTask(currentTask); // Add the task if it doesn't exist
    }

    startTimer(); // Start the timer for the new task
}

function deleteAllTasks() {
    // Confirm before deletion
    if (confirm('Are you sure you want to delete all tasks?')) {
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
        Storage.saveTasks([]); // Clear tasks from local storage
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Attach the event listener correctly.
    addTaskBtn.addEventListener('click', function(event) {
        event.preventDefault();  // Prevents the default form behavior.
        addTask();  // Adds the task using the input's value.
    });

    // Load tasks from storage and display them.
    const tasks = Storage.loadTasks();
    tasks.forEach(taskText => addTask(taskText));

    startTaskTimerBtn.addEventListener('click', handleStartTask);

    deleteAllTasksBtn.addEventListener('click', deleteAllTasks);

});
