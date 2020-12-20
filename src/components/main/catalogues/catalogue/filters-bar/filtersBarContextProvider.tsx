import React from 'react'
//Contexts
import SortContextProvider from './sort/sortContextProvider'
import FiltersContextProvider from './filters/filtersContextProvider'
import { FiltersInitialState } from './filters/filtersTypes'
import { SortInitialState } from './sort/sortTypes'

type Props = {
    children: JSX.Element,
    filtersValue: FiltersInitialState,
    sortValue: SortInitialState,
}

const FiltersBarContextProvider = (props: Props) => {
    return (
            <SortContextProvider value={props.sortValue} onChange={() => {}}>
                <FiltersContextProvider value={props.filtersValue} onChange={() => {}}>
                    {props.children}
                </FiltersContextProvider>
            </SortContextProvider>
    )
}

export default FiltersBarContextProvider