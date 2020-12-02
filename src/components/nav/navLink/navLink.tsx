import React from 'react'
import { useHistory } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from '../nav.scss'

interface Props {
  title: string,
  url: string,
  onClick?: () => void,
  onHover?: () => void,
}
const cx = classNames.bind(styles)

const NavLink = (props: Props) => {
  const history = useHistory()

  const handleClick = () => {
    if (props.url !== undefined) {
      history.push(props.url!)
    }
    if (props.onClick !== undefined) {
      props.onClick()
    }
  }

  const navLinkClass = cx(
      'navItem',
      {
        active: location.pathname === props.url,
      }
  )

  return (
    <li className={navLinkClass} onClick={handleClick} onMouseOver={props.onHover}>
      <p>{props.title}</p>
    </li>
  )
}

export default NavLink