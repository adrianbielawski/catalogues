import { useEffect } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import * as Sentry from '@sentry/react'
import { CHANGE_SCREEN_SIZE, FETCH_SWITCHES } from 'store/modules/app/slice'
import { GET_USER, INITIALIZED } from 'store/modules/auth-user/slice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import Loader from 'components/global-components/loader/loader'
import { FETCH_AUTH_USER_CATALOGUES } from 'store/modules/auth-user-catalogues/slice'
import { FETCH_FAVOURITE_CATALOGUES } from 'store/modules/auth-user-favourites/slice'
import styles from 'global-styles/app.module.scss'
import useCurrentPath from './hooks/useCurrentPath'

const App = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()
  const location = useLocation()
  const currentPath = useCurrentPath()

  const { app, authUser } = useTypedSelector((state) => state.modules)

  const handleResize = () => {
    dispatch(
      CHANGE_SCREEN_SIZE({
        height: window.innerHeight,
        width: window.innerWidth,
      }),
    )
  }

  useEffect(() => {
    const { title } = currentPath
    document.title = `Catalogues${title ? ` | ${title}` : ''}`
  }, [location, currentPath])

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(GET_USER({ navigate, location }))
    } else {
      dispatch(INITIALIZED())
    }
    dispatch(FETCH_SWITCHES())
  }, [])

  useEffect(() => {
    if (!authUser.id) {
      return
    }
    dispatch(FETCH_AUTH_USER_CATALOGUES())
    dispatch(FETCH_FAVOURITE_CATALOGUES())
  }, [authUser?.id])

  if (!authUser.isInitialized || app.fetchingSwitches) {
    return <Loader className={styles.loader} />
  }

  return (
    <div className={styles.app} style={{ minHeight: app.screenHeight }}>
      <Outlet />
    </div>
  )
}

export default Sentry.withProfiler(App)
