const express = require("express");

const bookController = require("../controllers/book.controller");
const authenticate = require("../middleware/auth.middleware");

const router = express.Router();

router.post(
    "/",
    authenticate,
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
    bookController.updateBook
);

router.delete(
    "/:id",
    authenticate,
    bookController.deleteBook
);

module.exports = router;