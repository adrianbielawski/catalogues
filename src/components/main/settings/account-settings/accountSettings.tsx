import styles from './accountSettings.module.scss'
import { Outlet } from 'react-router-dom'

const AccountSettings = () => {
  return (
    <div className={styles.accountSettings}>
      <Outlet />
    </div>
  )
}

export default AccountSettings
