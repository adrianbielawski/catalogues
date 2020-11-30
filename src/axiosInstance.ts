import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.API_URL,
});

instance.interceptors.request.use(request => {
    const token = localStorage.getItem('token');
    if (token) {
        request.headers.Authorization = `Token ${token}`;
    }

    return request;
});

export default instance;