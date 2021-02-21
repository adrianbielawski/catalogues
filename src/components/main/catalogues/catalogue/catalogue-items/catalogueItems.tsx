import React, { useCallback, useEffect, useRef, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './catalogueItems.scss'
//Redux
import { CLEAR_ITEMS_DATA, FETCH_ITEMS } from 'store/slices/cataloguesSlices/itemsDataSlice.ts/itemsDataSlice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
//Custom hooks
import { useDelay, useFirstRender } from 'src/customHooks'
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
    const [lastItem, setLastItem] = useState<HTMLLIElement | null>()
    const lastItemRef = useCallback(setLastItem, [])
    const observer = useRef<IntersectionObserver | null>()
    const itemsData = useTypedSelector(state => state.itemsData)
    const { searchContext, sortContext, filtersContext } = useFiltersBarContext()
    const delayCompleted = useDelay(itemsData.fetchingItems)
    const firstRender = useFirstRender()

    useEffect(() => {
        fetchItems()

        return () => {
            dispatch(CLEAR_ITEMS_DATA())
        }
    }, [props.catalogueId])

    useEffect(() => {
        if (firstRender) return
        fetchItems(1)
    }, [
        searchContext.search,
        sortContext.selected,
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

        const sort = Object.values(sortContext.selected)[0]

        }
        dispatch(FETCH_ITEMS({
            catalogueId: props.catalogueId,
            page,
            search: searchContext.search || undefined,
            sort: sort ? sort : undefined,
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