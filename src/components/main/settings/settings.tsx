import React, { Suspense, useState, useEffect, useRef } from 'react'
import { Redirect, useLocation } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'
import styles from './settings.scss'
//Types
import { LocationState } from 'src/globalTypes'
import { NavItemType } from 'components/global-components/nav/deprecated-nav/nav'
//Contexts
import SideMenuContextProvider from 'components/global-components/side-menu/sideMenuContextProvider'
//Redux
import { useTypedSelector } from 'store/storeConfig'
//Custom components
import DeprecatedNav from 'components/global-components/nav/deprecated-nav/nav'
import AuthButton from 'components/auth/auth-button/authButton'
import Loader from 'components/global-components/loader/loader'
import AccountSettings from './account-settings/accountSettings'
import SideMenuButton from 'components/global-components/side-menu/side-menu-button/sideMenuButton'
import Header from 'components/global-components/header/header'

const sideMenuContextValue = {
    show: false,
}

const Settings = () => {
    const location = useLocation<LocationState>()
    const settingsRef = useRef<HTMLDivElement>(null)
    const currentUser = useTypedSelector(state => state.currentUser.user)
    const [minHeight, setMinHeight] = useState(0)
    const app = useTypedSelector(state => state.app)
    const [showNav, setShowNav] = useState(false)
    const [showSideMenu, setShowSideMenu] = useState(false)

    const toggleNav = (e: React.MouseEvent) => {
        e.stopPropagation()
        setShowNav(!showNav)
        setShowSideMenu(false)
    }

    const toggleSideMenu = (e: React.MouseEvent) => {
        e.stopPropagation()
        setShowNav(false)
        setShowSideMenu(!showSideMenu)
    }

    useEffect(() => {
        const close = () => {
            setShowNav(false)
            setShowSideMenu(false)
        }

        if (showNav || showSideMenu) {
            window.addEventListener('click', close)
        }
        return () => {
            window.removeEventListener('click', close)
        }
    }, [showNav, showSideMenu])


    const NAV_CONTENT: NavItemType[] = [
        {
            id: 'AccountSettings',
            title: 'Account settings',
            url: `/${currentUser!.username}/settings/account`,
        }
    ]

    useEffect(() => {
        if (settingsRef.current === null) {
            return
        }
        window.addEventListener('resize', getMinHeight)
        getMinHeight()

        return () => {
            window.removeEventListener('resize', getMinHeight)
        }
    }, [settingsRef.current, app.screenHeight])

    const getMinHeight = () => {
        const top = settingsRef.current?.getBoundingClientRect().top
        const minHeight = app.screenHeight - top!
        setMinHeight(minHeight)
    }

    const navBarExtraItems = [
        {
            component: <AuthButton className={styles.logout} />,
            inNavBarOnMobile: false,
        },
        {
            component: <SideMenuButton onToggle={toggleSideMenu} />,
            inNavBarOnMobile: true,
        }
    ]

    return (
        <SideMenuContextProvider
            value={sideMenuContextValue}
            show={showSideMenu}
            onChange={() => { }}
        >
            <div
                className={styles.settings}
                style={{ minHeight: `${minHeight}px` }}
                ref={settingsRef}
            >
                {app.switches.find(s => s === 'NAVIGATION_REDESIGN')
                    ? <Header />
                    : (
                    <DeprecatedNav
                        show={showNav}
                        content={NAV_CONTENT}
                        goBack={{
                            title: 'Catalogues',
                            url: `/${currentUser!.username}/catalogues`,
                            location: `/${currentUser!.username}/settings`,
                        }}
                        extraItems={navBarExtraItems}
                        onToggleNav={toggleNav}
                    />
                )}
                <Suspense fallback={<Loader />}>
                    <Switch>
                        <Redirect
                            exact
                            from="/:username/settings"
                            to={{
                                pathname: "/:username/settings/account",
                                state: location.state,
                            }}
                        />
                        <Route
                            path="/:username/settings/account"
                            render={() => (
                                <AccountSettings
                                    onToggleSideMenu={toggleSideMenu}
                                />
                            )}
                        />
                    </Switch>
                </Suspense>
            </div>
        </SideMenuContextProvider>
    )
}

export default Settings