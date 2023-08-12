import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { type IconDefinition } from '@fortawesome/fontawesome-svg-core'
import classNames from 'classnames/bind'
import styles from './avatar.module.scss'
// Constants
import { API_URL } from 'src/constants'
// Components
import Image from 'components/global-components/image/image'

interface Props {
  url?: string
  placeholderIcon?: IconDefinition
  className: string
}

const cx = classNames.bind(styles)

const Avatar = (props: Props) => {
  const placeholder =
    props.placeholderIcon != null ? (
      <FontAwesomeIcon
        icon={props.placeholderIcon}
        className={styles.placeholder}
      />
    ) : undefined

  const avatarClass = cx('avatar', props.className)

  return (
    <div className={avatarClass}>
      <Image
        className={styles.image}
        url={props.url}
        baseUrl={API_URL}
        onLoading={'placeholder'}
        placeHolder={placeholder}
      />
    </div>
  )
}

export default Avatar
