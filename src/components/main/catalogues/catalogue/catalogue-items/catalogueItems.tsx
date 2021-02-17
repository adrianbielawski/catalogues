import React, { useEffect, useRef, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './catalogueItems.scss'
//Redux
import { FETCH_ITEMS } from 'store/slices/cataloguesSlices/itemsDataSlice.ts/itemsDataSlice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
//Custo hooks and utils
import { useDelay } from 'src/customHooks'
import { isElementInViewport } from 'src/utils'
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
    const itemRef = useRef<HTMLLIElement>(null)
    const [lastItemInView, setLastItemInView] = useState(false)
    const itemsData = useTypedSelector(state => state.itemsData)
    const delayCompleted = useDelay(itemsData.fetchingItems)

    useEffect(() => {
        fetchItems()
    }, [props.catalogueId])

    useEffect(() => {
        if (lastItemInView && itemsData.next && itemsData.next > 2) {
            fetchItems()
        }
    }, [lastItemInView])

    useEffect(() => {
        window.addEventListener('scroll', isLastItemInViewport)

        return () => {
            window.removeEventListener('scroll', isLastItemInViewport)
        }
    }, [])

    const fetchItems = () => {
        let page = 1
        
        if (itemsData.catalogueId === props.catalogueId) {
            page = itemsData.next || 1
        }
        dispatch(FETCH_ITEMS({
            catalogueId: props.catalogueId,
            page,
        }))
    }

    const isLastItemInViewport = () => {
        if (itemRef.current) {
            setLastItemInView(isElementInViewport(itemRef.current))
        }
    }

    const getItems = () => itemsData.results.map((item, i) => {
        let ref = i === itemsData.results.length - 1 ? itemRef : null
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
                            onClick={fetchItems}
                        >
                            See more
                        </Button>
                    }
                </div>
            )
    )
}

export default CatalogueItems