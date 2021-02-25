import React from 'react'
import { useImmerReducer } from 'use-immer'
//Contexts
import { FiltersContext, reducer } from './filtersStore'
import {
    FiltersInitialState, CHANGE_SELECTED_FILTERS, FilterValue, FilterType, CHANGE_FILTERS, CHANGE_ACTIVE_FILTERS,
    SET_SELECTED_FILTERS, SelectedFilter, CHANGE_CHOICES_SORT, CHANGE_SEARCH_VALUE,
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

    const setSelectedFilters = (filters: SelectedFilter) => {
        dispatch({
            type: SET_SELECTED_FILTERS,
            filters,
        })
    }

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

    const changeChoicesSort = (filterId: number | string) => {
        dispatch({
            type: CHANGE_CHOICES_SORT,
            filterId,
        })
    }

    const changeSearchValue = (filterId: number | string, input: string) => {
        dispatch({
            type: CHANGE_SEARCH_VALUE,
            filterId,
            input,
        })
    }

    const context = {
        ...state,
        setSelectedFilters,
        changeSelectedFilters,
        changeFilters,
        changeActiveFilters,
        changeChoicesSort,
        changeSearchValue,
    }

    return (
        <FiltersContext.Provider value={context}>
            {props.children}
        </FiltersContext.Provider>
    )
}

export default FiltersContextProvider