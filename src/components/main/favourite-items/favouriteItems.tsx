import React, { useEffect, useRef, useState } from 'react'
import styles from './favouriteItems.scss'
//Redux
import { FETCH_FAVOURITE_ITEMS_DATA } from 'store/modules/favourite-items/slice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
//Filters bar context
import FiltersBarBulkContextProvider from 'components/global-components/filters-bar/filters-bar-context/filtersBarBulkContextProvider'
import { filtersBarInitialState } from './filter-bar/utils/contextInitialValues'
//Custom components
import Header from 'components/global-components/header/header'
import FavouriteItemsContent from './favourite-items-content/favouriteItemsContent'

const FavouriteItems = () => {
    const dispatch = useAppDispatch()
    const favouriteItemsRef = useRef<HTMLDivElement>(null)
    const screenHeight = useTypedSelector(state => state.modules.app.screenHeight)
    const isFetchingFavItemsData = useTypedSelector(state => state.modules.favouriteItems.isFetchingFavItemsData)
    const [minHeight, setMinHeight] = useState(0)

    useEffect(() => {
        dispatch(FETCH_FAVOURITE_ITEMS_DATA())
    }, [])

    useEffect(() => {
        if (favouriteItemsRef.current === null) {
            return
        }

        getMinHeight()
    }, [favouriteItemsRef.current, screenHeight])

    const getMinHeight = () => {
        const top = favouriteItemsRef.current!.getBoundingClientRect().top
        const minHeight = screenHeight - top! - window.pageYOffset
        setMinHeight(minHeight)
    }

    return (
        <FiltersBarBulkContextProvider
            values={filtersBarInitialState}
        >
            <div
                className={styles.favouriteItems}
                style={{ minHeight: `${minHeight}px` }}
                ref={favouriteItemsRef}
            >
                <Header />
                {!isFetchingFavItemsData && (
                    <FavouriteItemsContent />
                )}
            </div>
        </FiltersBarBulkContextProvider>
    )
}

export default FavouriteItems