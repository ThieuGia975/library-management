import { useAuth } from "../context/AuthContext";

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

        </div>
    );
}

export default LibrarianDashboard;