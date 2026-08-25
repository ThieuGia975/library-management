const bcrypt = require("bcryptjs");
const User = require("../models/User");


// ==========================================
// CREATE USER
// ==========================================

const createUser = async ({
    fullName,
    email,
    password,
    phone,
    role
}) => {

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error("Email already exists");
    }

    const allowedRoles = [
        "MEMBER",
        "LIBRARIAN"
    ];

    if (!allowedRoles.includes(role)) {
        throw new Error(
            "Invalid role. Only MEMBER or LIBRARIAN can be created"
        );
    }

    const hashedPassword = await bcrypt.hash(
        password,
        10
    );

    const user = await User.create({
        fullName,
        email,
        password: hashedPassword,
        phone,
        role
    });

    return {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isActive: user.isActive
    };
};


// ==========================================
// GET ALL USERS
// ==========================================

const getAllUsers = async () => {

    const users = await User.find()
        .select("-password")
        .sort({ createdAt: -1 });

    return users;
};


// ==========================================
// TOGGLE USER STATUS
// KHÓA / MỞ KHÓA TÀI KHOẢN
// ==========================================


const toggleUserStatus = async (userId) => {

    const user =
        await User.findById(userId);


    if (!user) {

        throw new Error(
            "User not found"
        );

    }


    // Không cho khóa ADMIN
    if (user.role === "ADMIN") {

        throw new Error(
            "Cannot lock or unlock ADMIN account"
        );

    }


    user.isActive =
        !user.isActive;


    await user.save();


    return {

        id: user._id,

        fullName: user.fullName,

        email: user.email,

        phone: user.phone,

        role: user.role,

        isActive: user.isActive

    };

};


module.exports = {
    createUser,
    getAllUsers,
    toggleUserStatus
};