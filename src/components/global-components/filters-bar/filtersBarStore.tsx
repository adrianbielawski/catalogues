import { createContext } from 'react'
import { Draft } from 'immer'
//Types
import {
    FiltersBarInitialState, Action, CHANGE_SHOW_FILTERS_BAR, FiltersBarContextInterface, INITIALIZED
} from './filtersBarTypes'

export const FiltersBarContext = createContext<FiltersBarContextInterface>({
    show: false,
    isInitialized: false,
    initialized: () => {},
    changeShowFiltersBar: () => {},
})

export const reducer = (state: Draft<FiltersBarInitialState>, action: Action) => {
    switch (action.type) {
        case INITIALIZED:
            state.isInitialized = true
            break

        case CHANGE_SHOW_FILTERS_BAR:
            state.show = action.show
            break

        default:
            throw new Error()
    }
}