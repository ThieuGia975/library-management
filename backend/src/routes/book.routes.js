const express = require("express");

const bookController = require("../controllers/book.controller");
const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

const router = express.Router();

router.post(
    "/",
    authenticate,
    authorize("ADMIN", "LIBRARIAN"),
    bookController.createBook
);

router.get(
    "/",
    bookController.getAllBooks
);

router.get(
    "/:id",
    bookController.getBookById
);

router.put(
    "/:id",
    authenticate,
    authorize("ADMIN", "LIBRARIAN"),
    bookController.updateBook
);

router.delete(
    "/:id",
    authenticate,
    authorize("ADMIN", "LIBRARIAN"),
    bookController.deleteBook
);

module.exports = router;