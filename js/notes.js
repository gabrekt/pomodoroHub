// notes.js
const saveNoteBtn = document.getElementById('save-note-btn');
const noteInput = document.getElementById('note-input');
const noteList = document.getElementById('note-list');

function addNote(noteText) {
    if (!noteText) noteText = noteInput.value.trim();
    if (!noteText) {
        alert('Please enter a note.');
        return;
    }

    const noteItem = document.createElement('li');
    noteItem.textContent = noteText;
    noteList.appendChild(noteItem);
    noteInput.value = '';
    Storage.saveNotes([...noteList.children].map(li => li.textContent));
}

saveNoteBtn.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default action
    addNote(noteInput.value.trim()); // Pass only the note content
});

document.addEventListener('DOMContentLoaded', () => {
    const notes = Storage.loadNotes();
    notes.forEach(noteText => addNote(noteText));

    saveNoteBtn.addEventListere('click', function(event) {
        event.preventDefault();
        addNote(noteInput.value.trim());
    })
});
