import React from 'react'
import { useImmerReducer } from 'use-immer'
//Contexts
import { SideMenuContext, reducer } from './sideMenuStore'
import { SideMenuInitialState } from './sideMenuTypes'

type Props = {
    show: boolean,
    children: JSX.Element,
    value: SideMenuInitialState,
    onChange: () => void,
}

const SideMenuContextProvider = (props: Props) => {
    const initialState = {
        ...props.value
    }

    const [state, dispatch] = useImmerReducer(reducer, initialState)

    const context = {
        ...state,
        show: props.show
    }

    return (
        <SideMenuContext.Provider value={context}>
            {props.children}
        </SideMenuContext.Provider>
    )
}

export default SideMenuContextProvider