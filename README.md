# QuickNotes Web Application

A clean, responsive, and feature-rich note-taking web application built using vanilla JavaScript, HTML5, CSS3, and browser LocalStorage.

## Features
- **Note Management:** Create, categorize (Personal, Work, Study), timestamp, and delete notes dynamically.
- **Data Persistence:** Automatically saves all entries to browser `localStorage` across sessions.
- **Input Validation:** Enforces a 200-character limit with real-time countdown updates and inline error messaging.
- **Live Search Filtering:** Instantly filters notes by keyword or category, handling empty search states seamlessly ("No notes match your search.").
- **Security:** Built with safe DOM manipulation (`createElement` and `textContent`) to prevent XSS vulnerabilities.
-