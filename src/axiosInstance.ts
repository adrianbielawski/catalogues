import Axios from 'axios-observable'

export const axiosInstance$ = Axios.create({
  baseURL: '/api',
})

axiosInstance$.interceptors.request.use((request) => {
  const token = localStorage.getItem('token')
  if (token) {
    request.headers.Authorization = `Token ${token}`
  }

  return request
})
