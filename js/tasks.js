// tasks.js
const addTaskBtn = document.getElementById('add-task-btn');
const newTaskInput = document.getElementById('new-task-input');
const taskList = document.getElementById('task-list');

function addTask(taskText) {
    taskText = taskText || newTaskInput.value.trim(); // Ensure we're using the passed `taskText` or getting it from the input.
    if (!taskText) {
        alert('Please enter a task.');
        return;
    }

    const taskItem = document.createElement('li');
    taskItem.textContent = taskText;
    taskList.appendChild(taskItem);
    newTaskInput.value = '';  // Clears the input field after adding the task to avoid duplication on subsequent adds.
    Storage.saveTasks([...taskList.children].map(li => li.textContent));  // Update localStorage with the new list.
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
});