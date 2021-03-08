import { createContext } from 'react'
import { Draft } from 'immer'
//Types
import {
    FiltersBarInitialState, Action, FiltersBarContextInterface, INITIALIZED
} from './filtersBarTypes'

export const FiltersBarContext = createContext<FiltersBarContextInterface>({
    show: false,
    isInitialized: false,
    initialize: () => {},
})

export const reducer = (state: Draft<FiltersBarInitialState>, action: Action) => {
    switch (action.type) {
        case INITIALIZED:
            state.isInitialized = true
            break

        default:
            throw new Error()
    }
}