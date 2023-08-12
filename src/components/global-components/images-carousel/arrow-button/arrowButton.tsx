import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'

import classNames from 'classnames/bind'
import styles from './arrowButton.module.scss'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  leftArrow: boolean
  className?: string
  onClick: () => void
}

const cx = classNames.bind(styles)

const ArrowButton = (props: Props) => {
  const { className, leftArrow, onClick, ...rest } = props
  const buttonClass = cx('button', className)

  return (
    <button className={buttonClass} onClick={props.onClick} {...rest}>
      <FontAwesomeIcon
        icon={leftArrow ? faChevronLeft : faChevronRight}
        className={styles.arrow}
      />
    </button>
  )
}

export default ArrowButton
