import React, { useContext } from 'react'
import { useLocation } from 'react-router'
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
import { LOG_OUT } from 'store/modules/auth-user/slice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
//Components
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
    const location = useLocation<LocationState>()
    const users = useTypedSelector(state => state.entities.users.entities)
    const authUserData = useTypedSelector(state => state.modules.authUser)
    const authUser = authUserData.id ? users[authUserData.id] : null
    const catalogues = useTypedSelector(state => state.entities.catalogues.entities)
    const cataloguesData = useTypedSelector(state => state.modules.authUserCatalogues.cataloguesData)
    const favouriteCatalogues = useTypedSelector(state => state.modules.authUserFavoirites.cataloguesIds)
    const { show } = useContext(NavContext)
    const [FAVOURITE_ITEMS, USER_DASHBOARD] = useSwitches(['FAVOURITE_ITEMS', 'USER_DASHBOARD'])

    const handleLogout = () => {
        dispatch(LOG_OUT())
    }

    const NAV_ITEMS: ItemType[] = authUser !== null ? [
        {
            id: 'Favourites',
            title: 'Favourites',
            faIcon: faHeart,
            children: [
                {
                    id: 'Favourite catalogues',
                    title: 'Favourite catalogues',
                    faIcon: faFolderOpen,
                    children: favouriteCatalogues.map(id => ({
                        id: catalogues[id]!.name,
                        title: catalogues[id]!.name,
                        icon: <Avatar
                            className={styles.catalogueImage}
                            placeholderIcon={faFolderOpen}
                            url={catalogues[id]!.imageThumbnail}
                        />,
                        url: `/${users[catalogues[id]!.createdBy]!.username}/catalogues/${catalogues[id]!.slug}`,
                    })),
                },
            ]
        },
        {
            id: 'My catalogues',
            title: 'My catalogues',
            faIcon: faFolderOpen,
            children: cataloguesData.map(c => ({
                id: catalogues[c.id]!.name,
                title: catalogues[c.id]!.name,
                icon: <Avatar
                    className={styles.catalogueImage}
                    placeholderIcon={faFolderOpen}
                    url={catalogues[c.id]!.imageThumbnail}
                />,
                url: `/${authUser!.username}/catalogues/${catalogues[c.id]!.slug}`,
            })),
        },
        {
            id: 'User',
            title: authUser!.username,
            icon: <Avatar
                className={styles.userImage}
                placeholderIcon={faUser}
                url={authUser!.imageThumbnail}
            />,
            children: [
                {
                    id: 'My account',
                    title: 'My account',
                    icon: (
                        <SettingsIcon mainIcon={faUser} />
                    ),
                    url: `/${authUser!.username}/settings/account/my-account`,
                },
                {
                    id: 'Manage catalogues',
                    title: 'Manage catalogues',
                    icon: (
                        <SettingsIcon mainIcon={faFolderOpen} />
                    ),
                    url: `/${authUser!.username}/settings/account/manage-catalogues`,
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

    if (!authUser && (location.pathname === '/login' || location.pathname === '/')) {
        const loginIndex = NAV_ITEMS.findIndex(item => item.id !== 'Login')
        NAV_ITEMS.splice(loginIndex, 1)
    }

    if (authUser !== null && FAVOURITE_ITEMS) {
        (NAV_ITEMS[0] as ItemWithChildrenAndFaIcon).children.push({
            id: 'Favourite items',
            title: 'Favourite items',
            faIcon: faTh,
            url: `/${authUser!.username}/favourite-items`,
        })
    }

    if (authUser !== null && USER_DASHBOARD) {
        NAV_ITEMS.unshift({
            id: 'User dashboard',
            title: 'User dashboard',
            faIcon: faHouseUser,
            url: `/${authUser!.username}`,
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