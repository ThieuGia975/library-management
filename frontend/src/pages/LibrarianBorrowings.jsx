import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import {
    getAllBorrowingsApi,
    returnBorrowingApi
} from "../api/borrowingApi";


function LibrarianBorrowings() {

    const [borrowings, setBorrowings] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [returningId, setReturningId] = useState(null);

    const [message, setMessage] = useState("");

    const [returnError, setReturnError] = useState("");


    useEffect(() => {

        const loadBorrowings = async () => {

            try {

                setLoading(true);

                setError("");

                const response =
                    await getAllBorrowingsApi();

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
                    "Không thể tải danh sách lượt mượn"
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

            setMessage("");

            setReturnError("");

            const response =
                await returnBorrowingApi(
                    borrowingId
                );

            setMessage(
                response.message ||
                "Trả sách thành công"
            );

            setBorrowings(
                currentBorrowings =>
                    currentBorrowings.map(
                        borrowing =>
                            borrowing._id === borrowingId
                                ? {
                                    ...borrowing,
                                    status: "RETURNED",
                                    returnDate:
                                        response.data?.returnDate ||
                                        new Date().toISOString(),
                                    fine:
                                        response.data?.fine || 0
                                }
                                : borrowing
                    )
            );

        } catch (error) {

            console.error(
                "Return borrowing error:",
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
                    Đang tải danh sách lượt mượn...
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

            </div>
        );

    }


    return (

        <div>

            <h1>
                📚 Quản lý lượt mượn sách
            </h1>

            <Link to="/librarian">
                ← Quay lại Librarian Dashboard
            </Link>


            {message && (

                <p style={{ color: "green" }}>
                    {message}
                </p>

            )}


            {returnError && (

                <p style={{ color: "red" }}>
                    {returnError}
                </p>

            )}


            {borrowings.length === 0 ? (

                <p>
                    Chưa có lượt mượn sách nào.
                </p>

            ) : (

                <table
                    border="1"
                    cellPadding="10"
                    style={{
                        marginTop: "20px",
                        borderCollapse: "collapse",
                        width: "100%"
                    }}
                >

                    <thead>

                        <tr>

                            <th>Member</th>

                            <th>Email</th>

                            <th>Sách</th>

                            <th>Ngày mượn</th>

                            <th>Hạn trả</th>

                            <th>Ngày trả</th>

                            <th>Trạng thái</th>

                            <th>Tiền phạt</th>

                            <th>Thao tác</th>

                        </tr>

                    </thead>


                    <tbody>

                        {borrowings.map(
                            borrowing => (

                                <tr
                                    key={
                                        borrowing._id
                                    }
                                >

                                    <td>
                                        {
                                            borrowing.user
                                                ?.fullName
                                        }
                                    </td>

                                    <td>
                                        {
                                            borrowing.user
                                                ?.email
                                        }
                                    </td>

                                    <td>
                                        {
                                            borrowing.book
                                                ?.title
                                        }
                                    </td>

                                    <td>

                                        {borrowing.borrowDate
                                            ? new Date(
                                                borrowing.borrowDate
                                            ).toLocaleDateString(
                                                "vi-VN"
                                            )
                                            : "N/A"
                                        }

                                    </td>

                                    <td>

                                        {borrowing.dueDate
                                            ? new Date(
                                                borrowing.dueDate
                                            ).toLocaleDateString(
                                                "vi-VN"
                                            )
                                            : "N/A"
                                        }

                                    </td>

                                    <td>

                                        {borrowing.returnDate
                                            ? new Date(
                                                borrowing.returnDate
                                            ).toLocaleDateString(
                                                "vi-VN"
                                            )
                                            : "Chưa trả"
                                        }

                                    </td>

                                    <td>
                                        {
                                            borrowing.status
                                        }
                                    </td>

                                    <td>

                                        {Number(
                                            borrowing.fine || 0
                                        ).toLocaleString(
                                            "vi-VN"
                                        )}{" "}
                                        VNĐ

                                    </td>

                                    <td>

                                        {borrowing.status !==
                                            "RETURNED" && (

                                            <button
                                                onClick={() =>
                                                    handleReturn(
                                                        borrowing._id
                                                    )
                                                }
                                                disabled={
                                                    returningId ===
                                                    borrowing._id
                                                }
                                            >

                                                {returningId ===
                                                borrowing._id
                                                    ? "Đang xử lý..."
                                                    : "Trả sách"
                                                }

                                            </button>

                                        )}

                                    </td>

                                </tr>

                            )
                        )}

                    </tbody>

                </table>

            )}

        </div>

    );

}


export default LibrarianBorrowings;