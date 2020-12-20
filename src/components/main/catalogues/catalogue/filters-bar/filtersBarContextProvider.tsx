import React from 'react'
//Contexts
import SortContextProvider from './sort/sortContextProvider'
import FiltersContextProvider from './filters/filtersContextProvider'

type Props = {
    children: JSX.Element,
}

const FiltersBarContextProvider = (props: Props) => {
    return (
        <SortContextProvider>
            <FiltersContextProvider>
                {props.children}
            </FiltersContextProvider>
        </SortContextProvider>
    )
}

export default FiltersBarContextProvider