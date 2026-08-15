import { Link } from "react-router-dom";

function Unauthorized() {

    return (
        <div>
            <h1>403</h1>

            <h2>
                Không có quyền truy cập
            </h2>

            <p>
                Bạn không có quyền truy cập
                vào trang này.
            </p>

            <Link to="/">
                Về trang chủ
            </Link>
        </div>
    );
}

export default Unauthorized;