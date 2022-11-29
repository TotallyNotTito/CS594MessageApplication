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

const getCurrUser = (id) => {
  const currentUser = usersArray.find((user) => user.id === id);
  return currentUser;
};

const leaveUser = (id) => {
  const index = usersArray.findIndex((user) => user.id === id);

  if (index !== -1) {
    return usersArray.splice(index, 1)[0];
  }
};

const getUsersInRoom = (room) => {
  return usersArray.filter((user) => user.room === room);
};

//additional room

const usersArray2 = [];

const joinUser2 = (id, username, room) => {
  const userObject2 = {
    id: id,
    username: username,
    room: room,
  };
  usersArray2.push(userObject2);
  return userObject2;
};

const getCurrUser2 = (id) => {
  const currentUser2 = usersArray2.find((user) => user.id === id);
  return currentUser2;
};

const leaveUser2 = (id) => {
  const index2 = usersArray2.findIndex((user) => user.id === id);

  if (index2 !== -1) {
    return usersArray2.splice(index2, 1)[0];
  }
};

const getUsersInRoom2 = (room) => {
  return usersArray2.filter((user) => user.room === room);
};

module.exports = {
  joinUser,
  getCurrUser,
  leaveUser,
  getUsersInRoom,
  joinUser2,
  getCurrUser2,
  leaveUser2,
  getUsersInRoom2,
};
