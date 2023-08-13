import React, { useEffect, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import styles from './animatedModal.module.scss'
import Modal from 'components/global-components/modals/modal'

type Props = {
    show: boolean,
    children: JSX.Element,
    className?: string,
    onMounted?: () => void
    onClose?: () => void
}

const AnimatedModal = (props: Props) => {
    const [active, setActive] = useState(props.show)
    const [show, setShow] = useState(props.show)

    useEffect(() => {
        setActive(props.show)
        if (props.show) {
            setShow(true)
        }
    }, [props.show])

    const handleMounted = () => {
        if (props.onMounted) {
            props.onMounted()
        }
    }

    const close = () => {
        if (props.onClose) {
            setActive(false)
        }
    }

    const handleClose = () => {
        if (props.onClose) {
            props.onClose()
        }
        if (!show) {
            setShow(false)
        }
    }

    return (
        <CSSTransition
            in={active}
            timeout={300}
            classNames={{ ...styles }}
            mountOnEnter
            unmountOnExit
            onEntered={handleMounted}
            onExited={handleClose}
        >
            <Modal
                show={show}
                className={props.className}
                onClose={close}
            >
                {props.children}
            </Modal>
        </CSSTransition>
    )
}

export default AnimatedModal