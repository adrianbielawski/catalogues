export const BASE_URL = import.meta.env.BASE_URL
export const API_URL = import.meta.env.VITE_API_URL
export const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN

export const listData = {
  count: null,
  pageSize: null,
  startIndex: null,
  endIndex: null,
  current: null,
  next: null,
  previous: null,
  results: [],
}

export const networkError = {
  title: 'Network error',
  message: 'Something went wrong. Plaese try again.',
}
