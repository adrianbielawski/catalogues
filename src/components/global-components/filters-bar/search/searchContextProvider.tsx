import React from 'react'
import { useImmerReducer } from 'use-immer'
//Contexts
import { SearchContext, reducer } from './searchStore'
//Types
import { CHANGE_SEARCH, SearchValue, SearchInitialState } from './searchTypes'

type Props = {
    children: JSX.Element,
    value: SearchInitialState,
}

const SearchContextProvider = (props: Props) => {
    const initialState = {
        ...props.value,
    }

    const [state, dispatch] = useImmerReducer(reducer, initialState)

    const setSearchValue = (value: SearchValue) => {
        dispatch({
            type: CHANGE_SEARCH,
            value,
        })
    }

    const context = {
        ...state,
        setSearchValue,
    }

    return (
        <SearchContext.Provider value={context}>
            {props.children}
        </SearchContext.Provider>
    )
}

export default SearchContextProvider