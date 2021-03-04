import React, { Suspense } from 'react'
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

const AccountSettings = () => {
    const user = useTypedSelector(state => state.auth.user)
    const location = useLocation<LocationState>()

    const SIDE_MENU_CONTENT = [
        {
            title: 'Manage catalogues',
            url: `/${user!.id}/settings/account/manage-catalogues`,
        },
        {
            title: 'My account',
            url: `/${user!.id}/settings/account/my-account`
        },
    ]

    return (
        <div className={styles.accountSettings}>
            <SideMenu content={SIDE_MENU_CONTENT} />
            <Suspense fallback={<Loader />}>
                <Switch>
                    <Redirect
                        exact
                        from="/:userId/settings/account"
                        to={{
                            pathname: "/:userId/settings/account/manage-catalogues",
                            state: location.state,
                        }}
                    />
                    <Route
                        path="/:userId/settings/account/manage-catalogues"
                        component={ManageCatalogues}
                    />
                    <Route
                        path="/:userId/settings/account/my-account"
                        component={MyAccount}
                    />
                </Switch>
            </Suspense>
        </div>
    )
}

export default AccountSettings