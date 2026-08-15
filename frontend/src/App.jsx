import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Unauthorized from "./pages/Unauthorized";

import MemberDashboard
    from "./pages/MemberDashboard";

import LibrarianDashboard
    from "./pages/LibrarianDashboard";

import AdminDashboard
    from "./pages/AdminDashboard";

import ProtectedRoute
    from "./components/ProtectedRoute";

function Home() {

    return (
        <div>

            <h1>
                Library Management System
            </h1>

            <p>
                Trang chủ
            </p>

            <Link to="/login">
                Đăng nhập
            </Link>

            <br />

            <Link to="/register">
                Đăng ký
            </Link>

        </div>
    );
}

function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* Public routes */}

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/unauthorized"
                    element={<Unauthorized />}
                />


                {/* MEMBER */}

                <Route
                    element={
                        <ProtectedRoute
                            allowedRoles={[
                                "MEMBER"
                            ]}
                        />
                    }
                >

                    <Route
                        path="/member"
                        element={
                            <MemberDashboard />
                        }
                    />

                </Route>


                {/* LIBRARIAN */}

                <Route
                    element={
                        <ProtectedRoute
                            allowedRoles={[
                                "LIBRARIAN",
                                "ADMIN"
                            ]}
                        />
                    }
                >

                    <Route
                        path="/librarian"
                        element={
                            <LibrarianDashboard />
                        }
                    />

                </Route>


                {/* ADMIN */}

                <Route
                    element={
                        <ProtectedRoute
                            allowedRoles={[
                                "ADMIN"
                            ]}
                        />
                    }
                >

                    <Route
                        path="/admin"
                        element={
                            <AdminDashboard />
                        }
                    />

                </Route>

            </Routes>

        </BrowserRouter>
    );
}

export default App;