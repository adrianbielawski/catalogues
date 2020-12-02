import React, { useState, Fragment } from 'react'
import styles from './nav.scss'
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
    const [showList, setShowList] = useState<ShowList>({ show: false, index: null })

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

    const getItems: GetItems = () => (
        props.content.map((item, index) => {
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
    )

    const getExtraItems: GetExtraItems = () => {
        return props.extraItems!.map((item, index) =>
            <li key={`extraItem${index}`}>{item}</li>
        )
    }

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