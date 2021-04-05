import React, { useRef } from 'react'
import classNames from 'classnames/bind'
import styles from './inputWithConfirmButton.scss'
//Utils
import { confirmOnEnter, mergeRefs } from 'src/utils'
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

const cx = classNames.bind(styles)

const InputWithConfirmButton: React.ForwardRefRenderFunction<
    HTMLInputElement,
    Props
> = (props, ref) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const { loading, inputProps, buttonProps, invalidInputMessage, onConfirm } = props

    const handleConfirm = () => {
        if (invalidInputMessage && invalidInputMessage?.length !== 0) {
            return
        }
        onConfirm(inputRef.current!.value)
        if (props.clearOnConfirm) {
            inputRef.current!.value = ''
        }
    }
    confirmOnEnter(inputRef, handleConfirm)

    const disabled = invalidInputMessage !== undefined && invalidInputMessage?.length !== 0

    const wrapperClass = cx(
        'wrapper',
        props.className,
    )

    return (
        <div className={wrapperClass}>
            <DialogCloud message={invalidInputMessage || ''} />
            <input
                ref={mergeRefs([inputRef, ref])}
                {...inputProps}
                autoFocus
            />
            <ConfirmButton
                className={styles.confirmButton}
                size={25}
                loading={loading}
                disabled={disabled}
                {...buttonProps}
                onClick={handleConfirm}
            />
        </div>
    )
}

export default React.forwardRef(InputWithConfirmButton)