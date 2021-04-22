import React from 'react'
import { useHistory } from 'react-router'
import moment from 'moment'
import classNames from 'classnames/bind'
import styles from './catalogueCard.scss'
//Types
import { DeserializedCatalogue, LocationState } from 'src/globalTypes'
//Redux
import { useTypedSelector } from 'store/storeConfig'
import { userSelector } from 'store/selectors'
//Custom components
import Avatar from '../avatar/avatar'
import NoImageIcon from '../no-image-icon/noImageIcon'
import Image from 'components/global-components/image/image'

type Props = {
    catalogue: DeserializedCatalogue,
    className?: string,
}

const cx = classNames.bind(styles)

const CatalogueCard: React.ForwardRefRenderFunction<
    HTMLDivElement,
    Props
> = (props, ref) => {
    const { catalogue } = props
    const history = useHistory<LocationState>()
    const user = useTypedSelector(userSelector(props.catalogue.createdBy))

    const redirectToCatalogue = () => {
        history.push(`/${user.username}/catalogues/${catalogue.slug}`)
    }

    const redirectToUser = () => {
        history.push(`/${user.username}`)
    }

    const catalogueCardClass = cx(
        'catalogueCard',
        props.className,
    )

    return (
        <div className={catalogueCardClass} ref={ref}>
            <p
                className={styles.header}
                onClick={redirectToCatalogue}
            >
                {catalogue.name}
            </p>
            <Image
                className={styles.image}
                url={catalogue.imageThumbnail}
                placeHolder={
                    <NoImageIcon size="6x" />
                }
            />
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