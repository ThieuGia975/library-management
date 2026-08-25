import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    getBooksApi,
    createBookApi,
    updateBookApi,
    deleteBookApi
} from "../api/bookApi";

import { useAuth } from "../context/AuthContext";


function Books() {

    const { user } = useAuth();

    // ==========================================
    // STATES
    // ==========================================

    const [books, setBooks] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [search, setSearch] = useState("");

    // CREATE
    const [showCreateForm, setShowCreateForm] =
        useState(false);

    const [creating, setCreating] =
        useState(false);

    // UPDATE
    const [editingBook, setEditingBook] =
        useState(null);

    const [updating, setUpdating] =
        useState(false);

    // DELETE
    const [deletingId, setDeletingId] =
        useState(null);

    // FORM
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        isbn: "",
        category: "",
        publisher: "",
        publishedYear: "",
        quantity: "",
        description: "",
        coverImage: ""
    });


    // ==========================================
    // PERMISSION
    // ==========================================

    const canManageBooks =
        user?.role === "ADMIN" ||
        user?.role === "LIBRARIAN";


    // ==========================================
    // LOAD BOOKS
    // ==========================================

    const loadBooks = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await getBooksApi();

            const bookData = Array.isArray(response?.data)
                ? response.data
                : [];

            setBooks(bookData);

        } catch (error) {

            console.error(
                "Load books error:",
                error
            );

            setBooks([]);

            setError(
                error.response?.data?.message ||
                "Không thể tải danh sách sách"
            );

        } finally {

            setLoading(false);

        }
    };


    // ==========================================
    // LOAD WHEN PAGE OPENS
    // ==========================================

    useEffect(() => {

        loadBooks();

    }, []);


    // ==========================================
    // HANDLE FORM CHANGE
    // ==========================================

    const handleFormChange = (event) => {

        const {
            name,
            value
        } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));

    };


    // ==========================================
    // RESET FORM
    // ==========================================

    const resetForm = () => {

        setFormData({
            title: "",
            author: "",
            isbn: "",
            category: "",
            publisher: "",
            publishedYear: "",
            quantity: "",
            description: "",
            coverImage: ""
        });

    };


    // ==========================================
    // OPEN CREATE FORM
    // ==========================================

    const handleOpenCreateForm = () => {

        setError("");

        setEditingBook(null);

        resetForm();

        setShowCreateForm(true);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };


    // ==========================================
    // CLOSE CREATE FORM
    // ==========================================

    const handleCloseCreateForm = () => {

        if (creating) {
            return;
        }

        setShowCreateForm(false);

        resetForm();

    };


    // ==========================================
    // CREATE BOOK
    // ==========================================

    const handleCreateBook = async (event) => {

        event.preventDefault();

        if (!canManageBooks) {
            setError(
                "Bạn không có quyền thêm sách."
            );
            return;
        }

        try {

            setCreating(true);

            setError("");

            const bookData = {
                title: formData.title.trim(),
                author: formData.author.trim(),
                isbn: formData.isbn.trim(),
                category: formData.category.trim(),
                publisher: formData.publisher.trim(),
                quantity: Number(formData.quantity),
                description: formData.description.trim(),
                coverImage: formData.coverImage.trim()
            };

            if (formData.publishedYear !== "") {

                bookData.publishedYear =
                    Number(formData.publishedYear);

            }

            await createBookApi(bookData);

            alert("Thêm sách thành công!");

            setShowCreateForm(false);

            resetForm();

            await loadBooks();

        } catch (error) {

            console.error(
                "Create book error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Không thể thêm sách"
            );

        } finally {

            setCreating(false);

        }

    };


    // ==========================================
    // OPEN EDIT FORM
    // ==========================================

    const handleOpenEditForm = (book) => {

        if (!canManageBooks) {
            return;
        }

        setError("");

        setShowCreateForm(false);

        setEditingBook(book);

        setFormData({

            title: book.title || "",

            author: book.author || "",

            isbn: book.isbn || "",

            category: book.category || "",

            publisher: book.publisher || "",

            publishedYear:
                book.publishedYear ?? "",

            quantity:
                book.quantity ?? "",

            description:
                book.description || "",

            coverImage:
                book.coverImage || ""

        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };


    // ==========================================
    // CLOSE EDIT FORM
    // ==========================================

    const handleCloseEditForm = () => {

        if (updating) {
            return;
        }

        setEditingBook(null);

        resetForm();

    };


    // ==========================================
    // UPDATE BOOK
    // ==========================================

    const handleUpdateBook = async (event) => {

        event.preventDefault();

        if (!editingBook) {
            return;
        }

        if (!canManageBooks) {

            setError(
                "Bạn không có quyền cập nhật sách."
            );

            return;
        }

        try {

            setUpdating(true);

            setError("");

            const bookData = {
                title: formData.title.trim(),
                author: formData.author.trim(),
                isbn: formData.isbn.trim(),
                category: formData.category.trim(),
                publisher: formData.publisher.trim(),
                quantity: Number(formData.quantity),
                description: formData.description.trim(),
                coverImage: formData.coverImage.trim()
            };

            if (formData.publishedYear !== "") {

                bookData.publishedYear =
                    Number(formData.publishedYear);

            }

            await updateBookApi(
                editingBook._id,
                bookData
            );

            alert(
                "Cập nhật sách thành công!"
            );

            setEditingBook(null);

            resetForm();

            await loadBooks();

        } catch (error) {

            console.error(
                "Update book error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Không thể cập nhật sách"
            );

        } finally {

            setUpdating(false);

        }

    };


    // ==========================================
    // DELETE / DEACTIVATE BOOK
    // ==========================================

    const handleDeleteBook = async (bookId) => {

        if (!canManageBooks) {

            setError(
                "Bạn không có quyền ngừng hoạt động sách."
            );

            return;

        }

        const confirmed =
            window.confirm(
                "Bạn có chắc chắn muốn ngừng hoạt động sách này?"
            );

        if (!confirmed) {
            return;
        }

        try {

            setDeletingId(bookId);

            setError("");

            await deleteBookApi(bookId);

            alert(
                "Đã ngừng hoạt động sách thành công!"
            );

            await loadBooks();

        } catch (error) {

            console.error(
                "Delete book error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Không thể ngừng hoạt động sách"
            );

        } finally {

            setDeletingId(null);

        }

    };


    // ==========================================
    // SEARCH
    // ==========================================

    const keyword =
        search
            .trim()
            .toLowerCase();


    const filteredBooks =
        books.filter((book) => {

            if (!keyword) {
                return true;
            }

            return (

                book.title
                    ?.toLowerCase()
                    .includes(keyword)

                ||

                book.author
                    ?.toLowerCase()
                    .includes(keyword)

                ||

                book.isbn
                    ?.toLowerCase()
                    .includes(keyword)

                ||

                book.category
                    ?.toLowerCase()
                    .includes(keyword)

            );

        });


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (

            <div className="page-container">

                <div className="page-header">

                    <div>

                        <h2>
                            Quản lý sách
                        </h2>

                        <p>
                            Danh sách sách trong thư viện
                        </p>

                    </div>

                </div>

                <div className="loading-card">

                    <div className="loading-spinner">
                    </div>

                    <p>
                        Đang tải danh sách sách...
                    </p>

                </div>

            </div>

        );

    }


    // ==========================================
    // MAIN PAGE
    // ==========================================

    return (

        <div className="page-container">

            {/* =================================
                PAGE HEADER
            ================================= */}

            <div className="page-header">

                <div>

                    <h2>
                        Quản lý sách
                    </h2>

                    <p>
                        Quản lý danh mục sách
                        trong thư viện
                    </p>

                </div>

                {canManageBooks && (

                    <button
                        type="button"
                        className="primary-button"
                        onClick={
                            handleOpenCreateForm
                        }
                    >
                        + Thêm sách
                    </button>

                )}

            </div>


            {/* =================================
                ERROR
            ================================= */}

            {error && (

                <div className="error-box">

                    <strong>
                        Có lỗi:
                    </strong>

                    <span>
                        {" "}
                        {error}
                    </span>

                </div>

            )}


            {/* =================================
                CREATE FORM
            ================================= */}

            {showCreateForm &&
                canManageBooks && (

                    <div className="form-card">

                        <div className="form-header">

                            <div>

                                <h3>
                                    Thêm sách mới
                                </h3>

                                <p>
                                    Nhập thông tin sách
                                    vào hệ thống
                                </p>

                            </div>

                            <button
                                type="button"
                                className="close-button"
                                onClick={
                                    handleCloseCreateForm
                                }
                                disabled={creating}
                            >
                                ✕
                            </button>

                        </div>


                        <form
                            className="book-form"
                            onSubmit={
                                handleCreateBook
                            }
                        >

                            <BookFormFields
                                formData={formData}
                                handleFormChange={
                                    handleFormChange
                                }
                                disabled={creating}
                            />

                            <div className="form-actions">

                                <button
                                    type="button"
                                    className="cancel-button"
                                    onClick={
                                        handleCloseCreateForm
                                    }
                                    disabled={creating}
                                >
                                    Hủy
                                </button>

                                <button
                                    type="submit"
                                    className="primary-button"
                                    disabled={creating}
                                >

                                    {creating
                                        ? "Đang thêm..."
                                        : "Thêm sách"
                                    }

                                </button>

                            </div>

                        </form>

                    </div>

                )}


            {/* =================================
                EDIT FORM
            ================================= */}

            {editingBook &&
                canManageBooks && (

                    <div className="form-card">

                        <div className="form-header">

                            <div>

                                <h3>
                                    Chỉnh sửa sách
                                </h3>

                                <p>
                                    Cập nhật thông tin sách
                                    trong hệ thống
                                </p>

                            </div>

                            <button
                                type="button"
                                className="close-button"
                                onClick={
                                    handleCloseEditForm
                                }
                                disabled={updating}
                            >
                                ✕
                            </button>

                        </div>


                        <form
                            className="book-form"
                            onSubmit={
                                handleUpdateBook
                            }
                        >

                            <BookFormFields
                                formData={formData}
                                handleFormChange={
                                    handleFormChange
                                }
                                disabled={updating}
                            />

                            <div className="form-actions">

                                <button
                                    type="button"
                                    className="cancel-button"
                                    onClick={
                                        handleCloseEditForm
                                    }
                                    disabled={updating}
                                >
                                    Hủy
                                </button>

                                <button
                                    type="submit"
                                    className="primary-button"
                                    disabled={updating}
                                >

                                    {updating
                                        ? "Đang cập nhật..."
                                        : "Lưu thay đổi"
                                    }

                                </button>

                            </div>

                        </form>

                    </div>

                )}


            {/* =================================
                SEARCH
            ================================= */}

            <div className="search-box">

                <input
                    type="text"
                    placeholder="🔍 Tìm kiếm theo tên sách, tác giả, ISBN hoặc thể loại..."
                    value={search}
                    onChange={(event) =>
                        setSearch(
                            event.target.value
                        )
                    }
                />

            </div>


            {/* =================================
                BOOK TABLE
            ================================= */}

            <div className="table-card">

                <div className="table-header">

                    <div>

                        <h3>
                            Danh sách sách
                        </h3>

                        <p>
                            {filteredBooks.length} sách được hiển thị
                        </p>

                    </div>

                    {search && (

                        <button
                            type="button"
                            className="clear-search-button"
                            onClick={() =>
                                setSearch("")
                            }
                        >
                            Xóa tìm kiếm
                        </button>

                    )}

                </div>


                {/* =================================
                    EMPTY
                ================================= */}

                {filteredBooks.length === 0 ? (

                    <div className="empty-state">

                        <div className="empty-icon">
                            📚
                        </div>

                        <h3>
                            Không tìm thấy sách
                        </h3>

                        <p>

                            {search
                                ? "Không có sách phù hợp với từ khóa tìm kiếm."
                                : "Thư viện chưa có sách nào."
                            }

                        </p>

                        {!search &&
                            canManageBooks && (

                                <button
                                    type="button"
                                    className="primary-button"
                                    onClick={
                                        handleOpenCreateForm
                                    }
                                >
                                    + Thêm sách đầu tiên
                                </button>

                            )}

                    </div>

                ) : (

                    <div className="table-wrapper">

                        <table>

                            <thead>

                                <tr>

                                    <th>
                                        STT
                                    </th>

                                    <th>
                                        Sách
                                    </th>

                                    <th>
                                        Tác giả
                                    </th>

                                    <th>
                                        ISBN
                                    </th>

                                    <th>
                                        Thể loại
                                    </th>

                                    <th>
                                        Tổng
                                    </th>

                                    <th>
                                        Có sẵn
                                    </th>

                                    <th>
                                        Trạng thái
                                    </th>

                                    <th>
                                        Chi tiết
                                    </th>

                                    {canManageBooks && (

                                        <th>
                                            Thao tác
                                        </th>

                                    )}

                                </tr>

                            </thead>


                            <tbody>

                                {filteredBooks.map(
                                    (book, index) => {

                                        const available =
                                            Number(
                                                book.availableQuantity || 0
                                            );

                                        const quantity =
                                            Number(
                                                book.quantity || 0
                                            );

                                        const isDeleting =
                                            deletingId ===
                                            book._id;


                                        return (

                                            <tr
                                                key={
                                                    book._id
                                                }
                                            >

                                                {/* STT */}

                                                <td>
                                                    {index + 1}
                                                </td>


                                                {/* BOOK */}

                                                <td>

                                                    <div className="book-info">

                                                        {book.coverImage ? (

                                                            <img
                                                                src={
                                                                    book.coverImage
                                                                }
                                                                alt={
                                                                    book.title
                                                                }
                                                                className="book-cover-small"
                                                                onError={(
                                                                    event
                                                                ) => {

                                                                    event.currentTarget.style.display =
                                                                        "none";

                                                                }}
                                                            />

                                                        ) : (

                                                            <div className="book-placeholder">
                                                                📚
                                                            </div>

                                                        )}


                                                        <div>

                                                            <strong>
                                                                {
                                                                    book.title
                                                                }
                                                            </strong>

                                                            {book.publisher && (

                                                                <small>
                                                                    {
                                                                        book.publisher
                                                                    }
                                                                </small>

                                                            )}

                                                        </div>

                                                    </div>

                                                </td>


                                                {/* AUTHOR */}

                                                <td>
                                                    {
                                                        book.author
                                                    }
                                                </td>


                                                {/* ISBN */}

                                                <td>
                                                    {
                                                        book.isbn
                                                    }
                                                </td>


                                                {/* CATEGORY */}

                                                <td>

                                                    <span className="category-badge">

                                                        {
                                                            book.category
                                                        }

                                                    </span>

                                                </td>


                                                {/* TOTAL */}

                                                <td>
                                                    {
                                                        quantity
                                                    }
                                                </td>


                                                {/* AVAILABLE */}

                                                <td>

                                                    <strong
                                                        className={
                                                            available > 0
                                                                ? "available-number"
                                                                : "unavailable-number"
                                                        }
                                                    >
                                                        {
                                                            available
                                                        }
                                                    </strong>

                                                </td>


                                                {/* STATUS */}

                                                <td>

                                                    {available > 0 ? (

                                                        <span className="status available">
                                                            Có sẵn
                                                        </span>

                                                    ) : (

                                                        <span className="status unavailable">
                                                            Hết sách
                                                        </span>

                                                    )}

                                                </td>


                                                {/* DETAIL */}

                                                <td>

                                                    <Link
                                                        to={`/books/${book._id}`}
                                                        className="view-button"
                                                    >
                                                        Xem
                                                    </Link>

                                                </td>


                                                {/* ACTIONS */}

                                                {canManageBooks && (

                                                    <td>

                                                        <div className="action-buttons">

                                                            <button
                                                                type="button"
                                                                className="edit-button"
                                                                title="Sửa sách"
                                                                onClick={() =>
                                                                    handleOpenEditForm(
                                                                        book
                                                                    )
                                                                }
                                                                disabled={
                                                                    isDeleting ||
                                                                    updating
                                                                }
                                                            >
                                                                ✏️
                                                            </button>


                                                            <button
                                                                type="button"
                                                                className="delete-button"
                                                                title="Ngừng hoạt động"
                                                                onClick={() =>
                                                                    handleDeleteBook(
                                                                        book._id
                                                                    )
                                                                }
                                                                disabled={
                                                                    isDeleting
                                                                }
                                                            >
                                                                {isDeleting
                                                                    ? "..."
                                                                    : "🗑️"
                                                                }
                                                            </button>

                                                        </div>

                                                    </td>

                                                )}

                                            </tr>

                                        );

                                    }
                                )}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </div>

    );

}


// ==========================================
// BOOK FORM FIELDS
// ==========================================

function BookFormFields({
    formData,
    handleFormChange,
    disabled
}) {

    return (

        <>

            <div className="form-grid">

                {/* TITLE */}

                <div className="form-group">

                    <label>
                        Tên sách *
                    </label>

                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleFormChange}
                        placeholder="Nhập tên sách"
                        required
                        disabled={disabled}
                    />

                </div>


                {/* AUTHOR */}

                <div className="form-group">

                    <label>
                        Tác giả *
                    </label>

                    <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleFormChange}
                        placeholder="Nhập tên tác giả"
                        required
                        disabled={disabled}
                    />

                </div>


                {/* ISBN */}

                <div className="form-group">

                    <label>
                        ISBN *
                    </label>

                    <input
                        type="text"
                        name="isbn"
                        value={formData.isbn}
                        onChange={handleFormChange}
                        placeholder="Ví dụ: 9780132350884"
                        minLength={10}
                        maxLength={20}
                        required
                        disabled={disabled}
                    />

                </div>


                {/* CATEGORY */}

                <div className="form-group">

                    <label>
                        Thể loại *
                    </label>

                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleFormChange}
                        placeholder="Ví dụ: Công nghệ thông tin"
                        required
                        disabled={disabled}
                    />

                </div>


                {/* PUBLISHER */}

                <div className="form-group">

                    <label>
                        Nhà xuất bản
                    </label>

                    <input
                        type="text"
                        name="publisher"
                        value={formData.publisher}
                        onChange={handleFormChange}
                        placeholder="Nhập nhà xuất bản"
                        disabled={disabled}
                    />

                </div>


                {/* PUBLISHED YEAR */}

                <div className="form-group">

                    <label>
                        Năm xuất bản
                    </label>

                    <input
                        type="number"
                        name="publishedYear"
                        value={formData.publishedYear}
                        onChange={handleFormChange}
                        placeholder="Ví dụ: 2024"
                        min="1000"
                        max={new Date().getFullYear()}
                        disabled={disabled}
                    />

                </div>


                {/* QUANTITY */}

                <div className="form-group">

                    <label>
                        Số lượng *
                    </label>

                    <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleFormChange}
                        placeholder="Nhập số lượng"
                        min="1"
                        step="1"
                        required
                        disabled={disabled}
                    />

                </div>


                {/* COVER */}

                <div className="form-group">

                    <label>
                        URL ảnh bìa
                    </label>

                    <input
                        type="url"
                        name="coverImage"
                        value={formData.coverImage}
                        onChange={handleFormChange}
                        placeholder="https://..."
                        disabled={disabled}
                    />

                </div>

            </div>


            {/* DESCRIPTION */}

            <div className="form-group">

                <label>
                    Mô tả
                </label>

                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleFormChange}
                    placeholder="Nhập mô tả sách..."
                    rows="4"
                    disabled={disabled}
                />

            </div>

        </>

    );

}


export default Books;