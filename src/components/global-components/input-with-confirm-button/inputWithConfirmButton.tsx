import React, { useRef } from 'react'
import styles from './inputWithConfirmButton.scss'
//Utils
import { confirmOnEnter } from 'src/utils'
//Custom components
import ConfirmButton from '../confirm-button/confirmButton'
import DialogCloud from '../dialog-cloud/dialogCloud'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    loading?: boolean,
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>,
    buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>,
    clearOnConfirm?: boolean,
    invalidInputMessage?: string,
    onConfirm: (input: string) => void,
}

const InputWithConfirmButton = (props: Props) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const { loading, inputProps, buttonProps, invalidInputMessage, onConfirm } = props

    const handleConfirm = () => {
        onConfirm(inputRef.current!.value)
        if (props.clearOnConfirm) {
            inputRef.current!.value = ''
        }
    }
    confirmOnEnter(inputRef, handleConfirm)

    return (
        <div className={styles.inputWrapper}>
            <DialogCloud message={invalidInputMessage || ''} />
            <input
                ref={inputRef}
                {...inputProps}
                autoFocus
            />
            <ConfirmButton
                className={styles.confirmButton}
                size={25}
                loading={loading}
                {...buttonProps}
                onClick={handleConfirm}
            />
        </div>
    )
}

export default InputWithConfirmButton