const fs = require('fs');
const os = require('os');
const _ = require('lodash');
const notes = require('./notes.js');

const settings = {
  title: {
    describe: 'Title of note',
    demand: true,
    alias: 't'
  },
  body: {
    describe: 'Content of note',
    demand: true,
    alias: 'b'
  }
}

const argv = require('yargs')
  .command('add', 'Add a new note', {
    title: settings.title,
    body: settings.body
  })
  .command('remove', 'Remove a note', {
    title: settings.title
  })
  .command('read', 'Read a note', {
    title: settings.title
  })
  .command('list', 'List all notes')
  .help()
  .argv;

const command = argv._[0];

if (command === 'list') {
  notes.getAll();
} else if (command === 'add') {
  const note = notes.add(argv.title, argv.body);

  if (note) {
    console.log('Note was added!');
    notes.logNote(note);
  } else {
    console.log('You cannot add duplicated notes.');
  }
} else if (command === 'read') {
  const note = notes.get(argv.title);

  if (note) {
    console.log('Note was found!');
    notes.logNote(note);
  } else {
    console.log('Note not found.');
  }
} else if (command === 'remove') {
  const removedNote = notes.remove(argv.title);
  const message = removedNote ? 'Note was removed!' : 'Note not found.';
  console.log(message);
} else {
  console.log('[ERROR] Command not recognized.');
}
