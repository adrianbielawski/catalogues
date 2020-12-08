import { combineReducers } from 'redux'
import { createSelectorHook } from 'react-redux'
import appReducer from './appReducer'
import authReducer from './authReducer'
import cataloguesReducer from './cataloguesReducer'

export const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    catalogues: cataloguesReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export const useTypedSelector = createSelectorHook<RootState>()