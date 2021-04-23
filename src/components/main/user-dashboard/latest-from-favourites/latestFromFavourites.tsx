import React, { useEffect } from 'react'
import styles from './latestFromFavourites.scss'
//Redux
import {
    FETCH_LFF, FETCH_LFF_ITEM_COMMENTS, POST_LFF_ITEM_COMMENT
} from 'store/modules/auth-user-dashboard/latest-from-favourites/slice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
//Components
import Column from '../column/column'
import CatalogueItem from 'components/main/catalogues/catalogue/catalogue-item/catalogueItem'
import Loader from 'components/global-components/loader/loader'
import PaginatedList from 'components/global-components/paginated-list/paginatedList'

const LatestFromFavourites = () => {
    const dispatch = useAppDispatch()
    const latestFromFavourites = useTypedSelector(state => state.modules.authUserDashboard.latestFromFavourites)
    const itemsData = latestFromFavourites.itemsData

    useEffect(() => {
        fetchItems()
    }, [])
    
    const fetchItems = () => {
        dispatch(FETCH_LFF(itemsData.next || 1))
    }

    const itemsComponents = itemsData.results.map((item, i) => {
        const handleAddComment = (text: string, parentId?: number) => {
            dispatch(POST_LFF_ITEM_COMMENT({
                itemId: item.id,
                text,
                parentId,
            }))
        }

        const handleFetchComments = (page: number | null) => {
            dispatch(FETCH_LFF_ITEM_COMMENTS({
                itemId: item.id,
                page,
            }))
        }

        let renderQty = itemsData.results.length

        if (latestFromFavourites.isFetchingItems && itemsData.current) {
            renderQty = itemsData.current * 10
        }
        if (latestFromFavourites.isFetchingData && !latestFromFavourites.isFetchingItems && itemsData.current) {
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
                editable={false}
                key={item.id}
                onAddComment={handleAddComment}
                onFetchComments={handleFetchComments}
            />
        )
    })

    if (latestFromFavourites.isFetchingData && !itemsData.results.length) {
        return <Loader className={styles.loader} />
    }

    return (
        <Column
            className={styles.latestFromFavourites}
            title="Latest from favourites"
        >
            <PaginatedList
                next={itemsData.next}
                buttonChild="See more"
                isFetching={latestFromFavourites.isFetchingData}
                fetchOnButtonClick="once"
                intersectingElement={3}
                onLoadMore={fetchItems}
            >
                {itemsComponents}
            </PaginatedList>
        </Column>
    )
}

export default LatestFromFavourites