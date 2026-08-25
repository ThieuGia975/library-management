import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getBookByIdApi } from "../api/bookApi";
import { borrowBookApi } from "../api/borrowingApi";

import { useAuth } from "../context/AuthContext";


function BookDetail() {

    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();


    // ==========================================
    // STATES
    // ==========================================

    const [book, setBook] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [borrowing, setBorrowing] = useState(false);

    const [successMessage, setSuccessMessage] = useState("");


    // ==========================================
    // LOAD BOOK
    // ==========================================

    const loadBook = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await getBookByIdApi(id);

            setBook(response?.data || null);

        } catch (error) {

            console.error(
                "Load book detail error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Không thể tải thông tin sách"
            );

        } finally {

            setLoading(false);

        }
    };


    // ==========================================
    // LOAD WHEN PAGE OPENS
    // ==========================================

    useEffect(() => {

        if (id) {
            loadBook();
        }

    }, [id]);


    // ==========================================
    // BORROW BOOK
    // ==========================================

    const handleBorrowBook = async () => {

        if (!user) {

            navigate("/login");

            return;
        }


        if (user.role !== "MEMBER") {

            setError(
                "Chỉ thành viên mới có thể mượn sách."
            );

            return;
        }


        if (
            !book ||
            Number(book.availableQuantity || 0) <= 0
        ) {

            setError("Sách hiện đã hết.");

            return;
        }


        try {

            setBorrowing(true);

            setError("");
            setSuccessMessage("");


            await borrowBookApi(book._id);


            setSuccessMessage(
                "Mượn sách thành công! Hạn trả là 7 ngày kể từ ngày mượn."
            );


            await loadBook();

        } catch (error) {

            console.error(
                "Borrow book error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Không thể mượn sách"
            );

        } finally {

            setBorrowing(false);

        }
    };


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (
            <div className="page-container">

                <div className="loading-card">

                    <div className="loading-spinner"></div>

                    <p>
                        Đang tải thông tin sách...
                    </p>

                </div>

            </div>
        );

    }


    // ==========================================
    // ERROR
    // ==========================================

    if (error && !book) {

        return (
            <div className="page-container">

                <button
                    type="button"
                    className="back-button"
                    onClick={() => navigate("/books")}
                >
                    ← Quay lại danh sách sách
                </button>

                <div className="error-box">
                    {error}
                </div>

            </div>
        );

    }


    // ==========================================
    // BOOK NOT FOUND
    // ==========================================

    if (!book) {

        return (
            <div className="page-container">

                <button
                    type="button"
                    className="back-button"
                    onClick={() => navigate("/books")}
                >
                    ← Quay lại danh sách sách
                </button>

                <div className="empty-state">

                    <div className="empty-icon">
                        📚
                    </div>

                    <h3>
                        Không tìm thấy sách
                    </h3>

                    <p>
                        Sách bạn đang tìm kiếm
                        không tồn tại.
                    </p>

                </div>

            </div>
        );

    }


    // ==========================================
    // BOOK DATA
    // ==========================================

    const quantity =
        Number(book.quantity || 0);

    const available =
        Number(book.availableQuantity || 0);

    const borrowed =
        Math.max(quantity - available, 0);

    const isAvailable =
        available > 0;

    const canBorrow =
        user?.role === "MEMBER";


    // ==========================================
    // PAGE
    // ==========================================

    return (

        <div className="page-container">

            {/* BACK BUTTON */}

            <button
                type="button"
                className="back-button"
                onClick={() => navigate("/books")}
            >
                ← Quay lại danh sách sách
            </button>


            {/* ERROR */}

            {error && (
                <div className="error-box">
                    {error}
                </div>
            )}


            {/* SUCCESS */}

            {successMessage && (
                <div className="success-box">
                    ✓ {successMessage}
                </div>
            )}


            {/* ======================================
                BOOK DETAIL
            ====================================== */}

            <div className="book-detail-card">

                {/* ==================================
                    COVER
                ================================== */}

                <div className="book-detail-cover">

                    {book.coverImage ? (

                        <img
                            src={book.coverImage}
                            alt={book.title}
                            onError={(event) => {

                                event.currentTarget.style.display =
                                    "none";

                                event.currentTarget.nextSibling.style.display =
                                    "flex";

                            }}
                        />

                    ) : null}


                    <div
                        className="book-detail-placeholder"
                        style={{
                            display: book.coverImage
                                ? "none"
                                : "flex"
                        }}
                    >
                        📚
                    </div>

                </div>


                {/* ==================================
                    CONTENT
                ================================== */}

                <div className="book-detail-content">

                    {/* HEADER */}

                    <div className="book-detail-header">

                        <span className="category-badge">
                            {book.category || "Chưa phân loại"}
                        </span>

                        <h1>
                            {book.title}
                        </h1>

                        <p className="book-author">
                            Tác giả: {book.author}
                        </p>

                    </div>


                    {/* ==================================
                        INFORMATION
                    ================================== */}

                    <div className="book-info-grid">

                        <div className="book-info-item">

                            <span>
                                ISBN
                            </span>

                            <strong>
                                {book.isbn || "Chưa cập nhật"}
                            </strong>

                        </div>


                        <div className="book-info-item">

                            <span>
                                Nhà xuất bản
                            </span>

                            <strong>
                                {book.publisher ||
                                    "Chưa cập nhật"}
                            </strong>

                        </div>


                        <div className="book-info-item">

                            <span>
                                Năm xuất bản
                            </span>

                            <strong>
                                {book.publishedYear ||
                                    "Chưa cập nhật"}
                            </strong>

                        </div>


                        <div className="book-info-item">

                            <span>
                                Tổng số bản
                            </span>

                            <strong>
                                {quantity}
                            </strong>

                        </div>

                    </div>


                    {/* ==================================
                        INVENTORY
                    ================================== */}

                    <div className="availability-box">

                        <div className="availability-item">

                            <span>
                                Có sẵn
                            </span>

                            <strong
                                className={
                                    isAvailable
                                        ? "available-number"
                                        : "unavailable-number"
                                }
                            >
                                {available}
                            </strong>

                        </div>


                        <div className="availability-item">

                            <span>
                                Đang được mượn
                            </span>

                            <strong>
                                {borrowed}
                            </strong>

                        </div>


                        <div className="availability-item">

                            <span>
                                Trạng thái
                            </span>

                            {isAvailable ? (

                                <span className="status available">
                                    Có sẵn
                                </span>

                            ) : (

                                <span className="status unavailable">
                                    Hết sách
                                </span>

                            )}

                        </div>

                    </div>


                    {/* ==================================
                        DESCRIPTION
                    ================================== */}

                    <div className="book-description">

                        <h3>
                            Giới thiệu sách
                        </h3>

                        <p>
                            {book.description ||
                                "Chưa có mô tả cho sách này."}
                        </p>

                    </div>


                    {/* ==================================
                        ACTIONS
                    ================================== */}

                    <div className="book-detail-actions">

                        {canBorrow && (

                            <button
                                type="button"
                                className="primary-button borrow-button"
                                onClick={handleBorrowBook}
                                disabled={
                                    borrowing ||
                                    !isAvailable
                                }
                            >

                                {borrowing

                                    ? "Đang xử lý..."

                                    : isAvailable

                                        ? "📖 Mượn sách"

                                        : "Hết sách"

                                }

                            </button>

                        )}


                        {!user && (

                            <button
                                type="button"
                                className="primary-button"
                                onClick={() =>
                                    navigate("/login")
                                }
                            >
                                Đăng nhập để mượn sách
                            </button>

                        )}


                        {(user?.role === "ADMIN" ||
                            user?.role === "LIBRARIAN") && (

                            <button
                                type="button"
                                className="secondary-button"
                                onClick={() =>
                                    navigate("/books")
                                }
                            >
                                ← Quản lý sách
                            </button>

                        )}

                    </div>

                </div>

            </div>

        </div>
    );
}


export default BookDetail;