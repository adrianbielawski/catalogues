import { combineReducers } from 'redux'
import { createSelectorHook } from 'react-redux'
import appReducer from './appReducer'

export const rootReducer = combineReducers({
    app: appReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export const useTypedSelector = createSelectorHook<RootState>()