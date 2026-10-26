const noteForm = document.getElementById('note-form');
const noteInput = document.getElementById('note-input');
const categorySelect = document.getElementById('note-category');
const notesList = document.getElementById('notes-list');
const searchInput = document.getElementById('search-input');
const errorMessage = document.getElementById('error-message');
const charCount = document.getElementById('char-count');
const noteCounter = document.getElementById('note-counter');

// Load notes from localStorage or initialize empty array
let notes = JSON.parse(localStorage.getItem('notes')) || [];

// Character count listener
noteInput.addEventListener('input', () => {
    const remaining = 200 - noteInput.value.length;
    charCount.textContent = `${remaining} characters remaining`;
});

// Save to localStorage and render
function saveAndRender() {
    localStorage.setItem('notes', JSON.stringify(notes));
    renderNotes();
}
// Secure rendering using createElement and textContent (preventing XSS)
function renderNotes(filterText = '') {
    notesList.innerHTML = '';

    // 1. Update note counter with exact rubric wording
    if (notes.length === 0) {
        noteCounter.textContent = "You have no notes yet.";
    } else if (notes.length === 1) {
        noteCounter.textContent = "You have 1 note.";
    } else {
        noteCounter.textContent = `You have ${notes.length} notes.`;
    }

    // 2. Filter notes
    const filteredNotes = notes.filter(note => 
        note.text.toLowerCase().includes(filterText.toLowerCase()) ||
        note.category.toLowerCase().includes(filterText.toLowerCase())
    );

    // 3. Handle search empty state (Task 5 requirement)
    if (filteredNotes.length === 0 && filterText.trim() !== '') {
        const li = document.createElement('li');
        li.textContent = "No notes match your search.";
        notesList.appendChild(li);
        return;
    }

    // 4. Render filtered notes
    filteredNotes.forEach(note => {
        const li = document.createElement('li');
        li.classList.add('note-card', note.category.toLowerCase());

        const tagSpan = document.createElement('span');
        tagSpan.classList.add('category-tag');
        tagSpan.textContent = note.category;

        const pTag = document.createElement('p');
        pTag.textContent = note.text;

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => deleteNote(note.id));

        li.appendChild(tagSpan);
        li.appendChild(pTag);
        li.appendChild(deleteBtn);

        notesList.appendChild(li);
    });
}

// Add note handler with validation (200-char check & inline error)
noteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = noteInput.value.trim();
    const category = categorySelect.value;

    if (text === "") {
        showError("Please write something for your note!");
        return;
    }

    if (text.length > 200) {
        showError("Note exceeds 200 character limit!");
        return;
    }

    hideError();

  const newNote = {
        id: Date.now(),
        text: text,
        category: category,
        createdAt: new Date().toLocaleString() // Adds readable date and time[span_3](start_span)[span_3](end_span)
    };
    notes.push(newNote);
    saveAndRender();

    noteInput.value = "";
    charCount.textContent = "200 characters remaining";
});

// Delete note
function deleteNote(id) {
    notes = notes.filter(note => note.id !== id);
    saveAndRender();
}

// Search event listener
searchInput.addEventListener('input', (e) => {
    renderNotes(e.target.value);
});

// Helper functions for inline errors
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

function hideError() {
    errorMessage.textContent = '';
    errorMessage.style.display = 'none';
}

// Initial render on load
renderNotes();