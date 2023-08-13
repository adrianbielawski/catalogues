import { createContext } from 'react'
import { type Draft } from 'immer'
// Types
import {
  type FiltersBarInitialState,
  type Action,
  type FiltersBarContextInterface,
  INITIALIZED,
} from './filtersBarTypes'

export const FiltersBarContext = createContext<FiltersBarContextInterface>({
  isInitialized: false,
  initialize: () => {},
})

export const reducer = (
  state: Draft<FiltersBarInitialState>,
  action: Action,
) => {
  switch (action.type) {
    case INITIALIZED:
      state.isInitialized = true
      break

    default:
      throw new Error()
  }
}
