import React from 'react'
import { useLocation } from 'react-router-dom'
import styles from './auth.scss'
//Types
import { LocationState } from 'src/globalTypes'
//Custom components
import Login from './login/login'
import Signup from './signup/signup'
import Header from 'components/global-components/header/header'
import MessageModal from 'components/global-components/message-modal/messageModal'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import { CLEAR_AUTH_ERROR } from 'store/slices/authSlices/authSlices'

const Auth = () => {
    const dispatch = useAppDispatch()
    const location = useLocation<LocationState>()
    const auth = useTypedSelector(state => state.auth)

    const clearError = () => {
        dispatch(CLEAR_AUTH_ERROR())
    }
    
    return (
        <div className={styles.auth}>
            <Header />
            <div className={styles.content}>
                {location.pathname === '/signup' ?
                    <Signup /> :
                    <Login />
                }
            </div>
            <MessageModal
                show={auth.authError.message.length !== 0}
                title={auth.authError.title}
                message={auth.authError.message}
                onConfirm={clearError}
            />
        </div>
    )
}

export default Auth