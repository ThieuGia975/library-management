const Book = require("../models/Book");
const User = require("../models/User");
const Borrowing = require("../models/Borrowing");

const getDashboardStats = async () => {

    // Cập nhật các phiếu đã quá hạn
    await Borrowing.updateMany(
        {
            status: "BORROWED",
            dueDate: {
                $lt: new Date()
            }
        },
        {
            $set: {
                status: "OVERDUE"
            }
        }
    );

    // Lấy tất cả đầu sách đang hoạt động
    const books = await Book.find({
        isActive: true
    }).select(
        "quantity availableQuantity"
    );

    // Tổng số đầu sách
    const totalTitles = books.length;

    // Tổng số bản sách
    const totalCopies = books.reduce(
        (total, book) => {
            return total + Number(book.quantity || 0);
        },
        0
    );

    // Tổng số bản sách có sẵn
    const availableCopies = books.reduce(
        (total, book) => {
            return total + Number(
                book.availableQuantity || 0
            );
        },
        0
    );

    // Tổng số bản sách đang được mượn
    const borrowedCopies =
        totalCopies - availableCopies;

    // Tổng số MEMBER
    const totalMembers =
        await User.countDocuments({
            role: "MEMBER",
            isActive: true
        });

    // Tổng số LIBRARIAN
    const totalLibrarians =
        await User.countDocuments({
            role: "LIBRARIAN",
            isActive: true
        });

    // Tổng số lượt mượn
    const totalBorrowings =
        await Borrowing.countDocuments();

    // Số phiếu đang mượn
    const currentlyBorrowed =
        await Borrowing.countDocuments({
            status: "BORROWED"
        });

    // Số phiếu quá hạn
    const overdueBorrowings =
        await Borrowing.countDocuments({
            status: "OVERDUE"
        });

    // Số phiếu đã trả
    const returnedBorrowings =
        await Borrowing.countDocuments({
            status: "RETURNED"
        });

    // Tổng tiền phạt
    const fineResult =
        await Borrowing.aggregate([
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$fine"
                    }
                }
            }
        ]);

    const totalFines =
        fineResult.length > 0
            ? fineResult[0].total
            : 0;

    return {
        totalTitles,
        totalCopies,
        availableCopies,
        borrowedCopies,
        totalMembers,
        totalLibrarians,
        totalBorrowings,
        currentlyBorrowed,
        overdueBorrowings,
        returnedBorrowings,
        totalFines
    };
};

module.exports = {
    getDashboardStats
};