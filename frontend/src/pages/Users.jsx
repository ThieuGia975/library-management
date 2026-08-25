import { useEffect, useMemo, useState } from "react";

import {
    getUsersApi,
    createUserApi,
    toggleUserStatusApi
} from "../api/userApi";

import { useAuth } from "../context/AuthContext";


// ==========================================
// INITIAL FORM
// ==========================================

const initialFormData = {
    fullName: "",
    email: "",
    password: "",
    phone: "",
    role: "MEMBER"
};


// ==========================================
// USERS PAGE
// ==========================================

function Users() {

    const { user } = useAuth();


    // ==========================================
    // STATES
    // ==========================================

    const [users, setUsers] = useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [search, setSearch] =
        useState("");

    const [roleFilter, setRoleFilter] =
        useState("ALL");

    const [showCreateForm, setShowCreateForm] =
        useState(false);

    const [creating, setCreating] =
        useState(false);

    const [formData, setFormData] =
        useState(initialFormData);

    const [updatingUserId, setUpdatingUserId] =
        useState(null);

    // ==========================================
    // PERMISSION
    // ==========================================

    const isAdmin =
        user?.role === "ADMIN";


    // ==========================================
    // LOAD USERS
    // ==========================================

    const loadUsers = async () => {

        try {

            setLoading(true);

            setError("");

            const response =
                await getUsersApi();

            setUsers(
                Array.isArray(response?.data)
                    ? response.data
                    : []
            );

        } catch (error) {

            console.error(
                "Load users error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Không thể tải danh sách người dùng"
            );

        } finally {

            setLoading(false);

        }

    };


    // ==========================================
    // LOAD WHEN PAGE OPENS
    // ==========================================

    useEffect(() => {

        if (isAdmin) {
            loadUsers();
        } else {
            setLoading(false);
        }

    }, [isAdmin]);


    // ==========================================
    // FORM CHANGE
    // ==========================================

    const handleFormChange = (event) => {

        const {
            name,
            value
        } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));

    };


    // ==========================================
    // RESET FORM
    // ==========================================

    const resetForm = () => {

        setFormData({
            ...initialFormData
        });

    };


    // ==========================================
    // OPEN CREATE FORM
    // ==========================================

    const handleOpenCreateForm = () => {

        setError("");

        resetForm();

        setShowCreateForm(true);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };


    // ==========================================
    // CLOSE CREATE FORM
    // ==========================================

    const handleCloseCreateForm = () => {

        if (creating) {
            return;
        }

        setShowCreateForm(false);

        resetForm();

    };


    // ==========================================
    // CREATE USER
    // ==========================================

    const handleCreateUser = async (event) => {

        event.preventDefault();

        try {

            setCreating(true);

            setError("");

            const userData = {

                fullName:
                    formData.fullName.trim(),

                email:
                    formData.email.trim(),

                password:
                    formData.password,

                phone:
                    formData.phone.trim(),

                role:
                    formData.role

            };


            await createUserApi(
                userData
            );


            alert(
                "Tạo người dùng thành công!"
            );


            setShowCreateForm(false);

            resetForm();

            await loadUsers();

        } catch (error) {

            console.error(
                "Create user error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Không thể tạo người dùng"
            );

        } finally {

            setCreating(false);

        }

    };

// ==========================================
// LOCK / UNLOCK USER
// ==========================================

