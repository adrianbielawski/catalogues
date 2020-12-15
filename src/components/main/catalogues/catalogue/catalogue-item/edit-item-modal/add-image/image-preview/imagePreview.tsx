import React, { useRef, useState } from 'react'
import styles from './imagePreview.scss'
//Custom Components

type Props = {
    image: File,
    onClick: () => void,
}

const ImagePreview = (props: Props) => {
    const getImage = () => {
        return <img className={styles.image} src={URL.createObjectURL(props.image)} />
    }

    return (
        <div className={styles.imagePreview} onClick={props.onClick}>
            {getImage()}
        </div>
    );
}

export default ImagePreview