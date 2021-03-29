import React from 'react'
import { useHistory } from 'react-router'
import { faFolderOpen, faUser } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import styles from './itemHeader.scss'
//Types
import { LocationState } from 'src/globalTypes'
//Custom components
import Avatar from 'components/global-components/avatar/avatar'

type Props = {
    userImage: string,
    username: string,
    catalogueImage: string,
    catalogueName: string,
    className?: string,
}

const cx = classNames.bind(styles)

const ItemHeader = (props: Props) => {
    const history = useHistory<LocationState>()

    const handleUserClick = () => {
        history.push(`/${props.username}`)
    }
    const itemHeaderClass = cx(
        'itemHeader',
        props.className,
    )

    return (
        <div className={itemHeaderClass}>
            <div
                className={styles.wrapper}
                onClick={handleUserClick}
            >
                <Avatar
                    placeholderIcon={faUser}
                    className={styles.userImage}
                    url={props.userImage}
                />
                <p className={styles.username}>
                    {props.username}
                </p>
            </div>
            <div
                className={styles.wrapper}
                onClick={handleUserClick}
            >
                <p className={styles.catalogueName}>
                    {props.catalogueName}
                </p>
                <Avatar
                    placeholderIcon={faFolderOpen}
                    className={styles.catalogueImage}
                    url={props.catalogueImage}
                />
            </div>
        </div>
    )
}

export default ItemHeader