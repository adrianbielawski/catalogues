import { ReactNode, useEffect, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import styles from './animatedModal.module.scss'
import Modal from 'components/global-components/modals/modal'

interface Props {
  show: boolean
  children: ReactNode
  className?: string
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
    if (props.onMounted != null) {
      props.onMounted()
    }
  }

  const close = () => {
    if (props.onClose != null) {
      setActive(false)
    }
  }

  const handleClose = () => {
    if (props.onClose != null) {
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
      <Modal show={show} className={props.className} onClose={close}>
        {props.children}
      </Modal>
    </CSSTransition>
  )
}

export default AnimatedModal
