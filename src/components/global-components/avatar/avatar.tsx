import React from 'react'
import classNames from 'classnames/bind'
import styles from './avatar.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { BASE_URL } from 'src/constants'

type Props = {
    url?: string,
    placeholderIcon?: IconDefinition,
    className: string,
}

const cx = classNames.bind(styles)

const Avatar = (props: Props) => {
    const avatarClass = cx(
        'avatar',
        props.className,
    )

    return (
        <div className={avatarClass}>
            {props.url?.length && (
                <img
                    src={`${BASE_URL}${props.url}`}
                    className={styles.image}
                />
            )}
            {(!props.url?.length && props.placeholderIcon) && (
                <FontAwesomeIcon
                    icon={props.placeholderIcon}
                    className={styles.image}
                />
            )}
        </div>
    )
}

export default Avatar