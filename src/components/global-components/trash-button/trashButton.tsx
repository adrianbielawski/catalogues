import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import classNames from 'classnames/bind'
import styles from './trashButton.scss'

type Props = {
    className?: string,
    onClick: () => void,
}

const cx = classNames.bind(styles)

const TrashButton = (props: Props) => {
    const trashButtonClass = cx(
        'trashButton',
        props.className,
    )

    return (
        <button className={trashButtonClass} onClick={props.onClick}>
            <FontAwesomeIcon icon={faTrashAlt} />
        </button>
    )
}

export default TrashButton