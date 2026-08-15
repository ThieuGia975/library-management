import MyBorrowings from "./pages/MyBorrowings";

import {
    BrowserRouter,
    Routes,
    Route
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

import Books from "./pages/Books";


import ProtectedRoute
    from "./components/ProtectedRoute";

import MainLayout
    from "./layouts/MainLayout";

 import BookDetail from "./pages/BookDetail";

function Home() {

    return (
        <div>

            <h1>
                Library Management System
            </h1>

            <p>
                Chào mừng bạn đến với hệ thống
                quản lý thư viện.
            </p>

        </div>
    );
}


function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* =========================
                    Public pages
                ========================== */}

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


                {/* =========================
                    Main Layout
                ========================== */}

                <Route
                    element={<MainLayout />}
                >

                    <Route
                        path="/"
                        element={<Home />}
                    />
                    {/* Danh sách sách */}

                      <Route
                          path="/books"
                          element={<Books />}
                     />

                     <Route
                          path="/books/:id"
                          element={<BookDetail />}
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

                        <Route
                            path="/my-borrowings"
                            element={
                                <MyBorrowings />
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

                </Route>

            </Routes>

        </BrowserRouter>
    );
}

export default App;