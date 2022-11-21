const express = require('express');
const app = express();
const PORT = 3000;
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
const indexPageRooms = require('./helper-functions/index-page-helper');

app.get('/', (req, res) => {
  res.render('index', { indexPageRooms });
});

app.post('/add-room-to-index', (req, res) => {
  room = req.body.indexCreateRoom;
  indexPageRooms.unshift(room);
  console.log(indexPageRooms);
  res.redirect('/');
});

app.get('/converse', (req, res) => {
  res.render('converse');
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
