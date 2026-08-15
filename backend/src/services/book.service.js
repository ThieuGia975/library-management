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

const getAllBooks = async ({
    search,
    category,
    author,
    available,
    page = 1,
    limit = 10
}) => {

    const query = {
        isActive: true
    };

    // Search
    if (search) {
        query.$or = [
            {
                title: {
                    $regex: search,
                    $options: "i"
                }
            },
            {
                author: {
                    $regex: search,
                    $options: "i"
                }
            },
            {
                isbn: {
                    $regex: search,
                    $options: "i"
                }
            },
            {
                category: {
                    $regex: search,
                    $options: "i"
                }
            }
        ];
    }

    // Category
    if (category) {
        query.category = {
            $regex: category,
            $options: "i"
        };
    }

    // Author
    if (author) {
        query.author = {
            $regex: author,
            $options: "i"
        };
    }

    // Availability
    if (available === "true") {
        query.availableQuantity = {
            $gt: 0
        };
    }

    const pageNumber = Math.max(
        Number(page),
        1
    );

    const limitNumber = Math.min(
        Math.max(Number(limit), 1),
        50
    );

    const skip =
        (pageNumber - 1) * limitNumber;

    const [books, total] =
        await Promise.all([
            Book.find(query)
                .sort({
                    createdAt: -1
                })
                .skip(skip)
                .limit(limitNumber),

            Book.countDocuments(query)
        ]);

    return {
        books,
        pagination: {
            page: pageNumber,
            limit: limitNumber,
            total,
            totalPages: Math.ceil(
                total / limitNumber
            )
        }
    };
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