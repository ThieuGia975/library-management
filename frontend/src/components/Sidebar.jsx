import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Sidebar() {

    const { user } = useAuth();

    if (!user) {
        return null;
    }

    return (
        <aside>

            <h3>
                Menu
            </h3>

            <nav>

                <div>
                    <Link to="/">
                        🏠 Trang chủ
                    </Link>
                </div>

                <div>
                    <Link to="/books">
                        📚 Sách
                    </Link>
                </div>


                {user.role === "MEMBER" && (
                    <div>
                        <Link to="/member">
                            👤 Trang thành viên
                        </Link>
                    </div>
                )}


                {(user.role === "LIBRARIAN" ||
                    user.role === "ADMIN") && (

                    <div>
                        <Link to="/librarian">
                            📖 Thủ thư
                        </Link>
                    </div>

                )}


                {user.role === "ADMIN" && (

                    <div>
                        <Link to="/admin">
                            ⚙️ Quản trị
                        </Link>
                    </div>

                )}

            </nav>

        </aside>
    );
}

export default Sidebar;