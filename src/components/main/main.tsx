import React, { Suspense, useEffect } from 'react'
import { Switch, Redirect, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import styles from './main.scss'
//Router context
import { HydratedRouteComponentProps, PrivateRouteWithContext, RouteWithContext } from 'src/router'
//Redux
import { useTypedSelector } from 'store/storeConfig'
import { CLEAR_CURRENT_USER_MESSAGE, GET_CURRENT_USER } from 'store/slices/currentUserSlices/currentUserSlice'
import { FETCH_AUTH_USER_CATALOGUES } from 'store/slices/cataloguesSlices/cataloguesSlice/cataloguesSlice'
//Custom components
import DeprecatedHeader from 'components/global-components/deprecated-header/header'
import Catalogues from './catalogues/catalogues'
import Settings from './settings/settings'
import Loader from 'components/global-components/loader/loader'
import MessageModal from 'components/global-components/message-modal/messageModal'

const Main = (props: HydratedRouteComponentProps) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const app = useTypedSelector(state => state.app)
    const user = useTypedSelector(state => state.auth.user)
    const currentUser = useTypedSelector(state => state.currentUser)
    const username = props.match.params.username

    useEffect(() => {
        if (!username) {
            return
        }
        dispatch(GET_CURRENT_USER(username))
    }, [username])

    useEffect(() => {
        if (!user?.id) {
            return
        }
        dispatch(FETCH_AUTH_USER_CATALOGUES())
    }, [user])

    const handleCloseMessage = () => {
        dispatch(CLEAR_CURRENT_USER_MESSAGE())
        history.push(`/${user?.username || ''}`, undefined)
    }

    const currentUserError = currentUser.currentUserError

    if (!currentUser.user?.username) {
        return null
    }

    return (
        <div className={styles.main} style={{ minHeight: app.screenHeight }}>
            {app.switches.find(s => s === 'NAVIGATION_REDESIGN')
                ? null
                : <DeprecatedHeader />
            }
            {currentUser.user?.username ? (
                <Suspense fallback={<Loader />}>
                    <Switch>
                        <Redirect
                            exact
                            from="/:username"
                            to="/:username/catalogues"
                        />
                        <RouteWithContext path={"/:username/catalogues/:slug?"} component={Catalogues} />
                        <PrivateRouteWithContext path={"/:username/settings"} component={Settings} />
                    </Switch>
                </Suspense>
            ) : null}
            <MessageModal
                show={currentUserError.message.length > 0}
                title={currentUserError.title}
                message={currentUserError.message}
                onConfirm={handleCloseMessage}
            />
        </div>
    )
}

export default Main