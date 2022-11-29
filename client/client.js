const sendMessageForm = document.querySelector('#send-message-form');
const messagesContainer = document.querySelector('#mainMessagesContainer');
const username = document.getElementById('username').textContent;
const room = document.getElementById('room').textContent;
const listUsers = document.getElementById('listUsers');

const additionalRoomForm = document.getElementById('additionalRoomForm');

const leaveInitialRoomBtn = document.querySelector('#leaveInitialRoomBtn');

let leaveSecondaryRoomBtn;

leaveInitialRoomBtn.addEventListener('click', () => {
  let leaveIniitalRoomMessage = `${username} has left the chatroom`;
  socket.emit('leaveInitialRoom', { username, room, leaveIniitalRoomMessage });
  document.getElementById('initialRoomContainer').style.display = 'none';
});

const socket = io();

socket.emit('joinRoom', { username, room });

socket.on('usersInRoom', ({ users, roomUsers }) => {
  displayUsers(roomUsers);
});

socket.on('message', (message) => {
  console.log(message);
  addMessageToDOM(message);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
});

const addMessageToDOM = (message) => {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message');
  const nameTimeInfo = document.createElement('p');
  nameTimeInfo.classList.add('name-time-info');
  const timeOfMessageSpan = document.createElement('span');
  timeOfMessageSpan.innerHTML = `${message.time}`;
  nameTimeInfo.innerHTML = `${message.username}: `;
  nameTimeInfo.append(timeOfMessageSpan);
  const paraMessage = document.createElement('p');
  paraMessage.classList.add('message-text');
  paraMessage.innerHTML = `${message.messageText}`;
  msgDiv.append(nameTimeInfo, paraMessage);
  document.querySelector('.messages-container').append(msgDiv);
};

const handleSendMessageFormSubmission = (event) => {
  event.preventDefault();
  const messageToSend = sendMessageForm.elements.messageToSend.value;
  socket.emit('userMessage', messageToSend);
  sendMessageForm.elements.messageToSend.value = '';
  sendMessageForm.elements.messageToSend.focus();
};

sendMessageForm.addEventListener('submit', handleSendMessageFormSubmission);

const displayUsers = (roomUsers) => {
  if (listUsers !== undefined) {
    listUsers.innerHTML = '';
    roomUsers.forEach((user) => {
      const userListItem = document.createElement('li');
      userListItem.textContent = `${user.username}`;
      listUsers.append(userListItem);
    });
  }
};

socket.on('userLeftRoomMessage', (leftMessage) => {
  console.log(leftMessage);
  addMessageToDOM(message);

  const lmsgDiv = document.createElement('div');
  msgDiv.classList.add('message');
  const nameTimeInfo = document.createElement('p');
  nameTimeInfo.classList.add('name-time-info');
  const timeOfMessageSpan = document.createElement('span');
  timeOfMessageSpan.innerHTML = `${message.time}`;
  nameTimeInfo.innerHTML = `${message.username}: `;
  nameTimeInfo.append(timeOfMessageSpan);
  const paraMessage = document.createElement('p');
  paraMessage.classList.add('message-text');
  paraMessage.innerHTML = `${message.messageText}`;
  msgDiv.append(nameTimeInfo, paraMessage);
  document.querySelector('.messages-container').append(msgDiv);

  messagesContainer.scrollTop = messagesContainer.scrollHeight;
});

//additonal room

let sendMessageForm2;
let messagesContainer2;
const username2 = username;
// const room2 = document.getElementById('room').textContent;
let listUsers2;

let room2 = 'example';

additionalRoomForm.addEventListener('submit', (event) => {
  event.preventDefault();
  room2 = additionalRoomForm.elements.additionalSelectRoom.value;
  console.log(room2);
  socket.emit('joinRoom2', { username2, room2 });
  buildAdditionalRoomContainer();
  listUsers2 = document.getElementById('listUsers2');
  leaveSecondaryRoomBtn = document.getElementById('leaveSecondaryRoomBtn');
  document.getElementById('additionalFormContainer').style.display = 'none';
  messagesContainer2 = document.querySelector('#mainMessagesContainer2');
  sendMessageForm2 = document.querySelector('#send-message-form2');
  sendMessageForm2.addEventListener('submit', handleSendMessageFormSubmission2);
  leaveSecondaryRoomBtn.addEventListener('click', () => {
    let leaveSecondaryRoomMessage = `${username} has left the chatroom`;
    socket.emit('leaveSecondaryRoom', {
      username2,
      room2,
      leaveSecondaryRoomMessage,
    });
    document.getElementById('parent-messages-container2').style.display =
      'none';
  });
});

