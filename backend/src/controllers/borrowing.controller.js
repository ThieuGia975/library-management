const borrowingService = require("../services/borrowing.service");

const createBorrowing = async (req, res) => {
    try {
        const borrowing = await borrowingService.createBorrowing({
            userId: req.user.userId,
            bookId: req.body.bookId,
            dueDate: req.body.dueDate
        });

        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: borrowing
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const getAllBorrowings = async (req, res) => {
    try {

        await borrowingService.updateOverdueBorrowings();

        const borrowings =
            await borrowingService.getAllBorrowings();

        res.status(200).json({
            success: true,
            data: borrowings
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


const returnBorrowing = async (req, res) => {
    try {

        const borrowing =
            await borrowingService.returnBorrowing(
                req.params.id,
                req.user
            );

        res.status(200).json({
            success: true,
            message: "Book returned successfully",
            data: borrowing
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }
};

const getMyBorrowings = async (req, res) => {
    try {

        const borrowings =
            await borrowingService.getMyBorrowings(
                req.user.userId
            );

        res.status(200).json({
            success: true,
            data: borrowings
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    await updateOverdueBorrowings();

    return await Borrowing.find({
        user: userId
    })
        .populate(
            "book",
            "title author isbn category coverImage"
        )
        .sort({
            createdAt: -1
        });

    }
};


module.exports = {
    createBorrowing,
    getAllBorrowings,
    returnBorrowing,
    getMyBorrowings
};