import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import classNames from 'classnames/bind'
import styles from './catalogueItems.scss'
//Redux
import { useTypedSelector } from 'store/reducers/index'
import { fetchCatalogueItems } from 'store/actions/cataloguesActions'
import { catalogueSelector, itemsSelector } from 'store/selectors'
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
    const dispatch = useDispatch()
    const itemRef = useRef<HTMLLIElement>(null)
    const [lastItemInView, setLastItemInView] = useState(false)
    const catalogue = useTypedSelector(catalogueSelector(props.catalogueId))
    const catalogueItems = useTypedSelector(itemsSelector(props.catalogueId))
    const delayCompleted = useDelay(catalogue.fetchingItems)

    useEffect(() => {
        fetchItems()
    }, [props.catalogueId])

    useEffect(() => {
        if (lastItemInView && catalogue.itemsData.next && catalogue.itemsData.next > 2) {
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
        dispatch(fetchCatalogueItems(props.catalogueId, catalogue.itemsData.next || 1))
    }

    const isLastItemInViewport = () => {
        if (itemRef.current) {
            setLastItemInView(isElementInViewport(itemRef.current))
        }
    }

    const getItems = () => catalogueItems.map((item, i) => {
        let ref = i === catalogueItems.length - 1 ? itemRef : null
        return <CatalogueItem item={item} key={item.id} ref={ref} />
    })

    const itemsClass = cx(
        'items',
        {
            showingAll: catalogue.itemsData.next === null
        },
    )

    return (
        catalogue.fetchingItems && !catalogue.itemsData.results.length
            ? <Loader className={styles.loader} />
            : (
                <div className={itemsClass}>
                    <ul>
                        {getItems()}
                    </ul>
                    {delayCompleted ?
                        <Loader className={styles.loader} />
                        : (catalogue.itemsData.next && catalogue.itemsData.next <= 2) &&
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