import React, { useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import styles from './inputWithConfirmButton.scss'
//Custom components
import Loader from 'components/global-components/loader/loader'
import TransparentButton from 'components/global-components/transparent-button/transparentButton'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    loading: boolean,
    onConfirm: (input: string) => void
}

const InputWithConfirmButton = (props: Props) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const { placeholder, loading, onConfirm, ...rest } = props

    const handleConfirm = () => {
        onConfirm(inputRef.current!.value)
        inputRef.current!.value = ''
    }

    return (
        <div className={styles.inputWrapper}>
            <input
                placeholder={placeholder}
                ref={inputRef}
                {...rest}
                autoFocus
            />
            {!loading
                ? (
                    <TransparentButton
                        className={styles.confirmButton}
                        onClick={handleConfirm}
                    >
                        <FontAwesomeIcon icon={faCheck} />
                    </TransparentButton>
                )
                : <Loader className={styles.loader} size={25} />
            }
        </div>
    )
}

export default InputWithConfirmButton