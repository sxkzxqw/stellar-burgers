import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'https://norma.nomoreparties.space/api/'
})