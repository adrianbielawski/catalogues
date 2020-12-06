import React, { Suspense } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import styles from './main.scss'
//Redux
import { useTypedSelector } from 'store/reducers/index'
//Custom components
import Header from 'components/global-components/header/header'
import Catalogues from './catalogues/catalogues'
import Settings from './settings/settings'
import Loader from 'components/global-components/loader/loader'

const Main = () => {
    const screenHeight = useTypedSelector(state => state.app.screenHeight)

    return (
        <div className={styles.main} style={{ minHeight: screenHeight }}>
            <Header />
            <Suspense fallback={<Loader />}>
                <Switch>
                    <Redirect
                        exact
                        from="/:userId"
                        to="/:userId/catalogues"
                    />
                    <Route path={"/:userId/catalogues"} component={Catalogues} />
                    <Route path={"/:userId/settings"} component={Settings} />
                </Switch>
            </Suspense>
        </div>
    )
}

export default Main