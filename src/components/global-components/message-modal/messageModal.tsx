import styles from './messageModal.module.scss'
// Custom Components
import Modal from 'components/global-components/modals/modal'
import Button from '../button/button'

interface Props {
  show: boolean
  title?: string
  message: string
  onConfirm: () => void
}

const MessageModal = (props: Props) => {
  return (
    <Modal show={props.show} className={styles.modal} onClose={props.onConfirm}>
      <div className={styles.messageModal}>
        {props.title && <p className={styles.title}>{props.title}</p>}
        <p className={styles.message}>{props.message}</p>
        <Button className={styles.okButton} onClick={props.onConfirm}>
          Ok
        </Button>
      </div>
    </Modal>
  )
}

export default MessageModal
