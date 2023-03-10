const chalk = require("chalk");
const express = require("express")
const path = require("path");
const app = express();

const { addNote, getNotes, removeNote, changeNote } = require("./notes.controller");

const port = 3000;

app.set('view engine', 'ejs');
app.set('views', 'pages');

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

app.get('/', async (req, res) => {
  await res.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: false
  });
});

app.post('/', async (req, res) => {
  await addNote(req.body.title);
  res.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: true
  });
});

app.delete('/:id', async (req, res) => {

  await removeNote(req.params.id);
  res.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: false
  });
});

app.put('/:id', async (req, res) => {

  await changeNote(req.params.id, req.body.title);
  res.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: false
  });
});

app.listen(port, () => {
  console.log(chalk.green(`Server has been started on ${port}...`));
});