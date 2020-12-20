import React, { useReducer } from 'react'
//Contexts
import { SortContext, reducer, initialState } from './sortStore'

type Props = {
    children: JSX.Element,
}

const SortContextProvider = (props: Props) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const context = {
        ...state,
        dispatch,
    }

    return (
        <SortContext.Provider value={context}>
            {props.children}
        </SortContext.Provider>
    )
}

export default SortContextProvider