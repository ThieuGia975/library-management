const User = require("../models/User");
const Book = require("../models/Book");
const Borrowing = require("../models/Borrowing");
const borrowingService = require("./borrowing.service");
const getStats = async () => {
await borrowingService.updateOverdueBorrowings();
    const [
        totalBooks,
        totalMembers,
        totalLibrarians,
        totalBorrowings,
        currentlyBorrowed,
        overdueBorrowings,
        returnedBorrowings,
        fineResult
    ] = await Promise.all([

        // Tổng số sách
        Book.countDocuments({
            isActive: true
        }),

        // Tổng MEMBER
        User.countDocuments({
            role: "MEMBER",
            isActive: true
        }),

        // Tổng LIBRARIAN
        User.countDocuments({
            role: "LIBRARIAN",
            isActive: true
        }),

        // Tổng phiếu mượn
        Borrowing.countDocuments(),

        // Đang mượn
        Borrowing.countDocuments({
            status: "BORROWED"
        }),

        // Quá hạn
        Borrowing.countDocuments({
            status: "OVERDUE"
        }),

        // Đã trả
        Borrowing.countDocuments({
            status: "RETURNED"
        }),

        // Tổng tiền phạt
        Borrowing.aggregate([
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$fine"
                    }
                }
            }
        ])
    ]);

    return {
        totalBooks,
        totalMembers,
        totalLibrarians,
        totalBorrowings,
        currentlyBorrowed,
        overdueBorrowings,
        returnedBorrowings,
        totalFines:
            fineResult[0]?.total || 0
    };
};

module.exports = {
    getStats
};