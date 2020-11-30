import { combineReducers } from 'redux'
import { createSelectorHook } from 'react-redux'
import appReducer from './appReducer'
import authReducer from './authReducer'

export const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export const useTypedSelector = createSelectorHook<RootState>()