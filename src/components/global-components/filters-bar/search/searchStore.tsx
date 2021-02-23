import { createContext } from 'react'
import { cloneDeep } from 'lodash'
//Types
import { SearchContextInterface, SearchInitialState, Action, CHANGE_SEARCH } from './searchTypes'

export const SearchContext = createContext<SearchContextInterface>({
    search: '',
    setSearchValue: () => null,
})

export const reducer = (state: SearchInitialState, action: Action) => {
    let newState = cloneDeep(state)
    switch (action.type) {
        case CHANGE_SEARCH:
            newState.search = action.value
            return newState

        default:
            throw new Error()
    }
}