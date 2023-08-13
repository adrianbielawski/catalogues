import { useContext } from 'react'
import { useHistory, useLocation } from 'react-router'
import { useParams } from 'react-router-dom'
import icon from 'assets/img/icon.svg'
import {
  faFolderOpen,
  faHouseUser,
  faSignInAlt,
  faSignOutAlt,
  faTh,
  faUser,
  faHeart,
} from '@fortawesome/free-solid-svg-icons'

import styles from './header.module.scss'
// Types
import { type LocationState } from 'src/globalTypes'
// Redux
import { LOG_OUT } from 'store/modules/auth-user/slice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
// Router
import { RouterContext, useUrlBuilder } from 'src/router'
// Components
import Nav, { type ItemType } from '../nav/nav'
import NavContextProvider from '../nav/nav-store/navContextProvider'
import Avatar from '../avatar/avatar'
import SettingsIcon from './settings-icon/settingsIcon'

const contextValue = {
  show: false,
  listId: null,
  nestedListId: null,
}

const Header = () => {
  const dispatch = useAppDispatch()
  const history = useHistory<LocationState>()
  const location = useLocation<LocationState>()
  const largeViewport = useTypedSelector(
    (state) => state.modules.app.screenWidth.largeViewport,
  )
  const users = useTypedSelector((state) => state.entities.users.entities)
  const authUserData = useTypedSelector((state) => state.modules.authUser)
  const authUser = authUserData.id ? users[authUserData.id] : null
  const catalogues = useTypedSelector(
    (state) => state.entities.catalogues.entities,
  )
  const cataloguesData = useTypedSelector(
    (state) => state.modules.authUserCatalogues.cataloguesData,
  )
  const favouriteCatalogues = useTypedSelector(
    (state) => state.modules.authUserFavourites.cataloguesIds,
  )
  const params = useParams()
  const routerContext = useContext(RouterContext)
  const buildUrl = useUrlBuilder()

  const handleLogout = () => {
    dispatch(LOG_OUT())
  }

  const handleLogoClick = () => {
    history.push('/discover', {
      referrer: {
        pathname: buildUrl({
          pathname: routerContext.match?.path,
          params,
        }),
        params,
      },
    })
  }

  const NAV_ITEMS: ItemType[] =
    authUser !== null
      ? [
          {
            id: 'User dashboard',
            title: 'User dashboard',
            faIcon: faHouseUser,
            url: `/${authUser!.username}`,
          },
          {
            id: 'Favourites',
            title: 'Favourites',
            faIcon: faHeart,
            children: [
              {
                id: 'Favourite catalogues',
                title: 'Favourite catalogues',
                faIcon: faFolderOpen,
                children: favouriteCatalogues.map((id) => ({
                  id: catalogues[id]!.name,
                  title: catalogues[id]!.name,
                  icon: (
                    <Avatar
                      className={styles.catalogueImage}
                      placeholderIcon={faFolderOpen}
                      url={catalogues[id]!.imageThumbnail}
                    />
                  ),
                  url: `/${
                    users[catalogues[id]!.createdBy]!.username
                  }/catalogues/${catalogues[id]!.slug}`,
                })),
              },
              {
                id: 'Favourite items',
                title: 'Favourite items',
                faIcon: faTh,
                url: `/${authUser!.username}/favourite-items`,
              },
            ],
          },
          {
            id: 'My catalogues',
            title: 'My catalogues',
            faIcon: faFolderOpen,
            children: cataloguesData.map((c) => ({
              id: catalogues[c.id]!.name,
              title: catalogues[c.id]!.name,
              icon: (
                <Avatar
                  className={styles.catalogueImage}
                  placeholderIcon={faFolderOpen}
                  url={catalogues[c.id]!.imageThumbnail}
                />
              ),
              url: `/${authUser!.username}/catalogues/${
                catalogues[c.id]!.slug
              }`,
            })),
          },
          {
            id: 'User',
            title: authUser!.username,
            icon: (
              <Avatar
                className={styles.userImage}
                placeholderIcon={faUser}
                url={authUser!.imageThumbnail}
              />
            ),
            children: [
              {
                id: 'My account',
                title: 'My account',
                icon: <SettingsIcon mainIcon={faUser} />,
                url: `/${authUser!.username}/settings/account/my-account`,
              },
              {
                id: 'Manage catalogues',
                title: 'Manage catalogues',
                icon: <SettingsIcon mainIcon={faFolderOpen} />,
                url: `/${
                  authUser!.username
                }/settings/account/manage-catalogues`,
              },
              {
                id: 'Logout',
                title: 'Logout',
                faIcon: faSignOutAlt,
                onClick: handleLogout,
              },
            ],
          },
        ]
      : [
          {
            id: 'Login',
            title: 'Login',
            faIcon: faSignInAlt,
            url: '/login',
          },
        ]

  if (authUser == null && location.pathname === '/login') {
    const loginIndex = NAV_ITEMS.findIndex((item) => item.id !== 'Login')
    NAV_ITEMS.splice(loginIndex, 1)
  }

  return (
    <NavContextProvider value={contextValue}>
      <div className={styles.header}>
        <div className={styles.title} onClick={handleLogoClick}>
          <img className={styles.logo} src={icon} alt="" />
          {location.pathname === '/' && largeViewport && <h1>Catalogues</h1>}
        </div>
        <Nav items={NAV_ITEMS} />
      </div>
    </NavContextProvider>
  )
}

export default Header
