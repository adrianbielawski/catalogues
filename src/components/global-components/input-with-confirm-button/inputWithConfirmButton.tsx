import React, { useRef } from 'react'
import styles from './inputWithConfirmButton.scss'
//Custom components
import ConfirmButton from '../confirm-button/confirmButton'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    loading?: boolean,
    onConfirm: (input: string) => void
}

const InputWithConfirmButton = (props: Props) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const { placeholder, loading, onConfirm, ...rest } = props

    const handleConfirm = () => {
        onConfirm(inputRef.current!.value)
        inputRef.current!.value = ''
        inputRef.current!.focus()
    }

    return (
        <div className={styles.inputWrapper}>
            <input
                placeholder={placeholder}
                ref={inputRef}
                {...rest}
                autoFocus
            />
            <ConfirmButton
                className={styles.confirmButton}
                size={25}
                loading={loading}
                onClick={handleConfirm}
            />
        </div>
    )
}

export default InputWithConfirmButton