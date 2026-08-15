import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import {
    getMyBorrowingsApi,
    returnBorrowingApi
} from "../api/borrowingApi";


function MyBorrowings() {

    const [borrowings, setBorrowings] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [returningId, setReturningId] = useState(null);

    const [returnMessage, setReturnMessage] = useState("");

    const [returnError, setReturnError] = useState("");

    useEffect(() => {

        const loadBorrowings = async () => {

            try {

                setLoading(true);

                setError("");

                const response =
                    await getMyBorrowingsApi();

                setBorrowings(
                    response.data || []
                );

            } catch (error) {

                console.error(
                    "Failed to load borrowings:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Không thể tải danh sách sách đã mượn"
                );

            } finally {

                setLoading(false);

            }

        };

        loadBorrowings();

    }, []);

    const handleReturn = async (borrowingId) => {

    const confirmed = window.confirm(
        "Bạn có chắc chắn muốn trả sách này không?"
    );

    if (!confirmed) {
        return;
    }

    try {

        setReturningId(borrowingId);

        setReturnMessage("");

        setReturnError("");

        const response =
            await returnBorrowingApi(borrowingId);

        setReturnMessage(
            response.message ||
            "Trả sách thành công"
        );

        // Cập nhật lại borrowing vừa trả
        setBorrowings((currentBorrowings) =>
            currentBorrowings.map((borrowing) =>
                borrowing._id === borrowingId
                    ? {
                        ...borrowing,
                        status: "RETURNED",
                        returnDate:
                            response.data?.returnDate ||
                            new Date().toISOString(),
                        fine:
                            response.data?.fine ||
                            0
                    }
                    : borrowing
            )
        );

    } catch (error) {

        console.error(
            "Return book error:",
            error
        );

        setReturnError(
            error.response?.data?.message ||
            "Không thể trả sách"
        );

    } finally {

        setReturningId(null);

    }
};

    if (loading) {

        return (
            <div>
                <h2>
                    Đang tải danh sách sách đã mượn...
                </h2>
            </div>
        );

    }


    if (error) {

        return (
            <div>

                <h2>
                    Không thể tải dữ liệu
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


    return (

        <div>

            <h1>
                📚 Sách tôi đã mượn
            </h1>

            <Link to="/books">
                ← Quay lại danh sách sách
            </Link>


            {borrowings.length === 0 ? (

                <p>
                    Bạn chưa mượn sách nào.
                </p>

            ) : (

                <div>

                    {borrowings.map((borrowing) => (

                        <div
                            key={borrowing._id}
                            style={{
                                border: "1px solid #ccc",
                                padding: "20px",
                                marginTop: "20px",
                                borderRadius: "8px"
                            }}
                        >

                            <h2>
                                📖{" "}
                                {borrowing.book?.title}
                            </h2>


                            <p>
                                <strong>
                                    Tác giả:
                                </strong>{" "}
                                {borrowing.book?.author}
                            </p>


                            <p>
                                <strong>
                                    ISBN:
                                </strong>{" "}
                                {borrowing.book?.isbn}
                            </p>


                            <p>
                                <strong>
                                    Thể loại:
                                </strong>{" "}
                                {borrowing.book?.category}
                            </p>


                            <p>
                                <strong>
                                    Ngày mượn:
                                </strong>{" "}
                                {new Date(
                                    borrowing.borrowDate
                                ).toLocaleDateString(
                                    "vi-VN"
                                )}
                            </p>


                            <p>
                                <strong>
                                    Hạn trả:
                                </strong>{" "}
                                {new Date(
                                    borrowing.dueDate
                                ).toLocaleDateString(
                                    "vi-VN"
                                )}
                            </p>


                            <p>
                                <strong>
                                    Trạng thái:
                                </strong>{" "}
                                {borrowing.status}
                            </p>


                            <p>
                                <strong>
                                    Tiền phạt:
                                </strong>{" "}
                                {Number(
                                    borrowing.fine || 0
                                ).toLocaleString(
                                    "vi-VN"
                                )}{" "}
                                VNĐ
                            </p>
                                {borrowing.status !== "RETURNED" && (
                                    <button
                                        onClick={() =>
                                            handleReturn(borrowing._id)
                                        }
                                        disabled={
                                            returningId === borrowing._id
                                        }
                                    >
                                        {returningId === borrowing._id
                                            ? "Đang trả..."
                                            : "Trả sách"
                                        }
                                    </button>
                                )}

                              {returnMessage && (
                        <p style={{ color: "green" }}>
                            {returnMessage}
                        </p>
                    )}

                    {returnError && (
                        <p style={{ color: "red" }}>
                            {returnError}
                        </p>
                    )}  
                        </div>

                    ))}

                </div>

            )}

        </div>

    );

}


export default MyBorrowings;