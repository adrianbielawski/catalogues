import React, { useEffect, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import styles from './animatedModal.scss'
import Modal from 'components/global-components/modals/modal'

type Props = {
    show: boolean,
    children: JSX.Element,
    className?: string,
    onClose?: () => void
}

const AnimatedModal = (props: Props) => {
    const [active, setActive] = useState(props.show)

    useEffect(() => {
        setActive(props.show)
    }, [props.show])

    const close = () => {
        if (props.onClose) {
            setActive(false)
        }
    }

    const handleClose = () => {
        if (props.onClose) {
            props.onClose()
        }
    }

    return (
        <CSSTransition
            in={active}
            timeout={300}
            classNames={{ ...styles }}
            mountOnEnter
            unmountOnExit
            onExited={handleClose}
        >
            <Modal
                show={props.show}
                className={props.className}
                onClose={close}
            >
                {props.children}
            </Modal>
        </CSSTransition>
    )
}

export default AnimatedModal