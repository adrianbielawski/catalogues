import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import { store } from 'store/storeConfig'
import { BrowserRouter } from 'react-router-dom'
import { init as SentryInit, ErrorBoundary} from "@sentry/react"

SentryInit({
  dsn: "https://5763d8b612f54d1394233487c167d4a5@o576404.ingest.sentry.io/5729944",
  normalizeDepth: 100,
  environment: 'production',
})

ReactDOM.render(
<ErrorBoundary fallback={"An error has occurred"}>
  <Provider store={store}>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <App />
    </BrowserRouter>
  </Provider>
</ErrorBoundary>,
  document.getElementById('root')
)