import React, { useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import styles from './textareaWithConfirmButton.scss'
//Custom components
import Loader from 'components/global-components/loader/loader'
import TransparentButton from 'components/global-components/transparent-button/transparentButton'

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    loading: boolean,
    onConfirm: (input: string) => void
}

const TextareaWithConfirmButton = (props: Props) => {
    const inputRef = useRef<HTMLTextAreaElement>(null)
    const { loading, onConfirm, ...rest } = props

    const handleConfirm = () => {
        onConfirm(inputRef.current!.value)
        inputRef.current!.value = ''
    }

    return (
        <div className={styles.inputWrapper}>
            <textarea ref={inputRef} {...rest} />
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

export default TextareaWithConfirmButton