import React from 'react'
import { useLocation } from 'react-router-dom'
import styles from './auth.scss'
//Types
import { LocationState } from 'src/globalTypes'
//Custom components
import DeprecatedHeader from 'components/global-components/deprecated-header/header'
import Login from './login/login'
import Signup from './signup/signup'
import { useTypedSelector } from 'store/storeConfig'

const Auth = () => {
    const location = useLocation<LocationState>()
    const app = useTypedSelector(state => state.app)
    
    return (
        <div className={styles.auth}>
            {app.switches.find(s => s === 'NAVIGATION_REDESIGN') ? null : <DeprecatedHeader />}
            <div className={styles.content}>
                {location.pathname === '/signup' ?
                    <Signup /> :
                    <Login />
                }
            </div>
        </div>
    )
}

export default Auth