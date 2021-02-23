import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { size } from 'lodash'
import classNames from 'classnames/bind'
import styles from './catalogueItems.scss'
//Redux
import { CLEAR_ITEMS_DATA, FETCH_ITEMS } from 'store/slices/cataloguesSlices/itemsDataSlice.ts/itemsDataSlice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
//Custom hooks
import { useDelay } from 'src/customHooks'
import useFiltersBarContext from 'components/main/catalogues/catalogue/filters-bar/useFiltersBarContext'
//Utils
import parsedQueryBuilder from 'components/main/catalogues/filter-bar-utils/filtersBarValuesBuilder'
//Custom components
import Loader from 'components/global-components/loader/loader'
import CatalogueItem from 'components/main/catalogues/catalogue/catalogue-item/catalogueItem'
import Button from 'components/global-components/button/button'
import queryBuilder from 'components/main/catalogues/filter-bar-utils/queryBuilder'

type Props = {
    catalogueId: number,
}

const cx = classNames.bind(styles)

const CatalogueItems = (props: Props) => {
    const dispatch = useAppDispatch()
    const history = useHistory()
    const [lastItem, setLastItem] = useState<HTMLLIElement | null>()
    const lastItemRef = useCallback(setLastItem, [])
    const observer = useRef<IntersectionObserver | null>()
    const itemsData = useTypedSelector(state => state.itemsData)
    const filtersBarContext = useFiltersBarContext()
    const delayCompleted = useDelay(itemsData.fetchingItems)

    useEffect(() => {
        const parsedQuery = parsedQueryBuilder(filtersBarContext)

        if (parsedQuery.searchValue) {
            filtersBarContext.searchContext.setSearchValue(parsedQuery.searchValue)
        }
    
        if (parsedQuery.orderingValue) {
            filtersBarContext.sortContext.setSortValue(parsedQuery.orderingValue)
        }
    
        if (size(parsedQuery.filtersValue)) {
            filtersBarContext.filtersContext.setSelectedFilters(parsedQuery.filtersValue)
        }

        filtersBarContext.filtersBar.initialized()
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

    useEffect(() => {
        if (lastItem) {
            createObserver(lastItem)
        }
        return () => {
            if (observer.current) {
                observer.current.disconnect()
            }
        }
    }, [lastItem])

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
        if (entries[0].isIntersecting && itemsData.next && itemsData.next > 2) {
            fetchItems()
        }
    }

    const createObserver = (element: Element) => {
        if (observer.current) {
            observer.current.disconnect()
        }
        observer.current = new IntersectionObserver(handleIntersect)
        observer.current.observe(element)
    }

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

    const itemsClass = cx(
        'items',
        {
            showingAll: itemsData.next === null
        },
    )

    return (
        itemsData.fetchingItems && !itemsData.results.length
            ? <Loader className={styles.loader} />
            : (
                <div className={itemsClass}>
                    <ul>
                        {getItems()}
                    </ul>
                    {delayCompleted ?
                        <Loader className={styles.loader} />
                        : (itemsData.next && itemsData.next <= 2) &&
                        <Button
                            className={styles.seeMoreButton}
                            loading={delayCompleted}
                            onClick={handleMoreItemsClick}
                        >
                            See more
                        </Button>
                    }
                </div>
            )
    )
}

export default CatalogueItems