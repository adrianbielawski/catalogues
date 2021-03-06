import React from 'react'
import { useImmerReducer } from 'use-immer'
//Contexts
import { FiltersBarContext, reducer } from './filtersBarStore'
import { FiltersBarInitialState, INITIALIZED, CHANGE_SHOW_FILTERS_BAR } from './filtersBarTypes'

type Props = {
    children: JSX.Element,
    value: FiltersBarInitialState,
    onChange: () => void,
}

const FiltersBarContextProvider = (props: Props) => {
    const initialState = {
        ...props.value
    }

    const [state, dispatch] = useImmerReducer(reducer, initialState)

    const initialized = () => {
        dispatch({
            type: INITIALIZED,
        })
    }

    const changeShowFiltersBar = (show: boolean) => {
        dispatch({
            type: CHANGE_SHOW_FILTERS_BAR,
            show,
        })
    }

    const context = {
        ...state,
        initialized,
        changeShowFiltersBar,
    }

    return (
        <FiltersBarContext.Provider value={context}>
            {props.children}
        </FiltersBarContext.Provider>
    )
}

export default FiltersBarContextProvider