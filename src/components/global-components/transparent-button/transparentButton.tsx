import React from 'react'
import classNames from 'classnames/bind'
import styles from './transparentButton.scss'
import Loader from '../loader/loader'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ComponentType<any> | string | HTMLElement | JSX.Element,
    loading?: boolean,
    className?: string,
    onClick: (e: React.MouseEvent) => void,
}

const cx = classNames.bind(styles)

const TransparentButton = (props: Props) => {
    const { className, loading, onClick, ...rest } = props
    const transparentButtonClass = cx(
        'transparentButton',
        className,
    )

    return (
        <button className={transparentButtonClass} onClick={onClick} { ...rest }>
            {loading
                ? <Loader size={25} />
                : props.children
            }
        </button>
    )
}

export default TransparentButton