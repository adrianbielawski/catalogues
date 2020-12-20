import React, { useReducer } from 'react'
//Contexts
import { SearchContext, reducer } from './searchStore'
//Types
import { CHANGE_SEARCH, SearchValue, SearchInitialState } from './searchTypes'

type Props = {
    children: JSX.Element,
    value: SearchInitialState,
    onChange: (value: SearchValue) => void,
}

const SearchContextProvider = (props: Props) => {
    const initialState = {
        ...props.value,
        setSearchValue: () => {},
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    const setSearchValue = (value: SearchValue) => {
        props.onChange(value)
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