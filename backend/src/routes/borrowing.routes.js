const express = require("express");

const borrowingController = require("../controllers/borrowing.controller");
const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

const router = express.Router();

// Tạo phiếu mượn
router.post(
    "/",
    authenticate,
    authorize("ADMIN", "LIBRARIAN", "MEMBER"),
    borrowingController.createBorrowing
);

// Lấy tất cả phiếu mượn
// ADMIN và LIBRARIAN được phép
router.get(
    "/",
    authenticate,
    authorize("ADMIN", "LIBRARIAN"),
    borrowingController.getAllBorrowings
);

// Lấy phiếu mượn của chính MEMBER
router.get(
    "/my",
    authenticate,
    authorize("MEMBER"),
    borrowingController.getMyBorrowings
);

// Trả sách
router.post(
    "/:id/return",
    authenticate,
    authorize("ADMIN", "LIBRARIAN", "MEMBER"),
    borrowingController.returnBorrowing
);

module.exports = router;
