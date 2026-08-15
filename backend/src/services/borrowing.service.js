const Borrowing = require("../models/Borrowing");
const User = require("../models/User");
const Book = require("../models/Book");

const createBorrowing = async ({
    userId,
    bookId,
    dueDate
}) => {

    // 1. Kiểm tra User
    const user = await User.findOne({
        _id: userId,
        isActive: true
    });

    if (!user) {
        throw new Error("User not found");
    }

    // 2. Kiểm tra Book
    const book = await Book.findOne({
        _id: bookId,
        isActive: true
    });

    if (!book) {
        throw new Error("Book not found");
    }

    // 3. Kiểm tra sách còn không
    if (book.availableQuantity <= 0) {
        throw new Error("Book is not available");
    }

    // 4. Kiểm tra user đã mượn sách này chưa
    const existingBorrowing = await Borrowing.findOne({
        user: userId,
        book: bookId,
        status: {
            $in: ["BORROWED", "OVERDUE"]
        }
    });

    if (existingBorrowing) {
        throw new Error(
            "You have already borrowed this book"
        );
    }

    // 5. Tạo Borrowing
    const borrowing = await Borrowing.create({
        user: userId,
        book: bookId,
        dueDate
    });

    // 6. Giảm số lượng sách có thể mượn
    book.availableQuantity -= 1;

    await book.save();

    // 7. Trả về thông tin đầy đủ
    return await Borrowing.findById(
        borrowing._id
    )
        .populate(
            "user",
            "fullName email role"
        )
        .populate(
            "book",
            "title author isbn category"
        );
};

module.exports = {
    createBorrowing
};