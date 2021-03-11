import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './sideMenuItem.scss'
//Types
import { LocationState } from 'src/globalTypes'

type Props = {
    title: string,
    url: string,
    onClick: (e: React.MouseEvent) => void,
}

const cx = classNames.bind(styles)

const SideMenuItem = (props: Props) => {
    const history = useHistory<LocationState>()
    const location = useLocation<LocationState>()
    
    const handleClick = (e: React.MouseEvent) => {
        history.push(props.url!, location.state)
        props.onClick(e)
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