import { createContext } from 'react'
import { cloneDeep } from 'lodash'
import { SortContextInterface, SortInitialState, Action, CHANGE_SORT } from './sortTypes'

export const SortContext = createContext<SortContextInterface>({
    sortOptions: [],
    selected: {},
    setSortValue: () => {},
})

export const reducer = (state: SortInitialState, action: Action) => {
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