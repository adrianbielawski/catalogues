import { useCallback } from 'react'
import styles from './auth.module.scss'
import { CLEAR_AUTH_USER_ERROR } from 'store/modules/auth-user/slice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import Header from 'components/global-components/header/header'
import MessageModal from 'components/global-components/message-modal/messageModal'
import { Outlet } from 'react-router-dom'

const Auth = () => {
  const dispatch = useAppDispatch()
  const { authUser } = useTypedSelector((state) => state.modules)
  const { authUserError } = authUser

  const clearError = useCallback(() => {
    dispatch(CLEAR_AUTH_USER_ERROR())
  }, [])

  return (
    <div className={styles.auth}>
      <Header />
      <div className={styles.content}>
        <Outlet />
      </div>
      <MessageModal
        show={authUserError !== null}
        title={authUserError?.title}
        message={authUserError?.message ?? ''}
        onConfirm={clearError}
      />
    </div>
  )
}

export default Auth
