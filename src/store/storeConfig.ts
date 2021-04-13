import { combineReducers } from 'redux'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { createSelectorHook, useDispatch } from 'react-redux'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
//Slices
import { appSlice } from 'store/slices/appSlices/appSlice'
import { authSlice } from 'store/slices/authSlices/authSlices'
import { currentUserSlice } from 'store/slices/currentUserSlices/currentUserSlice'
import { itemsDataSlice } from 'store/slices/cataloguesSlices/itemsDataSlice.ts/itemsDataSlice'
import { settingsSlices } from 'store/slices/settingsSlices'
import { entities } from './entities'
import { modules } from './modules'
//Epics
import { appEpics } from 'store/epics/appEpics'
import { authEpics } from 'store/epics/authEpics'
import { currentUserEpics } from './epics/currentUserEpics'
import { itemsEpics } from 'store/epics/itemsEpisc'
import { settingsEpics } from 'store/epics/settingsEpics'
import { authUserCataloguesIndexEpics } from 'store/modules/auth-user-catalogues/epics'
import { authUserFavouritesEpics } from 'store/modules/auth-user-favourites/epics/authUserFavouritesEpics'
import { authUserDashboardEpics } from 'store/modules/auth-user-dashboard/epics'
import { currentUserCataloguesEpics } from 'store/modules/current-user-catalogues/epics'

const rootEpic = combineEpics(
  appEpics,
  authEpics,
  currentUserEpics,
  itemsEpics,
  settingsEpics,
  authUserCataloguesIndexEpics,
  authUserFavouritesEpics,
  authUserDashboardEpics,
  currentUserCataloguesEpics,
)
const epicMiddleware = createEpicMiddleware()

const rootReducer = combineReducers({
  entities: entities,
  modules: modules,
  app: appSlice.reducer,
  auth: authSlice.reducer,
  currentUser: currentUserSlice.reducer,
  itemsData: itemsDataSlice.reducer,
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