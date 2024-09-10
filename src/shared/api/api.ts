import axios from "axios";
import { USER_LOCALSTORAGE_KEY } from "../const/localstorage";

export const $api = axios.create({
    baseURL: import.meta.env.VITE_APP_HOST,
});

$api.interceptors.request.use((config) => {
    const token = localStorage.getItem(USER_LOCALSTORAGE_KEY) || '';
    if (token) {
        config.headers['x-auth'] = token;
    }
    return config;
});