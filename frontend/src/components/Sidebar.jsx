import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Sidebar() {

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {

        logout();

        navigate("/login");
    };

    return (
        <aside className="sidebar">

            <div className="logo">

                <div className="logo-icon">
                    📚
                </div>

                <div>
                    <h2>Library</h2>
                    <span>Management</span>
                </div>

            </div>


            <div className="menu-title">
                MENU
            </div>


            <nav>

                <NavLink to="/">
                    📊
                    <span>Dashboard</span>
                </NavLink>


                <NavLink to="/books">
                    📚
                    <span>Quản lý sách</span>
                </NavLink>


                <NavLink to="/borrowings">
                    📖
                    <span>Phiếu mượn</span>
                </NavLink>


                {user?.role === "ADMIN" && (
                    <NavLink to="/users">
                        👥
                        <span>Người dùng</span>
                    </NavLink>
                )}

            </nav>


            <div className="sidebar-bottom">

                <div className="user-mini">

                    <div className="avatar">
                        {user?.fullName?.charAt(0).toUpperCase()}
                    </div>

                    <div>

                        <strong>
                            {user?.fullName}
                        </strong>

                        <small>
                            {user?.role}
                        </small>

                    </div>

                </div>


                <button
                    className="logout-button"
                    onClick={handleLogout}
                >
                    🚪 Đăng xuất
                </button>

            </div>

        </aside>
    );
}

export default Sidebar;