import moment from 'moment'
import React from 'react'
import styles from './catalogueCard.scss'
//Types
import { DeserializedCatalogue } from 'src/globalTypes'
//Custom components
import Avatar from '../avatar/avatar'
import NoInameIcon from '../no-image-icon/noImageIcon'

const BASE_URL = process.env.API_URL

type Props = {
    catalogue: DeserializedCatalogue,
}

const CatalogueCard = (props: Props) => {
    const { catalogue } = props
    const user = props.catalogue.createdBy

    return (
        <div className={styles.catalogueCard}>
            <div className={styles.header}>
                {catalogue.name}
            </div>
            <div className={styles.image}>
                {catalogue.imageThumbnail
                    ? <img src={`${BASE_URL}${catalogue.imageThumbnail}`} />
                    : <NoInameIcon size="6x" />
                }
            </div>
            <div className={styles.meta}>
                <div className={styles.user}>
                    <Avatar
                        className={styles.avatar}
                        url={user.imageThumbnail}
                    />
                    <p>{user.username}</p>
                </div>
                <p className={styles.date}>
                    {moment(catalogue.itemsRanges.date.max).fromNow()}
                </p>
            </div>
        </div>
    )
}

export default CatalogueCard