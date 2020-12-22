import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './sideMenuItem.scss'
//Types
import { LocationState } from 'src/globalTypes'

type Props = {
    title: string,
    url: string,
    onClick: () => void,
}

const cx = classNames.bind(styles)

const SideMenuItem = (props: Props) => {
    const history = useHistory<LocationState>()
    const location = useLocation<LocationState>()
    const handleClick = () => {
        history.push(props.url!, {
          referrer: location.pathname
        })
        props.onClick()
    }

    const itemClass = cx(
        'item',
        {
          active: location.pathname === props.url,
        }
    )

    return (
        <li className={itemClass}>
            <span onClick={handleClick}>{props.title}</span>
        </li>
    )
}

export default SideMenuItem