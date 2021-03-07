import React, { useEffect, Suspense } from 'react'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'
import styles from 'global-styles/app.scss'
//Redux
import { useAppDispatch, useTypedSelector} from 'store/storeConfig'
import { GET_USER, INITIALIZED } from 'store/slices/authSlices/authSlices'
import { CHANGE_SCREEN_HEIGHT } from 'store/slices/appSlices/appSlice'
//Types
import { LocationState } from 'src/globalTypes'
//Custom components
import PrivateRoute from 'hoc/PrivateRoute'
import Auth from 'components/auth/auth'
import Main from 'components/main/main'
import Loader from 'components/global-components/loader/loader'

const App = () => {
  const dispatch = useAppDispatch()
  const history = useHistory<LocationState>()
  const location = useLocation<LocationState>()
  const screenHeight = useTypedSelector(state => state.app.screenHeight)	

  const handleResize = () => {	
    dispatch(CHANGE_SCREEN_HEIGHT(window.innerHeight))	
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
  }, [])

  return (
    <div className={styles.app} style={{ minHeight: screenHeight }}>
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route exact path={["/", "/signup"]} component={Auth} />
          <PrivateRoute path="/:username" component={Main} />
        </Switch>
      </Suspense>
    </div>
  )
}

export default App
