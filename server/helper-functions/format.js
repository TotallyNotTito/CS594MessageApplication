const moment = require('moment');

const formatMsg = (username, messageText) => {
  const messageObject = {
    username: username,
    messageText: messageText,
    time: moment().format('h:mm a'),
  };
  return messageObject;
};

module.exports = formatMsg;
