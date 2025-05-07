import axios, { AxiosInstance } from "axios";

const base_url: string = import.meta.env.Backend_URL || 'http://localhost:5000/api';
console.log(base_url);

const axiosInstance: AxiosInstance = axios.create({
    baseURL: base_url,
    headers: { 'Content-Type': 'application/json' }
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token: string = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            setTimeout(() => {
                window.location.href = '/';
            }, 2000);
        }
        return Promise.reject(error);
    }
)
export default axiosInstance;