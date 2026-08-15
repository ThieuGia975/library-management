const express = require("express");

const userController =
    require("../controllers/user.controller");

const authenticate =
    require("../middleware/auth.middleware");

const authorize =
    require("../middleware/role.middleware");

const router = express.Router();

router.post(
    "/",
    authenticate,
    authorize("ADMIN"),
    userController.createUser
);

module.exports = router;