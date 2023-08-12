import { createContext } from 'react'
import { type Draft } from 'immer'
// Types
import {
  type SearchContextInterface,
  type SearchInitialState,
  type Action,
  CHANGE_SEARCH,
} from './searchTypes'

export const SearchContext = createContext<SearchContextInterface>({
  search: '',
  setSearchValue: () => null,
})

export const reducer = (state: Draft<SearchInitialState>, action: Action) => {
  switch (action.type) {
    case CHANGE_SEARCH:
      state.search = action.value
      break

    default:
      throw new Error()
  }
}
