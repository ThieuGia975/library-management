import api from "./api";


// ==========================================
// BORROW BOOK
// ==========================================

export const borrowBookApi = async (bookId) => {

    const response = await api.post(
        "/borrowings",
        {
            bookId
        }
    );

    return response.data;
};


// ==========================================
// GET ALL BORROWINGS
// ADMIN / LIBRARIAN
// ==========================================

export const getBorrowingsApi = async () => {

    const response = await api.get(
        "/borrowings"
    );

    return response.data;
};


// ==========================================
// GET MY BORROWINGS
// MEMBER
// ==========================================

export const getMyBorrowingsApi = async () => {

    const response = await api.get(
        "/borrowings/my"
    );

    return response.data;
};


// ==========================================
// RETURN BOOK
// ==========================================

export const returnBorrowingApi = async (
    borrowingId
) => {

    const response = await api.post(
        `/borrowings/${borrowingId}/return`
    );

    return response.data;
};