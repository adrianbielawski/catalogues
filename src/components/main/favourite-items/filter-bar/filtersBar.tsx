import React, { useEffect } from 'react'
import styles from './filtersBar.scss'
//Redux
import { useTypedSelector } from 'store/storeConfig'
//Context and utils
import useFiltersBarContext from 'components/global-components/filters-bar/filters-bar-context/useFiltersBarContext'
import buildFilters from './utils/filtersBuilder'
//Custom components
import SideBar from 'components/global-components/side-bar/sideBar'
import Search from 'components/global-components/filters-bar/search/search'
import Sort from 'components/global-components/filters-bar/sort/sort'
import Filters from 'components/global-components/filters-bar/filters/filters'

type Props = {
    show: boolean,
    toggleShow: (e: React.MouseEvent) => void,
}

const FavouriteItems = (props: Props) => {
    const { filtersContext } = useFiltersBarContext()
    const favouriteItems = useTypedSelector(state => state.modules.favouriteItems)
    const catalogues = useTypedSelector(state => state.entities.catalogues.entities)
    const screenWidth = useTypedSelector(state => state.modules.app.screenWidth)

    useEffect(() => {
        if (!favouriteItems.isFetchingData && favouriteItems.cataloguesIds.length > 0) {
            const filters = buildFilters(
                favouriteItems.cataloguesIds,
                catalogues,
            )
            filtersContext.changeFilters(filters)
        }
    }, [favouriteItems.isFetchingData, favouriteItems.cataloguesIds, catalogues])

    return (
        <SideBar
            active={props.show}
            mobile={screenWidth.smallViewport!}
            onBackgroundClick={props.toggleShow}
        >
            <div className={styles.filtersBar} >
                <Search />
                <Sort />
                <Filters />
            </div>
        </SideBar>
    )
}

export default FavouriteItems