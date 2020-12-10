import React from 'react'
import styles from './catalogueItem.scss'
//Redux
//Types
import { DeserializedItem } from 'src/globalTypes'
//Custom components
import ItemFields from './item-fields/itemFields'

type Props = {
    item: DeserializedItem
}

const CatalogueItem = (props: Props) => {
    return (
        <li className={styles.item}>
            <div className={styles.imageWrapper}>
                <img className={styles.img} src="" />
            </div>
            <ItemFields item={props.item} />
        </li>
    )
}

export default CatalogueItem