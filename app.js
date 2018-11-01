const fs = require('fs');
const os = require('os');
const _ = require('lodash');
const argv = require('yargs').argv;

const notes = require('./notes.js');

const command = argv._[0];
console.log('Command:', command);

if (command === 'list') {
  notes.getAll();
} else if (command === 'add') {
  const note = notes.add(argv.title, argv.body);

  if (note) {
    console.log(`
      Note added!
      ---
      [Title] ${note.title}
      [Description] ${note.body}
    `);
  } else {
    console.log('You cannot add duplicated notes.');
  }
} else if (command === 'read') {
  notes.get(argv.title);
} else if (command === 'remove') {
  notes.remove(argv.title);
} else {
  console.log('[ERROR] Command not recognized.');
}
