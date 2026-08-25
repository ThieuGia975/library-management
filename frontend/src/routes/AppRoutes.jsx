import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

function Dashboard() {
    return (
        <div>
            <h2>Dashboard</h2>
            <p>
                Chào mừng bạn đến với hệ thống quản lý thư viện.
            </p>
        </div>
    );
}

function Books() {
    return (
        <div>
            <h2>Quản lý sách</h2>
            <p>Danh sách sách trong thư viện.</p>
        </div>
    );
}

function Borrowings() {
    return (
        <div>
            <h2>Phiếu mượn</h2>
            <p>Quản lý các phiếu mượn sách.</p>
        </div>
    );
}

function Users() {
    return (
        <div>
            <h2>Người dùng</h2>
            <p>Quản lý người dùng.</p>
        </div>
    );
}

function AppRoutes() {
    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<MainLayout />}
                >

                    <Route
                        index
                        element={<Dashboard />}
                    />

                    <Route
                        path="books"
                        element={<Books />}
                    />

                    <Route
                        path="borrowings"
                        element={<Borrowings />}
                    />

                    <Route
                        path="users"
                        element={<Users />}
                    />

                </Route>

            </Routes>

        </BrowserRouter>
    );
}

export default AppRoutes;