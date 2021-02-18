import React, { useRef } from 'react'
import styles from './inputWithConfirmButton.scss'
//Custom components
import ConfirmButton from '../confirm-button/confirmButton'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    loading?: boolean,
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>,
    buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>,
    onConfirm: (input: string) => void,
}

const InputWithConfirmButton = (props: Props) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const { loading, inputProps, buttonProps, onConfirm } = props

    const handleConfirm = () => {
        onConfirm(inputRef.current!.value)
    }

    return (
        <div className={styles.inputWrapper}>
            <input
                ref={inputRef}
                {...inputProps}
                onChange={props.onChange}
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