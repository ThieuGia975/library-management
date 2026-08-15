const Borrowing = require("../models/Borrowing");
const User = require("../models/User");
const Book = require("../models/Book");

const createBorrowing = async ({
    userId,
    bookId
}) => {

    const user = await User.findOne({
        _id: userId,
        isActive: true
    });

    if (!user) {
        throw new Error("User not found");
    }

    const book = await Book.findOne({
        _id: bookId,
        isActive: true
    });

    if (!book) {
        throw new Error("Book not found");
    }

    if (book.availableQuantity <= 0) {
        throw new Error("Book is not available");
    }

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

    // Ngày mượn
    const borrowDate = new Date();

    // Hạn trả: 7 ngày kể từ ngày mượn
    const dueDate = new Date(borrowDate);

    dueDate.setDate(
        dueDate.getDate() + 7
    );

    const borrowing = await Borrowing.create({
        user: userId,
        book: bookId,
        borrowDate,
        dueDate,
        status: "BORROWED"
    });

    // Giảm số sách có thể mượn
    book.availableQuantity -= 1;

    await book.save();

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


const getAllBorrowings = async () => {

    return await Borrowing.find()
        .populate(
            "user",
            "fullName email role"
        )
        .populate(
            "book",
            "title author isbn category"
        )
        .sort({
            createdAt: -1
        });
};

const returnBorrowing = async (
    borrowingId,
    currentUser
) => {

    // 1. Tìm borrowing
    const borrowing = await Borrowing.findById(
        borrowingId
    );

    if (!borrowing) {
        throw new Error("Borrowing not found");
    }

    // 2. MEMBER chỉ được trả sách của mình
    if (
        currentUser.role === "MEMBER" &&
        borrowing.user.toString() !== currentUser.userId
    ) {
        throw new Error(
            "You can only return your own borrowing"
        );
    }

    // 3. Kiểm tra đã trả chưa
    if (borrowing.status === "RETURNED") {
        throw new Error(
            "This book has already been returned"
        );
    }

    // 4. Tìm book
    const book = await Book.findById(
        borrowing.book
    );

    if (!book) {
        throw new Error("Book not found");
    }

    // 5. Ngày trả
    const returnDate = new Date();

    // 6. Tính tiền phạt
   let fine = 0;

    if (returnDate > borrowing.dueDate) {

      /*  const diffTime =
            returnDate.getTime() -
            borrowing.dueDate.getTime();

        const overdueDays = Math.ceil(
            diffTime /
            (1000 * 60 * 60 * 24)
        ); */
        const dueDate = new Date(borrowing.dueDate);
        const returnDate = new Date();

        dueDate.setHours(0, 0, 0, 0);
        returnDate.setHours(0, 0, 0, 0);

        const diffTime =
            returnDate.getTime() -
            dueDate.getTime();

        const overdueDays = Math.max(
            0,
            Math.floor(
                diffTime /
                (1000 * 60 * 60 * 24)
            )
        );

//
        const finePerDay =
            Number(process.env.FINE_PER_DAY || 10000);

        fine = overdueDays * finePerDay;
    }

    // 7. Cập nhật borrowing
    borrowing.returnDate = returnDate;
    borrowing.status = "RETURNED";
    borrowing.fine = fine;

    await borrowing.save();

    // 8. Tăng số lượng sách có thể mượn
    book.availableQuantity += 1;

    await book.save();

    // 9. Trả dữ liệu
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

const getMyBorrowings = async (userId) => {
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
};

const updateOverdueBorrowings = async () => {

    const now = new Date();

    const result =
        await Borrowing.updateMany(
            {
                status: "BORROWED",
                dueDate: {
                    $lt: now
                }
            },
            {
                $set: {
                    status: "OVERDUE"
                }
            }
        );

    return result;
};


module.exports = {
    createBorrowing,
    getAllBorrowings,
    returnBorrowing,
    getMyBorrowings,
    updateOverdueBorrowings
};