import React, { useState } from 'react'
import styles from './protectedConfirmMessageModal.scss'
//Custom Components
import Modal from 'components/global-components/modals/modal'
import Button from '../button/button'
import Input from 'components/global-components/input/input'

export interface ProtectedMessage {
    title?: string,
    value: string,
    expectedInput: string,
    callbackParams?: { [key: string]: any }
}

type Props = {
    show: boolean,
    message: ProtectedMessage | null,
    onConfirm: () => void,
    onCancel: () => void,
}

const ProtectedConfirmMessageModal = (props: Props) => {
    const [inputVal, setInputVal] = useState('')

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputVal(e.target.value)
    }

    if (props.message === null) {
        return null
    }

    const disabled = inputVal !== props.message.expectedInput

    return (
        <Modal
            show={props.show}
            className={styles.modal}
        >
            <div className={styles.confirmMessageModal}>
                {props.message.title &&
                    <p className={styles.title}>{props.message.title}</p>
                }
                <p className={styles.message}>{props.message.value}</p>
                <p className={styles.inputMessage}>
                    If so, please type
                    <span>{` "${props.message.expectedInput}" `}</span>
                    below
                </p>
                <Input
                    autoFocus
                    onChange={handleInputChange}
                />
                <div className={styles.buttons}>
                    <Button
                        className={styles.button}
                        disabled={disabled}
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
}

export default ProtectedConfirmMessageModal