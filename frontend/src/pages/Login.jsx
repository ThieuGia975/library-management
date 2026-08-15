import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setLoading(true);

        try {

            await login(email, password);

            navigate("/");

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
        <div>

            <h1>Login</h1>

            {error && (
                <p style={{ color: "red" }}>
                    {error}
                </p>
            )}

            <form onSubmit={handleSubmit}>

                <div>
                    <label>
                        Email
                    </label>

                    <input
                        type="email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                    />
                </div>

                <div>
                    <label>
                        Password
                    </label>

                    <input
                        type="password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
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
    );
}

export default Login;