import React from 'react'
import { useLocation } from 'react-router-dom'
import styles from './auth.scss'
//Custom hooks
import { useSwitches } from 'src/customHooks'
//Types
import { LocationState } from 'src/globalTypes'
//Custom components
import DeprecatedHeader from 'components/global-components/deprecated-header/header'
import Login from './login/login'
import Signup from './signup/signup'
import Header from 'components/global-components/header/header'

const Auth = () => {
    const location = useLocation<LocationState>()
    const switches = useSwitches(['NAVIGATION_REDESIGN'])
    
    return (
        <div className={styles.auth}>
            {switches[0]
                ? <Header />
                : <DeprecatedHeader />
            }
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