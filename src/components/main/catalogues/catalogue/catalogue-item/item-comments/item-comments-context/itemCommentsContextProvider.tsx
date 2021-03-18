import React, { ReactNode } from 'react'
import { useImmerReducer } from 'use-immer'
//Contexts
import { CHANGE_REPLY_TO, ItemCommentsInitialState, ReplyToType } from './itemCommentsContextTypes'
import { ItemCommentsContext, reducer } from './itemCommentsStore'

type Props = {
    children: ReactNode,
    value: ItemCommentsInitialState,
}

const ItemCommentsContextProvider = (props: Props) => {
    const initialState = {
        ...props.value,
    }

    const [state, dispatch] = useImmerReducer(reducer, initialState)

    const changeReplyTo = (replyTo: ReplyToType) => {
        dispatch({
            type: CHANGE_REPLY_TO,
            replyTo,
        })
    }

    const context = {
        ...state,
        commentId: null,
        changeReplyTo,
    }

    return (
        <ItemCommentsContext.Provider value={context}>
            {props.children}
        </ItemCommentsContext.Provider>
    )
}

export default ItemCommentsContextProvider