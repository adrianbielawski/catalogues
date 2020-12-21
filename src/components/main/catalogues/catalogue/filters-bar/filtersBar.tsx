import React from 'react'
import classNames from 'classnames/bind'
import styles from './filtersBar.scss'
//Context
import useFiltersBarContext from '../filters-bar/useFiltersBarContext'
//Custom components
import SideBar from 'components/global-components/side-bar/sideBar'
import Filters from './filters/filters'
import Sort from './sort/sort'
import Search from './search/search'
import FiltersBarButton from './filters-bar-button/filtersBarButton'

const cx = classNames.bind(styles)

const FiltersBar = () => {
    const filtersBarContext = useFiltersBarContext()
    const screenWidth = window.innerWidth

    const toggleFiltersBar = () => {
        filtersBarContext.filtersBar.toggleFiltersBar()
    }

    const filtersBarWrapperClass = cx(
        'filtersBarWrapper',
        {
            active: filtersBarContext.filtersBar.show,
        }
    )
    return (
        <div className={filtersBarWrapperClass}>
            <SideBar className={styles.filtersBar}>
                <>
                    <Search />
                    <Sort />
                    <Filters />
                </>
            </SideBar>
            {screenWidth <= 640 &&
                <div className={styles.background} onClick={toggleFiltersBar}></div>
            }
        </div>
    )
}

FiltersBar.FiltersBarButton = FiltersBarButton

export default FiltersBar