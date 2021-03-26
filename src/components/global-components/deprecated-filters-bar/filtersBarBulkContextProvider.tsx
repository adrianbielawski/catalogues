import React from 'react'
//Contexts
import FiltersBarContextProvider from './filtersBarContextProvider'
import SortContextProvider from './sort/sortContextProvider'
import FiltersContextProvider from './filters/filtersContextProvider'
import SearchContextProvider from './search/searchContextProvider'
import { FiltersBarInitialState } from './filtersBarTypes'
import { FiltersInitialState } from './filters/filtersTypes'
import { SortInitialState } from './sort/sortTypes'
import { SearchInitialState } from './search/searchTypes'

type Props = {
    children: JSX.Element,
    onChange: () => void,
    showFilters: boolean,
    filtersBarValue: FiltersBarInitialState,
    filtersValue: FiltersInitialState,
    sortValue: SortInitialState,
    searchValue: SearchInitialState,
}

const FiltersBarBulkContextProvider = (props: Props) => {
    return (
        <FiltersBarContextProvider value={props.filtersBarValue} show={props.showFilters} onChange={() => { }}>
            <SearchContextProvider value={props.searchValue} onChange={() => { }}>
                <SortContextProvider value={props.sortValue} onChange={() => { }}>
                    <FiltersContextProvider value={props.filtersValue} onChange={() => { }}>
                        {props.children}
                    </FiltersContextProvider>
                </SortContextProvider>
            </SearchContextProvider>
        </FiltersBarContextProvider>
    )
}

export default FiltersBarBulkContextProvider