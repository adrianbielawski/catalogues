import React, { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { size } from 'lodash'
import classNames from 'classnames/bind'
import styles from './catalogueItems.scss'
//Types
import { LocationState } from 'src/globalTypes'
//Redux
import {
    ADD_ITEM, CLEAR_ITEMS_DATA, CLEAR_ITEMS_DATA_ERROR, FETCH_CURRENT_USER_ITEMS, FETCH_ITEM_COMMENTS, POST_ITEM_COMMENT
} from 'store/modules/current-user-items/slice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { catalogueSelector, currentUserCatalogueSelector } from 'store/selectors'
//Hooks
import useFiltersBarContext from 'components/global-components/filters-bar/filters-bar-context/useFiltersBarContext'
//Utils
import { scrollTop } from 'src/utils'
import filtersBarValuesBuilder from 'components/main/catalogues/catalogue/filter-bar-utils/filtersBarValuesBuilder'
import queryBuilder from 'components/main/catalogues/catalogue/filter-bar-utils/queryBuilder'
//Components
import Loader from 'components/global-components/loader/loader'
import CatalogueItem from 'components/main/catalogues/catalogue/catalogue-item/catalogueItem'
import AddButton from 'components/global-components/add-button/addButton'
import FixedAddButton from 'components/global-components/fixed-add-button/FixedAddButton'
import NewItemModal from './new-item-modal/newItemModal'
import MessageModal from 'components/global-components/message-modal/messageModal'
import PaginatedList from 'components/global-components/paginated-list/paginatedList'

type Props = {
    catalogueId: number,
}

const cx = classNames.bind(styles)

const CatalogueItems = (props: Props) => {
    const dispatch = useAppDispatch()
    const history = useHistory<LocationState>()
    const location = useLocation<LocationState>()
    const largeViewport = useTypedSelector(state => state.modules.app.screenWidth.largeViewport)
    const currentUserItems = useTypedSelector(state => state.modules.currentUserItems)
    const itemsData = currentUserItems.itemsData
    const catalogue = useTypedSelector(catalogueSelector(props.catalogueId))
    const catalogueData = useTypedSelector(currentUserCatalogueSelector(catalogue.id))
    const filtersBarContext = useFiltersBarContext()

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
        return () => {
            dispatch(CLEAR_ITEMS_DATA())
        }
    }, [props.catalogueId])

    useEffect(() => {
        if (!filtersBarContext.filtersBar.isInitialized) return
        fetchItems()
        scrollTop()
    }, [
        filtersBarContext.searchContext.search,
        filtersBarContext.sortContext.selected,
        filtersBarContext.filtersContext.selectedFilters,
        filtersBarContext.filtersBar.isInitialized,
    ])


    const fetchItems = (pageNum?: number) => {
        let page = 1

        if (currentUserItems.catalogueId === props.catalogueId) {
            page = pageNum || itemsData.next || 1
        }

        const query = queryBuilder(filtersBarContext)

        history.push({ search: query.query })

        dispatch(FETCH_CURRENT_USER_ITEMS({
            catalogueId: props.catalogueId,
            page,
            search: query.search,
            sort: query.sort,
            filters: query.filters,
        }))
    }

    const getItems = () => itemsData.results.map(itemData => {
        const handleAddComment = (text: string, parentId?: number) => {
            dispatch(POST_ITEM_COMMENT({
                itemId: itemData.id,
                text,
                parentId,
            }))
        }

        const handleFetchComments = (page: number | null) => {
            dispatch(FETCH_ITEM_COMMENTS({
                itemId: itemData.id,
                page,
            }))
        }

        return (
            <CatalogueItem
                itemData={itemData}
                isNarrow={!largeViewport}
                key={itemData.id}
                onAddComment={handleAddComment}
                onFetchComments={handleFetchComments}
            />
        )
    })

    const getNoItemsMessage = () => {
        if (currentUserItems.isCreatingNewItem) return
        return (
            <div className={styles.noContent}>
                <p>You have no items yet,</p>
                <p
                    className={styles.anchor}
                    onClick={handleAddItem}
                >
                    click here to create your first item
                </p>
            </div>
        )
    }

    const getNoItemsFoundMessage = () => {
        if (currentUserItems.isCreatingNewItem) {
            return
        }

        return (
            <div className={styles.noItemsFound}>
                <p>No items found</p>
            </div>
        )
    }

    const handleAddItem = () => {
        dispatch(ADD_ITEM(catalogue.id))
    }

    const getAddItemButton = () => {
        if (largeViewport) {
            return (
                <AddButton
                    text="Add new item"
                    className={styles.addItemButton}
                    onClick={handleAddItem}
                />
            )
        } else {
            return <FixedAddButton onClick={handleAddItem} />
        }
    }

    const clearError = () => {
        dispatch(CLEAR_ITEMS_DATA_ERROR())
    }

    const itemsClass = cx(
        'items',
        {
            showingAll: itemsData.next === null
        },
    )

    if (catalogueData.isFetchingFields
        || catalogueData.isFetchingFieldsChoices
        || (currentUserItems.isFetchingItems && !itemsData.results?.length)
    ) {
        return <Loader className={styles.loader} />
    }

    const error = currentUserItems.itemsDataError
    const isItemInCatalogue = catalogue.itemsRanges.date.min
    const isSearchResult = isItemInCatalogue && location.search.length !== 0 && itemsData.results.length === 0
    const showAddItemButton = isItemInCatalogue && !currentUserItems.newItemId && !currentUserItems.isCreatingNewItem

    return (
        <div className={itemsClass}>
            {showAddItemButton && catalogue.permissions.canCreateItems
                ? getAddItemButton()
                : null
            }
            {!isItemInCatalogue && getNoItemsMessage()}
            {isSearchResult && getNoItemsFoundMessage()}
            <PaginatedList
                next={itemsData.next}
                buttonChild="See more"
                isFetching={currentUserItems.isFetchingItems}
                fetchOnButtonClick="once"
                intersectingElement={3}
                onLoadMore={fetchItems}
            >
                {getItems()}
            </PaginatedList>
            <NewItemModal />
            <MessageModal
                show={error !== null}
                title={error?.title}
                message={error?.message || ''}
                onConfirm={clearError}
            />
        </div>
    )
}

export default CatalogueItems