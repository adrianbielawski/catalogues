import React, { useReducer } from 'react'
//Contexts
import { FiltersBarContext, reducer } from './filtersBarStore'
import { FiltersBarInitialState, TOGGLE_FILTERS_BAR } from './filtersBarTypes'

type Props = {
    children: JSX.Element,
    value: FiltersBarInitialState,
    onChange: () => void,
}

const FiltersBarContextProvider = (props: Props) => {
    const initialState = {
        ...props.value
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    const toggleFiltersBar = () => {
        props.onChange()
        dispatch({
            type: TOGGLE_FILTERS_BAR,
        })
    }

    const context = {
        ...state,
        toggleFiltersBar,
    }

    return (
        <FiltersBarContext.Provider value={context}>
            {props.children}
        </FiltersBarContext.Provider>
    )
}

export default FiltersBarContextProvider