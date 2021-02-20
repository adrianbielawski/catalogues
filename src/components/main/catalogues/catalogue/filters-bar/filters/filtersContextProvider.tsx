import React, { useReducer } from 'react'
//Contexts
import { FiltersContext, reducer } from './filtersStore'
import { FiltersInitialState, CHANGE_SELECTED_FILTERS, FilterValue, FilterType, CHANGE_FILTERS } from './filtersTypes'

type Props = {
    children: JSX.Element,
    value: FiltersInitialState,
    onChange: (filterId: number | string, value: FilterValue) => void,
}

const FiltersContextProvider = (props: Props) => {
    const initialState = {
        ...props.value,
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    const changeSelectedFilters = (filterId: number | string, value: FilterValue) => {
        props.onChange(filterId, value)
        dispatch({
            type: CHANGE_SELECTED_FILTERS,
            filterId,
            value,
        })
    }

    const changeFilters = (filters: FilterType[]) => {
        dispatch({
            type: CHANGE_FILTERS,
            filters,
        })
    }

    const context = {
        ...state,
        changeSelectedFilters,
        changeFilters,
    }

    return (
        <FiltersContext.Provider value={context}>
            {props.children}
        </FiltersContext.Provider>
    )
}

export default FiltersContextProvider