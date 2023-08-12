import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import styles from './favouriteIcon.module.scss'
// Custom components
import TransparentButton from 'components/global-components/transparent-button/transparentButton'

interface Props {
  active: boolean
  className?: string
  onChange?: () => void
}

const cx = classNames.bind(styles)

const FavouriteIcon = (props: Props) => {
  const handleChange = () => {
    if (props.onChange != null) {
      props.onChange()
    }
  }
  const iconClass = cx('favouriteIcon', props.className, {
    active: props.active,
  })

  return (
    <TransparentButton className={iconClass} onClick={handleChange}>
      <FontAwesomeIcon icon={faHeart} />
    </TransparentButton>
  )
}

export default FavouriteIcon
