import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styles from './main.module.scss'
import {
  CLEAR_CURRENT_USER_ERROR,
  GET_CURRENT_USER,
} from 'store/modules/current-user/slice'
import { useTypedSelector } from 'store/storeConfig'
import MessageModal from 'components/global-components/message-modal/messageModal'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { useEntitiesSelector } from 'store/entities/hooks'

const Main = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { username } = useParams()

  const app = useTypedSelector((state) => state.modules.app)
  const users = useEntitiesSelector('users')
  const authUserData = useTypedSelector((state) => state.modules.authUser)
  const currentUserData = useTypedSelector((state) => state.modules.currentUser)
  const currentUser = currentUserData.userId
    ? users[currentUserData.userId]
    : null
  const authUser = authUserData.id ? users[authUserData.id] : null

  useEffect(() => {
    if (!username) {
      return
    }
    dispatch(GET_CURRENT_USER(username))
  }, [username])

  const handleCloseMessage = useCallback(() => {
    dispatch(CLEAR_CURRENT_USER_ERROR())
    navigate(`/${authUser?.username ?? ''}`, { state: {} })
  }, [authUser?.username])

  if (
    currentUser == null ||
    currentUser.username.toLowerCase() !== username?.toLowerCase()
  ) {
    return null
  }

  return (
    <div className={styles.main} style={{ minHeight: app.screenHeight }}>
      {currentUser.username && <Outlet />}
      <MessageModal
        show={currentUserData.currentUserError !== null}
        title={currentUserData.currentUserError?.title}
        message={currentUserData.currentUserError?.message ?? ''}
        onConfirm={handleCloseMessage}
      />
    </div>
  )
}

export default Main
