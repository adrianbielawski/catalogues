import { createContext } from 'react'
import { Draft } from 'immer'
//Types
import * as T from './navStoreTypes'

export const NavContext = createContext<T.NavContextInterface>({
    show: false,
    listId: null,
    showList: () => {},
    closeList: () => {},
})

export const reducer = (state: Draft<T.NavInitialState>, action: T.Action) => {
    switch (action.type) {
        case T.SHOW_LIST:
            state.show = true
            state.listId = action.listId
            break

        case T.CLOSE_LIST:
            state.show = false
            break

        default:
            throw new Error()
    }
}