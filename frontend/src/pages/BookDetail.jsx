import { useEffect, useState } from "react";

import {
    Link,
    useParams
} from "react-router-dom";

import {
    getBookByIdApi
} from "../api/bookApi";

import { useAuth } from "../context/AuthContext";

import {
    borrowBookApi
} from "../api/borrowingApi";

function BookDetail() {

    const { id } = useParams();

    const [book, setBook] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const { user } = useAuth();

    console.log("========== AUTH DEBUG ==========");
    console.log("User:", user);
    console.log("User role:", user?.role);
    console.log("Is MEMBER:", user?.role === "MEMBER");
    console.log("Token:", localStorage.getItem("token"));
    console.log("================================");

    const [borrowing, setBorrowing] = useState(false);

    const [borrowMessage, setBorrowMessage] = useState("");

    const [borrowError, setBorrowError] = useState("");


    useEffect(() => {

        const loadBook = async () => {

            try {

                setLoading(true);

                setError("");

                const response =
                    await getBookByIdApi(id);

                setBook(response.data);

            } catch (error) {

                console.error(
                    "Failed to load book:",
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

        loadBook();

    }, [id]);


    if (loading) {

        return (
            <div>
                Đang tải thông tin sách...
            </div>
        );

    }


    if (error) {

        return (
            <div>

                <h2>
                    Không thể tải sách
                </h2>

                <p style={{ color: "red" }}>
                    {error}
                </p>

                <Link to="/books">
                    ← Quay lại danh sách sách
                </Link>

            </div>
        );

    }


    if (!book) {

        return (
            <div>

                <h2>
                    Không tìm thấy sách
                </h2>

                <Link to="/books">
                    ← Quay lại danh sách sách
                </Link>

            </div>
        );

    }

    const handleBorrow = async () => {

    try {

        setBorrowing(true);

        setBorrowMessage("");

        setBorrowError("");

        const response =
            await borrowBookApi(book._id);

        setBorrowMessage(
            response.message ||
            "Mượn sách thành công"
        );

        // Cập nhật số lượng sách
        setBook((currentBook) => ({
            ...currentBook,

            availableQuantity:
                currentBook.availableQuantity - 1
        }));

    } catch (error) {

        console.error(
            "Borrow book error:",
            error
        );

        setBorrowError(
            error.response?.data?.message ||
            "Không thể mượn sách"
        );

    } finally {

        setBorrowing(false);

    }
};

    return (

        <div>

            <Link to="/books">
                ← Quay lại danh sách sách
            </Link>


            <h1>
                📖 {book.title}
            </h1>


            <div>

                <p>
                    <strong>
                        Tác giả:
                    </strong>{" "}
                    {book.author}
                </p>


                <p>
                    <strong>
                        ISBN:
                    </strong>{" "}
                    {book.isbn}
                </p>


                <p>
                    <strong>
                        Thể loại:
                    </strong>{" "}
                    {book.category}
                </p>


                <p>
                    <strong>
                        Nhà xuất bản:
                    </strong>{" "}
                    {book.publisher || "N/A"}
                </p>


                <p>
                    <strong>
                        Năm xuất bản:
                    </strong>{" "}
                    {book.publishedYear || "N/A"}
                </p>


                <p>
                    <strong>
                        Số lượng:
                    </strong>{" "}
                    {book.quantity}
                </p>


                <p>
                    <strong>
                        Có sẵn:
                    </strong>{" "}
                    {book.availableQuantity}
                </p>


                {book.description && (

                    <div>

                        <h3>
                            Mô tả
                        </h3>

                        <p>
                            {book.description}
                        </p>

                    </div>

                )}


            {user?.role === "MEMBER" && (
                
                book.availableQuantity > 0 ? (

                    <button
                        onClick={handleBorrow}
                        disabled={borrowing}
                    >

                        {borrowing
                            ? "Đang xử lý..."
                            : "Mượn sách"}

                    </button>

                ) : (

                    <p>
                        Sách hiện đã hết.
                    </p>

                )

            )}

            {borrowMessage && (

                    <p style={{ color: "green" }}>
                        {borrowMessage}
                    </p>

                )}

            {borrowError && (

                    <p style={{ color: "red" }}>
                        {borrowError}
                    </p>

                )}

            </div>

        </div>

    );
}

export default BookDetail;