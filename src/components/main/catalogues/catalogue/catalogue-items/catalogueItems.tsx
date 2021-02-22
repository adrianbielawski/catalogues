import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import queryString from 'query-string'
import { size, trimStart } from 'lodash'
import classNames from 'classnames/bind'
import styles from './catalogueItems.scss'
//Types
import { LocationState, QueryObj } from 'src/globalTypes'
import { Range, SelectedFilter } from '../filters-bar/filters/filtersTypes'
import { Filter } from 'store/slices/cataloguesSlices/itemsDataSlice.ts/itemsDataTypes'
//Redux
import { CLEAR_ITEMS_DATA, FETCH_ITEMS } from 'store/slices/cataloguesSlices/itemsDataSlice.ts/itemsDataSlice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
//Custom hooks
import { useDelay } from 'src/customHooks'
import useFiltersBarContext from '../filters-bar/useFiltersBarContext'
//Custom components
import Loader from 'components/global-components/loader/loader'
import CatalogueItem from '../catalogue-item/catalogueItem'
import Button from 'components/global-components/button/button'

type Props = {
    catalogueId: number,
}

const cx = classNames.bind(styles)

const CatalogueItems = (props: Props) => {
    const dispatch = useAppDispatch()
    const history = useHistory()
    const location = useLocation<LocationState>()
    const [lastItem, setLastItem] = useState<HTMLLIElement | null>()
    const lastItemRef = useCallback(setLastItem, [])
    const observer = useRef<IntersectionObserver | null>()
    const itemsData = useTypedSelector(state => state.itemsData)
    const { searchContext, sortContext, filtersContext, filtersBar } = useFiltersBarContext()
    const delayCompleted = useDelay(itemsData.fetchingItems)

    useEffect(() => {
        const parsedQuery = queryString.parse(location.search || '')
        const filters: SelectedFilter = {}

        if (parsedQuery.search) {
            searchContext.setSearchValue(parsedQuery.search || '')
        }

        if (parsedQuery.ordering) {
            sortContext.setSortValue({
                [trimStart(parsedQuery.ordering, '-')]: parsedQuery.ordering,
            })
        }

        for (const filter of filtersContext.filters) {
            if (filter.type === 'date' || filter.type === 'number') {
                if (`${filter.id}__lte` in parsedQuery || `${filter.id}__gte` in parsedQuery) {
                    filters[filter.id] = {
                        gte: parsedQuery[`${filter.id}__gte`] || null,
                        lte: parsedQuery[`${filter.id}__lte`] || null,
                    }
                }
            }
            else {
                if (filter.id in parsedQuery) {
                    filters[filter.id] = Object.fromEntries<boolean>(
                        parsedQuery[filter.id].split(',').map((k: string) => [k, true])
                    )
                }
            }
        }

        if (size(filters)) {
            filtersContext.setSelectedFilters(filters)
        }

        filtersBar.initialized()
    }, [])

    useEffect(() => {
        return () => {
            dispatch(CLEAR_ITEMS_DATA())
        }
    }, [props.catalogueId])

    useEffect(() => {
        if (!filtersBar.isInitialized) return
        fetchItems(1)
    }, [
        searchContext.search,
        sortContext.selected,
        filtersContext.selectedFilters,
        filtersBar.isInitialized,
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
        
        const queryObj: QueryObj = {}

        const sort = Object.values(sortContext.selected)[0]

        queryObj['ordering'] = sort || ''
        queryObj['search'] = searchContext.search

        const filters: Filter = {}
        if (filtersContext.selectedFilters !== null) {
            Object.entries(filtersContext.selectedFilters).forEach(([id, values]) => {
                if (values === null) return

                if ('gte' in values) {
                    if (values.gte) {
                        queryObj[`${id}__gte`] = (values as Range).gte!
                        filters[`${id}__gte`] = (values as Range).gte!
                    }
                    if (values.lte) {
                        queryObj[`${id}__lte`] = (values as Range).lte!
                        filters[`${id}__lte`] = (values as Range).lte!
                    }
                } else {
                    queryObj[id] = Object.keys(values)
                    filters[`${id}__in`] = Object.keys(values).join('__')
                }
            })
        }

        const query = queryString.stringify(queryObj, {
            arrayFormat: 'comma',
            skipEmptyString: true
        })
        history.push({ search: query })

        dispatch(FETCH_ITEMS({
            catalogueId: props.catalogueId,
            page,
            search: searchContext.search || undefined,
            sort: sort ? sort : undefined,
            filters: filters || undefined
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