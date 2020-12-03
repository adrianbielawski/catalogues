import React from 'react'
import styles from './mainContent.scss'

type Props = {
    content: JSX.Element
}

const MainContent = (props: Props) => {
    return (
        <div className={styles.mainContent}>
            {props.content}
        </div>
    )
}

export default MainContent