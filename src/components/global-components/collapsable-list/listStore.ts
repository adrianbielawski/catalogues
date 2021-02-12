import { createContext, Dispatch } from 'react'
import { cloneDeep } from 'lodash'

const BUTTON_CLICKED = 'BUTTON_CLICKED'
const ITEMS_INSPECTED = 'ITEMS_INSPECTED'
const OVERFLOW_INSPECTED = 'OVERFLOW_INSPECTED'

interface ButtonClicked {
    type: typeof BUTTON_CLICKED,
}

interface ItemsInspected {
    type: typeof ITEMS_INSPECTED,
    itemsInView: number,
    totalHeight: number,
    collapsedHeight: number,
}

interface OverflowInspected {
    type: typeof OVERFLOW_INSPECTED,
    hasOverflow: boolean,
}

type Action = ButtonClicked | ItemsInspected | OverflowInspected

export interface State {
    showAllItems: boolean,
    itemsInView: number,
    totalHeight: number,
    collapsedHeight: number,
    showButton: boolean,
    itemsInspected: boolean,
    dispatch: Dispatch<Action>,
}

export const initialState = {
    showAllItems: false,
    itemsInView: 0,
    totalHeight: 0,
    collapsedHeight: 0,
    showButton: false,
    itemsInspected: false,
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
            newState.totalHeight = action.totalHeight
            newState.collapsedHeight = action.collapsedHeight
            newState.itemsInspected = true
            return newState

        case 'OVERFLOW_INSPECTED':
            newState.showButton = newState.collapsedHeight < newState.totalHeight || action.hasOverflow
            return newState
            
        default:
            throw new Error()
    }
}