socket.on('usersInRoom2', ({ users, roomUsers2 }) => {
  displayUsers2(roomUsers2);
});

const buildAdditionalRoomContainer = () => {
  secondRoomContainer = document.getElementById('parent-messages-container2');
  secondRoomContainer.classList.add('roomContainer2');

  secondRoomContainer.innerHTML = `
  <div id="secondRoom">
        <div>User (You): <span id="username2">${username2}</span></div>
        <div>
          Current Chat Room: <span id="room2">${room2}</span>
          <button id="leaveSecondaryRoomBtn">Leave Room</button>
        </div>
      </div>

      <div>
        Users In Current Room:
        <ul id="listUsers2"></ul>
      </div>
  
  <div class="messages-container2" id="mainMessagesContainer2"></div>
  <div class="send-message-container2">
    <form id="send-message-form2">
      <label for="messageToSend2">Enter Message: </label>
      <input
        id="messageToSend2"
        type="text"
        required
        autocomplete="off"
      />
      <input type="submit" value="Send Message" />
    </form>
  </div>`;
};

//

// socket.emit('joinRoom2', { username2, room2 });

// socket.on('usersInRoom2', ({ users, roomUsers2 }) => {
//   console.log(roomUsers2);
//   displayUsers2(roomUsers2);
// });

socket.on('message2', (message2) => {
  console.log('The second message');
  console.log(message2);
  addMessageToDOM2(message2);
  messagesContainer2.scrollTop = messagesContainer2.scrollHeight;
});

const addMessageToDOM2 = (message2) => {
  const msgDiv2 = document.createElement('div');
  msgDiv2.classList.add('message2');
  const nameTimeInfo2 = document.createElement('p');
  nameTimeInfo2.classList.add('name-time-info2');
  const timeOfMessageSpan2 = document.createElement('span');
  timeOfMessageSpan2.innerHTML = `${message2.time}`;
  nameTimeInfo2.innerHTML = `${message2.username}: `;
  nameTimeInfo2.append(timeOfMessageSpan2);
  const paraMessage2 = document.createElement('p');
  paraMessage2.classList.add('message-text2');
  paraMessage2.innerHTML = `${message2.messageText}`;
  msgDiv2.append(nameTimeInfo2, paraMessage2);
  document.querySelector('.messages-container2').append(msgDiv2);
};

const handleSendMessageFormSubmission2 = (event) => {
  event.preventDefault();
  const messageToSend2 = sendMessageForm2.elements.messageToSend2.value;
  socket.emit('userMessage2', messageToSend2);
  sendMessageForm2.elements.messageToSend2.value = '';
  sendMessageForm2.elements.messageToSend2.focus();
};

// sendMessageForm2.addEventListener('submit', handleSendMessageFormSubmission2);

const displayUsers2 = (roomUsers2) => {
  console.log('users in additional room');
  console.log(roomUsers2);
  if (listUsers2 !== undefined) {
    listUsers2.innerHTML = '';
    roomUsers2.forEach((user) => {
      const userListItem2 = document.createElement('li');
      userListItem2.textContent = `${user.username}`;
      listUsers2.append(userListItem2);
    });
  }
};

socket.on('userLeftRoomMessage2', (leftMessage2) => {
  console.log(leftMessage2);
  addMessageToDOM(message2);

  const lmsgDiv2 = document.createElement('div');
  lmsgDiv2.classList.add('message');
  const nameTimeInfo2 = document.createElement('p');
  nameTimeInfo2.classList.add('name-time-info2');
  const timeOfMessageSpan2 = document.createElement('span');
  timeOfMessageSpan2.innerHTML = `${message2.time}`;
  nameTimeInfo2.innerHTML = `${message2.username}: `;
  nameTimeInfo2.append(timeOfMessageSpan2);
  const paraMessage2 = document.createElement('p');
  paraMessage2.classList.add('message-text');
  paraMessage2.innerHTML = `${message.messageText}`;
  lmsgDiv2.append(nameTimeInfo, paraMessage);
  document.querySelector('.messages-container2').append(msgDiv);

  messagesContainer2.scrollTop = messagesContainer2.scrollHeight;
});
