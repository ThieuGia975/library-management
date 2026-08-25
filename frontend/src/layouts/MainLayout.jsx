import { Link, Outlet, useLocation } from "react-router-dom";

function MainLayout() {
    const location = useLocation();

    const menuItems = [
        {
            path: "/",
            label: "Dashboard",
            icon: "📊"
        },
        {
            path: "/books",
            label: "Quản lý sách",
            icon: "📚"
        },
        {
            path: "/borrowings",
            label: "Phiếu mượn",
            icon: "📖"
        },
        {
            path: "/users",
            label: "Người dùng",
            icon: "👥"
        }
    ];

    return (
        <div className="app-layout">

            {/* SIDEBAR */}
            <aside className="sidebar">

                <div className="sidebar-logo">
                    <div className="logo-icon">
                        📚
                    </div>

                    <div>
                        <h2>Library</h2>
                        <span>Management</span>
                    </div>
                </div>


                <nav className="sidebar-menu">

                    <p className="menu-title">
                        MENU
                    </p>

                    {menuItems.map((item) => {

                        const isActive =
                            location.pathname === item.path;

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={
                                    isActive
                                        ? "menu-item active"
                                        : "menu-item"
                                }
                            >
                                <span className="menu-icon">
                                    {item.icon}
                                </span>

                                <span>
                                    {item.label}
                                </span>
                            </Link>
                        );

                    })}

                </nav>


                <div className="sidebar-bottom">

                    <div className="user-box">

                        <div className="user-avatar">
                            U
                        </div>

                        <div>
                            <strong>
                                Người dùng
                            </strong>

                            <small>
                                Thành viên
                            </small>
                        </div>

                    </div>

                </div>

            </aside>


            {/* MAIN */}
            <div className="main-area">

                {/* HEADER */}
                <header className="header">

                    <div>
                        <h1>
                            Library Management System
                        </h1>

                        <p>
                            Hệ thống quản lý thư viện
                        </p>
                    </div>


                    <div className="header-user">

                        <div className="header-avatar">
                            U
                        </div>

                        <div>
                            <strong>
                                Người dùng
                            </strong>

                            <span>
                                Thành viên
                            </span>
                        </div>

                    </div>

                </header>


                {/* CONTENT */}
                <main className="content">

                    <Outlet />

                </main>

            </div>

        </div>
    );
}

export default MainLayout;