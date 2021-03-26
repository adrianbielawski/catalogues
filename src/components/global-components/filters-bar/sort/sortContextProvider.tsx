import React from 'react'
import { useImmerReducer } from 'use-immer'
//Contexts
import { SortContext, reducer } from './sortStore'
import { SortInitialState, SortValue, CHANGE_SORT } from './sortTypes'

type Props = {
    children: JSX.Element,
    value: SortInitialState,
}

const SortContextProvider = (props: Props) => {
    const initialState = {
        ...props.value,
    }

    const [state, dispatch] = useImmerReducer(reducer, initialState)

    const setSortValue = (value: SortValue) => {
        dispatch({
            type: CHANGE_SORT,
            value,
        })
    }

    const context = {
        ...state,
        setSortValue,
    }

    return (
        <SortContext.Provider value={context}>
            {props.children}
        </SortContext.Provider>
    )
}

export default SortContextProvider