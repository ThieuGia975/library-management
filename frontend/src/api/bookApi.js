import api from "./axios";

export const getBooksApi = async () => {
    const response = await api.get("/books");

    return response.data;
};