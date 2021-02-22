import React, { useRef } from 'react'
import styles from './textareaWithConfirmButton.scss'
//Utils
import { confirmOnEnter } from 'src/utils'
//Custom components
import ConfirmButton from '../confirm-button/confirmButton'

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    loading?: boolean,
    onConfirm: (input: string) => void
}

const TextareaWithConfirmButton = (props: Props) => {
    const inputRef = useRef<HTMLTextAreaElement>(null)
    const { loading, onConfirm, ...rest } = props

    const handleConfirm = () => {
        onConfirm(inputRef.current!.value)
        inputRef.current!.value = ''
    }
    confirmOnEnter(inputRef, handleConfirm)

    return (
        <div className={styles.inputWrapper}>
            <textarea ref={inputRef} {...rest} />
            <ConfirmButton
                className={styles.confirmButton}
                size={25}
                loading={loading}
                onClick={handleConfirm}
            />
        </div>
    )
}

export default TextareaWithConfirmButton