import React, { useState, useEffect } from 'react'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltUp } from '@fortawesome/free-solid-svg-icons'
import { faLongArrowAltDown } from '@fortawesome/free-solid-svg-icons'
import styles from '../nav.scss'
//Custom components
import NavLink from '../navLink/navLink'
import { ItemWithUrl } from '../nav'

interface Props {
    title: string,
    children: ItemWithUrl[],
    show: boolean,
    index: number,
    onClick: (index: number) => void
    onHover: (index: number) => void
}
const cx = classNames.bind(styles)

type GetItems = () => React.ReactNode

const NavList = (props: Props) => {
    const [listTitle, setListTitle] = useState(props.title)

    useEffect(() => {
        const activeItem = props.children.find(child => child.url === location.pathname)
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
            active: listTitle !== props.title,
            hover: props.show,
        }
    )

    const navListClass = cx(
        'navList',
        {
            hover: props.show,
        }
    )

    const getItems: GetItems = () => {
        return props.children.map(item => {
            return (
                <NavLink
                    title={item.title}
                    url={item.url}
                    onClick={handleClick}
                    key={item.title}
                />
            )
        })
    }

    return (
        <li>
            <div className={titleClass} onClick={handleClick} onMouseOver={handleHover}>
                <p>{listTitle}</p>
                <FontAwesomeIcon
                    icon={props.show ? faLongArrowAltUp : faLongArrowAltDown}
                    className={styles.arrow}
                />
            </div>
            <ul className={navListClass}>
                {getItems()}
            </ul>
        </li>
    )
}

export default NavList