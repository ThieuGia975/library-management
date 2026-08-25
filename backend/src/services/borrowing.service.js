const Borrowing = require("../models/Borrowing");
const User = require("../models/User");
const Book = require("../models/Book");

/**
 * Tạo phiếu mượn sách
 *
 * Quy tắc:
 * - User phải tồn tại và đang hoạt động.
 * - Book phải tồn tại và đang hoạt động.
 * - Sách phải còn số lượng.
 * - Một user không được mượn cùng một sách
 *   khi phiếu cũ vẫn BORROWED hoặc OVERDUE.
 * - Thời hạn mượn mặc định là 7 ngày.
 */
const createBorrowing = async ({
    userId,
    bookId
}) => {

    // =========================
    // 1. KIỂM TRA USER
    // =========================

    const user = await User.findOne({
        _id: userId,
        isActive: true
    });

    if (!user) {
        throw new Error("User not found");
    }


    // =========================
    // 2. KIỂM TRA BOOK
    // =========================

    const book = await Book.findOne({
        _id: bookId,
        isActive: true
    });

    if (!book) {
        throw new Error("Book not found");
    }


    // =========================
    // 3. KIỂM TRA SỐ LƯỢNG
    // =========================

    if (book.availableQuantity <= 0) {
        throw new Error("Book is not available");
    }


    // =========================
    // 4. KIỂM TRA ĐÃ MƯỢN CHƯA
    // =========================

    const existingBorrowing =
        await Borrowing.findOne({
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


    // =========================
    // 5. NGÀY MƯỢN
    // =========================

    const borrowDate = new Date();


    // =========================
    // 6. HẠN TRẢ
    // Mặc định 7 ngày
    // =========================

    const dueDate = new Date(borrowDate);

    dueDate.setDate(
        dueDate.getDate() + 7
    );


    // =========================
    // 7. TẠO PHIẾU MƯỢN
    // =========================

    const borrowing =
        await Borrowing.create({
            user: userId,
            book: bookId,
            borrowDate,
            dueDate,
            status: "BORROWED",
            fine: 0
        });


    // =========================
    // 8. GIẢM SỐ SÁCH CÓ SẴN
    // =========================

    book.availableQuantity -= 1;

    await book.save();


    // =========================
    // 9. TRẢ VỀ PHIẾU MƯỢN
    // =========================

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


/**
 * Lấy toàn bộ phiếu mượn
 *
 * Dành cho:
 * - ADMIN
 * - LIBRARIAN
 *
 * Trước khi lấy dữ liệu sẽ cập nhật
 * các phiếu BORROWED đã quá hạn thành OVERDUE.
 */
const getAllBorrowings = async () => {

    await updateOverdueBorrowings();

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


/**
 * Trả sách
 *
 * Quy tắc:
 * - Phiếu phải tồn tại.
 * - MEMBER chỉ được trả sách của chính mình.
 * - ADMIN và LIBRARIAN có thể trả tất cả.
 * - Không được trả một phiếu đã RETURNED.
 * - Nếu quá hạn sẽ tính tiền phạt.
 * - Sau khi trả sách, availableQuantity tăng lên.
 */
const returnBorrowing = async (
    borrowingId,
    currentUser
) => {

    // =========================
    // 1. TÌM PHIẾU MƯỢN
    // =========================

    const borrowing =
        await Borrowing.findById(
            borrowingId
        );

    if (!borrowing) {
        throw new Error(
            "Borrowing not found"
        );
    }


    // =========================
    // 2. KIỂM TRA QUYỀN MEMBER
    // =========================

    if (
        currentUser.role === "MEMBER" &&
        borrowing.user.toString() !==
            currentUser.userId.toString()
    ) {

        throw new Error(
            "You can only return your own borrowing"
        );
    }


    // =========================
    // 3. KIỂM TRA ĐÃ TRẢ CHƯA
    // =========================

    if (
        borrowing.status === "RETURNED"
    ) {

        throw new Error(
            "This book has already been returned"
        );
    }


    // =========================
    // 4. TÌM SÁCH
    // =========================

    const book =
        await Book.findById(
            borrowing.book
        );

    if (!book) {
        throw new Error(
            "Book not found"
        );
    }


    // =========================
    // 5. NGÀY TRẢ
    // =========================

    const returnDate = new Date();


    // =========================
    // 6. TÍNH TIỀN PHẠT
    // =========================

    let fine = 0;

    if (
        returnDate > borrowing.dueDate
    ) {

        const dueDate =
            new Date(
                borrowing.dueDate
            );

        const returnDateOnly =
            new Date(returnDate);


        // Chỉ so sánh ngày,
        // không so sánh giờ/phút/giây.

        dueDate.setHours(
            0,
            0,
            0,
            0
        );

        returnDateOnly.setHours(
            0,
            0,
            0,
            0
        );


        const diffTime =
            returnDateOnly.getTime() -
            dueDate.getTime();


        const overdueDays =
            Math.max(
                0,
                Math.floor(
                    diffTime /
                    (1000 * 60 * 60 * 24)
                )
            );


        const finePerDay =
            Number(
                process.env.FINE_PER_DAY || 10000
            );


        fine =
            overdueDays *
            finePerDay;
    }


    // =========================
    // 7. CẬP NHẬT PHIẾU MƯỢN
    // =========================

    borrowing.returnDate =
        returnDate;

    borrowing.status =
        "RETURNED";

    borrowing.fine =
        fine;

    await borrowing.save();


    // =========================
    // 8. TĂNG SỐ LƯỢNG SÁCH
    // =========================

    book.availableQuantity =
        Math.min(
            book.availableQuantity + 1,
            book.quantity
        );

    await book.save();


    // =========================
    // 9. TRẢ DỮ LIỆU
    // =========================

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


/**
 * Lấy danh sách phiếu mượn
 * của MEMBER hiện tại.
 */
const getMyBorrowings = async (
    userId
) => {

    // Cập nhật phiếu quá hạn trước
    // để frontend luôn nhận trạng thái mới nhất.

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
};


/**
 * Cập nhật trạng thái phiếu mượn quá hạn.
 *
 * BORROWED + dueDate < hiện tại
 *        ↓
 * OVERDUE
 */
const updateOverdueBorrowings =
    async () => {

        const now =
            new Date();


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