import React from 'react'
import styles from './header.scss'
import logo from "assets/img/logo.png"

const Header = () => <h1 className={styles.header}><img src={logo}></img></h1>

export default Header