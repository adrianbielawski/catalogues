import React, { ReactNode } from 'react'
import { useImmerReducer } from 'use-immer'
//Contexts
import { ListContext, reducer, initialState } from './listStore'
//Components
import List from './list/list'
import Button from './button/button'

type Props = {
    children: ReactNode,
    className?: string,
}

const CollapsableList = (props: Props) => {
    const [state, dispatch] = useImmerReducer(reducer, initialState)

    const context = {
        ...state,
        dispatch,
    }

    return (
        <ListContext.Provider value={context}>
            {props.children}
        </ListContext.Provider>
    )
}

CollapsableList.Button = Button
CollapsableList.List = List

export default CollapsableList