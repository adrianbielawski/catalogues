import React, { useReducer } from 'react'
//Contexts
import { FiltersContext, reducer, initialState } from './filtersStore'

type Props = {
    children: JSX.Element,
}

const FiltersContextProvider = (props: Props) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const context = {
        ...state,
        dispatch,
    }

    return (
        <FiltersContext.Provider value={context}>
            {props.children}
        </FiltersContext.Provider>
    )
}

export default FiltersContextProvider