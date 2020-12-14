import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import styles from './horizontalArrowButton.scss'

type Props = {
    leftArrow: boolean,
    disabled?: boolean,
    className?: string,
    onClick: () => void,
}

const cx = classNames.bind(styles)

const HorizontalArrowButton = (props: Props) => {
    const buttonClass = cx(
        'button',
        props.className,
        {
            disabled: props.disabled
        }
    )

    return (
        <button className={buttonClass} disabled={props.disabled} onClick={props.onClick}>
            <FontAwesomeIcon
                icon={props.leftArrow ? faChevronLeft : faChevronRight}
                className={styles.arrow}
            />
        </button>
    )
}

export default HorizontalArrowButton