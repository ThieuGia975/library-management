import api from "./axios";

export const getBooksApi = async () => {

    const response = await api.get("/books");

    return response.data;
};


export const getBookByIdApi = async (id) => {

    const response =
        await api.get(`/books/${id}`);

    return response.data;
};