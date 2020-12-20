import React, { useReducer } from 'react'
//Contexts
import { SortContext, reducer } from './sortStore'
import { SortInitialState, SortValue, CHANGE_SORT } from './sortTypes'

type Props = {
    children: JSX.Element,
    value: SortInitialState,
    onChange: (value: SortValue) => void,
}

const SortContextProvider = (props: Props) => {
    const initialState = {
        ...props.value,
        setSortValue: () => {}
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    const setSortValue = (value: SortValue) => {
        props.onChange(value)
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