import { faFolderOpen, faUser } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import styles from './itemHeader.module.scss'
import AvatarWithName from 'components/global-components/avatar-with-name/avatarWithName'
import { useNavigate } from 'react-router-dom'

interface Props {
  userImage: string
  username: string
  catalogueImage: string
  catalogueName: string
  slug: string
  className?: string
}

const cx = classNames.bind(styles)

const ItemHeader = (props: Props) => {
  const navigate = useNavigate()

  const handleUserClick = () => {
    navigate(`/${props.username}`)
  }

  const handleCatalogueClick = () => {
    navigate(`/${props.username}/catalogues/${props.slug}`)
  }

  const itemHeaderClass = cx('itemHeader', props.className)

  return (
    <div className={itemHeaderClass}>
      <AvatarWithName
        name={props.username}
        placeholderIcon={faUser}
        className={styles.username}
        url={props.userImage}
        avatarClassName={styles.userImage}
        onClick={handleUserClick}
      />
      <AvatarWithName
        name={props.catalogueName}
        placeholderIcon={faFolderOpen}
        url={props.catalogueImage}
        avatarClassName={styles.catalogueImage}
        reversed={true}
        onClick={handleCatalogueClick}
      />
    </div>
  )
}

export default ItemHeader
