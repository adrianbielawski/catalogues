import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltUp } from '@fortawesome/free-solid-svg-icons'
import { faLongArrowAltDown } from '@fortawesome/free-solid-svg-icons'
import styles from '../nav.scss'
//Types
import { LocationState } from 'src/globalTypes'
//Custom components
import NavLink from '../navLink/navLink'
import { NavItemWithUrl } from '../nav'

interface Props {
    title: string,
    location: string,
    children: NavItemWithUrl[],
    show: boolean,
    index: number,
    onClick: (index: number) => void
    onLinkClick: () => void
    onHover: (index: number) => void
}
const cx = classNames.bind(styles)

const NavList = (props: Props) => {
    const location = useLocation<LocationState>()
    const [listTitle, setListTitle] = useState(props.title)

    useEffect(() => {
        const activeItem = props.children.find(child => location.pathname.startsWith(child.url))
        if (activeItem !== undefined) {
            setListTitle(activeItem.title)
        } else {
            setListTitle(props.title)
        }
    }, [location.pathname])

    const handleClick = () => {
        props.onClick(props.index)
    }

    const handleHover = () => {
        props.onHover(props.index)
    }

    const titleClass = cx(
        'navItem',
        {
            active: location.pathname === props.location || listTitle !== props.title,
            hover: props.show,
            noChildren: props.children.length === 0,
        }
    )

    const navListClass = cx(
        'navList',
        {
            active: props.show,
        }
    )

    const getItems = (): React.ReactNode => {
        return props.children.map(item => {
            if (location.pathname === item.url) {
                return
            } else {
                return (
                    <NavLink
                        item={item}
                        onClick={props.onLinkClick}
                        key={item.id}
                    />
                )
            }
        })
    }

    const getListTitle = () => {
        if (props.children.length > 0) {
            return (
                <div className={titleClass} onClick={handleClick} onMouseOver={handleHover}>
                    <p>{listTitle}</p>
                    {props.children.length > 1 &&
                        <FontAwesomeIcon
                            icon={props.show ? faLongArrowAltUp : faLongArrowAltDown}
                            className={styles.arrow}
                        />
                    }
                </div>
            )
        } else {
            return (
                <div className={titleClass} onMouseOver={handleHover}>
                    <p>{listTitle}</p>
                </div>
            )
        }
    }

    return (
        <li>
            {getListTitle()}
            <ul className={navListClass}>
                {getItems()}
            </ul>
        </li>
    )
}

export default NavList