import React from 'react'
import { useDispatch } from 'react-redux'
import styles from './nav.scss'
//Redux
import { useTypedSelector } from 'store/reducers/index'
import { logOut } from 'store/actions/authActions'
import { showSettings } from 'store/actions/appActions'
//Custom components
import NavLink from './navLink/navLink'
import { useHistory, useLocation } from 'react-router-dom'

const Nav = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()
    const user = useTypedSelector(state => state.app.user)
    const activeLocation = location.pathname.slice(2)

    const handleSettingsClick = () => {
        dispatch(showSettings(user!.id, history))
    }

    const handleLogout = () => {
        dispatch(logOut())
    }

    return (
        <nav className={styles.nav}>
            <div className={styles.navContent}>
                <NavLink
                    title={'Settings'}
                    active={activeLocation === '/settings'}
                    onClick={handleSettingsClick}
                />
            </div>
            <NavLink title={'Logout'} onClick={handleLogout} />
        </nav>
    )
}

export default Nav