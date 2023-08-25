import { ForwardRefRenderFunction, forwardRef } from 'react'
import moment from 'moment'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import styles from './catalogueCard.module.scss'
import { DeserializedCatalogue } from 'src/globalTypes'
import { useTypedSelector } from 'store/storeConfig'
import { userSelector } from 'store/selectors'
import AvatarWithName from '../avatar-with-name/avatarWithName'
import NoImageIcon from '../no-image-icon/noImageIcon'
import Image from 'components/global-components/image/image'
import { useNavigate } from 'react-router-dom'

interface Props {
  catalogue: DeserializedCatalogue
  className?: string
}

const cx = classNames.bind(styles)

const CatalogueCard: ForwardRefRenderFunction<HTMLDivElement, Props> = (
  { catalogue, className },
  ref,
) => {
  const navigate = useNavigate()

  const user = useTypedSelector(userSelector(catalogue.createdBy))!

  const redirectToCatalogue = () => {
    navigate(`/${user.username}/catalogues/${catalogue.slug}`)
  }

  const redirectToUser = () => {
    navigate(`/${user.username}`)
  }

  const catalogueCardClass = cx('catalogueCard', className)

  return (
    <div className={catalogueCardClass} ref={ref}>
      <p className={styles.header} onClick={redirectToCatalogue}>
        {catalogue.name}
      </p>
      <Image
        className={styles.image}
        url={catalogue.imageThumbnail}
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

export default forwardRef(CatalogueCard)
