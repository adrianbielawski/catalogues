import { createContext } from 'react'
import { cloneDeep } from 'lodash'
import { State, Action, CHANGE_SORT } from './sortTypes'

export const initialState = {
    sortOptions: [],
    selected: {},
    setSortValue: () => {},
}

export const SortContext = createContext<State>(initialState)

export const reducer = (state: State, action: Action) => {
    let newState = cloneDeep(state)
    switch (action.type) {
        case CHANGE_SORT:
            if (action.value === undefined) {
                newState.selected = {}
            } else {
                newState.selected = action.value
            }
            return newState

        default:
            throw new Error()
    }
}