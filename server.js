const express = require('express');
const path = require('path');
const fs = require('fs');
// const { all } = require('../../inclass/mini-project-2-express-solved/lesson-11b/routes');
// modular routing starts here
// const routes = require("./routes")

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
// app.use("/", routes)


app.get('/api/notes', (req, res) => {
  let allNotes = fs.readFileSync(path.join(__dirname, "./db/db.json"))
  console.log(allNotes)
  allNotes = JSON.parse(allNotes)
  console.log(allNotes)
  res.json(allNotes)
})

app.post('/api/notes', (req, res) => {
  let allNotes = fs.readFileSync(path.join(__dirname, "./db/db.json"))
  allNotes = JSON.parse(allNotes)
  allNotes.push(req.body)
  fs.writeFileSync(path.join(__dirname, "./db/db.json"), JSON.stringify(allNotes))
  allNotes = JSON.parse(allNotes)
  res.json(allNotes)
})








app.delete('/:id', (req, res) => res.json(`DELETE route`));
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

