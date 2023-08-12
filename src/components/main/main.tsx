import { Suspense, useEffect } from 'react'
import { Switch, Redirect, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import styles from './main.module.scss'
// Router context
import {
  HydratedRouteComponentProps,
  PrivateRouteWithContext,
  RouteWithContext,
} from 'src/router'
// Redux
import {
  CLEAR_CURRENT_USER_ERROR,
  GET_CURRENT_USER,
} from 'store/modules/current-user/slice'
import { useTypedSelector } from 'store/storeConfig'
// Components
import Catalogues from './catalogues/catalogues'
import Settings from './settings/settings'
import Loader from 'components/global-components/loader/loader'
import MessageModal from 'components/global-components/message-modal/messageModal'
import FavouriteItems from './favourite-items/favouriteItems'
import UserDashboard from './user-dashboard/userDashboard'

const Main = (props: HydratedRouteComponentProps) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const app = useTypedSelector((state) => state.modules.app)
  const users = useTypedSelector((state) => state.entities.users.entities)
  const authUserData = useTypedSelector((state) => state.modules.authUser)
  const currentUserData = useTypedSelector((state) => state.modules.currentUser)
  const currentUser = currentUserData.userId
    ? users[currentUserData.userId]
    : null
  const authUser = authUserData.id ? users[authUserData.id] : null
  const username = props.match.params.username

  useEffect(() => {
    if (!username) {
      return
    }
    dispatch(GET_CURRENT_USER(username))
  }, [username])

  const handleCloseMessage = () => {
    dispatch(CLEAR_CURRENT_USER_ERROR())
    history.push(`/${authUser?.username ?? ''}`, undefined)
  }

  if (
    currentUser == null ||
    currentUser.username.toLowerCase() !== username?.toLowerCase()
  ) {
    return null
  }

  return (
    <div className={styles.main} style={{ minHeight: app.screenHeight }}>
      {currentUser.username ? (
        <Suspense fallback={<Loader />}>
          <Switch>
            <PrivateRouteWithContext
              exact
              path={'/:username'}
              component={UserDashboard}
            />
            <Redirect exact from="/:username" to="/:username/catalogues" />
            <RouteWithContext
              path={'/:username/catalogues/:slug?'}
              component={Catalogues}
            />
            <PrivateRouteWithContext
              path={'/:username/settings'}
              component={Settings}
            />
            <PrivateRouteWithContext
              path={'/:username/favourite-items'}
              component={FavouriteItems}
            />
          </Switch>
        </Suspense>
      ) : null}
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
