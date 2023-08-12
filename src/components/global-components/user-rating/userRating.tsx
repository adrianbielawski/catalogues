import { ReactNode } from 'react'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'
import styles from './userRating.module.scss'

interface Props {
  rating: number | null
  range: number
  onChange: (rating: number) => void
}

const cx = classNames.bind(styles)

const UserRating = (props: Props) => {
  const stars: ReactNode[] = []

  for (let i = 0; i < props.range; i++) {
    const handleClick = () => {
      props.onChange(i + 1)
    }

    const starClass = cx('star', {
      active: props.rating && props.rating >= i + 1,
    })

    stars.push(
      <FontAwesomeIcon
        className={starClass}
        icon={faStar}
        key={i}
        onClick={handleClick}
      />,
    )
  }

  return <div className={styles.stars}>{stars}</div>
}

export default UserRating
