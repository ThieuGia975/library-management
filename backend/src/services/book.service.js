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

const updateBook = async (bookId, data) => {

    const book = await Book.findById(bookId);

    if (!book) {
        throw new Error("Book not found");
    }

    // =========================
    // CHECK ISBN
    // =========================

    if (data.isbn !== undefined) {

        const existingBook = await Book.findOne({
            isbn: data.isbn,
            _id: { $ne: bookId }
        });

        if (existingBook) {
            throw new Error("ISBN already exists");
        }

        book.isbn = data.isbn;
    }


    // =========================
    // UPDATE QUANTITY
    // =========================

    if (data.quantity !== undefined) {

        const newQuantity = Number(data.quantity);

        if (
            !Number.isInteger(newQuantity) ||
            newQuantity < 0
        ) {
            throw new Error(
                "Quantity must be a non-negative integer"
            );
        }

        // Số sách hiện đang được mượn
        const borrowedQuantity =
            book.quantity - book.availableQuantity;


        // Không được giảm tổng số sách
        // xuống thấp hơn số đang được mượn
        if (newQuantity < borrowedQuantity) {

            throw new Error(
                `Quantity cannot be less than borrowed quantity (${borrowedQuantity})`
            );
        }


        book.quantity = newQuantity;

        book.availableQuantity =
            newQuantity - borrowedQuantity;
    }


    // =========================
    // UPDATE OTHER FIELDS
    // =========================

    if (data.title !== undefined) {
        book.title = data.title;
    }

    if (data.author !== undefined) {
        book.author = data.author;
    }

    if (data.category !== undefined) {
        book.category = data.category;
    }

    if (data.publisher !== undefined) {
        book.publisher = data.publisher;
    }

    if (data.publishedYear !== undefined) {
        book.publishedYear = data.publishedYear;
    }

    if (data.description !== undefined) {
        book.description = data.description;
    }

    if (data.coverImage !== undefined) {
        book.coverImage = data.coverImage;
    }


    return await book.save();
};

const deleteBook = async (bookId) => {

    const book = await Book.findById(bookId);

    if (!book) {
        throw new Error("Book not found");
    }

    if (!book.isActive) {
        throw new Error("Book is already inactive");
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