import React from 'react'
import { faStar as regStar } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'
import styles from './userRating.scss'

type Props = {
    rating: number,
    range: number,
    onChange: (rating: number) => void
}

const cx = classNames.bind(styles)

const UserRating = (props: Props) => {
    const stars: JSX.Element[] = []

    for (let i = 0; i < props.range; i++) {
        const handleClick = () => {
            props.onChange(i + 1)
        }

        const starClass = cx(
            'star',
            {
                rated: props.rating >= i + 1
            },
        )

        stars.push(
            <FontAwesomeIcon
                icon={regStar}
                className={starClass}
                onClick={handleClick}
                key={i}
            />
        )
    }

    return (
        <div className={styles.userRating}>
            {stars}
        </div>
    )
}

export default UserRating