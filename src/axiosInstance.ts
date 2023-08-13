import axios from 'axios'
import Axios from 'axios-observable'
import { API_URL } from './constants'

export const axiosInstance = axios.create({
    baseURL: API_URL,
})

axiosInstance.interceptors.request.use(request => {
    const token = localStorage.getItem('token')
    if (token) {
        request.headers.Authorization = `Token ${token}`
    }

    return request
})

export const axiosInstance$ = Axios.create({
    baseURL: API_URL,
})

axiosInstance$.interceptors.request.use(request => {
    const token = localStorage.getItem('token')
    if (token) {
        request.headers.Authorization = `Token ${token}`
    }

    return request
})