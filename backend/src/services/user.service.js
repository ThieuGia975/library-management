const bcrypt = require("bcryptjs");

const User = require("../models/User");

const createUser = async ({
    fullName,
    email,
    password,
    phone,
    role
}) => {

    // 1. Kiểm tra email
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error("Email already exists");
    }

    // 2. Kiểm tra role hợp lệ
    const allowedRoles = [
        "MEMBER",
        "LIBRARIAN"
    ];

    if (!allowedRoles.includes(role)) {
        throw new Error(
            "Invalid role. Only MEMBER or LIBRARIAN can be created"
        );
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(
        password,
        10
    );

    // 4. Tạo user
    const user = await User.create({
        fullName,
        email,
        password: hashedPassword,
        phone,
        role
    });

    // 5. Không trả password
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
    createUser
};