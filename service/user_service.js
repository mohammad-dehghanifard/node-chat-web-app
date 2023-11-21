const users = [];

function joinUser(id,username,room){
    const user = {id,username,room};
    users.push(user);
    return user;
}

function getCurrentUser(id) {
  return users.find(user => user.id === id);
}

module.exports = {
    joinUser,getCurrentUser
}