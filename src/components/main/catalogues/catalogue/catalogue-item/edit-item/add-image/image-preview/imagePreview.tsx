import React from 'react'
import styles from './imagePreview.scss'

type Props = {
    image: string,
    onClick: () => void,
}

const ImagePreview = (props: Props) => (
    <div className={styles.imagePreview} onClick={props.onClick}>
        <img className={styles.image} src={props.image} />
    </div>
)

export default ImagePreview