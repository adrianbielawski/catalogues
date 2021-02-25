import React from 'react'
import styles from './confirmMessageModal.scss'
//Custom Components
import Modal from 'components/global-components/modal/modal'
import Button from '../button/button'

type Props = {
    show: boolean,
    title?: string,
    message: string,
    onConfirm: () => void,
    onCancel: () => void,
}

const ConfirmMessageModal = (props: Props) => (
    <Modal
        show={props.show}
        className={styles.modal}
    >
        <div className={styles.confirmMessageModal}>
            {props.title &&
                <p className={styles.title}>{props.title}</p>
            }
            <p className={styles.message}>{props.message}</p>
            <div className={styles.buttons}>
                <Button
                    className={styles.button}
                    onClick={props.onConfirm}
                >
                    Ok
                </Button>
                <Button
                    className={styles.button}
                    onClick={props.onCancel}
                >
                    Cancel
                </Button>
            </div>
        </div>
    </Modal>
)

export default ConfirmMessageModal