const express = require('express');
const app = express();
const PORT = 3000;
const http = require('http');
const socketio = require('socket.io');
const formatMsg = require('./helper-functions/format.js');

const APP_NAME = 'Real-Chat-App';

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
  socket.on('joinRoom', ({ username, room }) => {
    socket.emit('message', formatMsg(APP_NAME, 'Welcome to Real-Chat-App!'));
    socket.broadcast.emit(
      'message',
      formatMsg(APP_NAME, 'A new user has joined, the chat just got more real!')
    );
  });

  socket.on('userMessage', (messageToSend) => {
    io.emit('message', formatMsg(`USER Test`, messageToSend));
  });

  socket.on('disconnect', () => {
    io.emit('message', formatMsg(APP_NAME, 'A user has left the chat!'));
  });
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

app.post('/converse', (req, res) => {
  const user = req.body.indexUsername;
  const room = req.body.indexSelectRoom;
  const indexInfo = { room: room, user: user };
  res.render('converse', { indexInfo });
});

server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
