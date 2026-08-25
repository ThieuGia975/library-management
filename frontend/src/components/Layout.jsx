import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Layout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="app-layout">

            {/* ================= SIDEBAR ================= */}
            <aside className="sidebar">

                {/* LOGO */}
                <div className="sidebar-logo">

                    <div className="logo-icon">
                        📚
                    </div>

                    <div className="logo-text">
                        <h1>Library</h1>
                        <span>Management</span>
                    </div>

                </div>


                {/* MENU */}
                <div className="sidebar-menu">

                    <p className="menu-title">
                        MENU
                    </p>

                    <nav className="nav-menu">

                        <NavLink
                            to="/"
                            end
                            className={({ isActive }) =>
                                isActive
                                    ? "nav-item active"
                                    : "nav-item"
                            }
                        >
                            <span className="nav-icon">📊</span>
                            <span>Dashboard</span>
                        </NavLink>


                        <NavLink
                            to="/books"
                            className={({ isActive }) =>
                                isActive
                                    ? "nav-item active"
                                    : "nav-item"
                            }
                        >
                            <span className="nav-icon">📚</span>
                            <span>Quản lý sách</span>
                        </NavLink>


                        <NavLink
                            to="/borrowings"
                            className={({ isActive }) =>
                                isActive
                                    ? "nav-item active"
                                    : "nav-item"
                            }
                        >
                            <span className="nav-icon">📖</span>
                            <span>Phiếu mượn</span>
                        </NavLink>


                        {user?.role === "ADMIN" && (
                            <NavLink
                                to="/users"
                                className={({ isActive }) =>
                                    isActive
                                        ? "nav-item active"
                                        : "nav-item"
                                }
                            >
                                <span className="nav-icon">👥</span>
                                <span>Người dùng</span>
                            </NavLink>
                        )}

                    </nav>

                </div>


                {/* USER BOTTOM */}
                <div className="sidebar-user">

                    <div className="user-avatar">
                        {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
                    </div>

                    <div className="user-info">

                        <strong>
                            {user?.fullName || "Người dùng"}
                        </strong>

                        <span>
                            {user?.role || "MEMBER"}
                        </span>

                    </div>

                </div>

            </aside>


            {/* ================= MAIN ================= */}
            <div className="main-area">

                {/* TOP HEADER */}
                <header className="topbar">

                    <div className="topbar-title">

                        <h1>
                            Library Management System
                        </h1>

                        <p>
                            Hệ thống quản lý thư viện
                        </p>

                    </div>


                    <div className="topbar-user">

                        <div className="topbar-avatar">
                            {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
                        </div>

                        <div className="topbar-user-info">

                            <strong>
                                {user?.fullName || "Người dùng"}
                            </strong>

                            <span>
                                {user?.role || "MEMBER"}
                            </span>

                        </div>

                        <button
                            className="logout-button"
                            onClick={handleLogout}
                        >
                            Đăng xuất
                        </button>

                    </div>

                </header>


                {/* PAGE CONTENT */}
                <main className="content">
                    <Outlet />
                </main>

            </div>

        </div>
    );
}

export default Layout;