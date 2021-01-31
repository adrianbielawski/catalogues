import React from 'react'
import classNames from 'classnames/bind'
import styles from './mainImage.scss'

const BASE_URL = process.env.API_URL

type Props = {
    imgURL?: string,
    className?: string,
}

const cx = classNames.bind(styles)

const MainImage = (props: Props) => {
    const imageClass = cx(
        'mainImage',
        props.className,
    )

    return (
        <div className={imageClass}>
            {props.imgURL !== undefined
                ? <img className={styles.img} src={`${BASE_URL}${props.imgURL}`} />
                : <div className={styles.placeholder}>No image</div>
            }
        </div>
    )
}

export default MainImage