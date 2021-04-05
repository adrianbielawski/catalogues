import React, { Suspense, useState, useEffect, useRef } from 'react'
import { Redirect, useLocation } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'
import styles from './settings.scss'
//Types
import { LocationState } from 'src/globalTypes'
//Redux
import { useTypedSelector } from 'store/storeConfig'
//Custom components
import Loader from 'components/global-components/loader/loader'
import AccountSettings from './account-settings/accountSettings'
import Header from 'components/global-components/header/header'

const Settings = () => {
    const location = useLocation<LocationState>()
    const settingsRef = useRef<HTMLDivElement>(null)
    const [minHeight, setMinHeight] = useState(0)
    const app = useTypedSelector(state => state.app)

    useEffect(() => {
        if (settingsRef.current === null) {
            return
        }
        
        getMinHeight()
    }, [settingsRef.current, app.screenHeight])

    const getMinHeight = () => {
        const top = settingsRef.current?.getBoundingClientRect().top
        const minHeight = app.screenHeight - top!
        setMinHeight(minHeight)
    }

    return (
        <div
            className={styles.settings}
            style={{ minHeight: `${minHeight}px` }}
            ref={settingsRef}
        >
            <Header />
            <Suspense fallback={<Loader />}>
                <Switch>
                    <Redirect
                        exact
                        from="/:username/settings"
                        to={{
                            pathname: "/:username/settings/account",
                            state: location.state,
                        }}
                    />
                    <Route
                        path="/:username/settings/account"
                        render={() => (
                            <AccountSettings />
                        )}
                    />
                </Switch>
            </Suspense>
        </div>
    )
}

export default Settings