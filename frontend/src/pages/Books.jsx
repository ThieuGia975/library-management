import { useEffect, useState } from "react";

import { getBooksApi } from "../api/bookApi";

function Books() {

    const [books, setBooks] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [search, setSearch] = useState("");

    const [category, setCategory] = useState("ALL");


    // =========================
    // Load books
    // =========================

    useEffect(() => {

        const loadBooks = async () => {

            try {

                setLoading(true);

                setError("");

                const response =
                    await getBooksApi();

                setBooks(response.data || []);

            } catch (error) {

                console.error(
                    "Failed to load books:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Không thể tải danh sách sách"
                );

            } finally {

                setLoading(false);

            }
        };

        loadBooks();

    }, []);


    // =========================
    // Get categories
    // =========================

    const categories = [
        "ALL",
        ...new Set(
            books
                .map((book) => book.category)
                .filter(Boolean)
        )
    ];


    // =========================
    // Filter books
    // =========================

    const filteredBooks = books.filter((book) => {

        const keyword =
            search.toLowerCase().trim();

        const matchesSearch =
            book.title
                ?.toLowerCase()
                .includes(keyword) ||

            book.author
                ?.toLowerCase()
                .includes(keyword) ||

            book.isbn
                ?.toLowerCase()
                .includes(keyword);


        const matchesCategory =
            category === "ALL" ||
            book.category === category;


        return (
            matchesSearch &&
            matchesCategory
        );

    });


    // =========================
    // Loading
    // =========================

    if (loading) {

        return (
            <div>
                Đang tải danh sách sách...
            </div>
        );

    }


    // =========================
    // Error
    // =========================

    if (error) {

        return (
            <div>

                <h2>
                    Danh sách sách
                </h2>

                <p style={{ color: "red" }}>
                    {error}
                </p>

            </div>
        );

    }


    // =========================
    // UI
    // =========================

    return (

        <div>

            <h1>
                📚 Danh sách sách
            </h1>


            {/* Search */}

            <div>

                <input
                    type="text"
                    placeholder="🔍 Tìm theo tên, tác giả hoặc ISBN..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />

            </div>


            {/* Category */}

            <div>

                <label>
                    Thể loại:{" "}
                </label>

                <select
                    value={category}
                    onChange={(e) =>
                        setCategory(e.target.value)
                    }
                >

                    {categories.map((item) => (

                        <option
                            key={item}
                            value={item}
                        >
                            {item === "ALL"
                                ? "Tất cả"
                                : item}
                        </option>

                    ))}

                </select>

            </div>


            {/* Result count */}

            <p>

                Hiển thị{" "}
                <strong>
                    {filteredBooks.length}
                </strong>{" "}
                / {books.length} sách

            </p>


            {/* Empty */}

            {filteredBooks.length === 0 ? (

                <div>

                    <p>
                        Không tìm thấy sách phù hợp.
                    </p>

                </div>

            ) : (

                <div>

                    {filteredBooks.map((book) => (

                        <div
                            key={book._id}
                            style={{
                                border: "1px solid #ddd",
                                padding: "16px",
                                marginBottom: "12px",
                                borderRadius: "8px"
                            }}
                        >

                            <h2>
                                {book.title}
                            </h2>

                            <p>
                                Tác giả:{" "}
                                {book.author}
                            </p>

                            <p>
                                ISBN:{" "}
                                {book.isbn}
                            </p>

                            <p>
                                Thể loại:{" "}
                                {book.category}
                            </p>

                            <p>
                                Nhà xuất bản:{" "}
                                {book.publisher || "N/A"}
                            </p>

                            <p>
                                Năm xuất bản:{" "}
                                {book.publishedYear || "N/A"}
                            </p>

                            <p>
                                Số lượng:{" "}
                                {book.quantity}
                            </p>

                            <p>
                                Có sẵn:{" "}
                                {book.availableQuantity}
                            </p>

                        </div>

                    ))}

                </div>

            )}

        </div>

    );
}

export default Books;