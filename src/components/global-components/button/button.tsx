import React, { useEffect, useRef, useState } from 'react'
import styles from './button.module.scss'
import classNames from 'classnames/bind'
import Loader from '../loader/loader'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string,
    loading?: boolean,
}

const cx = classNames.bind(styles)

const Button = (props: Props) => {
    const { className, loading, ...rest } = props
    const buttonRef = useRef<HTMLButtonElement>(null)
    const [width, setWidth] = useState(0)

    useEffect(() => {
        setWidth(buttonRef.current!.getBoundingClientRect().width)
    }, [])

    const buttonClass = cx(
        'button',
        className,
    )

    return (
        <button
            className={buttonClass}
            style={loading ? { minWidth: `${width}px` } : {}}
            ref={buttonRef}
            {...rest}
        >
            {props.loading
                ? <Loader className={styles.loader} size={25} />
                : props.children
            }
        </button>
    )
}

export default Button