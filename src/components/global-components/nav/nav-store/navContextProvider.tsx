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

    const context = {
        ...state,
        showList,
        closeList,
    }

    return (
        <NavContext.Provider value={context}>
            {props.children}
        </NavContext.Provider>
    )
}

export default NavContextProvider