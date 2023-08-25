import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from 'store/storeConfig'
import { init as SentryInit, ErrorBoundary } from '@sentry/react'
import { BASE_URL, SENTRY_DSN } from './constants'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import routeConfig from './routeConfig'

if (SENTRY_DSN !== undefined) {
  SentryInit({
    dsn: SENTRY_DSN,
    normalizeDepth: 100,
    environment: 'production',
  })
}

const router = createBrowserRouter(routeConfig, {
  basename: BASE_URL,
})

// eslint-disable-next-line react/no-deprecated
ReactDOM.render(
  <ErrorBoundary fallback={<p>An error has occurred</p>}>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </ErrorBoundary>,
  document.getElementById('root'),
)
