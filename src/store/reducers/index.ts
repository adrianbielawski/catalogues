import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createSelectorHook } from 'react-redux'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
//Reducers
import appReducer from './appReducer'
import authReducer from './authReducer'
import cataloguesReducer from './cataloguesReducer'
//Types
import { AppActionTypes } from 'store/storeTypes'
//Epics
import { createCatalogueEpic } from 'store/epics/catalogueEpics'

export type RootState = ReturnType<typeof rootReducer>

const rootEpic = combineEpics(createCatalogueEpic)
const epicMiddleware = createEpicMiddleware<AppActionTypes, AppActionTypes, RootState>()

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    catalogues: cataloguesReducer,
})

let composeEnhancers = compose

if (process.env.NODE_ENV === 'development') {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
}

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, epicMiddleware))
)

epicMiddleware.run(rootEpic)

export const useTypedSelector = createSelectorHook<RootState>()