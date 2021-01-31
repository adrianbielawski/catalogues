import React, { useRef, useState, useEffect } from 'react'
import classNames from 'classnames/bind'
import styles from './mainImage.scss'

const BASE_URL = process.env.API_URL

type Props = {
    imgURL?: string,
    className?: string,
}

const cx = classNames.bind(styles)

const MainImage = (props: Props) => {
    const imageRef = useRef<HTMLDivElement>(null)
    const [maxHeight, setMaxHeight] = useState<number | null>(null)

    const getMaxHeight = () => {
        if (imageRef.current) {
        setMaxHeight(imageRef.current.getBoundingClientRect().width)
        }
    }

    useEffect(() => {
        window.addEventListener('resize', getMaxHeight)
        getMaxHeight()
        return () => {
            window.removeEventListener('resize', getMaxHeight)
        }
    }, [])

    const imageClass = cx(
        'mainImage',
        props.className,
    )

    return (
            {props.imgURL !== undefined
                ? <img className={styles.img} src={`${BASE_URL}${props.imgURL}`} />
                : <div className={styles.placeholder}>No image</div>
            }
        </div>
    )
}

export default MainImage