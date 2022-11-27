const sendMessageForm = document.querySelector('#send-message-form');
const messagesContainer = document.querySelector('#mainMessagesContainer');
const username = document.getElementById('username').textContent;
const room = document.getElementById('room').textContent;
const listUsers = document.getElementById('listUsers');

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
  listUsers.innerHTML = '';
  roomUsers.forEach((user) => {
    const userListItem = document.createElement('li');
    userListItem.textContent = `${user.username}`;
    listUsers.append(userListItem);
  });
};
