import React from 'react'
import { useImmerReducer } from 'use-immer'
//Contexts
import { FiltersContext, reducer } from './filtersStore'
import {
    FiltersInitialState, CHANGE_SELECTED_FILTERS, FilterValue, FilterType, CHANGE_FILTERS, CHANGE_ACTIVE_FILTERS
} from './filtersTypes'

type Props = {
    children: JSX.Element,
    value: FiltersInitialState,
    onChange: (filterId: number | string, value: FilterValue) => void,
}


const FiltersContextProvider = (props: Props) => {
    const initialState = {
        ...props.value,
    }

    const [state, dispatch] = useImmerReducer(reducer, initialState)

    const changeSelectedFilters = (filterId: number | string, value: FilterValue) => {
        props.onChange(filterId, value)
        dispatch({
            type: CHANGE_SELECTED_FILTERS,
            filterId,
            value,
        })
    }

    const changeActiveFilters = (filterId: number | string, value: boolean) => {
        dispatch({
            type: CHANGE_ACTIVE_FILTERS,
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
        changeActiveFilters,
    }

    return (
        <FiltersContext.Provider value={context}>
            {props.children}
        </FiltersContext.Provider>
    )
}

export default FiltersContextProvider