import { useEffect, useState } from "react";

import {
    Link,
    useParams
} from "react-router-dom";

import {
    getBookByIdApi
} from "../api/bookApi";


function BookDetail() {

    const { id } = useParams();

    const [book, setBook] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


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


                {book.availableQuantity > 0 ? (

                    <button>
                        Mượn sách
                    </button>

                ) : (

                    <p>
                        Sách hiện đã hết.
                    </p>

                )}

            </div>

        </div>

    );
}

export default BookDetail;