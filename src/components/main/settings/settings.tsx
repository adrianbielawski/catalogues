import React, { Suspense, useState, useEffect, useRef } from 'react'
import { Redirect, useLocation } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'
import styles from './settings.scss'
//Types
import { LocationState } from 'src/globalTypes'
import { NavItemType } from 'components/nav/nav'
//Contexts
import SideMenuContextProvider from '../side-menu/sideMenuContextProvider'
//Redux
import { useTypedSelector } from 'store/reducers/index'
//Custom components
import Nav from 'components/nav/nav'
import Logout from 'components/auth/logout/logout'
import Loader from 'components/global-components/loader/loader'
import AccountSettings from './account-settings/accountSettings'
import SideMenuButton from '../side-menu/side-menu-button/sideMenuButton'

const sideMenuContextValue = {
    active: false,
}

const Settings = () => {
    const location = useLocation<LocationState>()
    const settingsRef = useRef<HTMLDivElement>(null)
    const user = useTypedSelector(state => state.app.user)
    const screenHeight = useTypedSelector(state => state.app.screenHeight)
    const [minHeight, setMinHeight] = useState(0)

    const NAV_CONTENT: NavItemType[] = [
        {
            id: 'AccountSettings',
            title: 'Account settings',
            url: `/${user!.id}/settings/account`,
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
    }, [settingsRef.current, screenHeight])

    const getMinHeight = () => {
        const top = settingsRef.current?.getBoundingClientRect().top
        const minHeight = screenHeight - top!
        setMinHeight(minHeight)
    }

    const navBarExtraItems = [
        {
            component: <Logout className={styles.logout} />,
            inNavBarOnMobile: false,
        },
        {
            component: <SideMenuButton /> ,
            inNavBarOnMobile: true,
        }
    ]

    return (
        <SideMenuContextProvider value={sideMenuContextValue} onChange={() => {}}>
        <div
            className={styles.settings}
            style={{ minHeight: `${minHeight}px` }}
            ref={settingsRef}
        >
            <Nav
                content={NAV_CONTENT}
                goBack={{
                    title: 'Catalogues',
                    url: `/${user!.id}/catalogues`,
                    location: `/${user!.id}/settings`,
                }}
                extraItems={navBarExtraItems}
            />
            <Suspense fallback={<Loader />}>
                <Switch>
                    <Redirect
                        exact
                        from="/:userId/settings"
                        to={{
                            pathname: "/:userId/settings/account",
                            state: location.state,
                        }}
                    />
                    <Route
                        path="/:userId/settings/account"
                        component={AccountSettings}
                    />
                </Switch>
            </Suspense>
        </div>
        </SideMenuContextProvider>
    )
}

export default Settings