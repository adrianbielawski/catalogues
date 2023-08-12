import { useRef } from 'react'
import * as React from 'react'
import styles from './textareaWithConfirmButton.module.scss'
// Utils
import { useConfirmOnEnter } from 'src/utils'
// Custom components
import ConfirmButton from '../confirm-button/confirmButton'

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  loading?: boolean
  onConfirm: (input: string) => void
}

const TextareaWithConfirmButton = (props: Props) => {
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const { loading, onConfirm, ...rest } = props

  const handleConfirm = () => {
    onConfirm(inputRef.current!.value)
    if (inputRef.current != null) {
      inputRef.current.value = ''
    }
  }
  useConfirmOnEnter(inputRef, handleConfirm)

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
