import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'
import styles from './itemIcon.scss'
//Types
import { ItemType } from '../nav'

interface Props {
    item: ItemType,
    active?: boolean,
    className?: string,
}

const cx = classNames.bind(styles)

const ItemIcon = (props: Props) => {
    const iconClass = cx(
        'icon',
        props.className,
        {
            active: props.active,
        }
    )
    
    return (
        <div className={iconClass}>
            {props.item.faIcon ? (
                <FontAwesomeIcon icon={props.item.faIcon} />
            ) : (
                props.item.icon
            )}
        </div>
    )
}

export default ItemIcon