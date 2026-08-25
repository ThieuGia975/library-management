import api from "./api";


// ==========================================
// GET ALL USERS
// ==========================================

export const getUsersApi = async () => {

    const response = await api.get("/users");

    return response.data;
};


// ==========================================
// CREATE USER
// ==========================================

export const createUserApi = async (userData) => {

    const response = await api.post(
        "/users",
        userData
    );

    return response.data;
};


// ==========================================
// LOCK / UNLOCK USER
// ==========================================

export const toggleUserStatusApi = async (userId) => {

    const response = await api.put(
        `/users/${userId}/toggle-status`
    );

    return response.data;
};