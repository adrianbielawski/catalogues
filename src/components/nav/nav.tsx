import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import styles from './nav.scss'
//Types
import { LocationState } from 'src/globalTypes'
//Custom components
import NavLink from './navLink/navLink'
import NavList from './navList/navList'

export type ItemWithUrl = {
    title: string,
    url: string,
    children?: never,
}

type ItemWithChildren = {
    title: string,
    url?: never,
    children: ItemWithUrl[],
}

type ItemType = ItemWithUrl | ItemWithChildren

interface Props {
    content: ItemType[],
    goBack?: {default: string, url: string},
    extraItems?: JSX.Element[]
}

interface ShowList {
    show: boolean,
    index: number | null,
}

type GetItems = () => React.ReactNode
type GetExtraItems = () => React.ReactNode[]
type HandleListClick = (index: number) => void
type HandleListHover = (index: number) => void
type HandleLinkHover = () => void

const Nav = (props: Props) => {
    const history = useHistory<LocationState>()
    const location = useLocation<LocationState>()
    const [showList, setShowList] = useState<ShowList>({ show: false, index: null })
    const [prevLocation, setPrevLocation] = useState<string>('')
    
    useEffect(() => {
        if (location.state !== undefined) {
            setPrevLocation(location.state.referrer)
        }
    }, [])

    const handleListClick: HandleListClick = (index) => {
        if (showList.show === false) {
            setShowList({ show: true, index })
        } else {
            setShowList({ show: false, index: null })
        }
    }

    const handleListHover: HandleListHover = (index) => {
        if (showList.show === false) {
            return
        } else {
            setShowList({ show: true, index })
        }
    }

    const handleLinkHover: HandleLinkHover = () => {
        if (showList.show === false) {
            return
        } else {
            setShowList({ show: true, index: null })
        }
    }

    const handleGoBack = () => {
        history.push(prevLocation! || props.goBack!.url)
    }

    const getItems: GetItems = () => {
        let items = props.content.map((item, index) => {
            if (item.url !== undefined) {
                return (
                    <NavLink
                        title={item.title}
                        url={item.url}
                        onHover={handleLinkHover}
                        key={index}
                    />
                )
            } else {
                return (
                    <NavList
                        title={item.title}
                        children={item.children}
                        index={index}
                        show={showList.show === true && showList.index === index}
                        onClick={handleListClick}
                        onHover={handleListHover}
                        key={index}
                    />
                )
            }
        })

        if (props.goBack !== undefined) {
            items.unshift(
                <li className={styles.navItem} onClick={handleGoBack} key={'goBack'}>
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        className={styles.leftArrow}
                    />
                    <p>
                        {prevLocation === '' ? props.goBack.default : 'Go back'}
                    </p>
                </li>
            )
        }

        return items
    }

    const getExtraItems: GetExtraItems = () => props.extraItems!.map((item, index) =>
        <li key={`extraItem${index}`}>{item}</li>
    )

    return (
        <nav className={styles.nav}>
            <ul className={styles.navContent}>
                {getItems()}
            </ul>
            <ul className={styles.navContent}>
                {props.extraItems !== undefined ? getExtraItems() : null}
            </ul>
        </nav>
    )
}

export default Nav