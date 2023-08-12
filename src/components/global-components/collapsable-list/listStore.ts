import { createContext, type Dispatch } from 'react'
import { type Draft } from 'immer'

const BUTTON_CLICKED = 'BUTTON_CLICKED'
const ITEMS_INSPECTED = 'ITEMS_INSPECTED'
const OVERFLOW_INSPECTED = 'OVERFLOW_INSPECTED'

interface ButtonClicked {
  type: typeof BUTTON_CLICKED
}

interface ItemsInspected {
  type: typeof ITEMS_INSPECTED
  itemsInView: number
  totalHeight: number
  collapsedHeight: number
}

interface OverflowInspected {
  type: typeof OVERFLOW_INSPECTED
  hasOverflow: boolean
}

type Action = ButtonClicked | ItemsInspected | OverflowInspected

export interface State {
  showAllItems: boolean
  itemsInView: number
  totalHeight: number
  collapsedHeight: number
  showButton: boolean
  itemsInspected: boolean
  overflowInspected: boolean
  dispatch: Dispatch<Action>
}

export const initialState = {
  showAllItems: true,
  itemsInView: 0,
  totalHeight: 0,
  collapsedHeight: 0,
  showButton: false,
  itemsInspected: false,
  overflowInspected: false,
  dispatch: () => null,
}

export const ListContext = createContext<State>(initialState)

export const reducer = (state: Draft<State>, action: Action) => {
  switch (action.type) {
    case 'BUTTON_CLICKED':
      state.showAllItems = !state.showAllItems
      break

    case 'ITEMS_INSPECTED':
      state.itemsInView = action.itemsInView
      state.totalHeight = action.totalHeight
      state.collapsedHeight = action.collapsedHeight
      state.itemsInspected = true
      break

    case 'OVERFLOW_INSPECTED':
      state.showButton =
        state.collapsedHeight < state.totalHeight || action.hasOverflow
      state.showAllItems = false
      state.overflowInspected = true
      break

    default:
      throw new Error()
  }
}
