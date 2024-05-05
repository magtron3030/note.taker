const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// const nanoid = require('./helpers/nanoid');
// import {nanoid} from 'nanoid';
// const id = nanoid(length).toString();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
// app.use("/", routes)


app.get('/api/notes', (req, res) => {
  let allNotes = fs.readFileSync(path.join(__dirname, "./db/db.json"))
  // console.log(allNotes)
  allNotes = JSON.parse(allNotes)
  // console.log(allNotes)
  res.json(allNotes)
})
 




app.post('/api/notes', (req, res) => {
  let allNotes = fs.readFileSync(path.join(__dirname, "./db/db.json"))
  allNotes = JSON.parse(allNotes)
 
  let newNote = {
    title: req.body.title,
    text: req.body.text,
    id: uuidv4()
  };

  allNotes.push(newNote);
  fs.writeFileSync(path.join(__dirname, "./db/db.json"), JSON.stringify(allNotes))
  // allNotes = JSON.parse(allNotes)
  res.json(allNotes)
})



// DELETE route to delete a note by ID
app.delete('/api/notes/:id', (req, res) => {
  let allNotes = fs.readFileSync(path.join(__dirname, "./db/db.json"))
  allNotes = JSON.parse(allNotes)
  
  const noteId = req.params.id;

  // Find the index of the note with the specified ID
  const index = allNotes.findIndex(note => note.id === noteId);

  if (index !== -1) {
    // Remove the note from the array
    allNotes.splice(index, 1);

    // Update the db.json file
    fs.writeFileSync(path.join(__dirname, "./db/db.json"), JSON.stringify(allNotes));

    res.json({ message: 'Note deleted successfully' });
  } else {
    res.status(404).json({ error: 'Note not found' });
  }
});



// DELETE /api/notes/:id should receive a query parameter that contains the id of a note to delete. To delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.






app.get('/notes', (req, res) => {
   res.sendFile(path.join(__dirname, './public/notes.html'))
 });

 app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
});
 
 app.get('*', (req, res) =>
   res.sendFile(path.join(__dirname, './public/index.html'))
 );


 app.listen(PORT, () => {
  console.log(`Express listening at http://localhost:${PORT}`)
})

