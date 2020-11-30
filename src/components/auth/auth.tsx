import React from 'react'
import { useLocation } from 'react-router-dom'
import styles from './auth.scss'
//Redux
//Custom components
import Header from 'components/global-components/header/header'
import Login from './login/login'
import Signup from './signup/signup'

const Auth = () => {
    const location = useLocation()
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