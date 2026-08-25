/*import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [error, setError] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setLoading(true);

        try {

            const response =
                await login(
                    email,
                    password
                );

            const role =
                response.data.user.role;

            if (
                role === "ADMIN" ||
                role === "LIBRARIAN"
            ) {

                navigate("/dashboard");

            } else {

                navigate("/");

            }

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.message ||
                "Email hoặc mật khẩu không chính xác"
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="login-page">

            <div className="login-card">

                <h1>
                    Library Management
                </h1>

                <p>
                    Đăng nhập vào hệ thống
                </p>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                >

                    <div className="form-group">

                        <label>
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(
                                    e.target.value
                                )
                            }
                            placeholder="Nhập email"
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>
                            Mật khẩu
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(
                                    e.target.value
                                )
                            }
                            placeholder="Nhập mật khẩu"
                            required
                        />

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Đang đăng nhập..."
                            : "Đăng nhập"}
                    </button>

                </form>

            </div>

        </div>
    );
}

export default Login;*/


import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import "../styles/auth.css";


function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();


    // ==========================================
    // FORM DATA
    // ==========================================

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });


    // ==========================================
    // STATES
    // ==========================================

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [showPassword, setShowPassword] =
        useState(false);


    // ==========================================
    // HANDLE INPUT CHANGE
    // ==========================================

    const handleChange = (event) => {

        const {
            name,
            value
        } = event.target;


        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));


        // Xóa lỗi khi người dùng nhập lại
        if (error) {
            setError("");
        }

    };


    // ==========================================
    // HANDLE LOGIN
    // ==========================================

    const handleSubmit = async (event) => {

        event.preventDefault();


        // Xóa lỗi cũ
        setError("");


        // Kiểm tra dữ liệu
        const email =
            formData.email.trim();

        const password =
            formData.password;


        if (!email) {

            setError(
                "Vui lòng nhập email."
            );

            return;
        }


        if (!password) {

            setError(
                "Vui lòng nhập mật khẩu."
            );

            return;
        }


        try {

            setLoading(true);


            // ==================================
            // LOGIN
            // AuthContext sẽ:
            // - gọi loginApi
            // - lưu token
            // - lưu user
            // ==================================

            const response =
                await login(
                    email,
                    password
                );


            console.log(
                "LOGIN SUCCESS:",
                response
            );


            // ==================================
            // LẤY ROLE
            // ==================================

            const role =
                response?.data?.user?.role;


            console.log(
                "USER ROLE:",
                role
            );


            // ==================================
            // ĐIỀU HƯỚNG
            // ==================================

            if (
                role === "ADMIN" ||
                role === "LIBRARIAN"
            ) {

                navigate("/dashboard", {
                    replace: true
                });

            } else if (
                role === "MEMBER"
            ) {

                navigate("/", {
                    replace: true
                });

            } else {

                // Trường hợp role không xác định
                setError(
                    "Tài khoản không có quyền truy cập hợp lệ."
                );

            }


        } catch (error) {

            console.error(
                "LOGIN ERROR:",
                error
            );


            console.log(
                "ERROR RESPONSE:",
                error.response?.data
            );


            // ==================================
            // HIỂN THỊ LỖI TỪ BACKEND
            // ==================================

            setError(
                error.response?.data?.message ||
                "Email hoặc mật khẩu không chính xác."
            );


        } finally {

            setLoading(false);

        }

    };


    // ==========================================
    // PAGE
    // ==========================================

    return (

        <div className="auth-page">

            <div className="auth-container">


                {/* =================================
                    LEFT - INTRODUCTION
                ================================= */}

                <div className="auth-introduction">

                    <div>

                        <h1 className="auth-brand">

                            Library
                            <br />
                            Management

                        </h1>


                        <p className="auth-subtitle">

                            Hệ thống quản lý thư viện
                            <br />

                            Hiệu quả – Nhanh chóng – Tiện lợi

                        </p>


                        <div className="library-illustration">

                            📚

                        </div>

                    </div>


                    <div className="auth-features">

                        <span>
                            🔒 Bảo mật
                        </span>

                        <span>
                            •
                        </span>

                        <span>
                            ✓ Tin cậy
                        </span>

                        <span>
                            •
                        </span>

                        <span>
                            ⚡ Hiệu quả
                        </span>

                    </div>

                </div>


                {/* =================================
                    RIGHT - LOGIN FORM
                ================================= */}

                <div className="auth-form-section">


                    {/* =================================
                        TABS
                    ================================= */}

                    <div className="auth-tabs">

                        <button
                            type="button"
                            className="auth-tab active"
                        >
                            Đăng nhập
                        </button>


                        <button
                            type="button"
                            className="auth-tab"
                            onClick={() =>
                                navigate("/register")
                            }
                        >
                            Đăng ký
                        </button>

                    </div>


                    {/* =================================
                        HEADER
                    ================================= */}

                    <h2 className="auth-form-title">

                        Đăng nhập vào hệ thống

                    </h2>


                    <p className="auth-form-description">

                        Vui lòng nhập thông tin tài khoản
                        để tiếp tục.

                    </p>


                    {/* =================================
                        ERROR
                    ================================= */}

                    {error && (

                        <div className="auth-error">

                            {error}

                        </div>

                    )}


                    {/* =================================
                        LOGIN FORM
                    ================================= */}

                    <form
                        onSubmit={handleSubmit}
                        noValidate
                    >


                        {/* =================================
                            EMAIL
                        ================================= */}

                        <div className="auth-form-group">

                            <label htmlFor="email">

                                Email

                            </label>


                            <input
                                id="email"
                                type="email"
                                name="email"
                                className="auth-input"
                                placeholder="Nhập email"
                                value={
                                    formData.email
                                }
                                onChange={
                                    handleChange
                                }
                                autoComplete="email"
                                required
                                disabled={loading}
                            />

                        </div>


                        {/* =================================
                            PASSWORD
                        ================================= */}

                        <div className="auth-form-group">

                            <label htmlFor="password">

                                Mật khẩu

                            </label>


                            <div className="password-wrapper">

                                <input
                                    id="password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="password"
                                    className="auth-input"
                                    placeholder="Nhập mật khẩu"
                                    value={
                                        formData.password
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    autoComplete="current-password"
                                    required
                                    disabled={loading}
                                />


                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() =>
                                        setShowPassword(
                                            previous =>
                                                !previous
                                        )
                                    }
                                    disabled={loading}
                                    aria-label={
                                        showPassword
                                            ? "Ẩn mật khẩu"
                                            : "Hiện mật khẩu"
                                    }
                                >

                                    {showPassword
                                        ? "🙈"
                                        : "👁️"}

                                </button>

                            </div>

                        </div>


                        {/* =================================
                            SUBMIT
                        ================================= */}

                        <button
                            type="submit"
                            className="auth-submit-button"
                            disabled={loading}
                        >

                            {loading
                                ? "Đang đăng nhập..."
                                : "Đăng nhập"
                            }

                        </button>

                    </form>


                    {/* =================================
                        REGISTER
                    ================================= */}

                    <p className="auth-bottom-text">

                        Chưa có tài khoản?

                        {" "}

                        <span
                            className="auth-link"
                            onClick={() =>
                                navigate("/register")
                            }
                        >

                            Đăng ký ngay

                        </span>

                    </p>

                </div>

            </div>

        </div>

    );

}


export default Login;