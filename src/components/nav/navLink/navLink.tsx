import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from '../nav.scss'
//Types
import { LocationState } from 'src/globalTypes'

interface Props {
  title: string,
  url: string,
  onClick?: () => void,
  onHover?: () => void,
}
const cx = classNames.bind(styles)

const NavLink = (props: Props) => {
  const history = useHistory<LocationState>()
  const location = useLocation<LocationState>()

  const handleClick = () => {
    if (props.url !== undefined) {
      history.push(props.url!, {
        referrer: location.pathname
      })
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