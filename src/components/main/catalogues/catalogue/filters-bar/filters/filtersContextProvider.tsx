import React, { useReducer } from 'react'
//Contexts
import { FiltersContext, reducer } from './filtersStore'
import { FiltersInitialState, CHANGE_FILTER, FilterValue } from './filtersTypes'

type Props = {
    children: JSX.Element,
    value: FiltersInitialState,
    onChange: (filterId: string, value: FilterValue) => void,
}

const FiltersContextProvider = (props: Props) => {
    const initialState = {
        ...props.value,
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    const setFilterValue = (filterId: string, value: FilterValue) => {
        props.onChange(filterId, value)
        dispatch({
            type: CHANGE_FILTER,
            filterId,
            value,
        })
    }

    const context = {
        ...state,
        setFilterValue,
    }

    return (
        <FiltersContext.Provider value={context}>
            {props.children}
        </FiltersContext.Provider>
    )
}

export default FiltersContextProvider