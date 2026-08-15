const Book = require("../models/Book");

const createBook = async (data) => {
    const existingBook = await Book.findOne({
        isbn: data.isbn
    });

    if (existingBook) {
        throw new Error("ISBN already exists");
    }

    const book = await Book.create({
        ...data,
        availableQuantity: data.quantity
    });

    return book;
};

const getAllBooks = async () => {
    return await Book.find({
        isActive: true
    }).sort({
        createdAt: -1
    });
};

const getBookById = async (id) => {
    const book = await Book.findOne({
        _id: id,
        isActive: true
    });

    if (!book) {
        throw new Error("Book not found");
    }

    return book;
};

const updateBook = async (id, data) => {
    const book = await Book.findById(id);

    if (!book) {
        throw new Error("Book not found");
    }

    const updatedBook = await Book.findByIdAndUpdate(
        id,
        data,
        {
            new: true,
            runValidators: true
        }
    );

    return updatedBook;
};

const deleteBook = async (id) => {
    const book = await Book.findById(id);

    if (!book) {
        throw new Error("Book not found");
    }

    book.isActive = false;

    await book.save();

    return book;
};

module.exports = {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook
};