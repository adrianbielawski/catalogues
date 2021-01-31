import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styles from './catalogueItems.scss'
//Redux
import { useTypedSelector } from 'store/reducers/index'
import { fetchCatalogueItems } from 'store/actions/cataloguesActions'
//Custom components
import Loader from 'components/global-components/loader/loader'
import CatalogueItem from '../catalogue-item/catalogueItem'
import { catalogueSelector, itemsSelector } from 'store/selectors'

type Props = {
    catalogueId: number,
}

const CatalogueItems = (props: Props) => {
    const dispatch = useDispatch()
    const catalogue = useTypedSelector(catalogueSelector(props.catalogueId))
    const catalogueItems = useTypedSelector(itemsSelector(props.catalogueId))

    useEffect(() => {
        dispatch(fetchCatalogueItems(props.catalogueId))
    }, [props.catalogueId])

    const getItems = () => {
        return catalogueItems.map(item => (
            <CatalogueItem item={item} key={item.id} />
        ))
    }


    return (
        catalogue.fetchingItems
            ? <Loader className={styles.loader} />
            : (
                <ul className={styles.items}>
                    {getItems()}
                </ul>
            )
    )
}

export default CatalogueItems