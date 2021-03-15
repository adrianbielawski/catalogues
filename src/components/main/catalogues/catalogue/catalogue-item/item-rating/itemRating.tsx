import React from 'react'
import styles from './itemRating.scss'
//Types
import { DeserializedItem } from 'src/globalTypes'
//Custom components
import AverageRating from 'components/global-components/average-rating/averageRating'

type Props = {
    item: DeserializedItem,
}

const ItemRating = (props: Props) => {
    return (
        <div className={styles.itemRating}>
            <AverageRating
                rating={props.item.rating.average}
                count={props.item.rating.count}
            />
        </div>
    )
}

export default ItemRating