class Storage {
    // Loads tasks from localStorage.
    static loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];  // Retrieves the 'tasks' item from localStorage and parses it from JSON. If it doesn't exist, defaults to an empty array.
        return tasks;  // Returns the array of tasks.
    }

    // Saves tasks to localStorage.
    static saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));  // Converts the tasks array to a JSON string and stores it in localStorage under the key 'tasks'.
    }

    // Loads settings from localStorage.
    static loadSettings() {
        const settings = JSON.parse(localStorage.getItem('settings')) || {};  // Retrieves the 'settings' item from localStorage and parses it from JSON. Defaults to an empty object if not found.
        return settings;  // Returns the settings object.
    }

    // Saves settings to localStorage.
    static saveSettings(settings) {
        localStorage.setItem('settings', JSON.stringify(settings));  // Converts the settings object to a JSON string and stores it in localStorage under the key 'settings'.
    }
    
    // Loads notes from localStorage.
    static loadNotes() {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];  // Retrieves the 'notes' item from localStorage and parses it from JSON. If it doesn't exist, defaults to an empty array.
        return notes;  // Returns the array of notes.
    }
    
    // Saves notes to localStorage.
    static saveNotes(notes) {
        localStorage.setItem('notes', JSON.stringify(notes));  // Converts the notes array to a JSON string and stores it in localStorage under the key 'notes'.
    }
}