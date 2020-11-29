import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styles from 'global-styles/app.scss'
//Redux
import { useTypedSelector } from 'store/reducers/index'
import { changeScreenHeight } from 'store/actions/appActions'
//Custom components
import Header from 'components/global-components/header/header'

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
    <div className={styles.app} style={{minHeight: screenHeight}}>
      <Header />
    </div>
  )
}

export default App
