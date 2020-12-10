import { createContext, Dispatch } from 'react'
import { cloneDeep } from 'lodash'

const BUTTON_CLICKED = 'BUTTON_CLICKED'
const ITEMS_INSPECTED = 'ITEMS_INSPECTED'

interface buttonClicked {
    type: typeof BUTTON_CLICKED,
}

interface itemsInspected {
    type: typeof ITEMS_INSPECTED,
    itemsInView: number,
    maxHeight: number,
    maxHeightCollapsed: number,
}

type Action = buttonClicked | itemsInspected

export interface State {
    showAllItems: boolean,
    itemsInView: number,
    maxHeight: number,
    maxHeightCollapsed: number,
    dispatch: Dispatch<Action>,
}

export const initialState = {
    showAllItems: false,
    itemsInView: 0,
    maxHeight: 0,
    maxHeightCollapsed: 0,
    dispatch: () => null
}

export const ListContext = createContext<State>(initialState)

export const reducer = (state: State, action: Action) => {
    let newState = cloneDeep(state)
    switch (action.type) {
        case 'BUTTON_CLICKED':
            newState.showAllItems = !newState.showAllItems
            return newState

        case 'ITEMS_INSPECTED':
            newState.itemsInView = action.itemsInView
            newState.maxHeight = action.maxHeight
            newState.maxHeightCollapsed = action.maxHeightCollapsed
            return newState
        default:
            throw new Error()
    }
}