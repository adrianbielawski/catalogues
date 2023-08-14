import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import { store } from 'store/storeConfig'
import { BrowserRouter } from 'react-router-dom'
import { init as SentryInit, ErrorBoundary } from '@sentry/react'
import { BASE_URL, SENTRY_DSN } from './constants'

if (SENTRY_DSN !== undefined) {
  SentryInit({
    dsn: SENTRY_DSN,
    normalizeDepth: 100,
    environment: 'production',
  })
}

// eslint-disable-next-line react/no-deprecated
ReactDOM.render(
  <ErrorBoundary fallback={<p>An error has occurred</p>}>
    <Provider store={store}>
      <BrowserRouter basename={BASE_URL}>
        <App />
      </BrowserRouter>
    </Provider>
  </ErrorBoundary>,
  document.getElementById('root'),
)
