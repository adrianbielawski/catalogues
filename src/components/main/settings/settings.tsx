import React, { Suspense } from 'react'
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
            url: `/${user!.id}/settings/account-settings`,
        }
    ]

    return (
        <div className={styles.settings}>
            <Nav
                content={NAV_CONTENT}
                goBack={{default: 'Catalogues', url: `/${user!.id}/catalogues/nails`}}
                extraItems={[<Logout className={styles.logout}/>]}
            />
            <Suspense fallback={<Loader />}>
                <Switch>
                    <Route path={"/:userId/settings/account-settings"} component={AccountSettings} />
                </Switch>
            </Suspense>
        </div>
    )
}

export default Settings