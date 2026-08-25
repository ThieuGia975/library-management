const borrowingService = require("../services/borrowing.service");


// ===============================
// CREATE BORROWING
// ===============================
const createBorrowing = async (req, res) => {
    try {

         const borrowing = await borrowingService.createBorrowing({
                userId: req.user.userId,
                bookId: req.body.bookId
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


// ===============================
// GET ALL BORROWINGS
// ===============================
const getAllBorrowings = async (req, res) => {
    try {

        // Cập nhật các phiếu đã quá hạn
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


// ===============================
// RETURN BORROWING
// ===============================
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


// ===============================
// GET MY BORROWINGS
// ===============================
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

        res.status(400).json({
            success: false,
            message: error.message
        });

    }
};


module.exports = {
    createBorrowing,
    getAllBorrowings,
    returnBorrowing,
    getMyBorrowings
};