const userService = require("../services/userService");
const { userSchema } = require("../schemas/userSchema");

const getUsers = async (req, res) => {
    try {
        const users = await userService.getUsers();

        res.json(users);
    } catch (error) {
        next(error);
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
        next(error);
    }
};

const createUser = async (req, res) => {
    try {
        const result = userSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                message: "Invalid user data",
                errors: result.error.flatten().fieldErrors
            });
        }

        const user = await userService.createUser(result.data);

        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

const updateUser = async (req, res) => {
    try {
        const userId = Number(req.params.id);

        const result = userSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                message: "Invalid user data",
                errors: result.error.flatten().fieldErrors
            });
        }

        const user = await userService.updateUser(userId, result.data);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json(user);
    } catch (error) {
        next(error);
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
        next(error);
    }
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};