import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as regStar } from '@fortawesome/free-regular-svg-icons'
import classNames from 'classnames/bind'
import styles from './primaryImageStar.scss'
//Custom components
import TransparentButton from 'components/global-components/transparent-button/transparentButton'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    solid: boolean,
    className?: string,
    onClick: () => void,
}

const cx = classNames.bind(styles)

const PrimaryImageStar = (props: Props) => {
    const icon = props.solid ? solidStar : regStar

    const starClass = cx(
        'primaryImageStar',
        props.className,
    )

    const iconClass = cx(
        'icon',
        {
            solid: props.solid,
        }
    )

    return (
        <TransparentButton
            className={starClass}
            onClick={props.onClick}
        >
            <FontAwesomeIcon icon={icon} className={iconClass} />
        </TransparentButton>
    )
}

export default PrimaryImageStar
