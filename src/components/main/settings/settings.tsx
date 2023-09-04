import styles from './settings.module.scss'
import Header from 'components/global-components/header/header'
import { Navigate, Outlet } from 'react-router-dom'
import usePathMatcher from 'src/hooks/usePathMatcher'
import useMinContentHeight from 'src/hooks/useMinContentHeight'
import useRefCallback from 'src/hooks/useRefCallback'

const Settings = () => {
  const [rect, ref] = useRefCallback<HTMLDivElement>()
  const minHeight = useMinContentHeight(rect)

  const settingsPathMatch = usePathMatcher('/:username/settings')

  if (settingsPathMatch) {
    return <Navigate to="account" />
  }

  return (
    <div
      className={styles.settings}
      style={{ minHeight: `${minHeight}px` }}
      ref={ref}
    >
      <Header />
      <Outlet />
    </div>
  )
}

export default Settings
