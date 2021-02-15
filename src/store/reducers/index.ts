import { combineReducers } from 'redux'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { createSelectorHook, useDispatch } from 'react-redux'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
//Slices
import { appSlice } from 'store/slices/appSlices/appSlice'
import { authSlice } from 'store/slices/authSlices/authSlices'
import cataloguesReducer from './cataloguesReducer'
import { settingsSlices } from 'store/slices/settingsSlices'
//Types
import { AppActionTypes } from 'store/storeTypes/appTypes'
//Epics
import { appEpics } from 'store/epics/appEpics'
import { authEpics } from 'store/epics/authEpics'
import { cataloguesEpics } from 'store/epics/catalogueEpics'
import { settingsEpics } from 'store/epics/settingsEpics'

const rootEpic = combineEpics(
  appEpics,
  authEpics,
  cataloguesEpics,
  settingsEpics,
)
const epicMiddleware = createEpicMiddleware<AppActionTypes, AppActionTypes, RootState>()

const rootReducer = combineReducers({
  app: appSlice.reducer,
  auth: authSlice.reducer,
  settings: settingsSlices,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: [
    ...getDefaultMiddleware({
      thunk: false,
      serializableCheck: {
        ignoredActionPaths: ['payload.history']
      },
    }),
    epicMiddleware
  ]
})

epicMiddleware.run(rootEpic)

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>() 
export const useTypedSelector = createSelectorHook<RootState>()