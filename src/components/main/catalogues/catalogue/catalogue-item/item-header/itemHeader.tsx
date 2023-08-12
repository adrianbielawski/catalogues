import { useHistory } from 'react-router'
import { faFolderOpen, faUser } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import styles from './itemHeader.module.scss'
// Types
import { type LocationState } from 'src/globalTypes'
// Components
import AvatarWithName from 'components/global-components/avatar-with-name/avatarWithName'

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
  const history = useHistory<LocationState>()

  const handleUserClick = () => {
    history.push(`/${props.username}`)
  }

  const handleCatalogueClick = () => {
    history.push(`/${props.username}/catalogues/${props.slug}`)
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
