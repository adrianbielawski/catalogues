import React from 'react'
import { useLocation } from 'react-router-dom'
import styles from './main.scss'
//Redux
//Custom components
import Header from 'components/global-components/header/header'
import Login from './login/login'

const Main = () => {
    const location = useLocation()
    return (
        <div className={styles.main}>
            <Header />
            <div className={styles.content}>
                {location.pathname === '/signup' ?
                    <p>Signup</p> :
                    <Login />
                }
            </div>
        </div>
    )
}

export default Main