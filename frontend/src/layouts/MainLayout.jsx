import { Link, Outlet } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";

function MainLayout() {

    const {
        user,
        logout
    } = useAuth();

    return (
        <div>

            {/* Header */}

            <header>

                <Link to="/">
                    📚 Library Management
                </Link>

                {user && (
                    <div>

                        <span>
                            Xin chào, {user.fullName}
                        </span>

                        {" | "}

                        <strong>
                            {user.role}
                        </strong>

                        {" | "}

                        <button
                            onClick={logout}
                        >
                            Đăng xuất
                        </button>

                    </div>
                )}

            </header>


            {/* Body */}

            <div>

                <Sidebar />

                <main>

                    <Outlet />

                </main>

            </div>

        </div>
    );
}

export default MainLayout;