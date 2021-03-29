import React, { Suspense, useEffect } from 'react'
import { Switch, Redirect, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import styles from './main.scss'
//Router context
import { HydratedRouteComponentProps, PrivateRouteWithContext, RouteWithContext } from 'src/router'
//Redux
import { useTypedSelector } from 'store/storeConfig'
import { CLEAR_CURRENT_USER_MESSAGE, GET_CURRENT_USER } from 'store/slices/currentUserSlices/currentUserSlice'
import { FETCH_AUTH_USER_DATA } from 'store/slices/cataloguesSlices/cataloguesSlice/cataloguesSlice'
//Custom components
import Catalogues from './catalogues/catalogues'
import Settings from './settings/settings'
import Loader from 'components/global-components/loader/loader'
import MessageModal from 'components/global-components/message-modal/messageModal'
import FavouriteItems from './favourite-items/favouriteItems'
import { useSwitches } from 'src/customHooks'

const Main = (props: HydratedRouteComponentProps) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const app = useTypedSelector(state => state.app)
    const user = useTypedSelector(state => state.auth.user)
    const currentUser = useTypedSelector(state => state.currentUser)
    const username = props.match.params.username
    const [FAVOURITE_ITEMS] = useSwitches(['FAVOURITE_ITEMS'])

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
        dispatch(FETCH_AUTH_USER_DATA())
    }, [user])

    const handleCloseMessage = () => {
        dispatch(CLEAR_CURRENT_USER_MESSAGE())
        history.push(`/${user?.username || ''}`, undefined)
    }

    const currentUserError = currentUser.currentUserError

    if (!currentUser.user?.username
        || currentUser.user?.username.toLowerCase() !== username?.toLowerCase()
    ) {
        return null
    }

    return (
        <div className={styles.main} style={{ minHeight: app.screenHeight }}>
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
                        {FAVOURITE_ITEMS && 
                            <PrivateRouteWithContext path={"/:username/favourite-items"} component={FavouriteItems} />
                        }
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