const express = require('express');
const app = express();
const PORT = 3000;
const http = require('http');
const socketio = require('socket.io');
const formatMsg = require('./helper-functions/format.js');
const {
  joinUser,
  joinUser2,
  getCurrUser,
  getCurrUser2,
  leaveUser,
  leaveUser2,
  getUsersInRoom,
  getUsersInRoom2,
} = require('./helper-functions/users.js');

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
    const client = joinUser(socket.id, username, room);
    socket.join(client.room);

    socket.emit('message', formatMsg(APP_NAME, 'Welcome to Real-Chat-App!'));
    socket.broadcast
      .to(client.room)
      .emit(
        'message',
        formatMsg(
          APP_NAME,
          `A new user (${client.username}) has joined the chat, the chat just got more real!`
        )
      );

    io.to(client.room).emit('usersInRoom', {
      room: client.room,
      roomUsers: getUsersInRoom(client.room),
      // roomUsers2: getUsersInRoom2(client.room),
    });
  });

  socket.on('joinRoom2', ({ username2, room2 }) => {
    const client2 = joinUser2(socket.id, username2, room2);
    socket.join(client2.room);

    socket.emit('message2', formatMsg(APP_NAME, 'Welcome to Real-Chat-App!'));
    socket.broadcast
      .to(client2.room)
      .emit(
        'message2',
        formatMsg(
          APP_NAME,
          `A new user (${client2.username}) has joined the chat, the chat just got more real!`
        )
      );

    io.to(client2.room).emit('usersInRoom2', {
      room: client2.room,
      // roomUsers: getUsersInRoom(client2.room),
      roomUsers2: getUsersInRoom2(client2.room),
    });
  });

  socket.on('userMessage', (messageToSend) => {
    const client = getCurrUser(socket.id);
    io.to(client.room).emit(
      'message',
      formatMsg(`${client.username}`, messageToSend)
    );
  });

  socket.on('userMessage2', (messageToSend2) => {
    const client2 = getCurrUser2(socket.id);
    io.to(client2.room).emit(
      'message2',
      formatMsg(`${client2.username}`, messageToSend2)
    );
  });

  //change to be for user 2

  socket.on(
    'leaveInitialRoom',
    ({ username, room, leaveIniitalRoomMessage }) => {
      messageToSend = leaveIniitalRoomMessage;
      io.to(room).emit('message', formatMsg(`${username}`, messageToSend));
      console.log(username, room);
      socket.leave(room);
      client = leaveUser(socket.id);
      io.to(room).emit('usersInRoom', {
        room: client.room,
        roomUsers: getUsersInRoom(room),
      });
    }
  );

  socket.on(
    'leaveSecondaryRoom',
    ({ username2, room2, leaveSecondaryRoomMessage }) => {
      messageToSend = leaveSecondaryRoomMessage;
      io.to(room2).emit('message2', formatMsg(`${username2}`, messageToSend));
      console.log(username2, room2);
      socket.leave(room2);
      client = leaveUser2(socket.id);
      io.to(room2).emit('usersInRoom2', {
        room: room2,
        roomUsers: getUsersInRoom2(room2),
      });
    }
  );

  socket.on('disconnect', () => {
    const client = leaveUser(socket.id);
    if (client) {
      io.to(client.room).emit(
        'message',
        formatMsg(APP_NAME, `A user (${client.username}) has left the chat!`)
      );

      io.to(client.room).emit('usersInRoom', {
        room: client.room,
        roomUsers: getUsersInRoom(client.room),
      });
    }
    const client2 = leaveUser2(socket.id);
    if (client2) {
      io.to(client2.room).emit(
        'message2',
        formatMsg(APP_NAME, `A user (${client2.username}) has left the chat!`)
      );

      io.to(client2.room).emit('usersInRoom2', {
        room: client2.room,
        roomUsers: getUsersInRoom2(client2.room),
      });
    }
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

let user;
let room;
let indexInfo;
let conversePageRooms = indexPageRooms.reverse();

app.get('/converse', (req, res) => {
  indexInfo = { room: room, user: user };
  res.render('converse', { indexInfo, conversePageRooms });
});

app.post('/converse', (req, res) => {
  user = req.body.indexUsername;
  room = req.body.indexSelectRoom;
  indexInfo = { room: room, user: user };
  conversePageRooms = indexPageRooms.reverse();
  res.render('converse', { indexInfo, conversePageRooms });
});

server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
