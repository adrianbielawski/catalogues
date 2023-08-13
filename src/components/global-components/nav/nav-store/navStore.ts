import { createContext } from 'react'
import { type Draft } from 'immer'
// Types
import * as T from './navStoreTypes'

export const NavContext = createContext<T.NavContextInterface>({
  show: false,
  listId: null,
  nestedListId: null,
  showList: () => {},
  closeList: () => {},
  showNestedList: () => {},
  removeNestedListId: () => {},
})

export const reducer = (state: Draft<T.NavInitialState>, action: T.Action) => {
  switch (action.type) {
    case T.SHOW_LIST:
      state.show = true
      state.listId = action.listId
      state.nestedListId = null
      break

    case T.CLOSE_LIST:
      state.show = false
      break

    case T.SHOW_NESTED_LIST:
      state.nestedListId = action.nestedListId
      break

    case T.REMOVE_NESTED_LIST_ID:
      state.nestedListId = null
      break

    default:
      throw new Error()
  }
}
