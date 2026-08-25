import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { registerApi } from "../api/authApi";

import "../styles/auth.css";


function Register() {

    const navigate = useNavigate();


    // ==========================================
    // FORM DATA
    // ==========================================

    const [formData, setFormData] = useState({

        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: ""

    });


    // ==========================================
    // STATES
    // ==========================================

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");

    const [showPassword, setShowPassword] =
        useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);


    // ==========================================
    // HANDLE CHANGE
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


        if (error) {
            setError("");
        }

        if (success) {
            setSuccess("");
        }

    };


    // ==========================================
    // HANDLE REGISTER
    // ==========================================

    const handleSubmit = async (event) => {

        event.preventDefault();


        setError("");
        setSuccess("");


        // ======================================
        // VALIDATE
        // ======================================

        const fullName =
            formData.fullName.trim();

        const email =
            formData.email.trim();

        const password =
            formData.password;

        const confirmPassword =
            formData.confirmPassword;

        const phone =
            formData.phone.trim();


        if (!fullName) {

            setError(
                "Vui lòng nhập họ và tên."
            );

            return;
        }


        if (!email) {

            setError(
                "Vui lòng nhập email."
            );

            return;
        }


        if (password.length < 6) {

            setError(
                "Mật khẩu phải có ít nhất 6 ký tự."
            );

            return;
        }


        if (password !== confirmPassword) {

            setError(
                "Mật khẩu xác nhận không khớp."
            );

            return;
        }


        try {

            setLoading(true);


            // ==================================
            // REGISTER
            // ==================================

            const response =
                await registerApi({

                    fullName,

                    email,

                    password,

                    phone

                });


            console.log(
                "REGISTER SUCCESS:",
                response
            );


            setSuccess(
                "Đăng ký tài khoản thành công!"
            );


            // ==================================
            // RESET FORM
            // ==================================

            setFormData({

                fullName: "",
                email: "",
                password: "",
                confirmPassword: "",
                phone: ""

            });


            // ==================================
            // CHUYỂN VỀ LOGIN
            // ==================================

            setTimeout(() => {

                navigate("/login");

            }, 1500);


        } catch (error) {

            console.error(
                "REGISTER ERROR:",
                error
            );


            console.log(
                "ERROR RESPONSE:",
                error.response?.data
            );


            setError(

                error.response?.data?.message ||

                "Không thể đăng ký tài khoản."

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
                    LEFT
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
                    RIGHT
                ================================= */}

                <div className="auth-form-section">


                    {/* =================================
                        TABS
                    ================================= */}

                    <div className="auth-tabs">

                        <button
                            type="button"
                            className="auth-tab"
                            onClick={() =>
                                navigate("/login")
                            }
                        >

                            Đăng nhập

                        </button>


                        <button
                            type="button"
                            className="auth-tab active"
                        >

                            Đăng ký

                        </button>

                    </div>


                    {/* =================================
                        HEADER
                    ================================= */}

                    <h2 className="auth-form-title">

                        Tạo tài khoản

                    </h2>


                    <p className="auth-form-description">

                        Nhập thông tin để tạo tài khoản
                        thư viện mới.

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
                        SUCCESS
                    ================================= */}

                    {success && (

                        <div className="auth-success">

                            ✓ {success}

                        </div>

                    )}


                    {/* =================================
                        FORM
                    ================================= */}

                    <form
                        onSubmit={handleSubmit}
                        noValidate
                    >


                        {/* =================================
                            FULL NAME
                        ================================= */}

                        <div className="auth-form-group">

                            <label htmlFor="fullName">

                                Họ và tên

                            </label>


                            <input
                                id="fullName"
                                type="text"
                                name="fullName"
                                className="auth-input"
                                placeholder="Nhập họ và tên"
                                value={
                                    formData.fullName
                                }
                                onChange={
                                    handleChange
                                }
                                autoComplete="name"
                                required
                                disabled={loading}
                            />

                        </div>


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
                                placeholder="example@gmail.com"
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
                            PHONE
                        ================================= */}

                        <div className="auth-form-group">

                            <label htmlFor="phone">

                                Số điện thoại

                            </label>


                            <input
                                id="phone"
                                type="tel"
                                name="phone"
                                className="auth-input"
                                placeholder="Nhập số điện thoại"
                                value={
                                    formData.phone
                                }
                                onChange={
                                    handleChange
                                }
                                autoComplete="tel"
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
                                    placeholder="Tối thiểu 6 ký tự"
                                    value={
                                        formData.password
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    autoComplete="new-password"
                                    minLength={6}
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
                                >

                                    {showPassword
                                        ? "🙈"
                                        : "👁️"}

                                </button>

                            </div>

                        </div>


                        {/* =================================
                            CONFIRM PASSWORD
                        ================================= */}

                        <div className="auth-form-group">

                            <label htmlFor="confirmPassword">

                                Xác nhận mật khẩu

                            </label>


                            <div className="password-wrapper">

                                <input
                                    id="confirmPassword"
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="confirmPassword"
                                    className="auth-input"
                                    placeholder="Nhập lại mật khẩu"
                                    value={
                                        formData.confirmPassword
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    autoComplete="new-password"
                                    required
                                    disabled={loading}
                                />


                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            previous =>
                                                !previous
                                        )
                                    }
                                    disabled={loading}
                                >

                                    {showConfirmPassword
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
                                ? "Đang tạo tài khoản..."
                                : "Đăng ký"
                            }

                        </button>

                    </form>


                    {/* =================================
                        LOGIN
                    ================================= */}

                    <p className="auth-bottom-text">

                        Đã có tài khoản?

                        {" "}

                        <span
                            className="auth-link"
                            onClick={() =>
                                navigate("/login")
                            }
                        >

                            Đăng nhập

                        </span>

                    </p>

                </div>

            </div>

        </div>

    );

}


export default Register;