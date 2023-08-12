import { createContext } from 'react'
import { type Draft } from 'immer'
// Types
import {
  type Action,
  CHANGE_REPLY_TO,
  CLEAR_REPLY_TO,
  type ItemCommentsContextInterface,
  type ItemCommentsInitialState,
} from './itemCommentsContextTypes'

export const ItemCommentsContext = createContext<ItemCommentsContextInterface>({
  replyTo: null,
  changeReplyTo: () => {},
  clearReplyTo: () => {},
})

export const reducer = (
  state: Draft<ItemCommentsInitialState>,
  action: Action,
) => {
  switch (action.type) {
    case CHANGE_REPLY_TO:
      state.replyTo = action.replyTo
      break

    case CLEAR_REPLY_TO:
      state.replyTo = null
      break

    default:
      throw new Error()
  }
}
