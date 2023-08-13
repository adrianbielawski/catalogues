import { Suspense, useState, useEffect, useRef } from 'react'
import { Redirect, useLocation, Route, Switch } from 'react-router-dom'

import styles from './settings.module.scss'
// Types
import { type LocationState } from 'src/globalTypes'
// Redux
import { useTypedSelector } from 'store/storeConfig'
// Custom components
import Loader from 'components/global-components/loader/loader'
import AccountSettings from './account-settings/accountSettings'
import Header from 'components/global-components/header/header'

const Settings = () => {
  const location = useLocation<LocationState>()
  const settingsRef = useRef<HTMLDivElement>(null)
  const screenHeight = useTypedSelector(
    (state) => state.modules.app.screenHeight,
  )
  const [minHeight, setMinHeight] = useState(0)

  useEffect(() => {
    if (settingsRef.current === null) {
      return
    }

    getMinHeight()
  }, [settingsRef.current, screenHeight])

  const getMinHeight = () => {
    const top = settingsRef.current?.getBoundingClientRect().top
    const minHeight = screenHeight - top!
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
              pathname: '/:username/settings/account',
              state: location.state,
            }}
          />
          <Route
            path="/:username/settings/account"
            render={() => <AccountSettings />}
          />
        </Switch>
      </Suspense>
    </div>
  )
}

export default Settings
