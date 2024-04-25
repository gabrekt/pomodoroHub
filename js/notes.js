// notes.js
const saveNoteBtn = document.getElementById('save-note-btn');
const noteInput = document.getElementById('note-input');
const noteList = document.getElementById('note-list');
const deleteAllNotesBtn = document.getElementById('delete-all-notes');

function addNote(noteText) {
    if (!noteText) noteText = noteInput.value.trim();
    if (!noteText) {
        alert('Please enter a note.');
        return;
    }

    const noteItem = document.createElement('li');
    noteItem.className = 'note-item'; // Added class for styling
    noteItem.textContent = noteText;

    // Create and append the delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.onclick = function() {
        noteItem.remove();
        Storage.saveNotes([...noteList.children].map(li => li.textContent.replace('Delete', '').trim())); // Update localStorage
    };

    noteItem.appendChild(deleteBtn); // Append delete button to the note item
    noteList.appendChild(noteItem); // Append the note item to the note list
    noteInput.value = ''; // Clears the input field after adding the note
    Storage.saveNotes([...noteList.children].map(li => li.textContent.replace('Delete', '').trim())); // Update localStorage with the new list
}

saveNoteBtn.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default action
    addNote(noteInput.value.trim()); // Pass only the note content
});

function deleteAllNotes() {
    // Confirm before deletion
    if (confirm('Are you sure you want to delete all notes?')) {
        while (noteList.firstChild) {
            noteList.removeChild(noteList.firstChild);
        }
        Storage.saveNotes([]); // Clear notes from local storage
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const notes = Storage.loadNotes();
    notes.forEach(noteText => addNote(noteText));

    saveNoteBtn.addEventListener('click', function(event) {
        event.preventDefault();
        addNote(noteInput.value.trim());
    })

    deleteAllNotesBtn.addEventListener('click', deleteAllNotes);

});
