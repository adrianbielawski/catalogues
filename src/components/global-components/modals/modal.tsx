import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames/bind'
import styles from './modal.module.scss'
//Hooks
import { useDisableScroll } from 'src/hooks/useDisableScroll'

type Props = {
    show: boolean,
    children: JSX.Element,
    className?: string,
    onClose?: () => void
}

const cx = classNames.bind(styles)

const Modal = (props: Props) => {
    useDisableScroll(props.show)

    const modalClass = cx(
        'modal',
        props.className,
    )

    const handleWrapperClick = (e: React.MouseEvent) => {
        e.stopPropagation()
    }

    const handleClose = (e: React.MouseEvent) => {
        if (props.onClose) {
            props.onClose()
        }
    }

    return (
        props.show ? ReactDOM.createPortal(
            <div className={modalClass} onClick={handleClose}>
                <div onClick={handleWrapperClick}>
                    {props.children}
                </div>
            </div>,
            document.getElementById('portal')!
        ) : null
    )
}

export default Modal