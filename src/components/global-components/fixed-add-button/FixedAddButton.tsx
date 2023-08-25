import { ButtonHTMLAttributes } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import styles from './fixedAddButton.module.scss'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string
  className?: string
  onClick: () => void
}

const cx = classNames.bind(styles)

const FixedAddButton = (props: Props) => {
  const { text, onClick, className, ...rest } = props

  const buttonClass = cx('fixedAddButton', className)

  return (
    <button className={buttonClass} onClick={onClick} {...rest}>
      <FontAwesomeIcon icon={faPlus} className={styles.plus} />
    </button>
  )
}

export default FixedAddButton
