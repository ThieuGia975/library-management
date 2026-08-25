const express = require("express");

const userController =
    require("../controllers/user.controller");

const authenticate =
    require("../middleware/auth.middleware");

const authorize =
    require("../middleware/role.middleware");

const router = express.Router();


// ==========================================
// CREATE USER
// ADMIN ONLY
// ==========================================

router.post(
    "/",
    authenticate,
    authorize("ADMIN"),
    userController.createUser
);


// ==========================================
// GET ALL USERS
// ADMIN ONLY
// ==========================================

router.get(
    "/",
    authenticate,
    authorize("ADMIN"),
    userController.getAllUsers
);


// ==========================================
// LOCK / UNLOCK USER
// ADMIN ONLY
// ==========================================

router.put(
    "/:id/toggle-status",
    authenticate,
    authorize("ADMIN"),
    userController.toggleUserStatus
);


module.exports = router;