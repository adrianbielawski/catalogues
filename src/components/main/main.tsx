import React, { Suspense } from 'react'
import { Switch, Redirect } from 'react-router-dom'
import styles from './main.scss'
//Router context
import { RouteWithContext } from 'src/router'
//Custom components
import Header from 'components/global-components/header/header'
import Catalogues from './catalogues/catalogues'
import Settings from './settings/settings'
import Loader from 'components/global-components/loader/loader'

const Main = () => (
    <div className={styles.main} style={{ minHeight: window.innerHeight }}>
        <Header />
        <Suspense fallback={<Loader />}>
            <Switch>
                <Redirect
                    exact
                    from="/:userId"
                    to="/:userId/catalogues"
                />
                <RouteWithContext path={"/:userId/catalogues/:slug?"} component={Catalogues} />
                <RouteWithContext path={"/:userId/settings"} component={Settings} />
            </Switch>
        </Suspense>
    </div>
)

export default Main