import React from 'react'
import { useHistory } from 'react-router'
import moment from 'moment'
import styles from './catalogueCard.scss'
//Types
import { DeserializedCatalogue, LocationState } from 'src/globalTypes'
//Custom components
import Avatar from '../avatar/avatar'
import NoInameIcon from '../no-image-icon/noImageIcon'

const BASE_URL = process.env.API_URL

type Props = {
    catalogue: DeserializedCatalogue,
}

const CatalogueCard: React.ForwardRefRenderFunction<
    HTMLDivElement,
    Props
> = (props, ref) => {
    const history = useHistory<LocationState>()
    const { catalogue } = props
    const user = props.catalogue.createdBy

    const redirectToCatalogue = () => {
        history.push(`/${catalogue.createdBy.username}/catalogues/${catalogue.slug}`)
    }

    const redirectToUser = () => {
        history.push(`/${catalogue.createdBy.username}`)
    }

    return (
        <div className={styles.catalogueCard} ref={ref}>
            <p
                className={styles.header}
                onClick={redirectToCatalogue}
            >
                {catalogue.name}
            </p>
            <div
                className={styles.image}
                onClick={redirectToCatalogue}
            >
                {catalogue.imageThumbnail
                    ? <img src={`${BASE_URL}${catalogue.imageThumbnail}`} />
                    : <NoInameIcon size="6x" />
                }
            </div>
            <div className={styles.meta}>
                <div
                    className={styles.user}
                    onClick={redirectToUser}
                >
                    <Avatar
                        className={styles.avatar}
                        url={user.imageThumbnail}
                    />
                    <p>{user.username}</p>
                </div>
                <p className={styles.date}>
                    {catalogue.itemsRanges.date.max &&
                        moment(catalogue.itemsRanges.date.max).fromNow()
                    }
                </p>
            </div>
        </div>
    )
}

export default React.forwardRef(CatalogueCard)