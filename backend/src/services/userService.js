const fs = require("fs/promises");
const path = require("path");

const usersFilePath = path.join(__dirname, "../../data/users.json");

// Uncomment for 505 Test and comment the filePath above
// const usersFilePath = path.join(__dirname, "../../data/does-not-exist.json");

const getUsers = async () => {
  const data = await fs.readFile(usersFilePath, "utf-8");
  return JSON.parse(data);
};

const saveUsers = async (users) => {
  await fs.writeFile(
    usersFilePath,
    JSON.stringify(users, null, 2)
  );
};

const getUserById = async (id) => {
  const users = await getUsers();

  return users.find((user) => user.id === id);
};

const createUser = async ({ name, username, email }) => {
  const users = await getUsers();

  const newUser = {
    id: users.length > 0
      ? Math.max(...users.map((user) => user.id)) + 1
      : 1,
    name,
    username,
    email
  };

  users.push(newUser);

  await saveUsers(users);

  return newUser;
};

const updateUser = async (id, { name, username, email }) => {
  const users = await getUsers();

  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return null;
  }

  users[userIndex] = {
    id,
    name,
    username,
    email
  };

  await saveUsers(users);

  return users[userIndex];
};

const deleteUser = async (id) => {
  const users = await getUsers();

  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return null;
  }

  const deletedUser = users[userIndex];

  users.splice(userIndex, 1);

  await saveUsers(users);

  return deletedUser;
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};