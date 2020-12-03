import React, { Suspense } from 'react'
import { Redirect } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'
import styles from './accountSettings.scss'
//Redux
import { useTypedSelector } from 'store/reducers/index'
//Custom components
import SideMenu from 'components/main/side-menu/sideMenu'
import Loader from 'components/global-components/loader/loader'

const AccountSettings = () => {
    const user = useTypedSelector(state => state.app.user)

    const SIDE_MENU_CONTENT = [
        {
            title: 'Manage catalogues',
            url: `/${user!.id}/settings/account/manage-catalogues`,
        },
        {
            title: 'Change password',
            url: `/${user!.id}/settings/account/change-password`
        },
        {
            title: 'Change name',
            url: `/${user!.id}/settings/account/change-name`,
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
                        to="/:userId/settings/account/manage-catalogues"
                    />
                    <Route
                        path="/:userId/settings/account/manage-catalogues"
                        component={ManageCatalogues}
                    />
                </Switch>
            </Suspense>
        </div>
    )
}

export default AccountSettings