import React, { ReactNode, useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import styles from './nav.scss'
//Types
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { LocationState } from 'src/globalTypes'
//Router
import { RouterContext, useUrlBuilder } from 'src/router'
//Context
import { NavContext } from './nav-store/navStore'
//Custom components
import NavItem from './nav-item/navItem'
import NavList from './nav-list/navList'

export type CommonItem = {
    id: string | number,
    title: string,
}

export type ItemWithOnClickAndIcon = CommonItem & {
    icon: ReactNode,
    faIcon?: never,
    onClick?: () => void,
}

export type ItemWithOnClickAndFaIcon = CommonItem & {
    icon?: never,
    faIcon: IconProp,
    onClick?: () => void,
}

type ItemWithOnClick = ItemWithOnClickAndIcon | ItemWithOnClickAndFaIcon

export type ItemWithUrlAndIcon = CommonItem & {
    icon: ReactNode,
    faIcon?: never,
    url: string,
    children?: never,
    onClick?: never,
}

export type ItemWithUrlAndFaIcon = CommonItem & {
    icon?: never,
    faIcon: IconProp,
    url: string,
    children?: never,
    onClick?: never,
}

export type ItemWithUrl = ItemWithUrlAndIcon | ItemWithUrlAndFaIcon

type ItemWithChildrenAndIcon = CommonItem & {
    icon: ReactNode,
    faIcon?: never,
    url?: never,
    children: (ItemWithUrl | ItemWithOnClick)[],
}

type ItemWithChildrenAndFaIcon = CommonItem & {
    icon?: never,
    faIcon: IconProp,
    url?: never,
    children: (ItemWithUrl | ItemWithOnClick)[],
}

export type ItemWithChildren = ItemWithChildrenAndIcon | ItemWithChildrenAndFaIcon

export type ItemType = ItemWithUrl | ItemWithChildren | ItemWithOnClick

interface Props {
    items: ItemType[],
    show: boolean,
    className?: string,
}

const Nav = (props: Props) => {
    const history = useHistory<LocationState>()
    const params = useParams()
    const routerContext = useContext(RouterContext)
    const { show, listId, showList, closeList } = useContext(NavContext)
    const buildUrl = useUrlBuilder()

    const getItemById = props.items.filter(i => i.id === listId)[0]

    const items = props.items.map(item => {
        const handleClick = () => {
            if ('url' in item && item.url !== undefined) {
                history.push(item.url!, {
                    referrer: {
                        pathname: buildUrl({
                            pathname: routerContext.match?.path,
                            params,
                        }),
                        params,
                    },
                })
            } else {
                if (show && listId === item.id) {
                    closeList()
                } else {
                    showList(item.id)
                }
            }
        }

        return (
            <NavItem
                className={styles.item}
                item={item}
                active={show && listId === item.id}
                onClick={handleClick}
                key={item.id}
            />
        )
    })

    return (
        <nav className={styles.nav}>
            <ul className={styles.items}>
                {items}
            </ul>
            <NavList
                show={show}
                item={getItemById as ItemWithChildren}
            />
        </nav>
    )
}

export default Nav