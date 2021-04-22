import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import classNames from 'classnames/bind'
import styles from './avatar.scss'
//Components
import Image from 'components/global-components/image/image'

type Props = {
    url?: string,
    placeholderIcon?: IconDefinition,
    className: string,
}

const cx = classNames.bind(styles)

const Avatar = (props: Props) => {
    const placeholder = props.placeholderIcon ? (
        <FontAwesomeIcon
            icon={props.placeholderIcon}
            className={styles.placeholder}
        />
    ) : undefined

    const avatarClass = cx(
        'avatar',
        props.className,
    )

    return (
        <div className={avatarClass}>
        <Image
            className={styles.image}
            url={props.url}
            onLoading={'placeholder'}
            placeHolder={placeholder}
        />
        </div>
    )
}

export default Avatar