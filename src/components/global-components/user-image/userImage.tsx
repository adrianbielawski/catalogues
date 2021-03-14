import React from 'react'
import classNames from 'classnames/bind'
import styles from './userImage.scss'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Props = {
    url?: string,
    className: string,
}

const cx = classNames.bind(styles)

const UserImage = (props: Props) => {
    const userImageClass = cx(
        'userImage',
        props.className,
    )

    return (
        <div className={userImageClass}>
            {props.url !== undefined
                ? (
                    <img
                        src={props.url}
                        className={styles.image}
                    />
                )
                : (
                    <FontAwesomeIcon
                        icon={faUser}
                        className={styles.image}
                    />
                )
            }
        </div>
    )
}

export default UserImage