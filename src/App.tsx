import React, { useEffect, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import styles from 'global-styles/app.scss'
//Redux
import { useTypedSelector } from 'store/reducers/index'
import { changeScreenHeight } from 'store/actions/appActions'
import { getUser, authInitialized } from 'store/actions/authActions'
//Custom components
import Auth from 'components/auth/auth'
import Loader from 'components/global-components/loader/loader'

const App = () => {
  const dispatch = useDispatch()
  const screenHeight = useTypedSelector(state => state.app.screenHeight)

  const handleResize = () => {
    dispatch(changeScreenHeight(window.innerHeight))
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
      if (localStorage.getItem('token')) {
          dispatch(getUser())
      } else {
          dispatch(authInitialized())
      }
  }, [])

  return (
    <div className={styles.app} style={{ minHeight: screenHeight }}>
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route exact path={["/", "/signup"]} component={Auth} />
        </Switch>
      </Suspense>
    </div>
  )
}

export default App
