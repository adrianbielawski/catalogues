import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import classNames from 'classnames/bind'
import styles from './avatar.scss'
//Constants
import { BASE_URL } from 'src/constants'
//Hooka
import { useImageLoader } from 'src/hooks/useImageLoader'

type Props = {
    url?: string,
    placeholderIcon?: IconDefinition,
    className: string,
}

const cx = classNames.bind(styles)

const Avatar = (props: Props) => {
    const image = useImageLoader(`${BASE_URL}${props.url || ''}`)

    const avatarClass = cx(
        'avatar',
        props.className,
        {
            loaded: image,
        }
    )

    return (
        <div className={avatarClass}>
            {props.url && (
                <img
                    src={image || ''}
                    className={styles.image}
                />
            )}
            {(!image && props.placeholderIcon) && (
                <FontAwesomeIcon
                    icon={props.placeholderIcon}
                    className={styles.placeholder}
                />
            )}
        </div>
    )
}

export default Avatar