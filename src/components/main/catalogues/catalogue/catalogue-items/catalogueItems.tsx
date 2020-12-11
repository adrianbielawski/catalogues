import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styles from './catalogueItems.scss'
//Redux
import { useTypedSelector } from 'store/reducers/index'
import { fetchCatalogueItems } from 'store/actions/cataloguesActions'
//Custom components
import Loader from 'components/global-components/loader/loader'
import CatalogueItem from '../catalogue-item/catalogueItem'

type Props = {
    slug: string
}

const CatalogueItems = (props: Props) => {
    const dispatch = useDispatch()
    const catalogues = useTypedSelector(state => state.catalogues.catalogues)
    const itemsData = useTypedSelector(state => state.catalogues.itemsData)
    const fetchingItems = useTypedSelector(state => state.catalogues.fetchingItems)

    const getActiveCatalogue = () => {
        return catalogues.find(catalogue => catalogue.slug === props.slug)
    }

    const [activeCatalogue, setActiveCatalogue] = useState(getActiveCatalogue())

    useEffect(() => {
        dispatch(fetchCatalogueItems(activeCatalogue!.id))
    }, [activeCatalogue])

    useEffect(() => {
        setActiveCatalogue(getActiveCatalogue())
    }, [props.slug])

    const getItems = () => {
        return itemsData.results.map(item => (
            <CatalogueItem item={item} key={item.id} />
        ))
    }


    return (
        fetchingItems && itemsData.results.length === 0
            ? <Loader className={styles.loader} />
            : (
                <ul className={styles.items}>
                    {getItems()}
                </ul>
            )
    )
}

export default CatalogueItems