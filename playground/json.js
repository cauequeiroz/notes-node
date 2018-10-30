const fs = require('fs');

const note = {
  title: 'titulo',
  body: 'lorem ipsum dolor sit amet'
};

fs.writeFileSync('notes.json', JSON.stringify(note));

const newNote = JSON.parse(fs.readFileSync('notes.json'));

console.log(typeof newNote, newNote.title)
