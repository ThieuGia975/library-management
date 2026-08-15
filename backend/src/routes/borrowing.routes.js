const express = require("express");

const borrowingController = require("../controllers/borrowing.controller");
const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

const router = express.Router();

router.post(
    "/",
    authenticate,
    authorize("ADMIN", "LIBRARIAN", "MEMBER"),
    borrowingController.createBorrowing
);

module.exports = router;