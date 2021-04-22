import React, { useEffect, useRef, useState } from 'react'
import styles from './favouriteItems.scss'
//Redux
import {
    FETCH_FAVOURITE_ITEMS, FETCH_FAVOURITE_ITEM_COMMENTS, POST_FAVOURITE_ITEM_COMMENT
} from 'store/modules/favourite-items/slice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
//Custom components
import Header from 'components/global-components/header/header'
import ComponentHeader from 'components/global-components/component-header/componentHeader'
import PaginatedList from 'components/global-components/paginated-list/paginatedList'
import CatalogueItem from 'components/main/catalogues/catalogue/catalogue-item/catalogueItem'
import Loader from 'components/global-components/loader/loader'

const FavouriteItems = () => {
    const dispatch = useAppDispatch()
    const favouriteItemsRef = useRef<HTMLDivElement>(null)
    const screenHeight = useTypedSelector(state => state.modules.app.screenHeight)
    const favouriteItems = useTypedSelector(state => state.modules.favouriteItems)
    const itemsData = favouriteItems.itemsData
    const [minHeight, setMinHeight] = useState(0)

    useEffect(() => {
        if (favouriteItemsRef.current === null) {
            return
        }

        getMinHeight()
    }, [favouriteItemsRef.current, screenHeight])

    useEffect(() => {
        fetchItems()
    }, [])
    
    const fetchItems = () => {
        dispatch(FETCH_FAVOURITE_ITEMS(itemsData.next || 1))
    }

    const itemsComponents = itemsData.results.map((item, i) => {
        const handleAddComment = (text: string, parentId?: number) => {
            dispatch(POST_FAVOURITE_ITEM_COMMENT({
                itemId: item.id,
                text,
                parentId,
            }))
        }

        const handleFetchComments = (page: number | null) => {
            dispatch(FETCH_FAVOURITE_ITEM_COMMENTS({
                itemId: item.id,
                page,
            }))
        }

        let renderQty = itemsData.results.length

        if (favouriteItems.isFetchingItems && itemsData.current) {
            renderQty = itemsData.current * 10
        }
        if (favouriteItems.isFetchingData && !favouriteItems.isFetchingItems && itemsData.current) {
            renderQty = (itemsData.current - 1) * 10
        }

        if (i >= renderQty) {
            return
        }

        return (
            <CatalogueItem
                className={styles.item}
                itemData={item}
                isNarrow={true}
                key={item.id}
                onAddComment={handleAddComment}
                onFetchComments={handleFetchComments}
            />
        )
    })

    if (favouriteItems.isFetchingData && !itemsData.results.length) {
        return <Loader className={styles.loader} />
    }


    const getMinHeight = () => {
        const top = favouriteItemsRef.current!.getBoundingClientRect().top
        const minHeight = screenHeight - top! - window.pageYOffset
        setMinHeight(minHeight)
    }

    return (
        <div
            className={styles.favouriteItems}
            style={{ minHeight: `${minHeight}px` }}
            ref={favouriteItemsRef}
        >
            <Header />
            <ComponentHeader
                className={styles.favouriteItemsHeader}
            >
                <p className={styles.title}>
                    My favourite items
                </p>
            </ComponentHeader>
            <PaginatedList
                next={itemsData.next}
                buttonChild="See more"
                isFetching={favouriteItems.isFetchingItems}
                fetchOnButtonClick="once"
                intersectingElement={3}
                onLoadMore={fetchItems}
            >
                {itemsComponents}
            </PaginatedList>
        </div>
    )
}

export default FavouriteItems