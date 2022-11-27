const usersArray = [];

const joinUser = (id, username, room) => {
  const userObject = {
    id: id,
    username: username,
    room: room,
  };
  usersArray.push(userObject);
  return userObject;
};

const getCurrentUser = (id) => {
  const currentUser = usersArray.find((user) => user.id === id);
};

module.exports = { joinUser, getCurrentUser };
