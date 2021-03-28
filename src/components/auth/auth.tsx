import React from 'react'
import { useLocation } from 'react-router-dom'
import styles from './auth.scss'
//Types
import { LocationState } from 'src/globalTypes'
//Custom components
import Login from './login/login'
import Signup from './signup/signup'
import Header from 'components/global-components/header/header'

const Auth = () => {
    const location = useLocation<LocationState>()
    
    return (
        <div className={styles.auth}>
            <Header />
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