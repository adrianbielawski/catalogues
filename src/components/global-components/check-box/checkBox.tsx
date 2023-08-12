import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare as solidSquare } from '@fortawesome/free-solid-svg-icons'
import { faSquare as regularSquare } from '@fortawesome/free-regular-svg-icons'
import classNames from 'classnames/bind'
import styles from './checkBox.module.scss'

interface Props {
  selected: boolean
  className?: string
  onChange?: () => void
}

const cx = classNames.bind(styles)

const CheckBox = (props: Props) => {
  const checkBoxClass = cx('checkBox', {
    selected: props.selected,
  })

  return (
    <FontAwesomeIcon
      icon={props.selected ? solidSquare : regularSquare}
      className={checkBoxClass}
      onChange={props.onChange}
    />
  )
}

export default CheckBox
