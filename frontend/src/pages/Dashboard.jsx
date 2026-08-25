import { useCallback, useEffect, useState } from "react";

import { getDashboardStatsApi } from "../api/dashboardApi";
import { useAuth } from "../context/AuthContext";


function Dashboard() {

    const { user } = useAuth();


    const [stats, setStats] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    // ==========================================
    // LOAD DASHBOARD
    // ==========================================

    const loadDashboard = useCallback(async () => {

        try {

            setLoading(true);

            setError("");


            const result =
                await getDashboardStatsApi();


            /*
                API của project có thể trả:

                {
                    totalTitles: 2,
                    ...
                }

                hoặc:

                {
                    success: true,
                    data: {
                        totalTitles: 2,
                        ...
                    }
                }

                Xử lý cả hai trường hợp.
            */

            const dashboardData =
                result?.data?.totalTitles !== undefined
                    ? result.data
                    : result;


            setStats(dashboardData);


        } catch (error) {

            console.error(
                "Dashboard error:",
                error
            );


            setStats(null);


            setError(
                error?.response?.data?.message ||
                "Không thể tải dữ liệu dashboard"
            );


        } finally {

            setLoading(false);

        }

    }, []);


    // ==========================================
    // CHECK ROLE + LOAD
    // ==========================================

    useEffect(() => {

        if (!user) {

            setLoading(false);

            return;

        }


        if (
            user.role === "ADMIN" ||
            user.role === "LIBRARIAN"
        ) {

            loadDashboard();

        } else {

            setLoading(false);

        }

    }, [user, loadDashboard]);


    // ==========================================
    // CHƯA ĐĂNG NHẬP
    // ==========================================

    if (!user) {

        return (

            <div className="dashboard-page">

                <div className="welcome-card">

                    <h2>
                        Dashboard
                    </h2>

                    <p>
                        Vui lòng đăng nhập để sử dụng hệ thống.
                    </p>

                </div>

            </div>

        );

    }


    // ==========================================
    // MEMBER
    // ==========================================

    if (
        user.role !== "ADMIN" &&
        user.role !== "LIBRARIAN"
    ) {

        return (

            <div className="dashboard-page">

                <div className="page-title">

                    <div>

                        <h2>
                            Dashboard
                        </h2>

                        <p>
                            Tổng quan hệ thống thư viện
                        </p>

                    </div>

                </div>


                <div className="welcome-card">

                    <div className="welcome-icon">
                        👋
                    </div>

                    <div>

                        <h2>
                            Xin chào, {user.fullName}!
                        </h2>

                        <p>
                            Chào mừng bạn đến với
                            hệ thống quản lý thư viện.
                        </p>

                        <p>
                            Bạn có thể sử dụng menu bên trái
                            để xem sách và quản lý phiếu mượn
                            của mình.
                        </p>

                    </div>

                </div>

            </div>

        );

    }


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (

            <div className="dashboard-page">

                <div className="page-title">

                    <h2>
                        Dashboard
                    </h2>

                    <p>
                        Tổng quan hệ thống thư viện
                    </p>

                </div>


                <div className="loading-card">

                    <div className="loading-spinner"></div>

                    <p>
                        Đang tải dữ liệu dashboard...
                    </p>

                </div>

            </div>

        );

    }


    // ==========================================
    // ERROR
    // ==========================================

    if (error || !stats) {

        return (

            <div className="dashboard-page">

                <div className="page-title">

                    <div>

                        <h2>
                            Dashboard
                        </h2>

                        <p>
                            Tổng quan hệ thống thư viện
                        </p>

                    </div>

                </div>


                <div className="error-card">

                    <div className="error-icon">
                        ⚠️
                    </div>

                    <div>

                        <h3>
                            Không thể tải dashboard
                        </h3>

                        <p>
                            {error ||
                                "Không có dữ liệu dashboard"}
                        </p>


                        <button
                            className="retry-button"
                            onClick={loadDashboard}
                        >
                            Thử lại
                        </button>

                    </div>

                </div>

            </div>

        );

    }


    // ==========================================
    // SAFE VALUES
    // ==========================================

    const totalTitles =
        Number(stats.totalTitles || 0);

    const totalCopies =
        Number(stats.totalCopies || 0);

    const availableCopies =
        Number(stats.availableCopies || 0);

    const borrowedCopies =
        Number(stats.borrowedCopies || 0);

    const totalMembers =
        Number(stats.totalMembers || 0);

    const totalLibrarians =
        Number(stats.totalLibrarians || 0);

    const totalBorrowings =
        Number(stats.totalBorrowings || 0);

    const currentlyBorrowed =
        Number(stats.currentlyBorrowed || 0);

    const overdueBorrowings =
        Number(stats.overdueBorrowings || 0);

    const returnedBorrowings =
        Number(stats.returnedBorrowings || 0);

    const totalFines =
        Number(stats.totalFines || 0);


    // ==========================================
    // PERCENTAGE
    // ==========================================

    const availablePercent =
        totalCopies > 0
            ? Math.round(
                (availableCopies / totalCopies) * 100
            )
            : 0;


    const borrowedPercent =
        totalCopies > 0
            ? Math.round(
                (borrowedCopies / totalCopies) * 100
            )
            : 0;


    // ==========================================
    // RENDER
    // ==========================================

    return (

        <div className="dashboard-page">


            {/* ==================================
                TITLE
            =================================== */}

            <div className="page-title">

                <div>

                    <h2>
                        Dashboard
                    </h2>

                    <p>
                        Tổng quan hệ thống thư viện
                    </p>

                </div>

            </div>



            {/* ==================================
                STATISTICS
            =================================== */}

            <div className="stats-grid">


                {/* TOTAL TITLES */}

                <div className="stat-card">

                    <div className="stat-icon blue">
                        📚
                    </div>

                    <div className="stat-content">

                        <p>
                            Tổng đầu sách
                        </p>

                        <h3>
                            {totalTitles}
                        </h3>

                        <span>
                            Đầu sách đang hoạt động
                        </span>

                    </div>

                </div>



                {/* TOTAL COPIES */}

                <div className="stat-card">

                    <div className="stat-icon green">
                        📦
                    </div>

                    <div className="stat-content">

                        <p>
                            Tổng số bản sách
                        </p>

                        <h3>
                            {totalCopies}
                        </h3>

                        <span>
                            Tổng số bản trong thư viện
                        </span>

                    </div>

                </div>



                {/* AVAILABLE */}

                <div className="stat-card">

                    <div className="stat-icon purple">
                        ✅
                    </div>

                    <div className="stat-content">

                        <p>
                            Sách có sẵn
                        </p>

                        <h3>
                            {availableCopies}
                        </h3>

                        <span>
                            Có thể cho mượn
                        </span>

                    </div>

                </div>



                {/* BORROWED */}

                <div className="stat-card">

                    <div className="stat-icon orange">
                        📖
                    </div>

                    <div className="stat-content">

                        <p>
                            Đang được mượn
                        </p>

                        <h3>
                            {borrowedCopies}
                        </h3>

                        <span>
                            Bản sách đang lưu thông
                        </span>

                    </div>

                </div>



                {/* MEMBERS */}

                <div className="stat-card">

                    <div className="stat-icon blue">
                        👥
                    </div>

                    <div className="stat-content">

                        <p>
                            Thành viên
                        </p>

                        <h3>
                            {totalMembers}
                        </h3>

                        <span>
                            Thành viên đang hoạt động
                        </span>

                    </div>

                </div>



                {/* LIBRARIANS */}

                <div className="stat-card">

                    <div className="stat-icon purple">
                        👨‍💼
                    </div>

                    <div className="stat-content">

                        <p>
                            Thủ thư
                        </p>

                        <h3>
                            {totalLibrarians}
                        </h3>

                        <span>
                            Nhân viên thư viện
                        </span>

                    </div>

                </div>



                {/* BORROWINGS */}

                <div className="stat-card">

                    <div className="stat-icon orange">
                        📋
                    </div>

                    <div className="stat-content">

                        <p>
                            Tổng lượt mượn
                        </p>

                        <h3>
                            {totalBorrowings}
                        </h3>

                        <span>
                            Tất cả phiếu mượn
                        </span>

                    </div>

                </div>



                {/* OVERDUE */}

                <div className="stat-card">

                    <div className="stat-icon red">
                        ⚠️
                    </div>

                    <div className="stat-content">

                        <p>
                            Quá hạn
                        </p>

                        <h3>
                            {overdueBorrowings}
                        </h3>

                        <span>
                            Phiếu cần xử lý
                        </span>

                    </div>

                </div>

            </div>



            {/* ==================================
                BORROWING + BOOK STATUS
            =================================== */}

            <div className="dashboard-columns">


                {/* BORROWING STATUS */}

                <div className="dashboard-card">

                    <div className="card-header">

                        <div>

                            <h3>
                                Tình trạng phiếu mượn
                            </h3>

                            <p>
                                Thống kê trạng thái các phiếu mượn
                            </p>

                        </div>

                    </div>


                    <div className="borrow-status">


                        <div className="status-item">

                            <div className="status-label">

                                <span className="status-dot blue-dot"></span>

                                <span>
                                    Đang mượn
                                </span>

                            </div>

                            <strong>
                                {currentlyBorrowed}
                            </strong>

                        </div>



                        <div className="status-item">

                            <div className="status-label">

                                <span className="status-dot red-dot"></span>

                                <span>
                                    Quá hạn
                                </span>

                            </div>

                            <strong>
                                {overdueBorrowings}
                            </strong>

                        </div>



                        <div className="status-item">

                            <div className="status-label">

                                <span className="status-dot green-dot"></span>

                                <span>
                                    Đã trả
                                </span>

                            </div>

                            <strong>
                                {returnedBorrowings}
                            </strong>

                        </div>

                    </div>

                </div>



                {/* BOOK STATUS */}

                <div className="dashboard-card">

                    <div className="card-header">

                        <div>

                            <h3>
                                Tình trạng sách
                            </h3>

                            <p>
                                Phân bố sách trong thư viện
                            </p>

                        </div>

                    </div>


                    <div className="book-status">


                        {/* AVAILABLE */}

                        <div className="book-status-row">

                            <div>

                                <span>
                                    Sách có sẵn
                                </span>

                                <strong>
                                    {availableCopies}
                                </strong>

                            </div>


                            <div className="progress-container">

                                <div
                                    className="progress-bar available"
                                    style={{
                                        width: `${availablePercent}%`
                                    }}
                                />

                            </div>


                            <small>
                                {availablePercent}% tổng số sách
                            </small>

                        </div>



                        {/* BORROWED */}

                        <div className="book-status-row">

                            <div>

                                <span>
                                    Đang được mượn
                                </span>

                                <strong>
                                    {borrowedCopies}
                                </strong>

                            </div>


                            <div className="progress-container">

                                <div
                                    className="progress-bar borrowed"
                                    style={{
                                        width: `${borrowedPercent}%`
                                    }}
                                />

                            </div>


                            <small>
                                {borrowedPercent}% tổng số sách
                            </small>

                        </div>

                    </div>

                </div>

            </div>



            {/* ==================================
                FINE
            =================================== */}

            <div className="dashboard-card fine-card">

                <div className="fine-icon">
                    💰
                </div>


                <div className="fine-content">

                    <p>
                        Tổng tiền phạt
                    </p>

                    <h3>
                        {totalFines.toLocaleString("vi-VN")} ₫
                    </h3>

                    <span>
                        Tổng tiền phạt được ghi nhận
                        trong hệ thống
                    </span>

                </div>

            </div>


        </div>

    );

}


export default Dashboard;