import classNames from 'classnames/bind'
import styles from './contentWrapper.module.scss'
// components
import AnimateHeight from 'react-animate-height'
import { JSXElementConstructor } from 'react'

interface Props {
  active: boolean
  children: JSXElementConstructor<any>
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
