import React, { useEffect, Suspense } from 'react'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'
import * as Sentry from "@sentry/react"
import styles from 'global-styles/app.scss'
//Redux
import { CHANGE_SCREEN_SIZE, FETCH_SWITCHES } from 'store/modules/app/slice'
import { GET_USER, INITIALIZED } from 'store/modules/auth-user/slice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
//Types
import { LocationState } from 'src/globalTypes'
//Router
import { RouteWithContext } from './router'
//Custom components
import Auth from 'components/auth/auth'
import Main from 'components/main/main'
import Loader from 'components/global-components/loader/loader'
import Homepage from 'components/homepage/homepage'
import SingleItem from 'components/single-item/singleItem'
import { useSwitches } from './hooks/useSwitches'

const App = () => {
  const dispatch = useAppDispatch()
  const history = useHistory<LocationState>()
  const location = useLocation<LocationState>()
  const app = useTypedSelector(state => state.modules.app)
  const isInitialized = useTypedSelector(state => state.modules.authUser.isInitialized)
  const [HOMEPAGE] = useSwitches(['HOMEPAGE'])

  const handleResize = () => {
    dispatch(CHANGE_SCREEN_SIZE({
      height: window.innerHeight,
      width: window.innerWidth,
    }))
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(GET_USER({ history, location }))
    } else {
      dispatch(INITIALIZED())
    }
    dispatch(FETCH_SWITCHES())
  }, [])

  if (!isInitialized || app.fetchingSwitches) {
    return <Loader className={styles.loader} />
  }

  return (
    <div
      className={styles.app}
      style={{ minHeight: app.screenHeight }}
    >
      <Suspense fallback={<Loader />}>
        <Switch>
          <RouteWithContext
            exact
            path="/"
            component={HOMEPAGE ? Homepage : Auth}
          />
          <Route
            path={["/login", "/signup"]}
            component={Auth}
          />
          <RouteWithContext
            path={"/item/:itemId"}
            component={SingleItem}
            canonical={true}
          />
          <Route
            path="/:username"
            component={Main}
          />
        </Switch>
      </Suspense>
    </div>
  )
}

export default Sentry.withProfiler(App)
