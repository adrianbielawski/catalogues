import React from 'react'
import styles from './mainContent.scss'

type Props = {
    children: JSX.Element
}

const MainContent = (props: Props) => {
    return (
        <div className={styles.mainContent}>
            {props.children}
        </div>
    )
}

export default MainContent