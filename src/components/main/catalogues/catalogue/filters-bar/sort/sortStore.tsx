import { createContext } from 'react'
import { cloneDeep } from 'lodash'
import { State, Action, CHANGE_SORT, CLEAR_SORT } from './sortTypes'

export const initialState = {
    sortOptions: [
        {
            id: '1',
            title: 'id',
            type: 'number',
        },
        {
            id: '2',
            title: 'date',
            type: 'date',
        },
    ],
    selected: {},
    dispatch: () => null,
}

export const SortContext = createContext<State>(initialState)

export const reducer = (state: State, action: Action) => {
    let newState = cloneDeep(state)
    switch (action.type) {
        case CHANGE_SORT:
            newState.selected = action.value
            return newState

        case CLEAR_SORT:
            newState.selected = {}
            return newState

        default:
            throw new Error()
    }
}