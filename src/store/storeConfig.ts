import { combineReducers } from 'redux'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { createSelectorHook, useDispatch } from 'react-redux'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import { createReduxEnhancer } from '@sentry/react'
// Slices
import { entities } from './entities'
import { modules } from './modules'
// Epics
import { appEpics } from './modules/app/epics'
import { homepageEpics } from './modules/homepage/epics'
import { authUserEpics } from './modules/auth-user/epics'
import { authUserCataloguesIndexEpics } from 'store/modules/auth-user-catalogues/epics'
import { authUserFavouritesEpics } from 'store/modules/auth-user-favourites/epics/authUserFavouritesEpics'
import { authUserDashboardEpics } from 'store/modules/auth-user-dashboard/epics'
import { favouriteItemsEpics } from './modules/favourite-items/epics'
import { currentUserEpics } from './modules/current-user/epics'
import { currentUserCataloguesEpics } from 'store/modules/current-user-catalogues/epics'
import { currentUserItemsEpics } from 'store/modules/current-user-items/epics'
import { singleItemEpics } from './modules/single-item/epics'

const sentryEnhancer = createReduxEnhancer()

const rootEpic = combineEpics(
  appEpics,
  homepageEpics,
  authUserEpics,
  authUserCataloguesIndexEpics,
  authUserFavouritesEpics,
  authUserDashboardEpics,
  favouriteItemsEpics,
  currentUserEpics,
  currentUserCataloguesEpics,
  currentUserItemsEpics,
  singleItemEpics,
)
const epicMiddleware = createEpicMiddleware()

const rootReducer = combineReducers({
  entities,
  modules,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: [
    ...getDefaultMiddleware({
      thunk: false,
      serializableCheck: {
        ignoredActionPaths: ['payload.history'],
      },
    }),
    epicMiddleware,
  ],
  enhancers: [sentryEnhancer],
})

epicMiddleware.run(rootEpic)

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useTypedSelector = createSelectorHook<RootState>()
