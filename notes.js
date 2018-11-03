const fs = require('fs');

/*  Helpers
--------------------------------- */

const fetchNotes = () => {
  try {
    const notes = fs.readFileSync('notes-data.json');
    return JSON.parse(notes);
  } catch(e) {
    return [];
  }
};

const saveNotes = notes => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
}

const logNote = note => {
  console.log('-----------------------');
  console.log('Title:', note.title);
  console.log('Content:', note.body);
}

/*  Methods
--------------------------------- */

const addNote = (title, body) => {
  const notes = fetchNotes();
  const note = { title, body };

  const filteredNotes = notes.filter(note => note.title === title);

  if (filteredNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

const removeNote = title => {
  const notes = fetchNotes();
  const filteredNotes = notes.filter(note => note.title !== title);
  saveNotes(filteredNotes);

  return notes.length !== filteredNotes.length;
};

const getAll = () => fetchNotes();

const getNote = title => {
  const notes = fetchNotes();
  const filteredNotes = notes.filter(note => note.title === title);

  return filteredNotes[0];
};

module.exports = { addNote, removeNote, getAll, getNote, logNote };
