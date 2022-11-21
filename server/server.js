const express = require('express');
const app = express();
const PORT = 3000;
const http = require('http');
const socketio = require('socket.io');

app.use(express.static('client'));
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);
const io = socketio(server);

const indexPageRooms = require('./helper-functions/index-page-helper');

//socketio logic for server

io.on('connection', (socket) => {
  console.log('A new client has connected');
});

//routes for express

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

server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
