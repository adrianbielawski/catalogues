import { createContext } from 'react'
import { cloneDeep } from 'lodash'
//Types
import { State, Action, CHANGE_SEARCH } from './searchTypes'

export const initialState = {
    search: '',
    setSearchValue: () => null,
}

export const SearchContext = createContext<State>(initialState)

export const reducer = (state: State, action: Action) => {
    let newState = cloneDeep(state)
    switch (action.type) {
        case CHANGE_SEARCH:
            newState.search = action.value
            return newState

        default:
            throw new Error()
    }
}