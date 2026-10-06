const userService = require("../services/userService");

const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();

    res.json(users);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to read users"
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = Number(req.params.id);
    const user = await userService.getUserById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json(user);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to read user"
    });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, username, email } = req.body;

    if (!name || !username || !email) {
      return res.status(400).json({
        message: "Name, username, and email are required"
      });
    }

    const user = await userService.createUser({
      name,
      username,
      email
    });

    res.status(201).json(user);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create user"
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = Number(req.params.id);
    const { name, username, email } = req.body;

    if (!name || !username || !email) {
      return res.status(400).json({
        message: "Name, username, and email are required"
      });
    }

    const user = await userService.updateUser(userId, {
      name,
      username,
      email
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json(user);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update user"
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = Number(req.params.id);
    const user = await userService.deleteUser(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json({
      message: "User deleted successfully",
      user
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete user"
    });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};