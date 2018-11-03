const notes = require('./notes.js');

/*  CLI
--------------------------------- */

const settings = {
  title: {
    description: 'Title of note',
    demand: true,
    alias: 't'
  },
  body: {
    description: 'Content of note',
    demand: true,
    alias: 'b'
  }
};

const argv = require('yargs')
  .command('list', 'List all notes')
  .command('read', 'Read a note', {
    title: settings.title
  })
  .command('remove', 'Remove a note', {
    title: settings.title
  })
  .command('add', 'Add a new note', {
    title: settings.title,
    body: settings.body
  })
  .help()
  .argv;

const command = argv._[0];

/*  Commands
--------------------------------- */

const addNote = (title, body) => {
  const note = notes.addNote(title, body);

  if (note) {
    console.log('Note added!');
    notes.logNote(note);
  } else {
    console.log('Note already exists.');
  }
};

const removeNote = title => {
  const noteRemoved = notes.removeNote(title);
  console.log(noteRemoved ? 'Note removed!' : 'Note not found.');
};

const listAll = () => {
  const notesList = notes.getAll();
  console.log(`Listing ${notesList.length} note(s)`);

  notesList.forEach(note => notes.logNote(note));
};

const readNote = title => {
  const note = notes.getNote(title);

  if (note) {
    notes.logNote(note);
  } else {
    console.log('Note not found.');
  }
};


/*  Routing
--------------------------------- */

switch(command) {
  case 'add':
    addNote(argv.title, argv.body);
    break;

  case 'remove':
    removeNote(argv.title);
    break;

  case 'list':
    listAll();
    break;

  case 'read':
    readNote(argv.title);
    break;

  default:
    console.log('Command not found.');
}
