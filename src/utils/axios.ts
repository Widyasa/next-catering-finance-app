import axios from "axios";

export const AxiosInstance = axios.create({
    baseURL: process.env.BASE_URL
});
AxiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            const accessToken = JSON.parse(token);
            if (accessToken) {
                if (config.headers) config.headers.token = accessToken;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);