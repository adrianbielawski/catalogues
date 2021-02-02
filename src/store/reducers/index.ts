import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import { createSelectorHook } from 'react-redux'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
//Reducers
import appReducer from './appReducer'
import authReducer from './authReducer'
import cataloguesReducer from './cataloguesReducer'
import settingsReducer from './settingsReducer'
//Types
import { AppActionTypes } from 'store/storeTypes/appTypes'
//Epics
import { authEpics } from 'store/epics/authEpics'
import { cataloguesEpics } from 'store/epics/catalogueEpics'
import { settingsEpics } from 'store/epics/settingsEpics'

export type RootState = ReturnType<typeof rootReducer>

const rootEpic = combineEpics(
  authEpics,
  cataloguesEpics,
  settingsEpics,
)
const epicMiddleware = createEpicMiddleware<AppActionTypes, AppActionTypes, RootState>()

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  catalogues: cataloguesReducer,
  settings: settingsReducer,
})

let composeEnhancers = compose

if (process.env.NODE_ENV === 'development') {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
}

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(epicMiddleware))
)

epicMiddleware.run(rootEpic)

export const useTypedSelector = createSelectorHook<RootState>()