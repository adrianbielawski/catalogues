import React from 'react'
import moment from 'moment'
import styles from './itemData.scss'
//Types
import { DeserializedItem } from 'src/globalTypes'

type Props = {
    item: DeserializedItem,
}

const ItemData = (props: Props) => (
    <div className={styles.itemData}>
        <div className={styles.wrapper} >
            <p>
                <span>Id: </span>{props.item.id}
            </p>
            <p>
                {moment(props.item.createdAt).format('DD MMMM YYYY')}
            </p>
        </div>
    </div>
)

export default ItemData