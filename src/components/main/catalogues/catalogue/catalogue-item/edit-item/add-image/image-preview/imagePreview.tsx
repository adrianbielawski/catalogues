import React from 'react'
import styles from './imagePreview.scss'

type Props = {
    image: File,
    onClick: () => void,
}

const ImagePreview = (props: Props) => (
    <div className={styles.imagePreview} onClick={props.onClick}>
        <img className={styles.image} src={URL.createObjectURL(props.image)} />
    </div>
)

export default ImagePreview