import React from 'react'
import styles from './main.scss'
//Redux
//Custom components
import Header from 'components/global-components/header/header'
import Nav from 'components/nav/nav'

const Main = () => {
    return (
        <div className={styles.main}>
            <Header />
            <div className={styles.content}>
                <Nav />
            </div>
        </div>
    )
}

export default Main