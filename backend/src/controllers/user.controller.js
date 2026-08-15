const userService = require("../services/user.service");

const createUser = async (req, res) => {
    try {

        const {
            fullName,
            email,
            password,
            phone,
            role
        } = req.body;

        const user =
            await userService.createUser({
                fullName,
                email,
                password,
                phone,
                role
            });

        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: user
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    createUser
};