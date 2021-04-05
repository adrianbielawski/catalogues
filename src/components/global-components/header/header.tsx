import React, { useContext } from 'react'
import { useHistory, useLocation } from 'react-router'
import icon from 'assets/img/icon.svg'
import {
    faFolderOpen, faHouseUser, faSignInAlt, faSignOutAlt, faTh, faUser
} from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import styles from './header.scss'
//Types
import { LocationState } from 'src/globalTypes'
//Context
import { NavContext } from '../nav/nav-store/navStore'
//Redux
import { LOG_OUT } from 'store/slices/authSlices/authSlices'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
//custom components
import Nav, { ItemType, ItemWithChildrenAndFaIcon } from '../nav/nav'
import NavContextProvider from '../nav/nav-store/navContextProvider'
import Avatar from '../avatar/avatar'
import SettingsIcon from './settings-icon/settingsIcon'
import { useSwitches } from 'src/hooks/useSwitches'

const contextValue = {
    show: false,
    listId: null,
    nestedListId: null,
}

const Header = () => {
    const dispatch = useAppDispatch()
    const history = useHistory<LocationState>()
    const location = useLocation<LocationState>()
    const { show } = useContext(NavContext)
    const user = useTypedSelector(state => state.auth.user)
    const catalogues = useTypedSelector(state => state.catalogues)
    const [FAVOURITE_ITEMS, USER_DASHBOARD] = useSwitches(['FAVOURITE_ITEMS', 'USER_DASHBOARD'])

    const handleLogout = () => {
        dispatch(LOG_OUT({ history }))
    }

    const NAV_ITEMS: ItemType[] = user !== null ? [
        {
            id: 'Favourites',
            title: 'Favourites',
            faIcon: faHeart,
            children: [
                {
                    id: 'Favourite catalogues',
                    title: 'Favourite catalogues',
                    faIcon: faFolderOpen,
                    children: catalogues.authUser.favouriteCatalogues.map(c => ({
                        id: c.name,
                        title: c.name,
                        icon: <Avatar
                            className={styles.catalogueImage}
                            placeholderIcon={faFolderOpen}
                            url={c.imageThumbnail}
                        />,
                        url: `/${c.createdBy.username}/catalogues/${c.slug}`,
                    })),
                },
            ]
        },
        {
            id: 'My catalogues',
            title: 'My catalogues',
            faIcon: faFolderOpen,
            children: catalogues.authUser.catalogues.map(c => ({
                id: c.name,
                title: c.name,
                icon: <Avatar
                    className={styles.catalogueImage}
                    placeholderIcon={faFolderOpen}
                    url={c.imageThumbnail}
                />,
                url: `/${user!.username}/catalogues/${c.slug}`,
            })),
        },
        {
            id: 'User',
            title: user.username,
            icon: <Avatar
                className={styles.userImage}
                placeholderIcon={faUser}
                url={user?.imageThumbnail}
            />,
            children: [
                {
                    id: 'My account',
                    title: 'My account',
                    icon: (
                        <SettingsIcon mainIcon={faUser} />
                    ),
                    url: `/${user!.username}/settings/account/my-account`,
                },
                {
                    id: 'Manage catalogues',
                    title: 'Manage catalogues',
                    icon: (
                        <SettingsIcon mainIcon={faFolderOpen} />
                    ),
                    url: `/${user!.username}/settings/account/manage-catalogues`,
                },
                {
                    id: 'Logout',
                    title: 'Logout',
                    faIcon: faSignOutAlt,
                    onClick: handleLogout,
                }
            ],
        },
    ] : [
        {
            id: 'Login',
            title: 'Login',
            faIcon: faSignInAlt,
            url: '/'
        }
    ]

    if (!user && (location.pathname === '/login' || location.pathname === '/')) {
        const loginIndex = NAV_ITEMS.findIndex(item => item.id !== 'Login')
        NAV_ITEMS.splice(loginIndex, 1)
    }

    if (user !== null && FAVOURITE_ITEMS) {
        (NAV_ITEMS[0] as ItemWithChildrenAndFaIcon).children.push({
            id: 'Favourite items',
            title: 'Favourite items',
            faIcon: faTh,
            url: `/${user.username}/favourite-items`,
        })
    }

    if (user !== null && USER_DASHBOARD) {
        NAV_ITEMS.unshift({
            id: 'User dashboard',
            title: 'User dashboard',
            faIcon: faHouseUser,
            url: `/${user.username}`,
        })
    }

    return (
        <NavContextProvider value={contextValue}>
            <div className={styles.header}>
                <img className={styles.logo} src={icon} />
                <Nav show={show} items={NAV_ITEMS} />
            </div>
        </NavContextProvider>
    )
}

export default Header