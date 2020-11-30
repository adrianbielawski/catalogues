import React from 'react'
import { useDispatch } from 'react-redux'
import styles from './nav.scss'
//Redux
import { logOut } from 'store/actions/authActions'
//Custom components
import NavLink from './navLink/navLink'

const Nav = () => {
    const handleLogout = () => {
        dispatch(logOut())
    }

    return (
        <nav className={styles.nav}>
            <div className={styles.navContent}>
            </div>
            <NavLink title={'Logout'} onClick={handleLogout} />
        </nav>
    )
}

export default Nav