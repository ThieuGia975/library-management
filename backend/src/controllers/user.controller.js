const userService =
    require("../services/user.service");


// ==========================================
// CREATE USER
// ==========================================

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

            message:
                "User created successfully",

            data: user

        });

    } catch (error) {

        res.status(400).json({

            success: false,

            message:
                error.message

        });

    }

};


// ==========================================
// GET ALL USERS
// ==========================================

const getAllUsers = async (req, res) => {

    try {

        const users =
            await userService.getAllUsers();


        res.status(200).json({

            success: true,

            data: users

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message:
                error.message

        });

    }

};


// ==========================================
// TOGGLE USER STATUS
// ==========================================

const toggleUserStatus = async (req, res) => {

    try {

        const { id } = req.params;


        const user =
            await userService.toggleUserStatus(id);


        res.status(200).json({

            success: true,

            message: user.isActive
                ? "User activated successfully"
                : "User deactivated successfully",

            data: user

        });

    } catch (error) {

        res.status(400).json({

            success: false,

            message:
                error.message

        });

    }

};


// ==========================================
// EXPORT
// ==========================================

module.exports = {

    createUser,

    getAllUsers,

    toggleUserStatus

};