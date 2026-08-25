import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Layout from "./components/Layout";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import Borrowings from "./pages/Borrowings";
import Users from "./pages/Users";
import BookDetail from "./pages/BookDetail";
import Register from "./pages/Register";

function App() {

    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />
                <Route
                    path="/"
                    element={<Layout />}
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
                        path="books/:id"
                        element={<BookDetail />}
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

export default App;