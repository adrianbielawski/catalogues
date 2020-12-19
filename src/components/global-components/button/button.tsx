import React from 'react'
import styles from './button.scss'
import classNames from 'classnames/bind'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string,
}

const cx = classNames.bind(styles)

const Button = (props: Props) => {
    const buttonClass = cx(
        'button',
        props.className,
    )

    return (
        <button {...props} className={buttonClass}>
            {props.children}
        </button>
    )
}

export default Button