import { useAuth } from "../context/AuthContext";

function Header() {

    const { user } = useAuth();

    return (
        <header className="header">

            <div>

                <h1>
                    Library Management System
                </h1>

                <p>
                    Hệ thống quản lý thư viện
                </p>

            </div>


            <div className="header-user">

                <div className="header-avatar">
                    {user?.fullName?.charAt(0).toUpperCase()}
                </div>

                <div>

                    <strong>
                        {user?.fullName}
                    </strong>

                    <span>
                        {user?.role}
                    </span>

                </div>

            </div>

        </header>
    );
}

export default Header;