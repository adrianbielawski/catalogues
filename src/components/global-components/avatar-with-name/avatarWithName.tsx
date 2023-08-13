import { type IconDefinition } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import styles from './avatarWithName.module.scss'
// Custom components
import Avatar from 'components/global-components/avatar/avatar'

interface Props {
  url: string
  name: string
  placeholderIcon: IconDefinition
  reversed?: boolean
  className?: string
  avatarClassName?: string
  onClick: () => void
}

const cx = classNames.bind(styles)

const AvatarWithName = (props: Props) => {
  const avatarWithNameClass = cx('avatarWithName', props.className, {
    reversed: props.reversed,
  })

  const avatarClass = cx('avatar', props.avatarClassName)

  return (
    <div className={avatarWithNameClass} onClick={props.onClick}>
      <Avatar
        className={avatarClass}
        placeholderIcon={props.placeholderIcon}
        url={props.url}
      />
      <p>{props.name}</p>
    </div>
  )
}

export default AvatarWithName
