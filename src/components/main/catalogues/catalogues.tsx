import React, { Suspense } from 'react'
import { Redirect } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'
import styles from './catalogues.scss'
//Redux
import { useTypedSelector } from 'store/reducers/index'
//Custom components
import Nav from 'components/nav/nav'
import Logout from 'components/auth/logout/logout'
import Loader from 'components/global-components/loader/loader'

const Catalogues = () => {
    const user = useTypedSelector(state => state.app.user)

    const NAV_CONTENT = [
        {
            title: 'Catalogues',
            location: `/${user!.id}/catalogues`,
            children: [
                {
                    title: 'Nails',
                    url: `/${user!.id}/catalogues/nails`,
                },
                {
                    title: 'Watches',
                    url: `/${user!.id}/catalogues/watches`,
                }
            ]
        },
        {
            title: 'Settings',
            url: `/${user!.id}/settings`,
        }
    ]
    
    return (
        <div className={styles.catalogues}>
            <Nav content={NAV_CONTENT} extraItems={[<Logout className={styles.logout} />]} />
            <Suspense fallback={<Loader />}>
                <Switch>
                    <Redirect
                        exact
                        from="/:userId/catalogues"
                        to="/:userId/catalogues/nails"
                    />
                    <Route
                        path="/:userId/catalogues/nails"
                        component={Loader}
                    />
                </Switch>
            </Suspense>
        </div>
    )
}

export default Catalogues