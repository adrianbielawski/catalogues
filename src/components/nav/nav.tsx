import React from 'react'
import styles from './nav.scss'
//Redux
//Custom components
import Logout from 'components/auth/logout/logout'

const Nav = () => {
    return (
        <nav className={styles.nav}>
            <div className={styles.navContent}>
            </div>
            <Logout className={styles.logout} />
        </nav>
    )
}

export default Nav