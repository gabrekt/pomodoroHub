// Storage .js

class Storage {
    static loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        return tasks;
    }

    static saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    static loadSettings() {
        const settings = JSON.parse(localStorage.getItem('settings'));
        return settings || {};
    }

    static saveSettings(settings) {
        localStorage.setItem('settings', JSON.stringify(settings));
    }
}

