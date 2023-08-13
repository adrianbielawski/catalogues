import React from 'react'
import { faStar as regStar } from '@fortawesome/free-regular-svg-icons'
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'
import styles from './averageRating.module.scss'

type Props = {
    rating: number,
    count: number,
}

const cx = classNames.bind(styles)

const AverageRating = (props: Props) => {
    const starClass = cx(
        'star',
        {
            rated: props.rating !== null
        },
    )

    const rating = props.rating || ''
    const count = props.count ? `(${props.count})` : 0

    return (
        <div className={styles.averageRating}>
            <FontAwesomeIcon
                icon={!props.rating ? regStar : solidStar}
                className={starClass}
            />
            <p>{`${rating} ${count}`}</p>
        </div>
    )
}

export default AverageRating