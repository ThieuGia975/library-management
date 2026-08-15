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