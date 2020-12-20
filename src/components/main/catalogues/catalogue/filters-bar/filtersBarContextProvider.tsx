import React from 'react'
//Contexts
import SortContextProvider from './sort/sortContextProvider'
import FiltersContextProvider from './filters/filtersContextProvider'
import SearchContextProvider from './search/searchContextProvider'
import { FiltersInitialState } from './filters/filtersTypes'
import { SortInitialState } from './sort/sortTypes'
import { SearchInitialState } from './search/searchTypes'

type Props = {
    children: JSX.Element,
    filtersValue: FiltersInitialState,
    sortValue: SortInitialState,
    searchValue: SearchInitialState,
}

const FiltersBarContextProvider = (props: Props) => {
    return (
        <SearchContextProvider value={props.searchValue} onChange={() => {}}>
            <SortContextProvider value={props.sortValue} onChange={() => {}}>
                <FiltersContextProvider value={props.filtersValue} onChange={() => {}}>
                    {props.children}
                </FiltersContextProvider>
            </SortContextProvider>
        </SearchContextProvider>
    )
}

export default FiltersBarContextProvider