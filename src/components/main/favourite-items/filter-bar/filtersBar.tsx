import React from 'react'
import styles from './filtersBar.module.scss'
//Redux
import { useTypedSelector } from 'store/storeConfig'
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
    const screenWidth = useTypedSelector(state => state.modules.app.screenWidth)

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