import React, { Suspense, useContext } from 'react'
import { Redirect, useLocation } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'
import styles from './accountSettings.scss'
//Types
import { LocationState } from 'src/globalTypes'
//Redux
import { useTypedSelector } from 'store/storeConfig'
//Custom components
import SideMenu from 'components/global-components/side-menu/sideMenu'
import Loader from 'components/global-components/loader/loader'
import MyAccount from './my-account/myAccount'
import ManageCatalogues from './manage-catalogues/manageCatalogues'
import { SideMenuContext } from 'components/global-components/side-menu/sideMenuStore'

type Props = {
    onToggleSideMenu: (e: React.MouseEvent) => void
}

const AccountSettings = (props: Props) => {
    const user = useTypedSelector(state => state.auth.user)
    const location = useLocation<LocationState>()
    const sideMenuContext = useContext(SideMenuContext)

    const SIDE_MENU_CONTENT = [
        {
            title: 'Manage catalogues',
            url: `/${user!.username}/settings/account/manage-catalogues`,
        },
        {
            title: 'My account',
            url: `/${user!.username}/settings/account/my-account`
        },
    ]

    return (
        <div className={styles.accountSettings}>
            <SideMenu
                content={SIDE_MENU_CONTENT}
                show={sideMenuContext.show}
                onToggle={props.onToggleSideMenu}
            />
            <Suspense fallback={<Loader />}>
                <Switch>
                    <Redirect
                        exact
                        from="/:username/settings/account"
                        to={{
                            pathname: "/:username/settings/account/manage-catalogues",
                            state: location.state,
                        }}
                    />
                    <Route
                        path="/:username/settings/account/manage-catalogues"
                        component={ManageCatalogues}
                    />
                    <Route
                        path="/:username/settings/account/my-account"
                        component={MyAccount}
                    />
                </Switch>
            </Suspense>
        </div>
    )
}

export default AccountSettings