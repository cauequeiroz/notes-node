const fs = require('fs');
const os = require('os');
const _ = require('lodash');
const argv = require('yargs').argv;

const notes = require('./notes.js');

const command = argv._[0];
console.log('Command:', command);

if (command === 'list')
  notes.getAll();
else if (command === 'add')
  notes.add(argv.title, argv.body);
else if (command === 'read')
  notes.get(argv.title);
else if (command === 'remove')
  notes.remove(argv.title);
else
  console.log('[ERROR] Command not recognized.');
