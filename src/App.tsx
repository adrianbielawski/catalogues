import React, { useEffect, Suspense } from 'react'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'
import styles from 'global-styles/app.scss'
//Redux
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { GET_USER, INITIALIZED } from 'store/slices/authSlices/authSlices'
import { CHANGE_SCREEN_SIZE, FETCH_SWITCHES } from 'store/slices/appSlices/appSlice'
//Types
import { LocationState } from 'src/globalTypes'
//Custom components
import Auth from 'components/auth/auth'
import Main from 'components/main/main'
import Loader from 'components/global-components/loader/loader'

const App = () => {
  const dispatch = useAppDispatch()
  const history = useHistory<LocationState>()
  const location = useLocation<LocationState>()
  const app = useTypedSelector(state => state.app)
  const isInitialized = useTypedSelector(state => state.auth.isInitialized)

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
    return <Loader className={styles.loader}/>
  }

  return (
    <div className={styles.app} style={{ minHeight: app.screenHeight }}>
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route exact path="/" component={Auth} />
          <Route path={["/login", "/signup"]} component={Auth} />
          <Route path="/:username" component={Main} />
        </Switch>
      </Suspense>
    </div>
  )
}

export default App
