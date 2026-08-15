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

module.exports = {
    createBorrowing
};