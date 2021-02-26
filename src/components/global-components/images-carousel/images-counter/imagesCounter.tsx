import React from 'react'
import styles from './imagesCounter.scss'

type Props = {
    current: number,
    total: number,
}

const ImagesCounter = (props: Props) => (
    <p className={styles.imagesCounter}>
        {props.current} / {props.total}
    </p>
)

export default ImagesCounter