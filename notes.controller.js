const fs = require('fs/promises');
const path = require('path');
const chalk = require('chalk');

const notesPath = path.join(__dirname, 'db.json');

async function addNote(title) {
  const notes = await getNotes();
  const note = {
    title,
    id: Date.now().toString()
  };

  notes.push(note);
  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.green('Note Added'));
};

async function getNotes() {
  const notes = await fs.readFile(notesPath, {encoding: 'utf-8'});
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
};

async function printNotes() {
  const notes = await getNotes();
  console.log(chalk.bgYellow('Here is list of notes'));
  notes.forEach((n) => console.log(chalk.yellowBright(n.id ,n.title)));
};

async function removeNote(id) {
  const notes = await getNotes();
  const newList = notes.filter((n) => n.id !== id);
  await fs.writeFile(notesPath, JSON.stringify(newList));
  console.log(chalk.red('Note removed'));
};
async function changeNote(id, title) {
  const notes = await getNotes();

  for (let i = 0; i < notes.length; i++) {
    if (notes[i].id === id) {
      notes[i].title = title;
    }
  };
  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.blue('Note changed'));
};

module.exports = {
  addNote,
  getNotes,
  removeNote,
  changeNote
};