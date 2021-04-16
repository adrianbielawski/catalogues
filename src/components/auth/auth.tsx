import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import styles from './auth.scss'
//Redux
import { CLEAR_AUTH_USER_ERROR } from 'store/modules/auth-user/slice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
//Custom components
import Login from './login/login'
import Signup from './signup/signup'
import Header from 'components/global-components/header/header'
import MessageModal from 'components/global-components/message-modal/messageModal'
import Loader from 'components/global-components/loader/loader'
import VerifyEmail from './verify-email/verifyEmail'

const Auth = () => {
    const dispatch = useAppDispatch()
    const authUser = useTypedSelector(state => state.modules.authUser)

    const clearError = () => {
        dispatch(CLEAR_AUTH_USER_ERROR())
    }

    return (
        <div className={styles.auth}>
            <Header />
            <div className={styles.content}>
                <Suspense fallback={<Loader />}>
                    <Switch>
                        <Route exact path={['/', '/login']} component={Login} />
                        <Route exact path="/signup" component={Signup} />
                        <Route path="/signup/verify/:key" component={VerifyEmail} />
                    </Switch>
                </Suspense>
            </div>
            <MessageModal
                show={authUser.authUserError !== null}
                title={authUser.authUserError?.title}
                message={authUser.authUserError?.message || ''}
                onConfirm={clearError}
            />
        </div>
    )
}

export default Auth