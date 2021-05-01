import React, { useEffect } from 'react'
import { useHistory } from 'react-router'
import { size } from 'lodash'
import styles from './items.scss'
//Types
import { LocationState } from 'src/globalTypes'
//Redux
import {
    CLEAR_FAVOURITE_ITEMS_ERROR, CLEAR_FAVOURITE_ITEMS_DATA,
    FETCH_FAVOURITE_ITEMS, FETCH_FAVOURITE_ITEM_COMMENTS, POST_FAVOURITE_ITEM_COMMENT
} from 'store/modules/favourite-items/slice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
//hoks and utils
import { scrollTop } from 'src/utils'
//Filters bar context
import useFiltersBarContext from 'components/global-components/filters-bar/filters-bar-context/useFiltersBarContext'
import queryBuilder from 'components/global-components/filters-bar/builders/queryBuilder'
import filtersBarValuesBuilder from 'components/global-components/filters-bar/builders/filtersBarValuesBuilder'
//Custom components
import PaginatedList from 'components/global-components/paginated-list/paginatedList'
import CatalogueItem from 'components/main/catalogues/catalogue/catalogue-item/catalogueItem'
import Loader from 'components/global-components/loader/loader'
import MessageModal from 'components/global-components/message-modal/messageModal'

const FavouriteItems = () => {
    const dispatch = useAppDispatch()
    const history = useHistory<LocationState>()
    const filtersBarContext = useFiltersBarContext()
    const screenWidth = useTypedSelector(state => state.modules.app.screenWidth)
    const favouriteItems = useTypedSelector(state => state.modules.favouriteItems)
    const itemsData = favouriteItems.itemsData!

    useEffect(() => {
        const parsedQuery = filtersBarValuesBuilder(filtersBarContext)

        if (parsedQuery.searchValue) {
            filtersBarContext.searchContext.setSearchValue(parsedQuery.searchValue)
        }

        if (parsedQuery.orderingValue) {
            filtersBarContext.sortContext.setSortValue(parsedQuery.orderingValue)
        }

        if (size(parsedQuery.filtersValue)) {
            filtersBarContext.filtersContext.setSelectedFilters(parsedQuery.filtersValue)
        }

        filtersBarContext.filtersBar.initialize()
    }, [])

    useEffect(() => {
        if (!filtersBarContext.filtersBar.isInitialized) {
            return
        }

        fetchItems(1)
        scrollTop()
    }, [
        filtersBarContext.searchContext.search,
        filtersBarContext.sortContext.selected,
        filtersBarContext.filtersContext.selectedFilters,
        filtersBarContext.filtersBar.isInitialized,
    ])

    useEffect(() => {
        return () => {
            dispatch(CLEAR_FAVOURITE_ITEMS_DATA())
        }
    }, [])

    const fetchItems = (pageNum?: number) => {
        const query = queryBuilder(filtersBarContext)

        history.push({ search: query.query })

        dispatch(FETCH_FAVOURITE_ITEMS({
            page: pageNum || itemsData.next || 1,
            search: query.search,
            sort: query.sort,
            filters: query.filters,
        }))
    }

    const getRenderQty = () => {
        let renderQty = itemsData.results.length

        if (favouriteItems.isFetchingItems && itemsData.current) {
            renderQty = itemsData.current * 10
        }
        if (favouriteItems.isFetchingData && !favouriteItems.isFetchingItems && itemsData.current) {
            renderQty = (itemsData.current - 1) * 10
        }

        return renderQty
    }

    const itemsComponents = () => {
        return itemsData.results.map((item, i) => {
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

            const renderQty = getRenderQty()

            if (i >= renderQty) {
                return
            }

            return (
                <CatalogueItem
                    className={styles.item}
                    itemData={item}
                    isNarrow={!screenWidth.largeViewport}
                    editable={false}
                    key={item.id}
                    onAddComment={handleAddComment}
                    onFetchComments={handleFetchComments}
                />
            )
        })
    }

    const clearError = () => {
        dispatch(CLEAR_FAVOURITE_ITEMS_ERROR())
        fetchItems(itemsData.current || 1)
    }

    const error = favouriteItems.error

    if (!itemsData || favouriteItems.isFetchingData && !getRenderQty()) {
        return <Loader className={styles.loader} />
    }

    return (
        <div className={styles.items}>
            {(itemsData.results.length === 0 && !favouriteItems.isFetchingData) && (
                <p className={styles.noItemsFound}>
                    {location.search.length === 0
                        ? 'You have no favourite items'
                        : 'No items found'
                    }
                </p>
            )}
            <PaginatedList
                className={styles.list}
                next={itemsData.next}
                buttonChild="See more"
                isFetching={favouriteItems.isFetchingItems}
                fetchOnButtonClick="once"
                intersectingElement={3}
                onLoadMore={fetchItems}
            >
                {itemsComponents()}
            </PaginatedList>
            <MessageModal
                show={error !== null}
                title={error?.title}
                message={error?.message || ''}
                onConfirm={clearError}
            />
        </div>
    )
}

export default FavouriteItems