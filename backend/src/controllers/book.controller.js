const bookService = require("../services/book.service");


const createBook = async (req, res) => {

    try {

        const book =
            await bookService.createBook(req.body);

        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};


const getAllBooks = async (req, res) => {

    try {

        const {
            search,
            category,
            author,
            available,
            page,
            limit
        } = req.query;


        const result =
            await bookService.getAllBooks({
                search,
                category,
                author,
                available,
                page,
                limit
            });


        res.status(200).json({

            success: true,

            data: result.books,

            pagination: result.pagination

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


const getBookById = async (req, res) => {

    try {

        const book =
            await bookService.getBookById(
                req.params.id
            );


        res.status(200).json({

            success: true,

            data: book

        });

    } catch (error) {

        res.status(404).json({

            success: false,

            message: error.message

        });

    }

};


const updateBook = async (req, res) => {

    try {

        const book =
            await bookService.updateBook(
                req.params.id,
                req.body
            );


        res.status(200).json({

            success: true,

            message: "Book updated successfully",

            data: book

        });

    } catch (error) {

        res.status(400).json({

            success: false,

            message: error.message

        });

    }

};


const deleteBook = async (req, res) => {

    try {

        const book =
            await bookService.deleteBook(
                req.params.id
            );


        res.status(200).json({

            success: true,

            message: "Book deactivated successfully",

            data: book

        });

    } catch (error) {

        res.status(400).json({

            success: false,

            message: error.message

        });

    }

};


module.exports = {

    createBook,

    getAllBooks,

    getBookById,

    updateBook,

    deleteBook

};