import React from 'react'
//Contexts
import SortContextProvider from './sort/sortContextProvider'
import FiltersContextProvider from './filters/filtersContextProvider'
import { FiltersInitialState } from './filters/filtersTypes'

type Props = {
    children: JSX.Element,
    filtersValue: FiltersInitialState,
}

const FiltersBarContextProvider = (props: Props) => {
    return (
                <FiltersContextProvider value={props.filtersValue} onChange={() => {}}>
                    {props.children}
                </FiltersContextProvider>
    )
}

export default FiltersBarContextProvider