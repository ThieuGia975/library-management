import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import {
    loginApi,
    getCurrentUserApi
} from "../api/authApi";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const token =
            localStorage.getItem("token");

        if (!token) {
            setLoading(false);
            return;
        }

        const loadUser = async () => {

            try {

                const response =
                    await getCurrentUserApi();

                setUser(response.data);

            } catch (error) {

                console.error(error);

                localStorage.removeItem("token");
                setUser(null);

            } finally {

                setLoading(false);

            }
        };

        loadUser();

    }, []);

    const login = async (
        email,
        password
    ) => {

        const response =
            await loginApi(
                email,
                password
            );

        localStorage.setItem(
            "token",
            response.data.token
        );

        setUser(
            response.data.user
        );

        return response;

    };

    const logout = () => {

        localStorage.removeItem("token");

        setUser(null);

    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                logout,
                isAuthenticated:
                    !!user
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {

    return useContext(AuthContext);

};