import React from 'react'
//Contexts
import FiltersBarContextProvider from './filtersBarContextProvider'
import SortContextProvider from '../sort/sortContextProvider'
import FiltersContextProvider from '../filters/filtersContextProvider'
import SearchContextProvider from '../search/searchContextProvider'
import { FiltersBarValues } from './filtersBarTypes'

type Props = {
    children: JSX.Element,
    values: FiltersBarValues,
}

const FiltersBarBulkContextProvider = (props: Props) => {
    return (
        <FiltersBarContextProvider value={props.values.filtersBarValue}>
            <SearchContextProvider value={props.values.searchValue}>
                <SortContextProvider value={props.values.sortValue}>
                    <FiltersContextProvider value={props.values.filtersValue}>
                        {props.children}
                    </FiltersContextProvider>
                </SortContextProvider>
            </SearchContextProvider>
        </FiltersBarContextProvider>
    )
}

export default FiltersBarBulkContextProvider