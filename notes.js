const fs = require('fs');

const get = title => {
  console.log('Getting note', title);
}

const getAll = () => {
  console.log('Listing all notes...');
}

const add = (title, body) => {
  let notes = [];
  let note = { title, body };

  try {
    const savedNotes = fs.readFileSync('notes-data.json');
    notes = JSON.parse(savedNotes);
  } catch(err) {}

  const duplicatedNotes = notes.filter(note => note.title === title);

  if (duplicatedNotes.length === 0) {
    notes.push(note);
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
  }
}

const remove = title => {
  console.log('Removing note', title);
}

module.exports = { get, getAll, add, remove };
