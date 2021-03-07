import React from 'react'
import styles from './filtersBar.scss'
//Context
import useFiltersBarContext from '../filters-bar/useFiltersBarContext'
//Custom components
import SideBar from 'components/global-components/side-bar/sideBar'
import Filters from './filters/filters'
import Sort from './sort/sort'
import Search from './search/search'
import FiltersBarButton from './filters-bar-button/filtersBarButton'

const FiltersBar = () => {
    const filtersBarContext = useFiltersBarContext()

    const closeFiltersBar = () => {
        filtersBarContext.filtersBar.changeShowFiltersBar(false)
    }

    return (
        <SideBar
            className={styles.filtersBar}
            active={filtersBarContext.filtersBar.show}
            onBackgroundClick={closeFiltersBar}
        >
            <>
                <Search />
                <Sort />
                <Filters />
            </>
        </SideBar>
    )
}

FiltersBar.FiltersBarButton = FiltersBarButton

export default FiltersBar