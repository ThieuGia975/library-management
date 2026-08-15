import { useAuth } from "../context/AuthContext";

function MemberDashboard() {

    const { user } = useAuth();

    return (
        <div>

            <h1>
                Member Dashboard
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

export default MemberDashboard;