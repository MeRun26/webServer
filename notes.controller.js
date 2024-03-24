const fs = require('fs/promises');
const path = require('path');
const chalk = require('chalk');

const notesPath = path.join(__dirname, 'db.json');

async function addNote(title) {
  const notes = await getNotes();
  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);

  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.bgGreen('Note was added!'));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: 'utf-8' });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
  const notes = await getNotes();
  return notes.map((note) => `${chalk.blue(note.id)} ${note.title}`).join('\n');
}

async function removeNote(id) {
  const notes = await getNotes();
  const filteredNotes = notes.filter((note) => note.id !== id);

  if (filteredNotes.length !== notes.length) {
    await fs.writeFile(notesPath, JSON.stringify(filteredNotes));
    console.log(chalk.red(`Note with id="${id}" has been removed.`));
  } else {
    console.log(chalk.bgYellow('Note with this ID not found!'));
  }
}

async function editNote(id, newTitle) {
  const notes = await getNotes();
  const updatedNotes = notes.map((note) => {
    if (note.id === id) {
      return { ...note, title: newTitle };
    }
    return note;
  });

  await fs.writeFile(notesPath, JSON.stringify(updatedNotes));
  console.log(chalk.bgGreen(`Note with id="${id}" has been edited.`));
  return updatedNotes;
}

module.exports = {
  addNote,
  getNotes,
  printNotes,
  removeNote,
  editNote,
};
