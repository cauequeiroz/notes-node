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
  const notes = fetchNotes();
  const filteredNotes = notes.filter(note => note.title === title);
  return filteredNotes[0];
}

const getAll = () => {
  return fetchNotes();
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
  const filteredNotes = notes.filter(note => note.title !== title);
  saveNotes(filteredNotes);

  return notes.length !== filteredNotes.length;
}

const logNote = note => {
  console.log('---');
  console.log(`Title: ${note.title}`);
  console.log(`Content: ${note.body}`);
}

module.exports = { get, getAll, add, remove, logNote };
