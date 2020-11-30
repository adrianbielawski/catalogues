import React from 'react'
import classNames from 'classnames/bind'
import styles from './navLink.scss'

interface Props {
  className?: string,
  title: string,
  onClick: () => void,
}
const cx = classNames.bind(styles)

const NavLink = (props: Props) => {

  const navLinkClass = cx(
      'navLink',
      props.className,
  )

  return (
    <p className={navLinkClass} onClick={props.onClick}>{props.title}</p>
  )
}

export default NavLink