const authService = require("../services/auth.service");

const register = async (req, res) => {
    try {
        const user = await authService.register(req.body);

        res.status(201).json({
            success: true,
            message: "Registration successful",
            data: user
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const login = async (req, res) => {
    try {
        const result = await authService.login(req.body);

        res.status(200).json({
            success: true,
            message: "Login successful",
            data: result
        });
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message
        });
    }
};

const me = async (req, res) => {
    try {
        const user = await authService.getCurrentUser(
            req.user.userId
        );

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    register,
    login,
    me
};