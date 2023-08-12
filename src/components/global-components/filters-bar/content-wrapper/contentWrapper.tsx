import { ReactNode } from 'react'
import classNames from 'classnames/bind'
import styles from './contentWrapper.module.scss'
// components
import AnimateHeight from 'react-animate-height'

interface Props {
  active: boolean
  children: ReactNode
}

const cx = classNames.bind(styles)

const ContentWrapper = (props: Props) => {
  const contentClass = cx('content', {
    active: props.active,
  })

  return (
    <AnimateHeight className={contentClass} height={props.active ? 'auto' : 0}>
      {props.children}
    </AnimateHeight>
  )
}

export default ContentWrapper
