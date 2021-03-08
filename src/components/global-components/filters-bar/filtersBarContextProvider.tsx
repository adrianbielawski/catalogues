import React from 'react'
import { useImmerReducer } from 'use-immer'
//Contexts
import { FiltersBarContext, reducer } from './filtersBarStore'
import { FiltersBarInitialState, INITIALIZED } from './filtersBarTypes'

type Props = {
    children: JSX.Element,
    value: FiltersBarInitialState,
    show: boolean,
    onChange: () => void,
}

const FiltersBarContextProvider = (props: Props) => {
    const initialState = {
        ...props.value
    }

    const [state, dispatch] = useImmerReducer(reducer, initialState)

    const initialize = () => {
        dispatch({
            type: INITIALIZED,
        })
    }

    const context = {
        ...state,
        show: props.show,
        initialize,
    }

    return (
        <FiltersBarContext.Provider value={context}>
            {props.children}
        </FiltersBarContext.Provider>
    )
}

export default FiltersBarContextProvider