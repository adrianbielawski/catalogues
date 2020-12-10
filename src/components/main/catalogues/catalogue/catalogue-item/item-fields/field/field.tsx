import React from 'react'
import styles from './field.scss'

type Props = {
    item: {
        title: string,
        value: string,
    }
}

const Field = (props: Props) => {
    return (
        <div className={styles.field}>
            <div>{props.item.title}: </div>
            <div className={styles.value}>{props.item.value}</div>
        </div>
    )
}

export default Field