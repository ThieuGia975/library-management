import api from "./axios";


export const borrowBookApi = async (bookId) => {

    const response = await api.post(
        "/borrowings",
        {
            bookId
        }
    );

    return response.data;
};


export const getMyBorrowingsApi = async () => {

    const response = await api.get(
        "/borrowings/my"
    );

    return response.data;
};

export const returnBorrowingApi = async (borrowingId) => {

    const response = await api.post(
        `/borrowings/${borrowingId}/return`
    );

    return response.data;
};