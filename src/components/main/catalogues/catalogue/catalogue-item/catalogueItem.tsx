import React from 'react'
import styles from './catalogueItem.scss'
//Redux
//Types
import { DeserializedItem } from 'src/globalTypes'
//Custom components
import ItemFields from './item-fields/itemFields'
import MainImage from './main-image/mainImage'

type Props = {
    item: DeserializedItem
}

const CatalogueItem = (props: Props) => {

    return (
        <li className={styles.item}>
            <MainImage />
            <ItemFields item={props.item} />
        </li>
    )
}

export default CatalogueItem