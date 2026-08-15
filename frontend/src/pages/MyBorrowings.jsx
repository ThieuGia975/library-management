import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import {
    getMyBorrowingsApi
} from "../api/borrowingApi";


function MyBorrowings() {

    const [borrowings, setBorrowings] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


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

                        </div>

                    ))}

                </div>

            )}

        </div>

    );

}


export default MyBorrowings;