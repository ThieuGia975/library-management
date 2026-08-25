import api from "./api";


// ==========================================
// GET ALL BOOKS
// ==========================================

export const getBooksApi = async (params = {}) => {

    const response = await api.get(
        "/books",
        {
            params
        }
    );

    return response.data;
};


// ==========================================
// GET BOOK BY ID
// ==========================================

export const getBookByIdApi = async (id) => {

    const response = await api.get(
        `/books/${id}`
    );

    return response.data;
};


// ==========================================
// CREATE BOOK
// ==========================================

export const createBookApi = async (data) => {

    const response = await api.post(
        "/books",
        data
    );

    return response.data;
};


// ==========================================
// UPDATE BOOK
// ==========================================

export const updateBookApi = async (
    id,
    data
) => {

    const response = await api.put(
        `/books/${id}`,
        data
    );

    return response.data;
};


// ==========================================
// DELETE / DEACTIVATE BOOK
// ==========================================

export const deleteBookApi = async (id) => {

    const response = await api.delete(
        `/books/${id}`
    );

    return response.data;
};
