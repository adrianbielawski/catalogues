import Axios from 'axios-observable'

export const axiosInstance$ = Axios.create({
  baseURL: '/api',
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
})
