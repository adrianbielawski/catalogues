import React from 'react'
import styles from './button.scss'
import classNames from 'classnames/bind'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string,
    round?: boolean,
}

const cx = classNames.bind(styles)

const Button = (props: Props) => {
    const {round, ...rest} = props

    const buttonClass = cx(
        'button',
        props.className,
        {
            round,
        }
    )

    return (
        <button {...rest} className={buttonClass}>
            {props.children}
        </button>
    )
}

export default Button