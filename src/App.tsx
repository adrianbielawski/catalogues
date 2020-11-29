import React, { useEffect, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import styles from 'global-styles/app.scss'
//Redux
import { useTypedSelector } from 'store/reducers/index'
import { changeScreenHeight } from 'store/actions/appActions'
//Custom components
import Main from 'components/main/main'
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
  return (
    <div className={styles.app} style={{ minHeight: screenHeight }}>
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route exact path={["/", "/signup"]} component={Main} />
        </Switch>
      </Suspense>
    </div>
  )
}

export default App
