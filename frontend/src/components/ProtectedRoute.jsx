import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ allowedRoles }) {

    const {
        user,
        loading
    } = useAuth();

    // Đang kiểm tra token
    if (loading) {
        return (
            <div>
                Đang kiểm tra đăng nhập...
            </div>
        );
    }

    // Chưa đăng nhập
    if (!user) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    // Có đăng nhập nhưng không đủ quyền
    if (
        allowedRoles &&
        !allowedRoles.includes(user.role)
    ) {
        return (
            <Navigate
                to="/unauthorized"
                replace
            />
        );
    }

    return <Outlet />;
}

export default ProtectedRoute;