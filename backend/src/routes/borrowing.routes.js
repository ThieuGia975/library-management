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

router.get(
    "/",
    authenticate,
    authorize("ADMIN", "LIBRARIAN"),
    borrowingController.getAllBorrowings
);


router.get(
    "/my",
    authenticate,
    authorize("MEMBER"),
    borrowingController.getMyBorrowings
);


router.post(
    "/:id/return",
    authenticate,
    authorize("ADMIN", "LIBRARIAN", "MEMBER"),
    borrowingController.returnBorrowing
);


module.exports = router;