import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames/bind';
import styles from './modal.scss';

type Props = {
    show: boolean,
    children: JSX.Element,
    parent?: HTMLElement,
    className?: string,
    onClose: () => void
}

const cx = classNames.bind(styles)

const Modal = (props: Props) => {
    const modalHeight = props.parent?.getBoundingClientRect().height
    const modalWidth = props.parent?.getBoundingClientRect().width
    const [top, setTop] = useState(0)
    const [isMounted, setIsMounted] = useState(false)

    const updatePosition = () => {
        setTop(window.pageYOffset)
    }

    useEffect(() => {
        if (props.show === true) {
            setIsMounted(true)
        }
    }, [props.show])

    useEffect(() => {
        window.addEventListener('scroll', updatePosition)

        return () => {
            window.removeEventListener('scroll', updatePosition)
        }
    }, [])

    const modalClass = cx(
        'modal',
        props.className,
        {
            mounted: isMounted,
            elevated: !props.parent,
        },
    )

    const modalStyles = {
        top: props.parent ? 0 : top,
        minHeight: props.parent ? `${modalHeight}px` : '100%',
        width: props.parent ? `${modalWidth}px` : '100%',
    }

    const handleWrapperClick = (e: React.MouseEvent) => {
        e.stopPropagation()
    }
    const handleClose = (e: React.MouseEvent) => {
        setIsMounted(false)
        props.onClose()
    }

    return (
        props.show ? ReactDOM.createPortal(
            <div className={modalClass} style={modalStyles} onClick={handleClose}>
                <div className={styles.wrapper} onClick={handleWrapperClick}>
                    {props.children}
                </div>
            </div>, props.parent || document.body
        ) : null
    )
}

export default Modal