const handleToggleUserStatus = async (item) => {

    const isActive =
        item.isActive !== false;

    const action =
        isActive
            ? "khóa"
            : "mở khóa";


    const confirmed =
        window.confirm(
            `Bạn có chắc chắn muốn ${action} tài khoản "${item.fullName}"?`
        );


    if (!confirmed) {
        return;
    }


    try {

        setUpdatingUserId(item._id);

        setError("");


        await toggleUserStatusApi(
            item._id
        );


        alert(
            isActive
                ? "Đã khóa tài khoản thành công!"
                : "Đã mở khóa tài khoản thành công!"
        );


        await loadUsers();

    } catch (error) {

        console.error(
            "Toggle user status error:",
            error
        );


        setError(
            error.response?.data?.message ||
            `Không thể ${action} tài khoản`
        );

    } finally {

        setUpdatingUserId(null);

    }

};

    // ==========================================
    // FILTER USERS
    // ==========================================

    const filteredUsers = useMemo(() => {

        const keyword =
            search
                .trim()
                .toLowerCase();


        return users.filter((item) => {

            const matchesSearch =

                !keyword ||

                item.fullName
                    ?.toLowerCase()
                    .includes(keyword)

                ||

                item.email
                    ?.toLowerCase()
                    .includes(keyword)

                ||

                item.phone
                    ?.toLowerCase()
                    .includes(keyword);


            const matchesRole =

                roleFilter === "ALL" ||

                item.role === roleFilter;


            return (
                matchesSearch &&
                matchesRole
            );

        });

    }, [
        users,
        search,
        roleFilter
    ]);


    // ==========================================
    // STATISTICS
    // ==========================================

    const totalUsers =
        users.length;

    const totalMembers =
        users.filter(
            (item) =>
                item.role === "MEMBER"
        ).length;

    const totalLibrarians =
        users.filter(
            (item) =>
                item.role === "LIBRARIAN"
        ).length;

    const activeUsers =
        users.filter(
            (item) =>
                item.isActive !== false
        ).length;


    // ==========================================
    // ROLE LABEL
    // ==========================================

    const getRoleLabel = (role) => {

        switch (role) {

            case "ADMIN":
                return "Quản trị viên";

            case "LIBRARIAN":
                return "Thủ thư";

            case "MEMBER":
                return "Thành viên";

            default:
                return role || "Không xác định";

        }

    };


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (

            <div className="page-container">

                <div className="page-header">

                    <div>

                        <h2>
                            Quản lý người dùng
                        </h2>

                        <p>
                            Quản lý tài khoản trong hệ thống
                        </p>

                    </div>

                </div>


                <div className="loading-card">

                    <div className="loading-spinner">
                    </div>

                    <p>
                        Đang tải danh sách người dùng...
                    </p>

                </div>

            </div>

        );

    }


    // ==========================================
    // NON ADMIN
    // ==========================================

    if (!isAdmin) {

        return (

            <div className="page-container">

                <div className="error-box">

                    Bạn không có quyền
                    truy cập trang quản lý người dùng.

                </div>

            </div>

        );

    }


    // ==========================================
    // PAGE
    // ==========================================

    return (

        <div className="page-container">


            {/* =================================
                PAGE HEADER
            ================================= */}

            <div className="page-header">

                <div>

                    <h2>
                        Quản lý người dùng
                    </h2>

                    <p>
                        Quản lý tài khoản thành viên
                        và thủ thư trong hệ thống
                    </p>

                </div>


                <button
                    type="button"
                    className="primary-button"
                    onClick={
                        handleOpenCreateForm
                    }
                >
                    + Thêm người dùng
                </button>

            </div>


            {/* =================================
                ERROR
            ================================= */}

            {error && (

                <div className="error-box">

                    <strong>
                        Có lỗi:
                    </strong>

                    <span>
                        {" "}
                        {error}
                    </span>

                </div>

            )}


            {/* =================================
                STATISTICS
            ================================= */}

            <div className="stats-grid">


                {/* TOTAL */}

                <div className="stat-card">

                    <div className="stat-icon blue">
                        👥
                    </div>

                    <div>

                        <p>
                            Tổng người dùng
                        </p>

                        <h3>
                            {totalUsers}
                        </h3>

                    </div>

                </div>


                {/* MEMBERS */}

                <div className="stat-card">

                    <div className="stat-icon green">
                        👤
                    </div>

                    <div>

                        <p>
                            Thành viên
                        </p>

                        <h3>
                            {totalMembers}
                        </h3>

                    </div>

                </div>


                {/* LIBRARIANS */}

                <div className="stat-card">

                    <div className="stat-icon purple">
                        👨‍💼
                    </div>

                    <div>

                        <p>
                            Thủ thư
                        </p>

                        <h3>
                            {totalLibrarians}
                        </h3>

                    </div>

                </div>


                {/* ACTIVE */}

                <div className="stat-card">

                    <div className="stat-icon orange">
                        ✓
                    </div>

                    <div>

                        <p>
                            Đang hoạt động
                        </p>

                        <h3>
                            {activeUsers}
                        </h3>

                    </div>

                </div>

            </div>


            {/* =================================
                CREATE FORM
            ================================= */}

            {showCreateForm && (

                <div className="form-card">


                    <div className="form-header">

                        <div>

                            <h3>
                                Thêm người dùng
                            </h3>

                            <p>
                                Tạo tài khoản thành viên
                                hoặc thủ thư
                            </p>

                        </div>


                        <button
                            type="button"
                            className="close-button"
                            onClick={
                                handleCloseCreateForm
                            }
                            disabled={creating}
                        >
                            ✕
                        </button>

                    </div>


                    <form
                        className="book-form"
                        onSubmit={
                            handleCreateUser
                        }
                    >


                        <div className="form-grid">


                            {/* FULL NAME */}

                            <div className="form-group">

                                <label>
                                    Họ và tên *
                                </label>

                                <input
                                    type="text"
                                    name="fullName"
                                    value={
                                        formData.fullName
                                    }
                                    onChange={
                                        handleFormChange
                                    }
                                    placeholder="Nhập họ và tên"
                                    required
                                    disabled={creating}
                                />

                            </div>


                            {/* EMAIL */}

                            <div className="form-group">

                                <label>
                                    Email *
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    value={
                                        formData.email
                                    }
                                    onChange={
                                        handleFormChange
                                    }
                                    placeholder="example@gmail.com"
                                    required
                                    disabled={creating}
                                />

                            </div>


                            {/* PASSWORD */}

                            <div className="form-group">

                                <label>
                                    Mật khẩu *
                                </label>

                                <input
                                    type="password"
                                    name="password"
                                    value={
                                        formData.password
                                    }
                                    onChange={
                                        handleFormChange
                                    }
                                    placeholder="Tối thiểu 6 ký tự"
                                    minLength={6}
                                    required
                                    disabled={creating}
                                />

                            </div>


                            {/* PHONE */}

                            <div className="form-group">

                                <label>
                                    Số điện thoại
                                </label>

                                <input
                                    type="tel"
                                    name="phone"
                                    value={
                                        formData.phone
                                    }
                                    onChange={
                                        handleFormChange
                                    }
                                    placeholder="Nhập số điện thoại"
                                    disabled={creating}
                                />

                            </div>


                            {/* ROLE */}

                            <div className="form-group">

                                <label>
                                    Vai trò *
                                </label>

                                <select
                                    name="role"
                                    value={
                                        formData.role
                                    }
                                    onChange={
                                        handleFormChange
                                    }
                                    required
                                    disabled={creating}
                                >

                                    <option value="MEMBER">
                                        Thành viên
                                    </option>

                                    <option value="LIBRARIAN">
                                        Thủ thư
                                    </option>

                                </select>

                            </div>

                        </div>


                        {/* FORM ACTIONS */}

                        <div className="form-actions">

                            <button
                                type="button"
                                className="cancel-button"
                                onClick={
                                    handleCloseCreateForm
                                }
                                disabled={creating}
                            >
                                Hủy
                            </button>


                            <button
                                type="submit"
                                className="primary-button"
                                disabled={creating}
                            >

                                {creating
                                    ? "Đang tạo..."
                                    : "Tạo người dùng"
                                }

                            </button>

                        </div>

                    </form>

                </div>

            )}


            {/* =================================
                FILTER
            ================================= */}

            <div className="search-box">

                <input
                    type="text"
                    placeholder="🔍 Tìm kiếm theo họ tên, email hoặc số điện thoại..."
                    value={search}
                    onChange={(event) =>
                        setSearch(
                            event.target.value
                        )
                    }
                />


                <select
                    value={roleFilter}
                    onChange={(event) =>
                        setRoleFilter(
                            event.target.value
                        )
                    }
                >

                    <option value="ALL">
                        Tất cả vai trò
                    </option>

                    <option value="MEMBER">
                        Thành viên
                    </option>

                    <option value="LIBRARIAN">
                        Thủ thư
                    </option>

                    <option value="ADMIN">
                        Quản trị viên
                    </option>

                </select>

            </div>


            {/* =================================
                USER TABLE
            ================================= */}

            <div className="table-card">


                {/* TABLE HEADER */}

                <div className="table-header">

                    <div>

                        <h3>
                            Danh sách người dùng
                        </h3>

                        <p>

                            {filteredUsers.length}
                            {" "}
                            người dùng được hiển thị

                        </p>

                    </div>


                    {(search ||
                        roleFilter !== "ALL") && (

                        <button
                            type="button"
                            className="clear-search-button"
                            onClick={() => {

                                setSearch("");

                                setRoleFilter(
                                    "ALL"
                                );

                            }}
                        >
                            Xóa bộ lọc
                        </button>

                    )}

                </div>

                {/* EMPTY */}

                {filteredUsers.length === 0 ? (

                    <div className="empty-state">

                        <div className="empty-icon">
                            👥
                        </div>

                        <h3>
                            Không tìm thấy người dùng
                        </h3>

                        <p>

                            {search ||
                            roleFilter !== "ALL"

                                ? "Không có người dùng phù hợp với điều kiện tìm kiếm."

                                : "Hệ thống chưa có người dùng."
                            }

                        </p>


                        {!search &&
                            roleFilter === "ALL" && (

                                <button
                                    type="button"
                                    className="primary-button"
                                    onClick={
                                        handleOpenCreateForm
                                    }
                                >
                                    + Thêm người dùng
                                </button>

                            )}

                    </div>

                ) : (

                    <div className="table-wrapper">

                        <table>

                            <thead>

                                <tr>

                                    <th>
                                        STT
                                    </th>

                                    <th>
                                        Người dùng
                                    </th>

                                    <th>
                                        Email
                                    </th>

                                    <th>
                                        Số điện thoại
                                    </th>

                                    <th>
                                        Vai trò
                                    </th>

                                    <th>
                                        Trạng thái
                                    </th>

                                    <th>
                                        Thao tác
                                    </th>
                                </tr>

                            </thead>


                            <tbody>

                                {filteredUsers.map(
                                    (item, index) => {

                                        const active =
                                            item.isActive !== false;


                                        return (

                                            <tr
                                                key={
                                                    item._id
                                                }
                                            >


                                                {/* INDEX */}

                                                <td>
                                                    {index + 1}
                                                </td>


                                                {/* USER */}

                                                <td>

                                                    <div className="book-info">

                                                        <div className="user-avatar">
                                                            {item.fullName
                                                                ?.charAt(0)
                                                                ?.toUpperCase() ||
                                                                "U"}
                                                        </div>


                                                        <div>

                                                            <strong>
                                                                {
                                                                    item.fullName
                                                                }
                                                            </strong>

                                                            <small>
                                                                ID:{" "}
                                                                {
                                                                    item._id
                                                                }
                                                            </small>

                                                        </div>

                                                    </div>

                                                </td>


                                                {/* EMAIL */}

                                                <td>
                                                    {
                                                        item.email
                                                    }
                                                </td>


                                                {/* PHONE */}

                                                <td>
                                                    {
                                                        item.phone ||
                                                        "Chưa cập nhật"
                                                    }
                                                </td>


                                                {/* ROLE */}

                                                <td>

                                                    <span
                                                        className={
                                                            `role-badge role-${String(
                                                                item.role ||
                                                                ""
                                                            ).toLowerCase()}`
                                                        }
                                                    >

                                                        {
                                                            getRoleLabel(
                                                                item.role
                                                            )
                                                        }

                                                    </span>

                                                </td>


                                                {/* STATUS */}

                                                <td>

                                                    {active ? (

                                                        <span className="status available">
                                                            Hoạt động
                                                        </span>

                                                    ) : (

                                                        <span className="status unavailable">
                                                            Đã khóa
                                                        </span>

                                                    )}

                                                </td>

                                                <td>

    {item.role === "ADMIN" ? (

        <span className="action-disabled">
            Không thể khóa
        </span>

    ) : (

        <button
            type="button"
            className={
                active
                    ? "lock-button"
                    : "unlock-button"
            }
            onClick={() =>
                handleToggleUserStatus(item)
            }
            disabled={
                updatingUserId === item._id
            }
        >

            {updatingUserId === item._id
                ? "Đang xử lý..."
                : active
                    ? "🔒 Khóa"
                    : "🔓 Mở khóa"
            }

        </button>

    )}

</td>

                                            </tr>

                                        );

                                    }
                                )}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </div>

    );

}


export default Users;