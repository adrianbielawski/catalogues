import * as React from 'react'
import { useHistory } from 'react-router'
import moment from 'moment'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import styles from './catalogueCard.module.scss'
// Constants
import { API_URL } from 'src/constants'
// Types
import { DeserializedCatalogue, LocationState } from 'src/globalTypes'
// Redux
import { useTypedSelector } from 'store/storeConfig'
import { userSelector } from 'store/selectors'
// Custom components
import AvatarWithName from '../avatar-with-name/avatarWithName'
import NoImageIcon from '../no-image-icon/noImageIcon'
import Image from 'components/global-components/image/image'

interface Props {
  catalogue: DeserializedCatalogue
  className?: string
}

const cx = classNames.bind(styles)

const CatalogueCard: React.ForwardRefRenderFunction<HTMLDivElement, Props> = (
  props,
  ref,
) => {
  const { catalogue } = props
  const history = useHistory<LocationState>()
  const user = useTypedSelector(userSelector(props.catalogue.createdBy))!

  const redirectToCatalogue = () => {
    history.push(`/${user.username}/catalogues/${catalogue.slug}`)
  }

  const redirectToUser = () => {
    history.push(`/${user.username}`)
  }

  const catalogueCardClass = cx('catalogueCard', props.className)

  return (
    <div className={catalogueCardClass} ref={ref}>
      <p className={styles.header} onClick={redirectToCatalogue}>
        {catalogue.name}
      </p>
      <Image
        className={styles.image}
        url={catalogue.imageThumbnail}
        baseUrl={API_URL}
        placeHolder={<NoImageIcon size="6x" />}
        onClick={redirectToCatalogue}
      />
      <div className={styles.meta}>
        <AvatarWithName
          className={styles.user}
          name={user.username}
          placeholderIcon={faUser}
          url={user.imageThumbnail}
          avatarClassName={styles.userImage}
          onClick={redirectToUser}
        />
        <p className={styles.date}>
          {catalogue.itemsRanges.date.max &&
            moment(catalogue.itemsRanges.date.max).fromNow()}
        </p>
      </div>
    </div>
  )
}

export default React.forwardRef(CatalogueCard)
