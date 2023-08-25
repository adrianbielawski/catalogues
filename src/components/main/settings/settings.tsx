import { useState, useEffect, useRef } from 'react'
import styles from './settings.module.scss'
import { useTypedSelector } from 'store/storeConfig'
import Header from 'components/global-components/header/header'
import { Navigate, Outlet } from 'react-router-dom'
import usePathMatcher from 'src/hooks/usePathMatcher'

const Settings = () => {
  const settingsRef = useRef<HTMLDivElement>(null)
  const screenHeight = useTypedSelector(
    (state) => state.modules.app.screenHeight,
  )
  const [minHeight, setMinHeight] = useState(0)

  const settingsPathMatch = usePathMatcher('/:username/settings')

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

  if (settingsPathMatch) {
    return <Navigate to="account" />
  }

  return (
    <div
      className={styles.settings}
      style={{ minHeight: `${minHeight}px` }}
      ref={settingsRef}
    >
      <Header />
      <Outlet />
    </div>
  )
}

export default Settings
