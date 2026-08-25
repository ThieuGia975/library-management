import { useEffect, useState } from "react";

import {
    getBorrowingsApi,
    getMyBorrowingsApi,
    returnBorrowingApi
} from "../api/borrowingApi";

import { useAuth } from "../context/AuthContext";


function Borrowings() {

    const { user } = useAuth();

    const [borrowings, setBorrowings] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] =
        useState("ALL");

    const [returningId, setReturningId] =
        useState(null);


    // ==========================================
    // ROLE
    // ==========================================

    const isMember =
        user?.role === "MEMBER";

    const isStaff =
        user?.role === "ADMIN" ||
        user?.role === "LIBRARIAN";


    // ==========================================
    // LOAD BORROWINGS
    // ==========================================

    const loadBorrowings = async () => {

        try {

            setLoading(true);

            setError("");


            let response;


            if (isMember) {

                response =
                    await getMyBorrowingsApi();

            } else {

                response =
                    await getBorrowingsApi();

            }


            setBorrowings(
                response?.data || []
            );

        } catch (error) {

            console.error(
                "Load borrowings error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Không thể tải danh sách phiếu mượn"
            );

        } finally {

            setLoading(false);

        }

    };


    // ==========================================
    // LOAD PAGE
    // ==========================================

    useEffect(() => {

        if (user) {
            loadBorrowings();
        }

    }, [user]);


    // ==========================================
    // RETURN BOOK
    // ==========================================

    const handleReturnBook = async (borrowingId) => {

        const confirmed =
            window.confirm(
                "Bạn có chắc chắn muốn trả sách này?"
            );


        if (!confirmed) {
            return;
        }


        try {

            setReturningId(
                borrowingId
            );

            setError("");


            const response =
                await returnBorrowingApi(
                    borrowingId
                );


            alert(
                response?.message ||
                "Trả sách thành công!"
            );


            await loadBorrowings();

        } catch (error) {

            console.error(
                "Return book error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Không thể trả sách"
            );

        } finally {

            setReturningId(null);

        }

    };


    // ==========================================
    // FORMAT DATE
    // ==========================================

    const formatDate = (date) => {

        if (!date) {
            return "—";
        }


        return new Date(date).toLocaleDateString(
            "vi-VN"
        );

    };


    // ==========================================
    // FORMAT MONEY
    // ==========================================

    const formatMoney = (money) => {

        return Number(
            money || 0
        ).toLocaleString("vi-VN") + " ₫";

    };


    // ==========================================
    // STATUS
    // ==========================================

    const getStatusText = (status) => {

        switch (status) {

            case "BORROWED":
                return "Đang mượn";

            case "OVERDUE":
                return "Quá hạn";

            case "RETURNED":
                return "Đã trả";

            default:
                return status || "Không xác định";

        }

    };


    const getStatusClass = (status) => {

        switch (status) {

            case "BORROWED":
                return "status borrowed";

            case "OVERDUE":
                return "status overdue";

            case "RETURNED":
                return "status returned";

            default:
                return "status";

        }

    };


    // ==========================================
    // SEARCH + FILTER
    // ==========================================

    const keyword =
        search
            .trim()
            .toLowerCase();


    const filteredBorrowings =
        borrowings.filter((item) => {

            const bookTitle =
                item.book?.title
                    ?.toLowerCase() || "";

            const author =
                item.book?.author
                    ?.toLowerCase() || "";

            const memberName =
                item.user?.fullName
                    ?.toLowerCase() || "";

            const memberEmail =
                item.user?.email
                    ?.toLowerCase() || "";


            const matchesSearch =
                !keyword ||
                bookTitle.includes(keyword) ||
                author.includes(keyword) ||
                memberName.includes(keyword) ||
                memberEmail.includes(keyword);


            const matchesStatus =
                statusFilter === "ALL" ||
                item.status === statusFilter;


            return (
                matchesSearch &&
                matchesStatus
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
                            {isMember
                                ? "Phiếu mượn của tôi"
                                : "Quản lý phiếu mượn"
                            }
                        </h2>

                        <p>
                            Theo dõi tình trạng
                            mượn và trả sách
                        </p>

                    </div>

                </div>


                <div className="loading-card">

                    <div className="loading-spinner">
                    </div>

                    <p>
                        Đang tải dữ liệu...
                    </p>

                </div>

            </div>

        );

    }


    // ==========================================
    // PAGE
    // ==========================================

    return (

        <div className="page-container">


            {/* =================================
                HEADER
            ================================= */}

            <div className="page-header">

                <div>

                    <h2>

                        {isMember
                            ? "Phiếu mượn của tôi"
                            : "Quản lý phiếu mượn"
                        }

                    </h2>

                    <p>

                        {isMember
                            ? "Theo dõi sách bạn đang mượn và lịch sử mượn sách"
                            : "Quản lý các phiếu mượn và trả sách trong thư viện"
                        }

                    </p>

                </div>

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
                SEARCH + FILTER
            ================================= */}

            <div className="borrowing-toolbar">

                <div className="search-box">

                    <input
                        type="text"
                        placeholder={
                            isMember
                                ? "🔍 Tìm kiếm sách..."
                                : "🔍 Tìm người mượn, sách, email..."
                        }
                        value={search}
                        onChange={(event) =>
                            setSearch(
                                event.target.value
                            )
                        }
                    />

                </div>


                <select
                    className="status-filter"
                    value={statusFilter}
                    onChange={(event) =>
                        setStatusFilter(
                            event.target.value
                        )
                    }
                >

                    <option value="ALL">
                        Tất cả trạng thái
                    </option>

                    <option value="BORROWED">
                        Đang mượn
                    </option>

                    <option value="OVERDUE">
                        Quá hạn
                    </option>

                    <option value="RETURNED">
                        Đã trả
                    </option>

                </select>

            </div>


            {/* =================================
                TABLE CARD
            ================================= */}

            <div className="table-card">

                <div className="table-header">

                    <div>

                        <h3>
                            {isMember
                                ? "Lịch sử mượn sách"
                                : "Danh sách phiếu mượn"
                            }
                        </h3>

                        <p>

                            {filteredBorrowings.length}
                            {" "}
                            phiếu được hiển thị

                        </p>

                    </div>

                </div>


                {/* =================================
                    EMPTY
                ================================= */}

                {filteredBorrowings.length === 0 ? (

                    <div className="empty-state">

                        <div className="empty-icon">
                            📋
                        </div>

                        <h3>
                            Không có phiếu mượn
                        </h3>

                        <p>

                            {search ||
                            statusFilter !== "ALL"

                                ? "Không tìm thấy phiếu mượn phù hợp."

                                : "Hiện chưa có phiếu mượn nào."
                            }

                        </p>

                    </div>

                ) : (

                    <div className="table-wrapper">

                        <table>

                            <thead>

                                <tr>

                                    <th>
                                        STT
                                    </th>


                                    {!isMember && (

                                        <th>
                                            Người mượn
                                        </th>

                                    )}


                                    <th>
                                        Sách
                                    </th>

                                    <th>
                                        Ngày mượn
                                    </th>

                                    <th>
                                        Hạn trả
                                    </th>

                                    <th>
                                        Ngày trả
                                    </th>

                                    <th>
                                        Trạng thái
                                    </th>

                                    <th>
                                        Tiền phạt
                                    </th>

                                    <th>
                                        Thao tác
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {filteredBorrowings.map(
                                    (item, index) => {

                                        const canReturn =
                                            item.status ===
                                                "BORROWED" ||
                                            item.status ===
                                                "OVERDUE";


                                        return (

                                            <tr
                                                key={
                                                    item._id
                                                }
                                            >

                                                {/* STT */}

                                                <td>
                                                    {index + 1}
                                                </td>


                                                {/* USER */}

                                                {!isMember && (

                                                    <td>

                                                        <div className="borrower-info">

                                                            <strong>
                                                                {
                                                                    item.user?.fullName ||
                                                                    "Không xác định"
                                                                }
                                                            </strong>

                                                            <small>
                                                                {
                                                                    item.user?.email ||
                                                                    ""
                                                                }
                                                            </small>

                                                        </div>

                                                    </td>

                                                )}


                                                {/* BOOK */}

                                                <td>

                                                    <div className="borrowed-book-info">

                                                        <strong>
                                                            {
                                                                item.book?.title ||
                                                                "Không xác định"
                                                            }
                                                        </strong>

                                                        <small>
                                                            {
                                                                item.book?.author ||
                                                                ""
                                                            }
                                                        </small>

                                                    </div>

                                                </td>


                                                {/* BORROW DATE */}

                                                <td>

                                                    {
                                                        formatDate(
                                                            item.borrowDate
                                                        )
                                                    }

                                                </td>


                                                {/* DUE DATE */}

                                                <td>

                                                    {
                                                        formatDate(
                                                            item.dueDate
                                                        )
                                                    }

                                                </td>


                                                {/* RETURN DATE */}

                                                <td>

                                                    {
                                                        formatDate(
                                                            item.returnDate
                                                        )
                                                    }

                                                </td>


                                                {/* STATUS */}

                                                <td>

                                                    <span
                                                        className={
                                                            getStatusClass(
                                                                item.status
                                                            )
                                                        }
                                                    >

                                                        {
                                                            getStatusText(
                                                                item.status
                                                            )
                                                        }

                                                    </span>

                                                </td>


                                                {/* FINE */}

                                                <td>

                                                    <strong
                                                        className={
                                                            Number(
                                                                item.fine || 0
                                                            ) > 0
                                                                ? "fine-text"
                                                                : "no-fine-text"
                                                        }
                                                    >

                                                        {
                                                            formatMoney(
                                                                item.fine
                                                            )
                                                        }

                                                    </strong>

                                                </td>


                                                {/* ACTION */}

                                                <td>

                                                    {canReturn ? (

                                                        <button
                                                            type="button"
                                                            className="return-button"
                                                            disabled={
                                                                returningId ===
                                                                item._id
                                                            }
                                                            onClick={() =>
                                                                handleReturnBook(
                                                                    item._id
                                                                )
                                                            }
                                                        >

                                                            {returningId ===
                                                            item._id

                                                                ? "Đang xử lý..."

                                                                : "↩ Trả sách"
                                                            }

                                                        </button>

                                                    ) : (

                                                        <span className="action-disabled">
                                                            —
                                                        </span>

                                                    )}

                                                </td>

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


export default Borrowings;