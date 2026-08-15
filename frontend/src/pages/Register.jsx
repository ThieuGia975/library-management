import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { registerApi } from "../api/authApi";

function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        password: "",
        phone: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setLoading(true);

        try {

            await registerApi(form);

            alert(
                "Đăng ký thành công!"
            );

            navigate("/login");

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.message ||
                "Đăng ký thất bại"
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <div>

            <h1>Register</h1>

            {error && (
                <p style={{ color: "red" }}>
                    {error}
                </p>
            )}

            <form onSubmit={handleSubmit}>

                <div>
                    <label>
                        Họ và tên
                    </label>

                    <input
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>
                        Email
                    </label>

                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>
                        Mật khẩu
                    </label>

                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        minLength="6"
                        required
                    />
                </div>

                <div>
                    <label>
                        Số điện thoại
                    </label>

                    <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading
                        ? "Đang đăng ký..."
                        : "Đăng ký"}
                </button>

            </form>

        </div>
    );
}

export default Register;