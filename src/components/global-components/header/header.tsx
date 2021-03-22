import React from 'react'
import styles from './header.scss'
import icon from 'assets/img/icon.svg'

const Header = () => {

    return (
        <div className={styles.header}>
            <img className={styles.logo} src={icon} />
        </div>
    )
}

export default Header