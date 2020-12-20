import React from 'react'
import styles from './filtersBar.scss'
//Custom components
import SideBar from 'components/global-components/side-bar/sideBar'
import Filters from './filters/filters'
import Sort from './sort/sort'
import Search from './search/search'

const FiltersBar = () => {
    return (
        <SideBar className={styles.filtersBar}>
            <>
                <Search />
                <Sort />
                <Filters />
            </>
        </SideBar>
    )
}

export default FiltersBar