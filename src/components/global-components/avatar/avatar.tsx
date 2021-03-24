import React from 'react'
import classNames from 'classnames/bind'
import styles from './avatar.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faImage } from '@fortawesome/free-regular-svg-icons'

const BASE_URL = process.env.API_URL

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
            {props.url?.length
                ? (
                    <img
                        src={`${BASE_URL}${props.url}`}
                        className={styles.image}
                    />
                )
                : (
                    <FontAwesomeIcon
                        icon={props.placeholderIcon || faImage}
                        className={styles.image}
                    />
                )
            }
        </div>
    )
}

export default Avatar