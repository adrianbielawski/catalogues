import { Draft } from 'immer'
import { size } from 'lodash'
import { createContext } from 'react'
import { SortContextInterface, SortInitialState, Action, CHANGE_SORT, SET_ACTIVE_OPTION } from './sortTypes'

export const SortContext = createContext<SortContextInterface>({
    sortOptions: [],
    activeOption: null,
    selected: {},
    setSortValue: () => { },
    setActiveOption: () => { },
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

        case SET_ACTIVE_OPTION:
            state.activeOption = action.option
            if (!action.option && size(state.selected)) {
                state.selected = {}
            }
            if (action.option && size(state.selected)) {
                state.selected = {}
            }
            break

        default:
            throw new Error()
    }
}