import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function LibrarianDashboard() {

    const { user } = useAuth();

    return (
        <div>

            <h1>
                Librarian Dashboard
            </h1>

            <p>
                Xin chào {user?.fullName}
            </p>

            <p>
                Role: {user?.role}
            </p>

            <Link to="/librarian/borrowings">
                📚 Quản lý lượt mượn
            </Link>
        </div>
    );
}

export default LibrarianDashboard;