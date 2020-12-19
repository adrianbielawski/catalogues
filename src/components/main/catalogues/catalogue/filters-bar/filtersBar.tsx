import React from 'react'
import styles from './filtersBar.scss'
//Custom components
import SideBar from 'components/global-components/side-bar/sideBar'
import SearchInput from 'components/global-components/search-input/searchInput'
import Filters from './filters/filters'
import Sort from './sort/sort'

const FiltersBar = () => {
    const handleSearch = (input: string[]) => {
        console.log(input)
    }

    return (
        <SideBar className={styles.filtersBar}>
            <>
                <SearchInput className={styles.search} placeholder="search catalogue" onSearch={handleSearch} />
                <Sort />
                <Filters />
            </>
        </SideBar>
    )
}

export default FiltersBar