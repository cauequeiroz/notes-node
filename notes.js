const fs = require('fs');

const fetchNotes = () => {
  try {
    const savedNotes = fs.readFileSync('notes-data.json');
    return JSON.parse(savedNotes);
  } catch(err) {
    return [];
  }
}

const saveNotes = notes => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
}

const get = title => {
  console.log('Getting note', title);
}

const getAll = () => {
  console.log('Listing all notes...');
}

const add = (title, body) => {
  const notes = fetchNotes();
  const note = { title, body };
  const duplicatedNotes = notes.filter(note => note.title === title);

  if (duplicatedNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
}

const remove = title => {
  const notes = fetchNotes();
  const filteredNotes = notes.filter(item => item.title !== title);
  saveNotes(filteredNotes);

  return notes.length !== filteredNotes.length;
}

module.exports = { get, getAll, add, remove };
