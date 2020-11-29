import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { rootReducer } from 'store/reducers/index'
import thunk from 'redux-thunk'
import { BrowserRouter } from 'react-router-dom'

let composeEnhancers = compose

if (process.env.NODE_ENV === 'development') {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
}

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
