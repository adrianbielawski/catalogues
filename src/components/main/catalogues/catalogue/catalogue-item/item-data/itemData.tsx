import React from 'react'
import moment from 'moment'
import classNames from 'classnames/bind'
import styles from './itemData.scss'
//Types
import { DeserializedItem } from 'src/globalTypes'

type Props = {
    item: DeserializedItem,
    className?: string,
}

const cx = classNames.bind(styles)

const ItemData = (props: Props) => {
    const itemDataClass = cx(
        'itemData',
        props.className,
    )

    return (
        <div className={itemDataClass}>
            <p>
                <span>Id: </span>{props.item.id}
            </p>
            <p>
                {moment(props.item.createdAt).format('DD MMMM YYYY')}
            </p>
        </div>
    )
}

export default ItemData