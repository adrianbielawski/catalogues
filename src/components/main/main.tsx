import React from 'react'
import styles from './main.scss'
//Redux
//Custom components
import Header from 'components/global-components/header/header'

const Main = () => {
    return (
        <div className={styles.main}>
            <Header />
            <div className={styles.content}>
                
            </div>
        </div>
    )
}

export default Main