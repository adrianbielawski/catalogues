import React from 'react'
import classNames from 'classnames/bind'
import styles from './mainImage.scss'

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
            {props.imgURL! !== undefined
                ? <img className={styles.img} src={props.imgURL} />
                : <div className={styles.placeholder}>No image</div>
            }
        </div>
    )
}

export default MainImage