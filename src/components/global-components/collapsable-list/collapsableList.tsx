import React, { useReducer } from 'react'
import List from './list/list'
import Button from './button/button'
//Contexts
import { ListContext, reducer, initialState } from './listStore';

type Props = {
    children: React.ComponentType<any> | JSX.Element,
    className?: string,
}

const CollapsableList = (props: Props) => {
    const [state, dispatch] = useReducer(reducer, initialState)

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