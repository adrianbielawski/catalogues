import { Draft } from 'immer'
import { createContext } from 'react'
import { SortContextInterface, SortInitialState, Action, CHANGE_SORT } from './sortTypes'

export const SortContext = createContext<SortContextInterface>({
    sortOptions: [],
    selected: {},
    setSortValue: () => {},
})

export const reducer = (state: Draft<SortInitialState>, action: Action) => {
    switch (action.type) {
        case CHANGE_SORT:
            if (action.value === undefined) {
                state.selected = {}
            } else {
                state.selected = action.value
            }
            break

        default:
            throw new Error()
    }
}