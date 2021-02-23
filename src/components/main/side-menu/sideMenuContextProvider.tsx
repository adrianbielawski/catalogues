import React from 'react'
import { useImmerReducer } from 'use-immer'
//Contexts
import { SideMenuContext, reducer } from './sideMenuStore'
import { SideMenuInitialState, TOGGLE_SIDE_MENU } from './sideMenuTypes'

type Props = {
    children: JSX.Element,
    value: SideMenuInitialState,
    onChange: () => void,
}

const SideMenuContextProvider = (props: Props) => {
    const initialState = {
        ...props.value
    }

    const [state, dispatch] = useImmerReducer(reducer, initialState)

    const toggleSideMenu = () => {
        props.onChange()
        dispatch({
            type: TOGGLE_SIDE_MENU,
        })
    }

    const context = {
        ...state,
        toggleSideMenu,
    }

    return (
        <SideMenuContext.Provider value={context}>
            {props.children}
        </SideMenuContext.Provider>
    )
}

export default SideMenuContextProvider