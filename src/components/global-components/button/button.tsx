import React from 'react'
import styles from './button.scss'
import classNames from 'classnames/bind'
import Loader from '../loader/loader'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string,
    loading?: boolean,
}

const cx = classNames.bind(styles)

const Button = (props: Props) => {
    const { loading, ...rest } = props
    const buttonClass = cx(
        'button',
        props.className,
    )

    return (
        <button {...rest} className={buttonClass}>
            {props.loading
                ? <Loader size={25} />
                : props.children
            }
        </button>
    )
}

export default Button