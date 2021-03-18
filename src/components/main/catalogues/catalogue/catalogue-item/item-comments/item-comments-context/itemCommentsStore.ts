import { createContext } from 'react'
import { Draft } from 'immer'
//Types
import { Action, CHANGE_REPLY_TO, ItemCommentsContextInterface, ItemCommentsInitialState } from './itemCommentsContextTypes'

export const ItemCommentsContext = createContext<ItemCommentsContextInterface>({
    replyTo: null,
    changeReplyTo: () => {},
})

export const reducer = (state: Draft<ItemCommentsInitialState>, action: Action) => {
    switch (action.type) {
        case CHANGE_REPLY_TO:
            state.replyTo = action.replyTo
            break

        default:
            throw new Error()
    }
}