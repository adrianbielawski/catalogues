import React, { Suspense } from 'react'
import { Switch, Redirect } from 'react-router-dom'
import styles from './main.scss'
//Router context
import { RouteWithContext } from 'src/router'
//Redux
import { useTypedSelector } from 'store/storeConfig'
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
                        from="/:username"
                        to="/:username/catalogues"
                    />
                    <RouteWithContext path={"/:username/catalogues/:slug?"} component={Catalogues} />
                    <RouteWithContext path={"/:username/settings"} component={Settings} />
                </Switch>
            </Suspense>
        </div>
    )
}
export default Main