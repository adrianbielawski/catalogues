import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames/bind';
import styles from './modal.scss';

type Props = {
    show: boolean,
    children: JSX.Element,
    className?: string,
    onClose?: () => void
}

const cx = classNames.bind(styles)

const Modal = (props: Props) => {
    const modalClass = cx(
        'modal',
        props.className,
    )

    const handleWrapperClick = (e: React.MouseEvent) => {
        e.stopPropagation()
    }

    const handleClose = () => {
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
            </div>, document.body
        ) : null
    )
}

export default Modal