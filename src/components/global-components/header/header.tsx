import React, { useContext } from 'react'
import icon from 'assets/img/icon.svg'
import { faCog, faFolderOpen, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import styles from './header.scss'
//Redux
import { LOG_OUT } from 'store/slices/authSlices/authSlices'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
//custom components
import Nav from '../nav/nav'
import UserImage from '../user-image/userImage'
import NavContextProvider from '../nav/nav-store/navContextProvider'
import { NavContext } from '../nav/nav-store/navStore'
import { useHistory } from 'react-router'
import { LocationState } from 'src/globalTypes'
import FavouriteIcon from '../favourite-icon/favouriteIcon'

const contextValue = {
    show: false,
    listId: null,
}

const Header = () => {
    const dispatch = useAppDispatch()
    const history = useHistory<LocationState>()
    const { show } = useContext(NavContext)
    const user = useTypedSelector(state => state.auth.user)
    const catalogues = useTypedSelector(state => state.catalogues)

    const handleLogout = () => {
        dispatch(LOG_OUT({history}))
    }

    const NAV_ITEMS = user !== null ? [
        // {
        //     id: 'Favourite catalogues',
        //     title: 'Favourite catalogues',
        //     icon: (
        //         <FavouriteIcon
        //             className={styles.favouriteIcon}
        //             active={props.catalogue.isFavourite}
        //             onChange={handleFavouriteChange}
        //         />
        //     ),
        //     children: [
        //         {
        //             id: 'My account',
        //             title: 'My account',
        //             faIcon: faCog,
        //             url: `/${user!.username}/settings/account/my-account`,
        //         },
        //         {
        //             id: 'Manage catalogues',
        //             title: 'Manage catalogues',
        //             faIcon: faCog,
        //             url: `/${user!.username}/settings/account/manage-catalogues`,
        //         },
        //         {
        //             id: 'Logout',
        //             title: 'Logout',
        //             faIcon: faSignOutAlt,
        //             onClick: handleLogout,
        //         }
        //     ],
        // },
        {
            id: 'My catalogues',
            title: 'My catalogues',
            faIcon: faFolderOpen,
            children: catalogues.authUser.catalogues.map(c => ({
                id: c.name,
                title: c.name,
                faIcon: faFolderOpen,
                url: `/${user!.username}/catalogues/${c.slug}`,
            })),
        },
        {
            id: 'User',
            title: user.username,
            icon: (
                <UserImage
                    className={styles.userImage}
                    url={user?.imageThumbnail}
                />
            ),
            children: [
                {
                    id: 'My account',
                    title: 'My account',
                    faIcon: faCog,
                    url: `/${user!.username}/settings/account/my-account`,
                },
                {
                    id: 'Manage catalogues',
                    title: 'Manage catalogues',
                    faIcon: faCog,
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