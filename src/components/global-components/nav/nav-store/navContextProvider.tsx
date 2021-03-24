import React from 'react'
import { useImmerReducer } from 'use-immer'
//Contexts
import { NavContext, reducer } from './navStore'
import * as T from './navStoreTypes'

type Props = {
    children: JSX.Element,
    value: T.NavInitialState,
}

const NavContextProvider = (props: Props) => {
    const initialState = {
        ...props.value
    }

    const [state, dispatch] = useImmerReducer(reducer, initialState)

    const showList = (listId: string | number) => {
        dispatch({
            type: T.SHOW_LIST,
            listId,
        })
    }

    const closeList = () => {
        dispatch({
            type: T.CLOSE_LIST,
        })
    }

    const showNestedList = (nestedListId: string | number) => {
        dispatch({
            type: T.SHOW_NESTED_LIST,
            nestedListId,
        })
    }

    const context = {
        ...state,
        showList,
        closeList,
        showNestedList,
    }

    return (
        <NavContext.Provider value={context}>
            {props.children}
        </NavContext.Provider>
    )
}

export default NavContextProvider