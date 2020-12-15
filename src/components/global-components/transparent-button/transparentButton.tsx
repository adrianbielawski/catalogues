import React from 'react'
import classNames from 'classnames/bind'
import styles from './transparentButton.scss'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ComponentType<any> | string | HTMLElement | JSX.Element,
    className?: string,
    onClick: () => void,
}

const cx = classNames.bind(styles)

const TransparentButton = (props: Props) => {
    const { className, onClick, ...rest } = props
    const transparentButtonClass = cx(
        'transparentButton',
        className,
    )

    return (
        <button className={transparentButtonClass} onClick={onClick} { ...rest }>
            {props.children}
        </button>
    )
}

export default TransparentButton