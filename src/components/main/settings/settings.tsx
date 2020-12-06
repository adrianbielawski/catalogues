import React, { Suspense } from 'react'
import { Redirect } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'
import styles from './settings.scss'
//Redux
import { useTypedSelector } from 'store/reducers/index'
//Custom components
import Nav from 'components/nav/nav'
import Logout from 'components/auth/logout/logout'
import Loader from 'components/global-components/loader/loader'
import AccountSettings from './account-settings/accountSettings'

const Settings = () => {
    const user = useTypedSelector(state => state.app.user)

    const NAV_CONTENT = [
        {
            title: 'Catalogues settings',
            children: [
                {
                    title: 'Nails settings',
                    url: `/${user!.id}/settings/nails`,
                },
                {
                    title: 'Watches settings',
                    url: `/${user!.id}/settings/watches`,
                }
            ]
        },
        {
            title: 'Account settings',
            url: `/${user!.id}/settings/account`,
        }
    ]

    return (
        <div className={styles.settings}>
            <Nav
                content={NAV_CONTENT}
                goBack={{
                    title: 'Catalogues',
                    url: `/${user!.id}/catalogues`,
                    location: `/${user!.id}/settings`,
                }}
                extraItems={[<Logout className={styles.logout}/>]}
            />
            <Suspense fallback={<Loader />}>
                <Switch>
                    <Redirect
                        exact
                        from="/:userId/settings"
                        to="/:userId/settings/account"
                    />
                    <Route
                        path="/:userId/settings/account"
                        component={AccountSettings}
                    />
                </Switch>
            </Suspense>
        </div>
    )
}

export default Settings