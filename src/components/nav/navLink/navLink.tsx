import React from 'react'
import classNames from 'classnames/bind'
import styles from './navLink.scss'

interface Props {
  className?: string,
  title: string,
  active?: boolean,
  onClick: () => void,
}
const cx = classNames.bind(styles)

const NavLink = (props: Props) => {
  const { active, className, ...rest } = props

  const navLinkClass = cx(
      'navLink',
      className,
      {
        active,
      }
  )

  return (
    <p className={navLinkClass} {...rest}>
      {props.title}
    </p>
  )
}

export default NavLink