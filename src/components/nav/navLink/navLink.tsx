import React, { useContext } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from '../nav.scss'
//Types
import { LocationState } from 'src/globalTypes'
import { NavItemWithUrl } from '../nav'
//Router context
import { RouterContext } from 'src/router'

interface Props {
  item: NavItemWithUrl,
  onClick?: () => void,
  onHover?: () => void,
}
const cx = classNames.bind(styles)

const NavLink = (props: Props) => {
  const history = useHistory<LocationState>()
  const location = useLocation<LocationState>()
  const params = useParams()
  const routerContext = useContext(RouterContext)

  const handleClick = () => {
    if (props.item.url !== undefined) {
      history.push(props.item.url!, {
        referrer: {
          path: routerContext.match.path,
          params,
        }
      })
    }
    if (props.onClick !== undefined) {
      props.onClick()
    }
  }

  const navLinkClass = cx(
      'navItem',
      {
        active: location.pathname === props.item.url,
      }
  )

  return (
    <li className={navLinkClass} onClick={handleClick} onMouseOver={props.onHover}>
      <p>{props.item.title}</p>
    </li>
  )
}

export default NavLink