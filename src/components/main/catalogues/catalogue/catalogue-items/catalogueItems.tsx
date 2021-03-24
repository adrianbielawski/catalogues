import React, { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { size } from 'lodash'
import classNames from 'classnames/bind'
import styles from './catalogueItems.scss'
//Types
import { LocationState } from 'src/globalTypes'
//Redux
import { ADD_ITEM, CLEAR_ITEMS_DATA, FETCH_ITEMS } from 'store/slices/cataloguesSlices/itemsDataSlice.ts/itemsDataSlice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { catalogueSelector } from 'store/selectors'
//Custom hooks
import { useDelay, useElementInView } from 'src/customHooks'
import useFiltersBarContext from 'components/global-components/filters-bar/useFiltersBarContext'
//Utils
import filtersBarValuesBuilder from 'components/main/catalogues/filter-bar-utils/filtersBarValuesBuilder'
//Custom components
import Loader from 'components/global-components/loader/loader'
import CatalogueItem from 'components/main/catalogues/catalogue/catalogue-item/catalogueItem'
import Button from 'components/global-components/button/button'
import queryBuilder from 'components/main/catalogues/filter-bar-utils/queryBuilder'
import AddButton from 'components/global-components/add-button/addButton'
import FixedAddButton from 'components/global-components/fixed-add-button/FixedAddButton'
import NewItemModal from './new-item-modal/newItemModal'

type Props = {
    catalogueId: number,
}

const cx = classNames.bind(styles)

const CatalogueItems = (props: Props) => {
    const dispatch = useAppDispatch()
    const history = useHistory<LocationState>()
    const location = useLocation<LocationState>()
    const smallViewport = useTypedSelector(state => state.app.screenWidth.smallViewport)
    const itemsData = useTypedSelector(state => state.itemsData)
    const catalogue = useTypedSelector(catalogueSelector(props.catalogueId!))
    const filtersBarContext = useFiltersBarContext()
    const delayCompleted = useDelay(itemsData.fetchingItems)

    const handleIntersecting = (isIntersecting: boolean) => {
        if (isIntersecting && itemsData.next && itemsData.next > 2) {
            fetchItems()
        }
    }

    const lastItemRef = useElementInView(handleIntersecting)

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
        fetchItems(1)
    }, [
        filtersBarContext.searchContext.search,
        filtersBarContext.sortContext.selected,
        filtersBarContext.filtersContext.selectedFilters,
        filtersBarContext.filtersBar.isInitialized,
    ])

    const fetchItems = (pageNum?: number) => {
        let page = 1

        if (itemsData.catalogueId === props.catalogueId) {
            page = pageNum || itemsData.next || 1
        }

        const query = queryBuilder(filtersBarContext)

        history.push({ search: query.query })

        dispatch(FETCH_ITEMS({
            catalogueId: props.catalogueId,
            page,
            search: query.search,
            sort: query.sort,
            filters: query.filters,
        }))
    }

    const handleMoreItemsClick = () => {
        fetchItems()
    }

    const getItems = () => itemsData.results.map((item, i) => {
        const ref = i === itemsData.results.length - 1 ? lastItemRef : null
        return <CatalogueItem item={item} key={item.id} ref={ref} />
    })

    const getNoItemsMessage = () => {
        if (itemsData.creatingNewItem) return
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
        if (itemsData.creatingNewItem) return
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
        if (!smallViewport) {
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

    const itemsClass = cx(
        'items',
        {
            showingAll: itemsData.next === null
        },
    )

    if (itemsData.fetchingItems && !itemsData.results?.length) {
        return <Loader className={styles.loader} />
    }

    const isItemInCatalogue = catalogue.itemsRanges.date.min
    const isSearchResult = isItemInCatalogue && location.search.length !== 0 && itemsData.results.length === 0
    const showAddItemButton = isItemInCatalogue && !itemsData.newItemId && !itemsData.creatingNewItem

    return (
        <div className={itemsClass}>
            {showAddItemButton && catalogue.permissions.canCreateItems
                ? getAddItemButton()
                : null
            }
            {!isItemInCatalogue && getNoItemsMessage()}
            {isSearchResult && getNoItemsFoundMessage()}
            <ul>
                {getItems()}
            </ul>
            {delayCompleted
                ? <Loader className={styles.loader} />
                : (itemsData.next && itemsData.next <= 2) &&
                <Button
                    className={styles.seeMoreButton}
                    loading={delayCompleted}
                    onClick={handleMoreItemsClick}
                >
                    See more
                </Button>
            }
            <NewItemModal />
        </div>
    )
}

export default CatalogueItems