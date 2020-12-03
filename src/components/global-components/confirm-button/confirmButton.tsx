import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import styles from './confirmButton.scss'
import Button from 'components/global-components/button/button'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string,
    onClick: () => void
}

const cx = classNames.bind(styles)

const ConfirmButton = (props: Props) => {
    const handleClick = () => {
        props.onClick()
    }

    const buttonClass = cx(
        'button',
        props.className,
    )

    return (
        <Button round className={buttonClass} onClick={handleClick}>
            <FontAwesomeIcon icon={faCheck} />
        </Button>
    )
}

export default ConfirmButton