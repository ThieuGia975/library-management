const express = require("express");

const bookController = require("../controllers/book.controller");
const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");
const validate = require("../middleware/validate.middleware");

const { createBookSchema, updateBookSchema} = require("../validators/book.validator");

const router = express.Router();

router.post(
    "/",
    authenticate,
    authorize("ADMIN", "LIBRARIAN"),
    validate(createBookSchema),
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
    validate(updateBookSchema),
    bookController.updateBook
);

router.delete(
    "/:id",
    authenticate,
    authorize("ADMIN", "LIBRARIAN"),
    bookController.deleteBook
);

module.exports = router;