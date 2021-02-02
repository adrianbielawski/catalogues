import axios from 'axios'
import Axios from 'axios-observable'

export const axiosInstance = axios.create({
    baseURL: process.env.API_URL,
})

axiosInstance.interceptors.request.use(request => {
    const token = localStorage.getItem('token')
    if (token) {
        request.headers.Authorization = `Token ${token}`
    }

    return request
})

export const axiosInstance$ = Axios.create({
    baseURL: process.env.API_URL,
})

axiosInstance$.interceptors.request.use(request => {
    const token = localStorage.getItem('token')
    if (token) {
        request.headers.Authorization = `Token ${token}`
    }

    return request
})