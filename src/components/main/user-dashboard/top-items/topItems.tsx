import React, { useEffect } from 'react'
import classNames from 'classnames/bind'
import styles from './topItems.scss'
//Redux
import { FETCH_TOP_ITEMS, FETCH_TOP_ITEM_COMMENTS, POST_TOP_ITEM_COMMENT } from 'store/modules/auth-user-dashboard/top-items/slice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
//Components
import CatalogueItem from 'components/main/catalogues/catalogue/catalogue-item/catalogueItem'
import Loader from 'components/global-components/loader/loader'
import PaginatedList from 'components/global-components/paginated-list/paginatedList'

const cx = classNames.bind(styles)

const TopItems = () => {
    const dispatch = useAppDispatch()
    const topItems = useTypedSelector(state => state.modules.authUserDashboard.topItems)
    const itemsData = topItems.itemsData

    useEffect(() => {
        fetchItems()
    }, [])

    const fetchItems = () => {
        dispatch(FETCH_TOP_ITEMS(itemsData.next || 1))
    }

    const itemsComponents = itemsData.results.map((item, i) => {
        const handleAddComment = (text: string, parentId?: number) => {
            dispatch(POST_TOP_ITEM_COMMENT({
                itemId: item.id,
                text,
                parentId,
            }))
        }

        const handleFetchComments = (page: number | null) => {
            dispatch(FETCH_TOP_ITEM_COMMENTS({
                itemId: item.id,
                page,
            }))
        }

        let renderQty = itemsData.results.length

        if (topItems.isFetchingItems && itemsData.current) {
            renderQty = itemsData.current * 10
        }
        if (topItems.isFetchingData && !topItems.isFetchingItems && itemsData.current) {
            renderQty = (itemsData.current - 1) * 10
        }

        if (i >= renderQty) {
            return
        }

        const itemClass = cx(
            'item',
            {
                last: i === itemsData.results.length - 1,
            }
        )

        return (
            <CatalogueItem
                className={itemClass}
                itemData={item}
                isNarrow={true}
                editable={false}
                key={item.id}
                onAddComment={handleAddComment}
                onFetchComments={handleFetchComments}
            />
        )
    })

    if (topItems.isFetchingData && !itemsData.results.length) {
        return <Loader className={styles.loader} />
    }

    return (
        <PaginatedList
            next={itemsData.next}
            buttonChild="See more"
            isFetching={topItems.isFetchingData}
            fetchOnButtonClick="once"
            intersectingElement={3}
            onLoadMore={fetchItems}
        >
            {itemsComponents}
        </PaginatedList>
    )
}

export default TopItems